<template>
    <div class="maxHeight">
        <router-view/>
        <snackbar></snackbar>
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

    #app {
        height: 100%;
        width: 100%;
    }

    .maxHeight {
        height: 100%;

    }

</style>
