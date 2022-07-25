const { ref, watch } = Vue;

export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        }
    },

    setup( props ) {
        const el = ref(null);

        watch(() => props.show, (show, oldVal) =>{
            if( show ) {
                console.log( el.value );
                el.value?.showModal();
            } else {
                el.value?.close();
            }
        });

        return {
            el,
        }
    },

    //language=HTML
    template: `
        <dialog
            ref="el"
        >
            <header>
                <slot name="header"></slot>
            </header>

            <main>
                <slot>This is default Content</slot>
            </main>
            
            <footer>
                <button @click="$emit('close')">Close</button>
                <slot name="footer"></slot>
            </footer>
        </dialog>
    `
}