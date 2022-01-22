export default {
    mode: {
        easy: {
            size: 50,
            mine: 10,

            col: 10,
            row: 8,
        },

        middle: {
            size: 40,
            mine: 40,

            col: 18,
            row: 14,
        },

        hard: {
            size: 34,
            mine: 99,

            col: 24,
            row: 20,
        }
    },

    color: {
        grass: {
            light: "#aad751",
            dark: "#a2d149",
            hover: "#bfe17d",
        },
        ground: {
            hover: "#f5d1b0",
            light: "#e5c29f",
            dark: "#d7b899",
        },

        text: [
            "",
            "#1976d2",
            "#388e3c",
            "#d32f2f",
            "#8631a1"
        ],

        mine: {
            bg: ["#b648f2", "#008744", "#4885ed", "#48e6f1", "#f4c20d"],
            front: ["#762f9d", "#00582c", "#2f569a", "#2f969d", "#9f7e08"]
        }
    },
};