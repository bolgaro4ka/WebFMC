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
            <div class="screen">
                <img src="/images/models/phone/screen.png" alt="">
            </div>
            <div class="back">
                <img src="/images/models/phone/back.png" alt="">
            </div>
            <div class="left-side">
                <img src="/images/models/phone/left-side.png" alt="">
            </div>
            <div class="right-side">
                <img src="/images/models/phone/right-side.png" alt="">
            </div>
            <div class="top-side">
                <img src="/images/models/phone/top-side.png" alt="">
            </div>
            <div class="bottom-side">
                <img src="/images/models/phone/bottom-side.png" alt="">
            </div>
            <!-- <div class="axis">
                <div class="y"></div>
                <div class="x"></div>
                <div class="z"></div>
            </div> -->
            
        </div>
    </div>
</template>


<style scoped lang="scss">
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
    transform-style: preserve-3d;
    transition: transform 0.06s linear;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
}

.screen {
    position: absolute;
    width: 120px;
    height: 260px;
    inset: 8px;

    
}

.back {
    position: absolute;
    width: 120px;
    height: 260px;
    inset: 8px;
    transform: rotateY(180deg) translateZ(10px);
}

.left-side {
    position: absolute;
    width: 10px;
    height: 260px;
    inset: 8px;
    transform: rotateY(-90deg) translateZ(5px) translateX(-5px);
}

.right-side {
    width: 10px;
    height: 260px;
    position: absolute;
    inset: 8px;
    transform: rotateY(90deg) translateX(5px) translateZ(115px);
}

.top-side {
    position: absolute;
    width: 120px;
    height: 10px;
    inset: 8px;
    transform: rotateX(90deg) translateY(-8px) translateZ(5px);
}

.bottom-side {
     width: 120px;
    height: 10px;
    position: absolute;
    inset: 8px;
    transform: rotateX(-90deg) translateY(2px) translateZ(255px);
}




</style>
