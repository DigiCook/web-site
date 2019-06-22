<template>

    <div class="tablette-inner">
        <div class="tablette">
            <div class="camm"></div>
            <div class="size">
                <router-view/>
                <snackbar></snackbar>
            </div>
            <div class="btnHome"></div>

        </div>
    </div>
</template>

<script>
  import Snackbar from '@/components/utils/Snackbar'

  export default {
    name: 'app',
    components: {
      Snackbar
    }
  }
</script>

<style>

    * {
        margin: 0;
        padding: 0;
    }

</style>

<style scoped>
    .tablette-inner {
        display: flex;
        height: 100vh;
    }

    .camm {
        width: 10px;
        height: 10px;
        background-color: #666;
        border-radius: 50%;
    }

    .btnHome {
        width: 35px;
        height: 35px;
        background-color: #EEE;
        border: solid 2px #AAA;
        border-radius: 50%;
    }

    .size {
        width: 1024px;
        height: 768px;
        border: solid .4px black;
        border-radius: 2px;
        overflow: hidden;
    }

    .tablette {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin: auto;
        width: 1200px;
        height: 900px;
        border-radius: 30px;
        border: solid .5px black;
        background-color: white;
    }

</style>
