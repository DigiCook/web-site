<template>
  <div class="recap">
    <section class="recap-titre">
    <h1>Récapitulatif de la commande</h1>
    <btn-back :souldBeShow="true" v-on:clickOnMenu="retour">retour</btn-back>
    </section>
    <section class="recap-content">
        <ul class="liste">
          <li :key="`key-item-menu-${menu.id}`" class="item" v-for="menu in cdeMenus">
              <div>{{menu.nom}}</div>
              <div>Quantité : {{menu.quantite}}</div>
              <div>Prix : {{(menu.prix * menu.quantite).toFixed(2)}}</div> 
              <div @click="decreaseQtyMenu(menu)" class="buttons"><p><img src="../assets/images/moins.jpg"></p></div>
              <div @click="menu.quantite ++" class="buttons"><p><img src="../assets/images/plus.jpg"></p></div>
              <div @click="deleteLineMenu(menu.id)" class="buttons"><p><img src="../assets/images/croix.jpg"></p></div>
          </li>
          <li :key="`key-item-plat-${plat.id}`" class="item" v-for="plat in cdePlats">
              <div>{{plat.nom}}</div>
              <div>Quantité :  {{plat.quantite}} </div> 
              <div>Prix : {{(plat.prix * plat.quantite).toFixed(2)}}</div>
              <div @click="decreaseQtyPlat(plat)"><p><img src="../assets/images/moins.jpg"></p></div>
              <div @click="plat.quantite ++"><p><img src="../assets/images/plus.jpg"></p></div>
              <div @click="deleteLinePlat(plat.id)"><p><img src="../assets/images/croix.jpg"></p></div>
          </li>
          <li class="item">
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div>&nbsp;</div>
              <div class="total"> Total : {{total}}</div>
          </li>
        </ul>

        <section class="validation">
            <div>
              <btn @click="validateOrder()" class="validateBtn">Valider la commande</btn>
            </div>
            <div>
              <btn @click.native="deleteOrder()" class="deleteOrderBtn">Supprimer la commande</btn>
            </div>
        </section>
    </section>
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
      this.$store.dispatch('deleteLineMenu', id)
    },
    deleteLinePlat (id) {
      console.log('dish deleted')
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
    },
    retour () {
      this.$router.go(-1)
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
            height: 1500px;
            width: 100%;
            text-align: center;
            background-color: $color-main;
        &-titre {
              color: $color-white;
              font-size: $title;
              text-align: center;
        }
        .recap-content {
          background-color: white;
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
           font-size: $sub-title;
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
        .validation{
          display: flex;
          flex-direction: row-reverse;
        }
        .validateBtn{
          background-color: $button-alert;
          font-family: $main-font;
          margin: 20px;
          padding: 16px;
        }
        .deleteOrderBtn{
          background-color: $button-ok;
          font-family: $main-font;
          margin: 20px;
          padding: 16px;
        }
        .total {
            margin:20px;
            font-size: 30px;
        }
}
</style>