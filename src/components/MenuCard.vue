<template>
    <aside class="menu">
        <img class="menu-img" src="https://dinersburger.fr/cache/img/media.zelty.fr.images.289.2941-440x440.png"/>
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
    data () {
      return {}
    }
  }
</script>

<style scoped lang="scss">
    .menu{
        &-img{
            width: 250px;
        }
        &-text{
            font-size: 20px;
            text-align: center;
        }

    }


</style>