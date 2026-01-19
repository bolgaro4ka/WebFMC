<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    xg: number
    yg: number
    zg: number
    gamma?: number
}>()

const rad2deg = (r: number) => r * 180 / Math.PI

const rotateX = computed(() =>
    rad2deg(
        Math.atan2(
            -props.yg,
            Math.sqrt(props.xg ** 2 + props.zg ** 2)
        )
    )
)

const rotateY = computed(() =>
    rad2deg(
        Math.atan2(
            -props.xg,
            props.zg
        )
    )
)

const rotateZ = computed(() =>
    props.gamma ? props.gamma * 0.3 : 0
)
</script>

<template>
    <div class="scene">
        <div class="phone" :style="{
            transform: `
          rotateX(${rotateX}deg)
          rotateY(${rotateY}deg)
          rotateZ(${rotateZ}deg)
        `
        }">
            <div class="screen"></div>
            <div class="left-side"></div>
        </div>
    </div>
</template>


<style scoped>
.scene {
    width: 100%;
    height: 300px;
    perspective: 900px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.phone {
    width: 120px;
    height: 240px;
    border-radius: 20px;
    background: linear-gradient(145deg, #111, #333);
    box-shadow:
        0 20px 40px rgba(0, 0, 0, 0.4),
        inset 0 0 0 2px #555;
    transform-style: preserve-3d;
    transition: transform 0.06s linear;
}

.screen {
    position: absolute;
    inset: 8px;
    background: linear-gradient(180deg, #222, #000);
    border-radius: 14px;
}

.left-side {
    position: absolute;
    inset: 8px;
    transform: rotateY(90deg);
    border-radius: 14px;
    background-color: red;
}
</style>
