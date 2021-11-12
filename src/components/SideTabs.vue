<script setup>

let tabs = ["Home", "People", "Photos", "Feed", "Profile", "Settings"]

</script>

<template>
    <div id='tabBox'>
        <div v-for="(item, index) in tabs" :key="index">
            <div v-if="item == 'Settings'" id='tabSettings'>
                <p v-if="item == 'Settings'" id='tabText-settings'> {{ item }}</p>
                <p v-else id="tabText"> {{ item }} </p>
            </div>

            <div v-else id='tab'>
                <p v-if="item == 'Settings'" id='tabText-settings'> {{ item }}</p>
                <p v-else-if="item == 'Home'" id="tabText"> <router-link to="/" style="text-decoration: none">{{ item }}</router-link></p>
                <p v-else id="tabText"> {{ item }} </p>
                <div id='flex-border'>
                    <div id='border'></div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#tabBox {
    background-color: white;
    border-radius: 15px;
    background-color: white;
    width: 75%;
    box-shadow: 0px 0px 10px 1px rgba(128, 128, 128, .3);
}

#tab {
    height: 100%;
}

#tabSettings {
    border: none;
}

#tabText, #tabText-settings {
    padding: 0 15px;
    margin: 0;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
}

#tab:hover, #tabSettings:hover {
    color: #0165fc;
    background-color: #f5f5f5;
    cursor: pointer;
    border-left: 2px solid #0165fc;
}

#flex-border {
    display: flex;
    justify-content: center;
}

#border {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-width: thin;
    border-bottom: 2px solid rgba(220, 220, 220, .5);
    width: 75%;
}
</style>