<script>
export default {
    props: {
        notifCount: Number
    },
}
</script>

<template>
    <div>{{notifCount}}</div>
</template>

<style scoped>
div {
    background-color: red;
    border-radius: 100%;
    padding: 2px 8px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
}
</style>