<template>
  <div class="recap" >
    <h1>Récapitulatif de la commande</h1>
    <btn-back>retour</btn-back>
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
    <div>
      <p> 
      <btn @click="validateOrder()" class="validateBtn">Valider la commande</btn>
       </p>
    </div>
    <div>
      <btn @click.native="deleteOrder()" class="deleteOrderBtn">Supprimer la commande</btn>
    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import BtnBack from '@/components/utils/BtnBack'
import Btn from '@/components/utils/Btn'

export default {
  name: 'Recapitulatif',
  components: {
    BtnBack,
    Btn
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
      console.log('order deleted')
      this.$store.dispatch('deleteOrder')
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
      this.cdeMenus.map(function (menu) {
        tot = tot + menu.prix * menu.quantite
      })
      this.cdePlats.map(function (plat) {
        tot = tot + plat.prix * plat.quantite
      })
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
        font-size:15px;
        color: $text-dark;
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
          width: 20%;
        
                    //font-color: $second-text-color;
        }
        .deleteOrderBtn{
          background-color:$button-alert;
          width: 20%;
        
                    //font-color: $second-text-color;
        }
        .button {
            background-color: $color-white;
            padding: 20px;
            border-radius: 20px;
            margin: 20px;
            width: 20%;

                p {
                    text-align: center;
                    color: $second-text-color;
                    font-size: 15px;
                }

        }
}
</style>