<template>
  <div v-if="menu" class="Menu">

    <button class="Menu-retoure">Retour</button>

    <div class="border">
      <h1 class="Menu-titre">{{ menu.nom.toUpperCase() }}</h1>

      <div class="Menu-conteneur">
        <!-- Image -->
        <img class="Menu-conteneur-image" :src="menu.urlPhoto"/>

        <div class="Menu-conteneur-plats">

          <h2>Contenu du menu</h2>

        </div>
      </div>

      <p class="Menu-description">{{ menu.description }}</p>
    </div>

    <button class="Menu-ajouter">Ajouter</button>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fetch from '@/services/fetch'
import endpoints from '@/services/endpoints'

export default {
  name: 'DescriptionMenu',
  components: {
  },
  props: {
    id: {
      type: [Number, String]
    }
  },
  mounted () {
    // Check if the full menu are already in the store.
    const currentMenu = this.menus.find(m => m.id === this.id && m.hasOwnProperty('description'))

    if (currentMenu) {
      this.menu = currentMenu
    } else {
      this.fetchMenu()
    }

    // TODO: Get plats of Menu.
  },
  data () {
    return {
      menu: null
    }
  },
  watch: {
  },
  methods: {
    async fetchMenu () {
      // Get full menu.
      try {
        console.info('[DescriptionMenu:fetchMenu] Fetch the full menu.')
        const result = await fetch(endpoints.menu.get, { id: this.id })
        if (result && result.code === 200) {
          this.menu = result.data
        }
      } catch (error) {
        console.error('[DescriptionMenu:fetchMenu]', error)
      }
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
.Menu {
  width: 100%;
  height: 100%;
  padding: 24px;

  &-retoure {
    margin-bottom: 24px;
  }

  &-ajouter {
    position: absolute;
    right: 0px;
    margin-top: 24px;
  }

  .border {
    padding: 24px;
    border: solid 2px rgba(0, 0, 0, .53);
    border-radius: 4px;
  }

  &-titre {
    padding-bottom: 24px;
    text-align: center;
    color: #333333;
  }

  &-conteneur {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;

     &-image {
      padding: 24px;
      width: 300px;
      height: 300px;
    }

    &-plats {
      padding: 24px;
      width: 100%;
      border-left: solid 2px rgba(0, 0, 0, .53);
    }
  }

  &-description {
    padding-top: 24px; 
    width: 50%;
    margin: auto;

    color: #333333;
    font-size: 1.2rem;
  }
}
</style>
