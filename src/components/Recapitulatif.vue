<template>
    <div class="recap">
        <section class="recap-titre">
            <h1>Récapitulatif de la commande</h1>
            <btn-back :souldBeShow="true" v-on:clickOnMenu="retour">retour</btn-back>
        </section>
        <section class="recap-content">
            <ul class="liste">
                <li :key="`key-item-menu-${menu.id}`" class="item" v-for="menu in cdeMenus">
                    <div class="item-data">
                        <div class="item-data-premier">
                            <div class="item-data-second">
                                <div><span>{{menu.nom}}</span></div>
                                <div><span>Quantité : {{menu.quantite}}</span></div>
                            </div>
                            <div><span>Prix : {{(menu.prix * menu.quantite).toFixed(2)}}</span></div>
                        </div>
                    </div>
                    <div class="item-boutton">
                        <div>
                            <BtnRecap moins signe="_"
                                      v-on:onClick="decreaseQtyMenu(menu)"></BtnRecap>
                        </div>
                        <div>
                            <BtnRecap signe="+"
                                      v-on:onClick="increaseQtyMenu(menu)"></BtnRecap>
                        </div>
                        <div>
                            <BtnRecap croix signe="+"
                                      v-on:onClick="deleteLineMenu(menu.id)"></BtnRecap>
                        </div>
                    </div>

                </li>
                <li :key="`key-item-plat-${plat.id}`" class="item" v-for="plat in cdePlats">
                    <div class="item-data">
                        <div class="item-data-premier">
                            <div class="item-data-second">
                                <div><span>{{plat.nom}}</span></div>
                                <div><span>Quantité :  {{plat.quantite}} </span></div>
                            </div>
                            <div><span>Prix : {{(plat.prix * plat.quantite).toFixed(2)}}</span></div>
                        </div>
                    </div>
                    <div class="item-boutton">
                        <div>
                            <BtnRecap moins signe="_"
                                      v-on:onClick="decreaseQtyPlat(plat)"></BtnRecap>
                        </div>
                        <div>
                            <BtnRecap signe="+"
                                      v-on:onClick="increaseQtyMenu(plat)"></BtnRecap>
                        </div>
                        <div>
                            <BtnRecap croix signe="+"
                                      v-on:onClick="deleteLinePlat(plat.id)"></BtnRecap>
                        </div>
                    </div>
                </li>
                <li class="item">

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
  import {mapGetters} from 'vuex'
  import BtnBack from '@/components/utils/BtnBack'
  import Btn from '@/components/utils/Btn'
  import BtnRecap from '@/components/utils/BtnRecap'

  export default {
    name: 'Recapitulatif',
    components: {
      BtnBack,
      Btn,
      BtnRecap
    },
    props: {},
    mounted () {
      console.log('Recapitulatif mounted')
    },
    data () {
      return {}
    },
    watch: {},
    methods: {
      back () {
        this.$router.go(-1)
      },
      validateOrder () {
      },
      deleteLineMenu (id) {
        this.$store.dispatch('deleteLineMenu', id)
      },
      deleteLinePlat (id) {
        this.$store.dispatch('deleteLinePlat', id)
      },
      deleteOrder () {
        this.$store.dispatch('deleteOrder')
      },
      decreaseQtyMenu (menu) {
        menu.quantite--
        if (menu.quantite <= 0) {
          this.deleteLineMenu(menu.id)
        }
      },
      increaseQtyMenu (menu) {
        menu.quantite++
      },
      decreaseQtyPlat (plat) {
        plat.quantite--
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
        font-family: $main-font;
        &-titre {
            background-color: $color-main;
            color: $color-white;
            height: 112px;
            box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
            display: flex;
            h1 {
                margin: auto;
                font-size: 2.4rem;
            }
        }
        &-content {
            margin: auto;
            margin-top: 40px;
            width: 60%;
            .item {
                display: flex;
                justify-content: space-between;
                &-data {
                    margin: auto;
                    width: 60%;
                    &-premier{
                        display: flex;
                        justify-content: space-between;
                    }
                    &-second{
                        width: 60%;
                        display: flex;
                        justify-content: space-between;
                    }
                }
                &-boutton {
                    display: flex;
                    & > div {
                        margin: 15px;
                    }
                }
            }
        }
    }
</style>