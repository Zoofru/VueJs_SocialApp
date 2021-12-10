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
        <button id='edit-profile'>Edit profile</button>
        <div id='bar'>
            <div id='tab' v-for="(tab, index) in this.sidebarTabs" :key=index>
                <!-- <p id='title'>{{tab}}</p> -->
                <p id='title' class='lasting-marks' v-if="tab == 'Lasting Marks'">{{tab}}</p>
                <p id='title' v-else-if="tab == 'Tags Achieved'">{{tab}}</p>
                <div id='tab-content' v-else-if="tab == 'Liked'">
                    <p id='title'>{{tab}}</p>
                    <p id='num'>{{this.user.receivedLikes}}</p>
                </div>
                <div v-else-if="tab == 'Sparks'">
                    <p id='title'>{{tab}}</p>
                    <p id='num'>{{this.user.sparksAchieved}}</p>
                </div>
                <div v-else-if="tab == 'Respect'">
                    <p id='title'>{{tab}}</p>
                    <p id='num'>{{this.user.respectEarned}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#root {
    display: flex;
    flex-direction: column;
    justify-content: center;
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
    margin: 7% 0;
}

#edit-profile:hover {
    background-color: white;
    color: var(--main-color-blue);
    cursor: pointer;
    border: 1px solid var(--main-color-blue);
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
    width: 90%;
    height: 100%;
}

#tab {
    margin: 3%;
    height: 30%;
}

#title {
    margin: 10px;
    font-size: large;
    margin-bottom: 0;
    margin-left: 0;
}


</style>