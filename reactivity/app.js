import { ref, watchEffect } from "./reactivity.js";

const a = ref(1);
const b = ref(5);

watchEffect(() => {
    console.log( a.value * b.value );
});

setTimeout(() => {
    a.value = 99;
});