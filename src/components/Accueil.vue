<template>
    <div class="accueil">
        <section class="menu">
            <h1 class="menu-titre">Nos Menus</h1>
            <article>
                <menu-card :data-idMenu="allMenu[0].id" v-if="allMenu[0]" :dataMenu="allMenu[0]"></menu-card>
                <div class="menu-line">
                </div>
                <menu-card :data-idMenu="allMenu[1].id" v-if="allMenu[1]" :dataMenu="allMenu[1]"></menu-card>
            </article>
            <div class="menu-trait">
            </div>
            <article>
                <menu-card :data-idMenu="allMenu[2].id" v-if="allMenu[2]" :dataMenu="allMenu[2]"></menu-card>
                <div class="menu-line">
                </div>
                <menu-card :data-idMenu="allMenu[3].id" v-if="allMenu[3]" :dataMenu="allMenu[3]"></menu-card>
            </article>

        </section>
        <section class="carte">
            <h1>Menu à la Carte</h1>
        </section>
    </div>
</template>

<script>
  import MenuCard from '@/components/MenuCard'
  import AddPlat from '@/components/AddPlat'
  import fetch from '@/services/fetch'
  import endpoints from '@/services/endpoints'

  export default {
    name: 'Accueil',
    components: {
      MenuCard,
      AddPlat
    },
    data () {
      return {
        'allMenu': []
      }
    },
    methods: {
      async getAllMenu () {
        this.allMenu = (await fetch(endpoints.menu.list)).data
      }
    },
    async created () {
      if (this.$store.getters.getMenus.length === 0) {
        await this.getAllMenu()
        this.$store.dispatch('setMenu', this.allMenu)
      }
    }
  }
</script>

<style scoped lang="scss">
    @import '@/styles/scss/_variables.scss';

    .accueil {
        font-family: $main-font;
        color: $main-text-color;
        display: flex;
        margin: 40px;
        h1 {
            font-size: 25px;
            text-align: center;
        }
        .menu {
            display: flex;
            flex-direction: column;
            article {
                display: flex;
                flex-direction: row;
            }
            &-line {
                width: 2px;
                background-color: $terce-text-color;
                margin: 40px 0;
            }
            &-trait{
                height: 2px;
                background-color: $terce-text-color;
            }
        }
        .carte {
            width: 100%;
        }

    }
</style>