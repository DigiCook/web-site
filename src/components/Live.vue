<template>
  <div>
    <div class="live">
      <!-- <video src="http://localhost:2223/live" autoplay="true" width="640" height="480" preload="metadata"/> -->
      <canvas id="liveT" width="640" height="480"></canvas>
    </div>
    <div class="chat">
      <div class="messages" id="list-messages">
        <div :key="`key-message-${message.id}`" :class="message.table.id === tableId ? 'me' : 'other'" v-for="message in messages">
          <div class="message">
            <p>{{ message.createdAt }}, table n{{ message.table.libelle }}</p>
            <p>{{ message.message }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="send-area">
      <textarea name="" id="" cols="30" rows="10" placeholder="Entrez votre message"></textarea>
      <input type="submit" value="Envoyer" v-on:click="addMessage()">
    </div>
  </div>
</template>

<script>
import JSMpeg from 'jsmpeg'
import fetch from '@/services/fetch'
import endpoints from '@/services/endpoints'
import io from 'socket.io-client'
import { setTimeout } from 'timers'

export default {
  name: 'Live',
  components: {
  },
  props: {
  },
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
      socket: null
    }
  },
  watch: {
  },
  methods: {
    initSocket () {
      this.socket = io('http://localhost:5000')
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
        this.messages = result.data
        this.scrollBottom()
      }
    },
    addMessage () {
      let text = document.querySelector('textarea')
      let newMessage = {
        message: text.value,
        tableId: this.tableId
      }
      text.value = ''

      fetch(endpoints.message.create, newMessage)
    },
    scrollBottom () {
      setTimeout(() => {
        let messages = document.getElementById('list-messages')
        messages.scrollTop = messages.scrollHeight
      }, 100)
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
    background: purple;
  }
  .chat {
    width: 35%;
    .send-area {
      height: 150px;
      background: red;
      textarea {
        height: calc(100% - 10px);
        margin: 5px;
        width: calc(100% - 10px - 60px);
        border: none;
        background: transparent;
        font-size: 15px;
        float: left;
      }
      input[type="submit"]{
        float: left;
        width: 60px;
        height: 100%;
        padding: 5px 10px 5px 0;
        border: none;
        background: transparent;
      }
    }
    .messages {
      height: calc(100% - 150px - 10px);
      overflow: scroll;
      margin-bottom: 10px;
      background: green;
      .me,
      .other {
        width: 50%;
        padding: 10px;
        display: block;
        border-radius: 20px;
      }
      .me {
        background: blue;
        margin: 10px 10px 10px auto;
      }
      .other {
        background: yellow;
        margin: 10px auto 10px 10px;
      }
    }
  }
</style>