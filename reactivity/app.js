import { computed, ref, watchEffect } from "./reactivity.js";

const x = ref(0);
const y = ref(0);
const color = ref("pink");

const style = computed(() => ({
    transform: `translate(${x.value}px, ${y.value}px)`,
    color: color.value,
}));

watchEffect(() => {
    console.log( style.value );
});

setTimeout(() => {
    x.value = 25;
    y.value = 99;
    color.value = "skyblue";
});