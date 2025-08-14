<script setup>
import { useCounterState } from '@/store/counter';
import { storeToRefs } from 'pinia';

const useCounter = useCounterState()

const {increment, decrement} = useCounter;

const { counter, double, half } = storeToRefs(useCounter);

</script>

<template>
  <main>
    <h1>Home</h1>
    <h2>Counter: {{ counter }}</h2>
    <h2>Double: {{ double }} | Half: {{ half }}</h2>
    <button @click="increment" class="btn btn-outline-danger m-2">+</button>
    <button @click="decrement" class="btn btn-outline-danger m-2">-</button>
  </main>
</template>
