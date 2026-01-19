<script setup lang="ts">
const props = defineProps<{
    x: number
    y: number
    z: number
    xg: number
    yg: number
    zg: number
    alpha?: number
    beta?: number
    gamma?: number
}>()

</script>

<template>
    <div class="dd">
        <table>
            <tr v-for="value, key in props">
                <td>
                    <p>{{ key }}</p>
                </td>
                <td>
                    <p :class="value?.toString().slice(0, 1) === '-' ? 'negative' : 'positive'">{{
                        value?.toString().slice(0, 4) }}</p>
                </td>
            </tr>
        </table>
    </div>
</template>

<style lang="scss" scoped>
.negative {
    color: red;
}

.positive {
    color: green;
}

table {
    width: 300px;
    table-layout: fixed;
}

td {
    width: 100%;
    padding: 5px 10px;
    border: 1px solid var(--background-header-color);
}

.dd {
    display: flex;
    justify-content: center;
    width: 100%;
}
</style>