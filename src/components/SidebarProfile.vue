<script>
import axios from 'axios'
import InputModal from './InputModal.vue'

export default {
    name: 'SidebarProfile',
    props: {
        userForProfile: Object
    },
    components: {
        InputModal
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    data() {
        return {
            sidebarTabs: ['Lasting Marks', 'Tags Achieved',  'Liked', 'Sparks', 'Respect']
        }
    },
    methods: {
        async inviteUser(input) {
            const res = await axios.post(`${import.meta.env.VITE_API}/invitations/inviteUser`, {
                invitingUserId: localStorage.getItem("uId"),
                invitedUserId: this.userForProfile.id,
                sparkTitle: input
            })
            console.log(res);
        },
    }
}
</script>

<template>
    <div id='root'>
        <button id='invite-spark-btn' data-bs-toggle="modal" data-bs-target="#invite-modal" >Invite To A Spark</button>
        <div id='bar'> 
            <div id='tab' v-for="(tab, index) in this.sidebarTabs" :key=index>
                <p id='title' class='lasting-marks' v-if="tab == 'Lasting Marks'">{{tab}}</p>
                <p id='title' v-else-if="tab == 'Tags Achieved'">{{tab}}</p>
                <div id='tab-content' v-else-if="tab == 'Liked'">
                    <p id='title'>{{tab}}</p>
                    <p id='num' v-if="this.userForProfile !== null">{{this.userForProfile.receivedLikes}}</p>
                </div>
                <div v-else-if="tab == 'Sparks'">
                    <p id='title'>{{tab}}</p>
                    <p id='num' v-if="this.userForProfile !== null">{{this.userForProfile.sparksAchieved}}</p>
                </div>
                <div v-else-if="tab == 'Respect'">
                    <p id='title'>{{tab}}</p>
                    <p id='num' v-if="this.userForProfile !== null">{{this.userForProfile.respectEarned}}</p>
                </div>
            </div>
        </div>
        <input-modal 
            v-if="this.userForProfile"
            type="invite"
            modalTitle="Invite User" 
            :modalContent="`Make a title for your spark to let ${this.userForProfile.username} know what you want to discuss.`"
            @inputSent="inviteUser"
        />
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

#invite-spark-btn {
    background-color: var(--main-color-blue);
    color: white;
    border: none;
    border-radius: 5px;
    width: 75%;
    height: 4vh;
    margin: 7% 0 40% 0;
    padding: 0 1%;
}

#invite-spark-btn:hover {
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