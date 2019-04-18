<template>
  <div class="recap" >
    <h1>Récapitulatif de la commande</h1>
    <button @click="back">Back</button>
    <ul class="liste">   
    <li class="item" v-for='menu in cdeMenus'>
        <div>{{menu.nom}}</div>
        <div>Quantité : {{menu.quantite}}</div>
         <div>Prix : {{(menu.prix * menu.quantite).toFixed(2)}}</div> 
         <div @click="decreaseQtyMenu(menu)" class="button"><p>Minus</p></div>
         <div @click="menu.quantite ++" class="button"><p>Plus</p></div>
         <div @click="deleteLineMenu(menu.id)" class="button"><p>Supprimer</p></div>
    </li> 
     <li class="item" v-for='plat in cdePlats'>
        <div>{{plat.nom}}</div> 
        <div>Quantité :  {{plat.quantite}} </div> 
        <div>Prix : {{(plat.prix * plat.quantite).toFixed(2)}}</div>
        <div @click="decreaseQtyPlat(plat)" class="button"><p>Minus</p></div>
        <div @click="plat.quantite ++" class="button"><p>Plus</p></div>
        <div @click="deleteLinePlat(plat.id)" class="button"><p>Supprimer</p></div> 
    </li>
    <li class="item">
        <div>&nbsp;</div>  
        <div>&nbsp;</div> 
        <div> Total : {{total}}</div>
        <div class="button" style="background-color:transparent">&nbsp;</div> 
    </li>
    </ul>
    <button class="validateBtn" @click="validateOrder">Valider la commande</button>
    <button @click="deleteOrder">Supprimer la commande</button>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

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
    deleteLineMenu (id) {
      console.log('dish deleted')
      console.log(id)
      this.$store.dispatch('deleteLineMenu', id)
    },
    deleteLinePlat (id) {
      console.log('dish deleted')
      console.log(id)
      this.$store.dispatch('deleteLinePlat', id)
    },
    deleteOrder () {
      console.log('orderdeteled : todo lien vers le store')
    },
    decreaseQtyMenu (menu) {
      menu.quantite --
      if (menu.quantite <= 0) {
        this.deleteLineMenu(menu.id)
      }
    },
    decreaseQtyPlat (plat) {
      plat.quantite --
      if (plat.quantite <= 0) {
        this.deleteLinePlat(plat.id)
      }
    }

  },
  computed: {
    total () {
      let tot = 0
      // var cdeMenus = storeCde.getters.getCommandeMenu(storeCde.state)
      this.cdeMenus.map(function (menu) {
        tot = tot + menu.prix * menu.quantite
      })
      /* for (let id in this.cdeMenus) {
        let cde = this.cdeMenus[id]
        tot = tot + cde.prix * cde.quantite
      } */
      // var cdePlats = storeCde.getters.getCommandePlat(storeCde.state)
      this.cdePlats.map(function (plat) {
        tot = tot + plat.prix * plat.quantite
      })
      /* for (let id in this.cdePlats) {
        let cde = this.cdePlats[id]
        tot = tot + cde.prix * cde.quantite
      } */
      return tot.toFixed(2)
    },
    ...mapGetters({
      cdeMenus: 'getCommandeMenu',
      cdePlats: 'getCommandePlat'
    })

  }
}
</script>


<style scoped lang="scss">
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
           align-items: baseline;
        }
        .item>:nth-child(1) {
           width: 400px;
        }
        .item>:nth-child(2) {
           width: 200px;
        }
         .item>:nth-child(3) {
           width: 200px;
        }
        .validateBtn{
          background-color:$button-ok;
          //font-color: $second-text-color;
        }
        .button {
            background-color: $button-choice;
            padding: 20px;
            border-radius: 20px;
            margin: 20px;
            width: 20%;

                p {
                    text-align: center;
                    color: $second-text-color;
                    font-size: 22px;
                }

        }
}
</style>