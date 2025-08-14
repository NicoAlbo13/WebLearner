import { defineStore } from "pinia";
import { computed, ref } from "vue";

//Composition API
export const useCounterState = defineStore('counter', () => {
    const counter = ref(0)

    const increment = () => counter.value++;
    const decrement = () => counter.value--;

    const double = computed(()=> counter.value *2);
    const half = computed(()=> counter.value /2);

    return {
        counter,
        increment,
        decrement,
        double,
        half,
    }

})

//Option API
// export const useCounterState = defineStore('counter', {
//     state: ()=> ({
//         counter: 0
//     }),

//     actions: {
//         increment(){
//             this.counter++
//         },
//         decrement(){
//             this.counter--
//         }
//     },
//     getters: {
//         double: (state) => state.counter * 2,
//         half: (state) => state.counter/2,
//     }
// })