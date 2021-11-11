<script setup>

let tabs = ["Home", "People", "Photos", "Feed", "Profile", "Settings"]

</script>

<template>
    <div id='tabBox'>
        <div  id="tab" v-for="(item, index) in tabs" :key="index">
            <p id='tabText'> {{ item }} </p>
        </div>
    </div>
</template>

<style scoped>
#tabBox {
    background-color: white;
}

#tab {
    border-bottom: 2px solid lightgray;
    background-color: white;
    height: 100%;
}

#tabText {
    padding: 0;
    margin: 0;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

#tab:hover {
    color: #0165fc;
    background-color: #f5f5f5;
    cursor: pointer;
    border-left: 2px solid #0165fc;
}
</style>