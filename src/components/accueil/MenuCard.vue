<template>
  <aside v-on:click="onClick(dataMenu.id)" class="unMenu">
    <img class="unMenu-img" :src="dataMenu.urlPhoto"/>
    <p class="unMenu-text">{{dataMenu.nom}}</p>
  </aside>
</template>

<script>
export default {
  name: 'MenuCart',
  props: {
    dataMenu: {
      type: [Object]
    }
  },
  methods: {
    onClick (id) {
      this.$router.push(`menu/${id}`)
    }
  }
}
</script>

<style scoped lang="scss">

.unMenu {
  margin: 20px;
  box-shadow: -1px -2px 6px 2px rgba(0, 0, 0, .4);
  border-radius: $card-border-radius;
  border-top-left-radius: 22vw;
  border-top-right-radius: 22vw;

  &-img {
    width: 22vw;
    border-radius: 50%;
  }

  &-text {
    font-size: $sub-title;
    text-align: center;
    padding-top: 4px;
    padding-bottom: 14px;
    color: $text-dark-ligth;
    font-weight: $weight-sub-title;
  }
}

</style>