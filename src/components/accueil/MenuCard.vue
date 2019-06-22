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
        this.$emit('clickOnMenu', this.dataMenu.id)
      }
    }
  }
</script>

<style scoped lang="scss">

    .unMenu {
        margin: 20px;
        box-shadow: -2px 0px 10px 1px rgba(0, 0, 0, 0.15);
        border-radius: $card-border-radius;
        padding: 20px;

        &-img {
            width: 220px;
            border-radius: 50%;
        }

        &-text {
            font-size: $sub-title;
            text-align: center;
            padding-top: 10px;
            color: $text-dark-ligth;
        }
    }

</style>