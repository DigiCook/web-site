<template>
    <aside v-on:click="onClick(dataMenu.id)" class="menu">
        <img class="menu-img" :src="dataMenu.urlPhoto"/>
        <p class="menu-text">{{dataMenu.nom}}</p>
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
    .menu {
        margin: 20px;
        //border: solid 1px black;
        &-img {
            width: 25vw;
            margin: 10px;
        }
        &-text {
            font-size: 22px;
            text-align: center;
        }
    }

</style>