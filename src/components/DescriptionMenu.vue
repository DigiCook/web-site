<template>
  <div class="maxHeight">
    <div v-if="menu" class="Menu maxHeight">

      <btn-back class="Menu-retoure"></btn-back>

      <div class="border">
        <h1 class="Menu-titre">{{ menu.nom.toUpperCase() }}</h1>

        <div class="Menu-conteneur">
          <!-- Image -->
          <img class="Menu-conteneur-image" :src="menu.urlPhoto"/>

          <div class="Menu-conteneur-plats">

            <h3>Contenu du menu</h3>
            <p class="Menu-conteneur-plats_separateur">____</p>

            <p class="Menu-conteneur-plats-plat" :key="`id-plat-${plat.id}`" v-for="plat in menu.plats">{{ plat.nom }}</p>

            <p class="Menu-conteneur-plats-prix" v-text="`${menu.prix} €`"></p>

          </div>
        </div>

        <p class="Menu-description">{{ menu.description }}</p>
      </div>

      <btn @click.native="saveMenu" class="Menu-ajouter">Ajouter</btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fetch from '@/services/fetch'
import endpoints from '@/services/endpoints'
import BtnBack from '@/components/BtnBack'
import Mixin from '@/mixins'
import Btn from '@/components/utils/Btn'

export default {
  name: 'DescriptionMenu',
  mixins: [Mixin],
  components: {
    BtnBack,
    Btn
  },
  props: {
    id: {
      type: [Number, String]
    }
  },
  mounted () {
    // Check if the full menu are already in the store.
    const currentMenu = this.menus.find(m => m.id === parseInt(this.id) && m.hasOwnProperty('description'))
    if (currentMenu) {
      this.menu = currentMenu
    }

    // Get or update the full menu.
    this.fetchMenu()
  },
  data () {
    return {
      menu: null
    }
  },
  methods: {
    async fetchMenu () {
      // Get full menu.
      try {
        console.info('[DescriptionMenu:fetchMenu] Fetch the full menu.')
        const result = await fetch(endpoints.menu.get, { id: this.id })
        if (result && result.code === 200) {
          result.data.plats.sort((a, b) => a.id - b.id)
          this.menu = result.data
          this.$store.dispatch('addMenu', this.menu)
        }
      } catch (error) {
        console.error('[DescriptionMenu:fetchMenu]', error)
      }
    },
    saveMenu () {
      const savedMenu = this.menu
      delete savedMenu.plats

      this.$store.dispatch('addMenuToCommande', savedMenu)
      this.displaySnackbar(`${savedMenu.nom} ajouté à votre commande`)
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters({
      menus: 'getMenus'
    })
  }
}
</script>
<style lang="scss">
html, body {
  width: 100% !important;
  height: 100vh !important;
  padding: 0px !important;
  margin: 0px !important;
}
</style>

<style scoped lang="scss">

.maxHeight {
  height: 100%;
}

.Menu {
  position: relative;
  overflow: hidden;
  font-family: $main-font;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &-retoure {
    position: relative;
    margin-top: $margin-main;
    margin-left: $margin-main;
    top: 0px !important;
    left: 0px !important;
    align-self: flex-start;
  }

  &-ajouter {
    margin-right: $margin-main;
    margin-bottom: $margin-main;
    align-self: flex-end;
    background-color: $green-ligth;
    padding: 10px 30px;
    color: $text-dark;
    font-size: $sub-title;
    font-weight: $weight-sub-title;
  }

  .border {
    margin: $margin-main;
    padding: $margin-main;
    background-color: $brown-ligth;
    border-radius: $card-border-radius;
    box-shadow: -2px 4px 10px 0px rgba(0, 0, 0, 0.4);
  }

  &-titre {
    padding-bottom: $margin-main;
    text-align: center;
    color: $text-dark;
    font-size: $title;
  }

  &-conteneur {
    width: 100%;
    display: flex;
    flex-direction: row;

    &-image {
      margin: 24px;
      width: 300px;
      height: 300px;
      border-radius: 50%;
    }

    &-plats {
      position: relative;
      padding: 24px;
      width: 100%;
      border-left: solid 2px rgba(0, 0, 0, .53);

      h3 {
        color: $text-dark;
        text-align: center;
        font-size: $sub-title;
      }

      &_separateur {
        color: $text-dark !important;
        text-align: center !important;
        padding: 0px !important;
        padding-bottom: 16px;
      }

      &-plat {
        color: $text-dark;
        text-align: center;
        font-size: 1.1rem;
        padding: 8px;
      }

      &-prix {
        display: inline;
        position: absolute;
        right: 10%;
        bottom: 20%;
        color: $text-dark;
        font-size: $sub-title;
        font-weight: 600;
      }
    }
  }

  &-description {
    padding-top: $margin-main;
    margin: auto;
    color: $text-dark;
    font-size: 1.2rem;
    text-align: justify;
  }
}
</style>
