<script setup>

defineProps({
    username: String,
    wins: String,
    losses: String
})

</script>

<template>
    <div id='nav'>
        <div id="logo">
            <h1> SparkWire </h1>
        </div>
        <div id="infonav">
            <input type='text' autocomplete="false" spellcheck="false" placeholder="Search">
            <button type="button" @click="create()">Create</button>
            <img src="https://i.imgur.com/EW2PaMZ.jpg" alt='accountimg'>
        </div>
    </div>
</template>

<style scoped>
#nav {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 10vh;
    border-bottom: 2px solid lightgray;
    background-color: white;
    border-bottom-width: thin;
}

#logo {
    display: flex;
    align-items: center;
    width: 50%;
    margin-left: 20px;
}

#infonav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 50%;
}

img {
    width: 3vw;
    height: 90%;
    border-radius: 10px;
    margin:auto 10px;
}

button {
    color: white;
    background-color: #0165fc;
    border-radius: 10px;
    border: none;
    width: 10%;
    height: 63%;
    font-size: medium;
}

input {
    width: 40%;
    height: 50%;
    margin-right: 20px;
    border-radius: 10px;
    outline: none !important;
    background-color: #f5f5f5;
    padding: 2px 10px;
    border: none;
}

input:focus {
    outline-color: black;
    border-color: black;
}

button:hover {
    cursor: pointer;
}
</style>