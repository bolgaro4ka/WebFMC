<template>
    <div class="status">
        <div class="status__status"></div>
        <p>Не подключено</p>
    </div>
</template>

<style lang="scss" scoped>
.status {
    background-color: var(--background-form-color);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
    gap: 10px;

    &__status {
        width: 10px;
        height: 10px;
        border-radius: 200px;
        background-color: red;
    }
}
</style>