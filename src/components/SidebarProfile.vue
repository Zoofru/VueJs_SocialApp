<script>
export default {
    name: 'SidebarProfile',
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    data() {
        return {
            sidebarTabs: ['Lasting Marks', 'Tags Achieved',  'Liked', 'Sparks', 'Respect']
        }
    }
}
</script>

<template>
    <div id='root'>
        <div id='bar'>
            <div id='tab' v-for="(tab, index) in this.sidebarTabs" :key=index>
                <!-- <p id='title'>{{tab}}</p> -->
                <p id='title' class='lasting-marks' v-if="tab == 'Lasting Marks'">{{tab}}</p>
                <p id='title' v-else-if="tab == 'Tags Achieved'">{{tab}}</p>
                <div id='tab-content' v-else-if="tab == 'Liked'">
                    <p id='title'>{{tab}}</p>
                    <p id='num' v-if="this.user !== null">{{this.user.receivedLikes}}</p>
                </div>
                <div v-else-if="tab == 'Sparks'">
                    <p id='title'>{{tab}}</p>
                    <p id='num' v-if="this.user !== null">{{this.user.sparksAchieved}}</p>
                </div>
                <div v-else-if="tab == 'Respect'">
                    <p id='title'>{{tab}}</p>
                    <p id='num' v-if="this.user !== null">{{this.user.respectEarned}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#root {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    border-radius: 5px;
    height: 100%;
}

#tab-content {
    height: 5%;
}

#title.lasting-marks {
    margin-top: 2vh;
}

#edit-profile {
    background-color: var(--main-color-blue);
    color: white;
    border: none;
    border-radius: 5px;
    width: 75%;
    height: 4vh;
    margin: 7% 0 40% 0;
}

#edit-profile:hover {
    color: var(--main-color-blue);
    cursor: pointer;
    border: 1px solid var(--main-color-blue);
    background-color: white;
}

#num {
    color: var(--main-color-blue);
    font-size: 22px;
    margin: 0;
}

#bar {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    background-color: white;
    width: 100%;
    height: 45%;
    background-color: rgba(0, 0, 0, .6);

}

#tab {
    margin: 3%;
    height: 30%;
    padding-left: 3%;
}

#title {
    margin: 10px;
    font-size: 16px;
    margin-bottom: 0;
    margin-left: 0;
    color: white;
}


</style>