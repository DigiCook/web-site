<template>
    <div class="maxHeight">
        <div v-if="allMenu.length > 0 && allPlat.length > 0" class="accueil maxHeight">
            <section class="menu">
                <h1 class="menu-titre">Nos Menus</h1>
                <article>
                    <menu-card v-on:clickOnMenu="animateGoingToMenuPage" v-if="allMenu[0]"
                               :dataMenu="allMenu[0]"></menu-card>
                    <div class="menu-line"></div>
                    <menu-card v-on:clickOnMenu="animateGoingToMenuPage" v-if="allMenu[1]"
                               :dataMenu="allMenu[1]"></menu-card>
                </article>
                <div class="menu-trait"></div>
                <article>
                    <menu-card v-on:clickOnMenu="animateGoingToMenuPage" v-if="allMenu[2]"
                               :dataMenu="allMenu[2]"></menu-card>
                    <div class="menu-line"></div>
                    <menu-card v-on:clickOnMenu="animateGoingToMenuPage" v-if="allMenu[3]"
                               :dataMenu="allMenu[3]"></menu-card>
                </article>

            </section>
            <section class="carte">
                <div class="cartAnimate"></div>
                <div class="animDiv">
                    <h1 class="carte-titre">Plats à la Carte</h1>
                    <article>
                        <aside :key="`key-plats-${typeplat.id}`" v-for="typeplat in allPlat">
                            <btn @click.native="clickOnPlat(typeplat.id)" class="carte-plat">
                                <p>{{ typeplat.libelle }}</p>
                            </btn>
                        </aside>
                    </article>
                    <article class="bottom-carte">
                        <btn @click.native="onClickAide" class="carte-button carte-button-help">
                            <p>Appeler un serveur</p>
                        </btn>
                        <btn @click.native="onClickValider" class="carte-button carte-button-recap">
                            <p>Valider</p>
                        </btn>
                    </article>
                </div>
            </section>

        </div>

        <pop-up v-model="displayPopUp">

            <div v-if="showPopupHelp" class="popup-help">
                <div @click="askForHelp" class="popup-help-button">
                    <p>Faire appele à un serveur</p>
                </div>
            </div>

            <div v-else-if="showPopupValider" class="popup-valider">
                <div @click="validerCustomMenu" class="popup-valider-button">
                    <p>Valider le menu a la carte</p>
                </div>
                <div @click="validerCommande" class="popup-valider-button">
                    <p>Valider ma commande et accèder au récapitulatif</p>
                </div>
            </div>

        </pop-up>

    </div>
</template>

<script>
  import MenuCard from '@/components/accueil/MenuCard'
  import fetch from '@/services/fetch'
  import endpoints from '@/services/endpoints'
  import PopUp from '@/components/PopUp'
  import Btn from '@/components/utils/Btn'

  export default {
    name: 'Accueil',
    components: {
      PopUp,
      MenuCard,
      Btn
    },
    data () {
      return {
        allMenu: [],
        allPlat: [],
        showPopupHelp: false,
        showPopupValider: false,
        displayPopUp: false
      }
    },
    watch: {
      'displayPopUp' () {
        if (!this.displayPopUp) {
          // Reset values
          this.showPopupHelp = false
          this.showPopupValider = false
        }
      }
    },
    methods: {
      async getAllMenu () {
        if (this.$store.getters.getMenus.length === 0) {
          this.allMenu = (await fetch(endpoints.menu.list)).data
          this.$store.dispatch('setMenu', this.allMenu)
        } else {
          this.allMenu = this.$store.getters.getMenus
        }
      },
      async getAllPlat () {
        if (this.$store.getters.getTypesPlat.length === 0) {
          this.allPlat = (await fetch(endpoints.typePlat.list)).data
          this.$store.dispatch('setTypesPlat', this.allPlat)
        } else {
          this.allPlat = this.$store.getters.getTypesPlat
        }
      },
      onClickValider () {
        this.showPopupValider = true
        this.displayPopUp = true
      },
      onClickAide () {
        this.showPopupHelp = true
        this.displayPopUp = true
      },
      clickOnPlat (id) {
        this.$router.push(`listing/${id}`)
      },
      askForHelp () {
        console.log('help Me !')
        this.displayPopUp = false
      },
      validerCustomMenu () {
        console.log('validerCustomMenu')
        this.displayPopUp = false
      },
      validerCommande () {
        console.log('validerCommande')
        this.displayPopUp = false
      },
      animateGoingToMenuPage () {
        document.querySelector('.animDiv').classList.add('annimOutRight')
        document.querySelector('.menu').classList.add('annimOutLeft')
        document.querySelector('.cartAnimate').classList.add('expandeLeft')
      }
    },
    async created () {
      this.getAllMenu()
      this.getAllPlat()
    }
  }
