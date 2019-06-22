<template>
    <div class="tablette-inner">
        <div class="maxHeight">
            <router-view/>
            <snackbar></snackbar>
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
    .tablette-inner{
        display: flex;
        height: 100vh;
    }
    .maxHeight {
        margin: auto;
        width: 1024px;
        height: 768px;
    }

</style>
