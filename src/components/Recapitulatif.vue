<template>
  <div class="recap" >
    <h1>Recapitulatif de la commande</h1>
    <button @click="back">Back</button>
    <ul class="liste">   
    <li class="item" v-for='menu in cdeMenus'>
        {{menu.nom}} <span>Quantité : {{menu.quantite}}</span> <span>Prix : {{(menu.prix * menu.quantite).toFixed(2)}}</span> <button @click="deleteDish(menu.id)">Supprimer</button>
    </li> 
     <li class="item" v-for='plat in cdePlats'>
        {{plat.nom}} <span>Quantité :  {{plat.quantite}} </span> <span>Prix : {{(plat.prix * plat.quantite).toFixed(2)}}</span> <button @click="deleteDish(plat.id)">Supprimer</button>
    </li>   
    </ul>
    <div> Total commande : {{total}}</div>
    <button class="validateBtn" @click="validateOrder">Valider la commande</button>
    <button @click="deleteOrder">Supprimer la commande</button>
  </div>
</template>

<script>

import trucmuche from '@/store/modules/commande'

export default {
  name: 'Recapitulatif',
  components: {
  },
  props: {
  },
  mounted () {
    console.log('Recapitulatif mounted')
  },
  data () {
    return {
      cdeMenus: trucmuche.getters.getCommandeMenu(trucmuche.state),
      cdePlats: trucmuche.getters.getCommandePlat(trucmuche.state)
    }
  },
  watch: {
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    validateOrder () {
      console.log('order validated')
    },
    deleteDish (id) {
      console.log('dish deleted')
      console.log(id)
    },
    deleteOrder () {
      console.log('orderdeteled : todo lien vers le store')
    }
  },
  computed: {
    total () {
      let tot = 0
      var cdeMenus = trucmuche.getters.getCommandeMenu(trucmuche.state)
      for (let id in cdeMenus) {
        let cde = cdeMenus[id]
        tot = tot + cde.prix * cde.quantite
      }
      var cdePlats = trucmuche.getters.getCommandePlat(trucmuche.state)
      for (let id in cdePlats) {
        let cde = cdePlats[id]
        tot = tot + cde.prix * cde.quantite
      }
      return tot.toFixed(2)
    }
  }
}
</script>


<style scoped lang="scss">
    @import '@/styles/scss/_variables.scss';

    .recap {
        font-family: $main-font;
        color: $main-text-color;
        margin: 40px;
        h1 {
            font-size: 25px;
            text-align: center;
        }
        .liste{
            margin: 20px;
        }
        .item {
           display: flex;
           flex-direction: row;
           justify-content: space-evenly;
           font-size: 30px;
           margin: 10px;
        }
        .validateBtn{
          background-color:$button-ok;
          //font-color: $second-text-color;
        }
}
</style>