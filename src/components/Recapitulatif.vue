<template>
  <div>
    <h1>Recapitulatif de la commande</h1>
    <button @click="back">Back</button>
    <ul>   
    <li v-for='item in items'>
        {{item.name}} {{item.quantity}}  <button @click="deleteDish">Supprimer</button>
    </li>    
    </ul>
    <button @click="validateOrder">Valider la commande</button>
    <button @click="deleteOrder">Supprimer la commande</button>
  </div>
</template>

<script>

export default {
  name: 'Recapitulatif',
  components: {
  },
  props: {
  },
  mounted () {
    console.log('Recapitulatif mounted')
  },
  data () {
    return {
      items:
      [{name: 'Quinoa', quantity: '2', amount: '0'},
      {name: 'Riz', quantity: '3', amount: '0'}]
    }
  },
  watch: {
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    validateOrder () {
      console.log('order validated')
    },
    deleteDish () {
      console.log('dish deleted')
    },
    deleteOrder () {
      console.log('orderdeteled : todo lien vers le store')
    }
  },
  computed: {
  }
}
</script>

<style scoped>

h1 {
  color: green;
  text-align: center;
}

</style>
