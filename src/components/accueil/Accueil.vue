<template>
    <div class="maxHeight">
        <div v-if="allMenu.length > 0 && allPlat.length > 0" class="accueil maxHeight">
            <transition name="translateMenu" v-on:after-leave="triggerAnimExtendLeft">
                <section v-show="animTranslateLeft" class="menu">
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
            </transition>
            <transition name="expandeLeft" v-on:after-leave="displayPageMenu"
                        v-on:after-enter="afterEnterFromDetailMenu">
                <div v-show="animExtendLeft" class="flex">
                    <transition name="goToListing" v-on:after-leave="goToListingPage"
                                v-on:after-enter="SetAnimeFadeTrue">
                        <section v-show="animToListePlat" class="carte">
                            <div class="cartAnimate"></div>
                            <transition name="fade" v-on:after-leave="launchanimToListing">
                                <div v-show="animFade" class="animDiv">
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
                                        <btn @click.native="validerCommande" class="carte-button carte-button-recap">
                                            <p>Valider</p>
                                        </btn>
                                    </article>
                                </div>
                            </transition>
                        </section>
                    </transition>
                </div>
            </transition>
        </div>

        <pop-up v-model="displayPopUp">
            <div v-if="displayPopUp" class="popup-help">
                <div @click="clickOnAide" class="popup-help-button">
                    <p>Appeler un serveur</p>
                </div>
            </div>
        </pop-up>

    </div>
</template>

<script>
  import MenuCard from '@/components/accueil/MenuCard'
  import fetch from '@/services/fetch'
  import endpoints from '@/services/endpoints'
  import PopUp from '@/components/utils/PopUp'
  import Btn from '@/components/utils/Btn'

  let isFirstLoad = true

  export default {
    name: 'Accueil',
    components: {
      PopUp,
      MenuCard,
      Btn
    },
    data () {
      return {
        firstTimeVisite: isFirstLoad,
        allMenu: [],
        allPlat: [],
        showPopupHelp: false,
        showPopupValider: false,
        displayPopUp: false,
        animToListePlat: null,
        animFade: null,
        animTranslateLeft: null,
        animExtendLeft: null,
        idPlat: 0,
        idMenu: 0
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
      onClickAide () {
        this.displayPopUp = true
      },
      clickOnPlat (id) {
        this.animFade = false
        this.idPlat = id
      },
      launchanimToListing () {
        this.animToListePlat = false
      },
      goToListingPage () {
        this.$router.push(`listing/${this.idPlat}`)
      },
      SetAnimeFadeTrue () {
        this.animFade = true
      },
      clickOnAide () {
        this.displayPopUp = false
      },
      validerCommande () {
        this.displayPopUp = false
        this.$router.push('/recapitulatif')
      },
      animateGoingToMenuPage (id) {
        this.idMenu = id
        this.animTranslateLeft = false
      },
      triggerAnimExtendLeft () {
        this.animExtendLeft = false
      },
      displayPageMenu () {
        this.$router.push(`menu/${this.idMenu}`)
      },
      afterEnterFromDetailMenu () {
        this.animTranslateLeft = true
      }
    },
    async created () {
      this.getAllMenu()
      this.getAllPlat()
    },
    mounted () {
      if (this.firstTimeVisite) {
        isFirstLoad = false
        this.animFade = true
        this.animExtendLeft = true
        this.animToListePlat = true
        this.animTranslateLeft = true
      }
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        if (from.name === 'DescriptionMenu') {
          vm.animFade = true
          vm.animToListePlat = true
          vm.animExtendLeft = true
        }

        if (from.name === 'Listing') {
          vm.animFade = true
          vm.animExtendLeft = true
          vm.animToListePlat = true
          // vm.animTranslateLeft = true
          // setup les hook d'enter pour tout déclenché depuis 1 booléean
        }
      })
    }
  }
</script>

<style scoped lang="scss">
    .maxHeight {

        width: 1024px;
        height: 768px;
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
        .flex {
            display: flex;
            margin-left: auto;
        }
        .carte {
            padding: $margin-main;
            background-color: $color-main;
            color: $color-white;
            box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
            width: 260px;
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
                display: none;
                position: absolute;
                margin-left: -30px;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: $color-main;

                color: $color-white;

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
        opacity: 0;
        transform: translate(300%, 0);
        transition: transform 1s ease-in, opacity 1s ease-out;
    }

    .annimOutLeft {
        opacity: 0;
        transform: translate(-200%, 0);
        transition: transform 1s ease-in, opacity 1s ease-out;
    }

    .expandeLeft {
        transform: scale(4, 1);
        transition: transform 1s
    }

    .goToListing-enter-active, .goToListing-leave-active {
        transition: transform .5s;
    }

    .goToListing-enter, .goToListing-leave-to {
        transform: translate(0, calc(112px - 100%));
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 0.5s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

    .translateMenu-enter-active, .translateMenu-leave-active {
        transition: transform .5s, opacity .5s;
    }

    .translateMenu-enter, .translateMenu-leave-to {
        transform: translateX(- 100%);
        opacity: 0;
    }

    .expandeLeft-enter-active, .expandeLeft-leave-active {
        transition: padding-left .5s;
        .carte {
            transition: opacity .5s;
        }
    }

    .expandeLeft-enter, .expandeLeft-leave-to {
        padding-left: 100vw;
        background-color: $color-main;
        margin-left: auto;
        .carte {
            opacity: 0;
            box-shadow: none;
        }
    }

</style>