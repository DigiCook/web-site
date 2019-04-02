<template>
    <div class="accueil">
        <section class="menu">
            <h1 class="menu">Nos Menus</h1>
            <article>
                <menu-card :data-idMenu="allMenu[0].id" v-if="allMenu[0]" :dataMenu="allMenu[0]"></menu-card>
                <menu-card :data-idMenu="allMenu[1].id" v-if="allMenu[1]" :dataMenu="allMenu[1]"></menu-card>
            </article>

            <article>
                <menu-card :data-idMenu="allMenu[2].id" v-if="allMenu[2]" :dataMenu="allMenu[2]"></menu-card>
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
        this.$store.dispatch('setMenu', this.allMenu)
        await this.getAllMenu()
      }
    }
  }
</script>

<style scoped lang="scss">
    .accueil {
        .menu {
            display: flex;
            flex-direction: column;
            article {
                display: flex;
                flex-direction: row;
            }
        }

    }
</style>