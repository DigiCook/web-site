<template>
    <div class="listing">
        <btn-back></btn-back>
        <div class="listing-choice">
            <section class="choice">
                <aside v-for="plat in plats">
                    <article class="choice-detail" @click="onItemClick(plat.id)">
                        <img :src="plat.urlPhoto" alt="">
                        <p>{{ plat.id }}</p>
                    </article>
                </aside>
            </section>
        </div>
    </div>
</template>

<script>
    import fetch from '@/services/fetch.js'
    import endpoints from '@/services/endpoints.js'
    import BtnBack from '@/components/btnBack.vue'

    export default {
      name: 'Listing',
      components: {
        BtnBack
      },
      methods: {
        returnBack () {
          this.$router.go(-1)
        },
        onItemClick (id) {
          console.log('http://localhost:8000/#/listing/' + id)
          // this.$router.go('http://localhost:8000/#/listing/' + id)
        },
        async getPlats () {
          this.plats = (await fetch(endpoints.plat.list)).data
        }
      },
      async created () {
        await this.getPlats()
      },
      data () {
        return {
          plats: []
        }
      }
    }
</script>

<style scoped lang="scss">
    .listing{
        display:flex;
        &-choice{
            height: 100vh;
            width: 100%;
            text-align: center;
            .choice{
                display: flex;
                flex-direction: row;
                width: 100%;
                justify-content: space-around;
                height: calc(100vh - 112px);
                margin-top: 112px;
                flex-wrap: wrap;
                aside{
                    width: 33%;
                    article{
                        img{
                            height: 170px;
                            width: 170px;
                            box-sizing: border-box;
                            box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
                        }
                    }
                }
            }
        }
    }
</style>
