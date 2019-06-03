<template>
  <div>
    <div class="live">
      <video src="/vdo.webm" autoplay="true" preload="metadata"/>
    </div>
    <div class="chat">
      <div class="messages" id="list-messages">
        <div :class="v.table === table.value ? 'me' : 'other'" v-for="v in messages">
          <div class="message">
            <p>{{v.date}}, table n{{v.table}}</p>
            <p>{{v.message}}</p>
          </div>
        </div>
      </div>
      <div class="send-area">
        <textarea name="" id="" cols="30" rows="10" placeholder="Entrez votre message"></textarea>
        <input type="submit" value="Envoyer" v-on:click="addMessage()">
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Live',
  components: {
  },
  props: {
  },
  mounted () {
    console.log('[Live:mounted]')
  },
  data () {
    return {
      messages: [
        {
          table: 5,
          message: 'message table 5',
          date: 'date'
        },
        {
          table: 6,
          message: 'message table 6',
          date: 'date'
        },
        {
          table: 5,
          message: 'message table 5',
          date: 'date'
        },
        {
          table: 6,
          message: 'message table 6',
          date: 'date'
        },
        {
          table: 5,
          message: 'message table 5',
          date: 'date'
        },
        {
          table: 6,
          message: 'message table 6',
          date: 'date'
        },
        {
          table: 5,
          message: 'message table 5',
          date: 'date'
        },
        {
          table: 6,
          message: 'message table 6',
          date: 'date'
        },
        {
          table: 7,
          message: 'message table 7',
          date: 'date'
        },
        {
          table: 7,
          message: 'message table 7',
          date: 'date'
        },
        {
          table: 7,
          message: 'message table 7',
          date: 'date'
        },
        {
          table: 8,
          message: 'message table 8',
          date: 'date'
        }
      ],
      table: {
        value: 5
      }
    }
  },
  watch: {
  },
  methods: {
    addMessage: function () {
      let text = document.querySelector('textarea')
      let date = new Date()
      let obj = {
        table: this.table.value,
        message: text.value,
        date: '' + date + ''
      }
      text.value = ''
      this.messages.push(obj)
      this.scrollBottom()
    },
    scrollBottom: function () {
      let messages = document.getElementById('list-messages')
      messages.scrollTop = messages.scrollHeight
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