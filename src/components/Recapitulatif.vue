<template>
  <div>
    <h1>Recapitulatif de la commande</h1>
    <button @click="back">Back</button>
    <ul class="liste">   
    <li class="item" v-for='item in items'>
        {{item.name}} <span>Quantité :  {{item.quantity}} </span> <button @click="deleteDish(item.id)">Supprimer</button>
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
      [{name: 'Quinoa', quantity: '2', amount: '0', id: 0},
      {name: 'Riz', quantity: '3', amount: '0', id: 1}]
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
    deleteDish (id) {
      console.log('dish deleted')
      console.log(id)
    },
    deleteOrder () {
      console.log('orderdeteled : todo lien vers le store')
    }
  },
  computed: {
  }
}
</script>

<style scoped lang="scss">

h1 {
  color: green;
  text-align: center;
}
.liste{
  margin: 20px;
}
.item {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  font-size: 30px;
}

</style>
