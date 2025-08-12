<script setup>
  import { ref, computed } from 'vue';

  const name = "I am view or Vue?"
  const h2Color = "color: blue"
  const colors = ['red', 'green', 'peru']

  const fruitArray = [
        {
            name: "Apple",
            price: "$1.00",
            description: "One apple",
            stock : 0,
        },
        {
            name: "Pear",
            price: "$2.00",
            description: "One pear",
            stock : 10,
        },
        {
            name: "Orange",
            price: "$3.00",
            description: "One orange",
            stock : 20,
        },
    ];

  const fruitObj = {
          name: "Banana",
          price: "$2.00",
          description: "One Banana",
      }


  const handleClick = (message) => {
    console.log(message);
  }

  const counter = ref(0)

  const increment = () => {
    counter.value++;
  }

  //computed works when is needed to use a reactive value to certain conditions
  const counterColor = computed(()=>{
    if(counter.value === 0){
      return 'black'
    }else if (counter.value > 0){
      return 'green'
    }else{
      return 'red'
    }
  })

  const favNumbers = ref([])

  const addNum = () => {
    favNumbers.value.push(counter.value)
  }

  const validNum = computed(()=>{
    const numberFound = favNumbers.value.find((num)=>num===counter.value)
    return numberFound !== undefined
  }
  )

</script>

<template>

  <h4>Reactive</h4>
  <!-- Two ways of doing 'reactive styling or change a variable depending on a reactive one' -->
  <h5 :style="`color: ${counterColor}`">{{ counter }}</h5>
  <h5 :style="`color: ${counter>0? 'green': 'red'}`">{{ counter }}</h5>
  <button @click="increment">Increment</button>
  <button @click="counter--">Decrement</button>
  <button @click="counter=0">Reset</button>
  <button @click="addNum" :disabled="validNum">Add</button>

  <template v-if="favNumbers.length > 0">
    <h6>Fav Numbers</h6>
    <ul>
      <li
        v-for="num in favNumbers"
        :key="num"
      >
        {{ num }}
      </li>
    </ul>
  </template>

  <h4>Actions</h4>
  <button @click.right.prevent="handleClick('Clicked with Right')">Click Right</button>
  <button @click="handleClick('Clicked with Left')">Click Left</button>
  <button @click.middle="handleClick('Clicked with Middle')">Click Middle</button>

  <hr>

  <h4>Fruit Array</h4>
  <small>v-for and v-if</small>
  <ul>
    <template
      v-for="fruit in fruitArray"
      :key="fruit.name"
    >
      <li
      v-if="fruit.stock > 0"
      >
      {{ fruit.name }} - {{ fruit.price }} ({{ fruit.description }})
    </li>
    </template>

  </ul>

    <hr>
    <h4>Fruit Object</h4>

    <ul>
    <li
      v-for="value, key in fruitObj"
      :key="value"
    >
    {{ key }}: {{ value }}
    </li>
  </ul>

  <hr>
  <h1>Hello {{ name }}</h1>
  <h2 :style="`color: ${colors[2]}`">I am {{ colors[2] }}</h2>


</template>

<style>
h1 {
  color: red;
}

</style>
