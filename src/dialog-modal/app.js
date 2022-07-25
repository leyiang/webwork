import AModal from "./AModal.js";
const { ref, createApp } = Vue;

const app = createApp({
    setup() {
        const show = ref(false);
        const subModal = ref(false);

        function toggle() {
            show.value = ! show.value;
        }

        Vue.onMounted(() => {
            document.querySelector("button").click();
        });

        return {
            show, toggle, subModal
        }
    }
});

app.component( "a-modal", AModal );
app.mount("#app");
