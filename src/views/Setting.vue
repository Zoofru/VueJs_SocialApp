<script>
import Nav from '../components/Nav.vue'
import UpdateAccountImage from '../components/UpdateAccountImage.vue'
export default {
    components: {
        Nav,
        UpdateAccountImage
    },
    data() {
        return {
            tabs: ["Profile", "Security"]
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
}
</script>

<template>
    <div>
        <Nav />
        <div id='settings-root'>
            <div id='settings-tab-container'>
                <div id="tabs">
                    <div id ='tabs-content' v-for="(tab, index) in this.tabs" :key="index">
                        <div id='tab'>
                            <p>{{tab}}</p>
                            <p id='border'></p>
                        </div>
                    </div>
                </div>
            </div>
            <UpdateAccountImage />
        </div>
    </div>
</template>

<style scoped>
p {
    margin: 0;
    display: flex;
    justify-content: center;
    font-size: x-large;
}

#border {
    border: 1px solid var(--main-color-blue);
    opacity: .4;
}

#settings-root {
    display: flex;
    width: 100%;
    margin-top: 5vh;
}

#settings-tab-container {
    width: 35%;
    display: flex;
    justify-content: flex-end;
}

#tabs {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

#tabs-content {
    width: 50%;
}

#tab {
    border-radius: 10px;
    margin-bottom: 5%;
}

#tab:hover {
    cursor: pointer;
    color: var(--main-color-blue);
    background-color: lightgray;
}
</style>
