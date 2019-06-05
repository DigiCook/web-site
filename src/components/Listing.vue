<template>
    <div>
        <transition name="fromListing" v-on:after-leave="retour">
            <div v-show="fromListing" class="listing">
                <div class="listing-bandeau"></div>

                <div class="listing-choice">

                    <btn-back :souldBeShow="false" v-on:clickOnMenu="animBackFromListing">
                        Retour
                    </btn-back>
                    <transition name="fade">
                        <section v-show="fromListing" class="choice">
                            <aside :key="`key-plat-${plat.id}`" v-for="plat in plats">
                                <article @click="onItemClick(plat)">
                                    <div class="choice-detail">
                                        <img v-bind:src="plat.urlPhoto" alt="">
                                        <p>{{ plat.nom }}</p>
                                    </div>
                                </article>
                            </aside>
                        </section>
                    </transition>
                </div>
            </div>
        </transition>

        <pop-up v-model="showPopUpPlat" @close="showPopUpPlat = false" class="pop-up">
            <div v-if="currentPlat && currentPlat.urlPhoto != null & currentPlat.nom != null & currentPlat.prix != null & currentPlat.description != null">
                <div class="photo">
                    <div>
                        <img v-bind:src="currentPlat.urlPhoto" v-bind:alt="currentPlat.nom">
                    </div>
                </div>
                <div class="description">
                    <h2>{{currentPlat.nom}}</h2>
                    <p>{{currentPlat.description}}</p>
                    <div class="priceAndBtn">
                        <p class="price">{{currentPlat.prix}} €</p>
                        <div class="container-btn-add">
                            <btn class="btn-add">
                                <p class="btn-add-text">
                                    ajouter au panier
                                </p>
                            </btn>
                        </div>
                    </div>
                </div>
            </div>
        </pop-up>
    </div>
</template>

<script>
  import fetch from '@/services/fetch.js'
  import endpoints from '@/services/endpoints.js'
  import BtnBack from '@/components/utils/BtnBack.vue'
  import PopUp from '@/components/utils/PopUp.vue'
  import Mixin from '@/mixins'
  import Btn from '@/components/utils/Btn.vue'

  export default {
    name: 'Listing',
    mixins: [Mixin],
    components: {
      BtnBack,
      Btn,
      PopUp
    },
    props: {
      id: {
        type: [Number, String]
      }
    },
    data () {
      return {
        plats: [],
        showPopUpPlat: false,
        currentPlat: null,
        fromListing: false
      }
    },
    methods: {
      async onItemClick (plat) {
        this.showPopUpPlat = true
        this.currentPlat = plat
        this.currentPlat = (await fetch(endpoints.plat.get, {id: plat.id})).data
      },
      async getPlats () {
        this.plats = (await fetch(endpoints.plat.byTypePlat, {typePlatId: this.id})).data
      },
      launchAnim () {
        setTimeout(function () {
          this.fromListing = true
        }.bind(this), 500)
      },
      animBackFromListing () {
        this.fromListing = false
      },
      retour () {
        this.$router.go(-1)
      }
    },
    async created () {
      await this.getPlats()
    },
    mounted () {
      this.fromListing = true
    }
  }
</script>

<style scoped lang="scss">
    .listing {
        display: flex;
        flex-direction: column;

        &-bandeau {
            height: 112px;
            width: 100%;
            background-color: $color-main;
            box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
        }

        &-choice {
            height: 100vh;
            width: 100%;
            text-align: center;

            .choice {
                display: flex;
                flex-direction: row;
                width: 100%;
                justify-content: space-around;
                height: calc(100vh - 112px);
                margin-top: 112px;
                flex-wrap: wrap;
                background-color: white;

                &-detail {
                    box-shadow: -2px 0px 10px 1px rgba(0, 0, 0, 0.15);
                    border-radius: $card-border-radius;
                    padding: 20px;
                    margin: 20px;
                }

                aside {
                    width: 33%;

                    article {
                        img {
                            height: auto;
                            width: 200px;
                            box-sizing: border-box;
                            border-radius: 50%;
                        }

                        p {
                            font-size: $sub-title;
                            text-align: center;
                            padding-top: 10px;
                            color: $text-dark-ligth;
                        }
                    }
                }
            }
        }

    }

    .pop-up {
        div {
            display: flex;
            flex-direction: row;
            height: 100%;
            font-family: $main-font;
            color: $text-dark-ligth;

            .photo {
                width: 44%;
                height: 100%;
                border-bottom-left-radius: 20px;
                border-top-left-radius: 20px;
                display: flex;

                div {
                    border-top-left-radius: 20px;
                    border-bottom-left-radius: 20px;
                    max-width: 100%;
                    overflow: hidden;

                    img {
                        position: relative;
                        transform: translate(-50%, -50%) scale(1);
                        top: 50%;
                        left: 50%;
                        height: 100%;
                        width: auto;
                    }
                }
            }

            .description {
                height: 100%;
                width: 66%;
                display: flex;
                flex-direction: column;
                padding: 10px;

                h2 {
                    padding: 10px;
                }

                p {
                    padding: 50px;
                    padding-top: 10px;
                }

                .priceAndBtn {
                    height: 40px;
                    padding: 10px;
                    margin-top: auto;
                    margin-bottom: 20px;
                    align-self: flex-end;

                    .price {
                        height: 20px;
                        padding: 10px;
                        margin-right: 10px;
                    }

                    p {
                        padding: 0px;
                    }

                }

                .container-btn-add {
                    height: 20px;

                    .btn-add {
                        padding: 10px 30px;
                        color: $text-dark-ligth;
                        background: $color-terce;
                        font-size: $sub-title;
                        font-weight: $weight-sub-title;
                    }
                }
            }
        }
    }

    .fromListing-enter-active, .fromListing-leave-active {
        transition: transform .5s;
        transition-delay: .5s;

    }

    .fromListing-enter, .fromListing-leave-to {
        transform: translateX(calc(100% - 320px));
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity 2s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }
</style>
