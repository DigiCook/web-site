<template>
    <div class="maxHeight">
        <div v-if="allMenu.length > 0 && allPlat.length > 0" class="accueil maxHeight">
            <section class="menu">
                <h1 class="menu-titre">Nos Menus</h1>
                <article>
                    <menu-card :data-idMenu="allMenu[0].id" v-if="allMenu[0]" :dataMenu="allMenu[0]"></menu-card>
                    <div class="menu-line">
                    </div>
                    <menu-card :data-idMenu="allMenu[1].id" v-if="allMenu[1]" :dataMenu="allMenu[1]"></menu-card>
                </article>
                <div class="menu-trait">
                </div>
                <article>
                    <menu-card :data-idMenu="allMenu[2].id" v-if="allMenu[2]" :dataMenu="allMenu[2]"></menu-card>
                    <div class="menu-line">
                    </div>
                    <menu-card :data-idMenu="allMenu[3].id" v-if="allMenu[3]" :dataMenu="allMenu[3]"></menu-card>
                </article>

            </section>
            <section class="carte">
                <h1>Plats à la Carte</h1>
                <article>
                    <aside v-for='typeplat in allPlat'>
                        <add-plat :dataPlat="typeplat"></add-plat>
                    </aside>
                </article>
                <article class="bottom-carte">
                    <div v-on:click="onClickAide" class="carte-button carte-button-help">
                        <img src="../assets/alarm.svg">
                        <p>Appeler un serveur</p>
                    </div>
                    <div v-on:click="onClickValider" class="carte-button carte-button-recap">
                        <img src="../assets/check-symbol.svg">
                        <p>Valider</p>
                    </div>
                </article>
            </section>

        </div>
        <pop-up typePopUp="Help" v-if="showPopupHelp" @close="showPopupHelp = false"></pop-up>
        <pop-up typePopUp="Valider" v-if="showPopupValider" @close="showPopupValider = false"></pop-up>

    </div>
</template>

<script>
  import MenuCard from '@/components/MenuCard'
  import AddPlat from '@/components/AddPlat'
  import fetch from '@/services/fetch'
  import endpoints from '@/services/endpoints'
  import PopUp from '@/components/PopUp'

  export default {
    name: 'Accueil',
    components: {
      PopUp,
      MenuCard,
      AddPlat
    },
    data () {
      return {
        'allMenu': [],
        'allPlat': [],
        'showPopupHelp': false,
        'showPopupValider': false
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
      },
      onClickAide () {
        this.showPopupHelp = true
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
        //padding: 40px;

        h1 {
            font-size: 34px;
            text-align: center;
        }

        .menu {
            padding-top: 30px;
            padding-left: 30px;
            display: flex;
            flex-direction: column;
            margin-right: 20px;
            color: $second-text-color;

            article {
                display: flex;
                flex-direction: row;
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
            padding-top: 30px;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background-color: $bg-main;
            color: $main-text-color;
            box-shadow: 10px 0px 10px 10px rgba(0, 0, 0, 0.5);

            article {
                margin-top: 30px;
            }

            .bottom-carte {
                display: flex;
                flex-direction: column;
                justify-content: space-around;

                font-family: $main-font;


                .carte-button {
                    background-color: $button-choice;
                    padding: 20px;
                    border-radius: 20px;
                    display: flex;
                    flex-direction: column;
                    font-size: 22px;
                    margin: 0px 30px;
                    margin-bottom: 20px;
                    box-shadow: -2px 0px 10px 1px rgba(0, 0, 0, 0.15);

                    &-help {
                        background-color: $button-alert;
                    }

                    &-recap {
                        background-color: $button-ok;
                    }


                    img {
                        display: none;
                        width: 30px;
                        margin: auto;
                    }

                    p {
                        margin: auto;
                    }
                }
            }
        }

    }
</style>