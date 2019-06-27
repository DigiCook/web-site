<template>
    <div class="maxHeight">
        <div class="live">
            <!-- <video src="http://localhost:2223/live" autoplay="true" width="640" height="480" preload="metadata"/> -->
            <h1>Live depuis les cuisines !</h1>
            <!--<canvas id="liveT" width="640" height="480"></canvas>-->
            <video class="liveVid" autoplay width="480" height="480" >
              <source :src="live" type="video/webm">
            </video>

            <div class="button-dons"><p>Donner un pourboire au cuisiner</p></div>
        </div>
        <div class="chat">
            <div class="messages" id="list-messages">
                <div :key="`key-message-${message.id}`" :class="message.table.id === tableId ? 'me' : 'other'"
                     v-for="message in messages">
                    <div class="message">
                        <p class="date-table">{{ dateFormated(message.createdAt) }}, table {{ message.table.libelle
                            }}</p>
                        <p class="message-text">{{ message.message }}</p>
                    </div>
                </div>
            </div>
            <div class="send-area">
                <div class="inputMessage"><input id="inputMessage" type="text" placeholder="Entrez votre message...">
                </div>
                <div class="sendButton">
                    <div @click="addMessage()">Envoyer</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  import JSMpeg from 'jsmpeg'
  import fetch from '@/services/fetch'
  import endpoints from '@/services/endpoints'
  import io from 'socket.io-client'
  import {setTimeout} from 'timers'
  import Btn from '@/components/utils/Btn'
  import moment from 'moment'

  export default {
    name: 'Live',
    components: {
      Btn
    },
    props: {},
    mounted () {
      console.log('[Live:mounted]')
      this.fetchMessages()
      this.initSocket()

      const client = new WebSocket('ws://localhost:9999')

      let a = new JSMpeg(client, {
        canvas: document.querySelector('#liveT')
      })
      console.log(a)
    },
    beforeDestroy () {
      this.socket.emit('disconnect')
    },
    data () {
      return {
        messages: [],
        tableId: 1,
        socket: null,
        live: require('../assets/live.webm')
      }
    },
    watch: {},
    methods: {
      initSocket () {
        this.socket = io('http://digicook-api.alex-chopard.fr')
        this.socket.emit('connection')

        this.socket.on('message', (message) => {
          console.log('[Live:initSocket] message', message)
          this.messages.push(...message)
          this.scrollBottom()
        })
      },
      async fetchMessages () {
        console.info('[Live:fetchMessages]')

        const result = await fetch(endpoints.message.get)
        if (result && result.code === 200 && result.data) {
          this.messages = result.data.sort(function (a, b) {
            return a.createdAt.localeCompare(b.createdAt)
          })
          this.scrollBottom()
        }
      },
      addMessage () {
        let inputText = document.querySelector('#inputMessage')
        if (inputText && inputText.value && inputText.value.length > 0) {
          let newMessage = {
            message: inputText.value,
            tableId: this.tableId
          }

          inputText.value = ''

          fetch(endpoints.message.create, newMessage)
        }
      },
      scrollBottom () {
        setTimeout(() => {
          let messages = document.getElementById('list-messages')
          messages.scrollTop = messages.scrollHeight
        }, 100)
      },
      dateFormated (date) {
        return moment(date).format('LTS')
      }
    },
    computed: {}
  }
</script>


<style scoped lang="scss">
.liveVid {
  margin: auto;
   transform: rotate(-90deg);
}
    .maxHeight {

        width: 1024px;
        height: 768px;
         }
    .live,
    .chat {
        font-family: $main-font;
        float: left;
        height: 768px;
    }

    .live {
        display: flex;
        flex-direction: column;
        width: 65%;

        h1 {
            margin: auto;
            margin-bottom: 30px;
        }

        canvas {
            background-image: url("https://img.bfmtv.com/c/1256/708/5fc/7b6df9b95d7310ac198ca8d392153.jpeg");
            border-radius: 4px;
            margin: auto;
            margin-bottom: 0px;
            margin-top: 0px;
        }

        .button-dons {
            margin: auto;
            margin-top: 30px;
            background-color: $color-terce;
            color: $text-dark;
            font-weight: 600;
            border-radius: 4px;
            padding: 15px;
            box-shadow: -1px 2px 6px 0px rgba(0, 0, 0, 0.4);
        }
    }

    .chat {
        width: 35%;
        background: $color-main;
        box-shadow: 10px 0px 10px 10px rgba(0, 0, 0, 0.5);

        .send-area {
            display: flex;
            margin: 10px;

            .inputMessage {

                background-color: white;
                padding: 15px;
                border-radius: 4px;

                input {
                    font-size: $sub-title;
                    border: none;

                    &:focus {
                        outline: none;
                    }
                }
            }

            .sendButton {
                display: flex;
                align-items: center;
                width: 100%;
                background-color: $color-terce;
                color: $text-dark;
                font-weight: 600;
                border-radius: 4px;
                box-shadow: -1px 2px 6px 0px rgba(0, 0, 0, 0.4);
                margin: 5px 0px 5px 10px;

                div {
                    margin: auto;
                }
            }
        }

        .messages::-webkit-scrollbar {
            width: 0 !important
        }

        .messages {
            height: calc(100% - 80px);
            overflow: scroll;

            .me,
            .other {
                width: calc(100% - 40px);
                padding: 5px;
                display: block;
                border-radius: 8px;
                box-shadow: -2px 0px 10px 1px rgba(0, 0, 0, 0.15);
                font-size: $sub-title;
                color: $text-dark-ligth;
                font-weight: $weight-sub-title;
                margin: 15px;
                background: $color-white;
            }

            .me {
                .message {
                    .date-table {
                        color: $color-hint;
                    }
                }
            }

            .other {
                .message {
                    .date-table {
                        color: $color-neutral;
                    }
                }
            }

            .message-text {
                padding: 5px 10px 5px 10px;
            }
        }
    }
</style>
