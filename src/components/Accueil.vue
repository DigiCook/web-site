<template>
    <div class="accueil">
        <section class="menu">
            <h1>Nos Menus</h1>
            <article>
                <menu-card name="nom du menu 1"></menu-card>
                <menu-card name="nom du menu 2"></menu-card>
            </article>
            <article>
                <menu-card name="nom du menu 3"></menu-card>
                <menu-card name="nom du menu 4"></menu-card>
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

  export default {
    name: 'Accueil',
    components: {
      MenuCard,
      AddPlat
    },
    data () {
      return {
        'test': 'test'
      }
    }
  }
</script>

<style scoped lang="scss">
    .accueil {

    }
</style>