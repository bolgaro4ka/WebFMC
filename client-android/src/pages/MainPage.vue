<script setup lang="ts">
import DinamicData from '@/components/DinamicData.vue';
import Phone3D from '@/components/Phone3D.vue';

import { onMounted, onUnmounted, ref } from 'vue'
import { Motion } from '@capacitor/motion'
import { type PluginListenerHandle } from '@capacitor/core';
import ConnectStatus from '@/components/ConnectStatus.vue';
import ConnectWithStation from '@/components/ConnectWithStation.vue';

const accel = ref({ x: 0, y: 0, z: 0, xg: 0, yg: 0, zg: 0, alpha: 0, beta: 0, gamma: 0})
let accelListener: PluginListenerHandle | null = null

onMounted(async () => {
    accelListener = await Motion.addListener('accel', e => {
        accel.value = {
            x: e.acceleration.x,
            y: e.acceleration.y,
            z: e.acceleration.z,
            xg: e.accelerationIncludingGravity.x,
            yg: e.accelerationIncludingGravity.y,
            zg: e.accelerationIncludingGravity.z,
            alpha: e.rotationRate.alpha,
            beta: e.rotationRate.beta,
            gamma: e.rotationRate.gamma,
        }
    })
})

onUnmounted(() => {
    accelListener?.remove()
})

</script>

<template>
    <ConnectStatus/>
    <ConnectWithStation/>
    <Phone3D
        :xg="accel.xg"
        :yg="accel.yg"
        :zg="accel.zg"
        :alpha="accel.alpha"
        :beta="accel.beta"
        :gamma="accel.gamma"
    >
    </Phone3D>
    <DinamicData
        :xg="accel.xg"
        :yg="accel.yg"
        :zg="accel.zg"
        :x="accel.x"
        :y="accel.y"
        :z="accel.z"
        :alpha="accel.alpha"
        :beta="accel.beta"
        :gamma="accel.gamma">
    </DinamicData>
</template>