</script>

<style scoped lang="scss">
    .maxHeight {
        height: 100%;
    }

    .accueil {
        position: relative;
        overflow: hidden;
        font-family: $main-font;

        display: flex;
        justify-content: space-around;

        .menu {
            flex: 1;
            padding: $margin-main;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: $color-white;

            &-titre {
                color: $text-dark;
                font-size: $title;
                text-align: center;
            }

            article {
                display: flex;
                flex-direction: row;
                justify-content: center;
            }

            &-line {
                display: none;
                width: 2px;
                background-color: $second-text-color;
                margin: 40px 0;
            }

            &-trait {
                display: none;
                height: 2px;
                background-color: $second-text-color;
            }
        }

        .carte {
            padding: $margin-main;
            background-color: $color-main;
            color: $color-white;
            box-shadow: 10px 0px 10px 10px rgba(0, 0, 0, 0.5);

            .animDiv {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 100%;
            }
            &-titre {
                color: $color-white;
                font-size: $title;
                text-align: center;
                z-index: 1;

            }

            &-plat {
                margin: 20px;
                padding: 16px;
                background-color: $color-white;

                p {
                    text-align: center;
                    font-size: $sub-title;
                    color: $text-dark-ligth;
                    font-weight: $weight-sub-title;
                }
            }

            article {
                margin-top: 30px;
            }

            .bottom-carte {
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                font-family: $main-font;

                .carte-button {
                    margin: 20px;
                    padding: 16px;
                    display: flex;
                    flex-direction: column;

                    &-help {
                        background-color: $color-second;
                    }

                    &-recap {
                        background-color: $green-ligth;
                    }

                    p {
                        text-align: center;
                        font-size: $sub-title;
                        color: $text-dark-ligth;
                        font-weight: $weight-sub-title;
                    }
                }
            }
            .cartAnimate {
                position: absolute;
                margin-left: -30px;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: $color-main;

                color: $color-white;
                box-shadow: 10px 0px 10px 10px rgba(0, 0, 0, 0.5);

            }
        }
    }

    .popup-help {
        display: flex;
        height: 100%;

        &-button {
            background-color: $button-alert;
            width: 200px;
            height: 75px;
            margin: auto;
            display: flex;
            border-radius: 20px;

            p {
                margin: auto;
                font-family: $main-font;
                color: $color-white;
            }
        }
    }

    .popup-valider {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;

        &-button {
            background-color: $button-ok;
            width: 250px;
            height: 75px;
            margin: 20px auto;
            display: flex;
            border-radius: 20px;

            p {
                text-align: center;
                margin: auto;
                font-family: $main-font;
                color: $color-white;
            }
        }
    }

    .annimOutRight {
        //position: absolute;
        z-index: 300;
        opacity: 0;
        transform: translate(300%, 0);
        transition: transform 1s, opacity 1s;
    }

    .annimOutLeft {
        //opacity: 0;
        transform: translate(-200%, 0);
        transition: transform 1s, opacity 1s;
    }

    .expandeLeft {
        transform: scale(4, 1);
        transition: transform 1s
    }


</style>