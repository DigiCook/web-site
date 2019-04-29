<template>
  <div :id="id" class="container">
    <div class="btn">
      <slot></slot>
    </div>
</template>

<script>
import uuidv1 from 'uuid/v1'

// Ripple: https://codepen.io/ayoisaiah/pen/GWwabJ
export default {
  name: 'Btn',
  components: {
  },
  props: {
    flat: {
      type: [Boolean]
    }
  },
  beforeMount () {
    this.id = uuidv1()
  },
  mounted () {
    const btn = document.querySelector(`[id="${this.id}"] .btn`)
    btn.addEventListener('click', (e) => this.animate(e, btn))

    if (this.flat === true) {
      const container = document.querySelector(`[id="${this.id}"]`)

      // Remove the bok-shadow for a flat design.
      container.style.boxShadow = 'none'
    }
  },
  data () {
    return {
      id: ''
    }
  },
  watch: {
  },
  methods: {
    animate (e, div) {
      const parent = div.parentElement

      if (parent.querySelectorAll('.ink').length === 0) {
        const span = document.createElement('span')
        span.classList.add('ink')
        parent.insertBefore(span, parent.firstChild)
      }

      const ink = parent.querySelectorAll('.ink')[0]

      ink.classList.remove('animate')

      if (!ink.offsetHeight && !ink.offsetWidth) {
        const d = Math.max(parent.offsetHeight, parent.offsetWidth)
        ink.style.height = `${d}px`
        ink.style.width = `${d}px`
      }

      const rect = parent.getBoundingClientRect()

      const offset = {
        top: rect.top + document.body.scrollTop,
        left: rect.left + document.body.scrollLeft
      }

      const x = e.pageX - offset.left - ink.offsetWidth / 2
      const y = e.pageY - offset.top - ink.offsetHeight / 2

      ink.style.top = `${y}px`
      ink.style.left = `${x}px`
      ink.classList.add('animate')
    }
  },
  computed: {

  }
}
</script>

<style lang="scss">

    .ink {
        display: block;
        position: absolute;
        background: $grey-ligth;
        border-radius: 100%;
        transform: scale(0);
    }

    .ink.animate {
        animation: ripple 0.65s linear;
    }

    @keyframes ripple {
        100% {
            opacity: 0;
            transform: scale(2.5);
        }
    }

</style>


<style scoped lang="scss">

    .container {
        position: relative;
        overflow: hidden;
        border-radius: $btn-border-radius;
        box-shadow: $shadow-grey;
    }

    .btn {
        position: relative;
    }

</style>
