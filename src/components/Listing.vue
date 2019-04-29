<template>
    <div class="listing">
        <btn-back>
            Retour
        </btn-back>
        <div class="listing-choice">
            <section class="choice">
                <aside v-for="plat in plats">
                    <article class="choice-detail" @click="onItemClick(plat)">
                        <img v-bind:src="plat.urlPhoto" alt="">
                        <p>{{ plat.nom }}</p>
                    </article>
                </aside>
            </section>
        </div>
        <pop-up typePopUp="Plat" v-if="showPopUpPlat" @close="showPopUpPlat = false" class="pop-up">
            <div v-if="currentPlat.urlPhoto != null & currentPlat.nom != null & currentPlat.prix != null & currentPlat.description != null">
                <div class="photo">
                    <div>
                        <img v-bind:src="currentPlat.urlPhoto" v-bind:alt="currentPlat.nom">
                    </div>
                </div>
                <div class="description">
                    <h2>{{currentPlat.nom}}</h2>
                    <p>{{currentPlat.description}}</p>
                    <p>{{currentPlat.prix}} €</p>
                    <div class="container-btn-add">
                        <btn class="btn-add">
                            <p>
                                ajouter au panier
                            </p>
                        </btn>
                    </div>
                </div>
            </div>
        </pop-up>
    </div>
</template>

<script>
  import fetch from '@/services/fetch.js'
  import endpoints from '@/services/endpoints.js'
  import BtnBack from '@/components/BtnBack.vue'
  import PopUp from '@/components/PopUp.vue'
  import Btn from '@/components/utils/Btn.vue'

  export default {
    name: 'Listing',
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
    methods: {
      returnBack () {
        this.$router.go(-1)
      },
      async onItemClick (plat) {
        console.log(plat)
        this.showPopUpPlat = true
        this.currentPlat = plat
        this.currentPlat = (await fetch(endpoints.plat.get, {id: plat.id})).data
        // this.$router.go('http://localhost:8000/#/listing/' + id)
      },
      async getPlats () {
        this.plats = (await fetch(endpoints.plat.byTypePlat, {typePlatId: this.id})).data
      }
    },
    async created () {
      await this.getPlats()
    },
    data () {
      return {
        plats: [],
        'showPopUpPlat': false,
        currentPlat: null
      }
    }
  }
</script>

<style scoped lang="scss">
    .listing {
        display: flex;
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
                aside {
                    width: 33%;
                    article {
                        img {
                            height: auto;
                            width: 200px;
                            box-sizing: border-box;
                            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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
                            transform: translate(-50%,-50%) scale(1);
                            top: 50%;
                            left: 50%;
                            height: 100%;
                            width: auto;
                        }
                    }
                }
                .description {
                    width: 66%;
                    display:flex;
                    flex-direction: column;
                    * {
                        margin: 10px 20px;
                    }
                    .container-btn-add {
                        margin: 0;
                        .btn-add {
                            padding: 10px 30px;
                            color: $text-dark;
                            background: $green-ligth;
                            box-sizing: border-box;
                            font-size: $sub-title;
                            font-weight: $weight-sub-title;
                            height: 40px;
                            * {
                                padding: 0;
                                margin: 0;
                            }
                        }
                    }
                }
            }
        }
    }
</style>
