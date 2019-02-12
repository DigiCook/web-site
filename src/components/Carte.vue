<template>
    <div class="accueil">
        <div class="accueil-menu">
            <section class="menu">
                <h2>Menu</h2>
                <aside>
                    <article class="menu-detail">
                        menu 1
                    </article>
                    <article class="menu-detail">
                        menu 2
                    </article>
                </aside>
                <aside>
                    <article class="menu-detail">
                        menu 3
                    </article>
                    <article class="menu-detail">
                        menu 4
                    </article>
                </aside>
            </section>
        </div>
        <div class="accueil-carte">
            <section class="carte">
                <h2>Carte</h2>
                <ul>
                    <li>
                        Choix entrées
                    </li>
                    <li>
                        Choix plats
                    </li>
                    <li>
                        Choix desserts
                    </li>
                </ul>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'Carte'
    }
</script>

<style scoped lang="scss">
    .accueil{
        display:flex;
        &-menu,
        &-carte{
            height: 100vh;
             width: 50%;
            text-align: center;
            padding: 30px;
            ul li{
                list-style: none;
            }
            h2 {
                margin-bottom: 40px;
            }
         }
    }
    .menu{
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: space-around;
        height: 100vh;
        aside{
            display: flex;
            width: 100%;
            justify-content: space-around;
        }
        &-detail{
            width: 200px;
            height: 200px;
            background: red;
        }
    }
</style>