<template>
  <div>
    <div class="live">
      <video src="http://localhost:4242/api/live" autoplay="true" width="640" height="480" preload="metadata"/>
      <button>ajouter bouton pourboire pour les cuisiniers</button>
    </div>
    <div class="chat">
      <div class="messages" id="list-messages">
        <div :key="`key-message-${message.id}`" :class="message.table.id === tableId ? 'me' : 'other'" v-for="message in messages">
          <div class="message">
            <p class="date-table">{{ dateFormated(message.createdAt) }}, table n{{ message.table.libelle }}</p>
            <p>{{ message.message }}</p>
          </div>
        </div>
      </div>
      <div class="send-area">
        <input id="inputMessage" type="text" placeholder="Entrez votre message...">
        <input type="submit" value="Envoyer" @click="addMessage()">
      </div>
    </div>
  </div>
</template>

<script>
import fetch from '@/services/fetch'
import endpoints from '@/services/endpoints'
import io from 'socket.io-client'
import { setTimeout } from 'timers'
import Btn from '@/components/utils/Btn'
import moment from 'moment'

export default {
  name: 'Live',
  components: {
    Btn
  },
  props: {
  },
  mounted () {
    console.log('[Live:mounted]')
    this.fetchMessages()
    this.initSocket()
  },
  beforeDestroy () {
    this.socket.emit('disconnect')
  },
  data () {
    return {
      messages: [],
      tableId: 1,
      socket: null
    }
  },
  watch: {
  },
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
  computed: {
  }
}
</script>


<style scoped lang="scss">
  .live,
  .chat {
    float: left;
    height: 100vh;
  }
  .live {
    width: 65%;
  }
  .chat {
    width: 35%;
    background: $color-main;
    box-shadow: 10px 0px 10px 10px rgba(0, 0, 0, 0.5);
    .send-area {
      height: 50px;
      input {
        display: inline-block;
        border: none;
        background: transparent;
        height: 100%;
        padding: 0 20px;
        outline: none;
      }
    }
    .messages {
      height: calc(100% - 50px);
      overflow: scroll;
      .me,
      .other {
        width: calc(100% - 40px);
        padding: 10px;
        display: block;
        border-radius: 8px;
        box-shadow: -2px 0px 10px 1px rgba(0, 0, 0, 0.15);
        font-size: $sub-title;
        color: $text-dark-ligth;
        font-weight: $weight-sub-title;
        margin: 10px 10px 10px 10px;
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
    }
  }
</style>
