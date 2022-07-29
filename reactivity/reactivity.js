let activeEffect;
const targetMap = new WeakMap();

function getSubscribersForProperty(target, key) {
    if (!targetMap.has(target)) {
        targetMap.set(target, new Map());
    }

    const effectMap = targetMap.get(target);

    if (!effectMap.has(key)) {
        effectMap.set(key, new Set());
    }

    return effectMap.get(key);
}

function track(target, key) {
    if (activeEffect) {
        const effects = getSubscribersForProperty(target, key);
        effects.add(activeEffect);
    }
}

function trigger(target, key) {
    const effects = getSubscribersForProperty(target, key);
    effects.forEach(effect => effect());
}

export function ref(value) {
    const refObject = {
        get value() {
            track(refObject, 'value');
            return value;
        },

        set value(newValue) {
            value = newValue;
            trigger(refObject, "value");
        }
    }

    return refObject;
}

export function computed(update) {
    const refObject = {
        get value() {
            track(refObject, "value")
            return update()
        },

        set value( newVal ) {
            console.warn("not supported");
        }
    }

    return refObject;
}

export function watchEffect(update) {
    const effect = () => {
        activeEffect = update;
        update();
        activeEffect = null;
    }

    effect();
}