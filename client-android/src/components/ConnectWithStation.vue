<script setup lang="ts">
import { ref } from 'vue';


const code = ref()

</script>

<template>
    <div>
        <div class="cwc__form">
            <h2>Подключитесь к WebFMC Станции</h2>
            <div class="label-float">
                <input type="text" placeholder=" " v-model="code" inputmode="numeric" />
                <label>Код</label>
            </div>
            <button class="cwc__connect-btn">
                Подключиться
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.cwc__form {
    gap: 10px;
    display: flex;
    padding: 10px 20px;
    flex-direction: column;
    align-items: center;
    h2 {
        text-align: center;
    }

    .label-float {
        width: 100%;
    }
}
</style>