<script>
import NotificationBadge from '../components/NotificationBadge.vue'
import axios from 'axios'

export default {
    props: {
        invitations: Array,
    },
    components: {
        NotificationBadge
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    data() {
        return {
            invitingUser:null,
            loggedIn:null,
            componentKey: 0,
        }
    },
    watch: {
        invitations: async function() {
            if(this.invitations !== undefined && this.invitations[0] !== undefined) {
                const res = await axios.get(`${import.meta.env.VITE_API}/user/finduser/${this.invitations[0].invitingUser}`)
                if(res.data.user){
                    this.invitingUser = res.data.user
                }
                console.log(this.invitingUser);
            }
        },
    }, methods: {
        async deleteInvitation(dnds) {
            // delete spark invite
            //dnds = Do Not Delete Spark for Backend
            if(this.invitations.length >= 1) {
                if(dnds) {
                    const res = await axios.delete(`${import.meta.env.VITE_API}/invitations/deleteinvitation/${this.invitations[0].id}/${this.invitations[0].invitingUser}/${this.invitations[0].invitedUser}/dnds`)
                    console.log(res);
                    this.invitations.shift()
                } else {
                    const res = await axios.delete(`${import.meta.env.VITE_API}/invitations/deleteinvitation/${this.invitations[0].id}/${this.invitations[0].invitingUser}/${this.invitations[0].invitedUser}/d`)
                    console.log(res);
                    this.invitations.shift()
                }
            }
        },
        async setUser() {
            //set Inviting user to be used in decline clicked and creating a new spark
            if(this.invitations[0] !== undefined) {
                const res = await axios.get(`${import.meta.env.VITE_API}/user/finduser/${this.invitations[0].invitingUser}`)
                if(res.data.user){
                    this.invitingUser = res.data.user
                }
                console.log(this.invitingUser);
            }
        },
        async activateSpark(sparkId) {
            const res = await axios.put(`${import.meta.env.VITE_API}/spark/activate`, {
                id: sparkId
            })
            console.log(res);
        },
        declineClicked() {
            this.deleteInvitation()
            this.setUser()
            setTimeout(() => {
                this.$emit('rerender')
            }, 200)
        },
        acceptSparkInvite(sparkId) {
            //invite is accepted
            this.$router.push({path: `/spark`, query: {id: sparkId}})
            this.deleteInvitation(true)
            this.activateSpark(sparkId)
            this.setUser()
        }
    },
    mounted() {
        this.setUser()
        if(localStorage.getItem('uId')) {
            this.loggedIn = true
        } else {
            this.loggedIn= false
        }
    }
}

</script>




<template>
    <div id="root" v-if="this.loggedIn">
        <div id="header">
            <p id="invitation-title">INVITATIONS</p>
            <NotificationBadge v-if="invitations.length >= 1" v-bind:notifCount=invitations.length />
        </div>
        <div v-if="invitations.length >=1" id="container" >
            <div id='invite-info' >
                <img id='avatar' v-if="this.invitingUser != null" v-bind:src=this.invitingUser.avatar alt='avatar'/>
                <img id='invite-background' src='https://i.imgur.com/Nn5He8I.jpg' alt='bg-cover' >
                <p id='title-invite' v-if="this.invitingUser != null">{{`${invitations[0].invitationTitle} by ${this.invitingUser.username}`}}</p>
            </div>
            <div id='buttons-div'>
                <button id='accept-btn' @click="this.acceptSparkInvite(invitations[0].sparkId)">Accept Invitation</button>
                <span id='spacer'></span>
                <button id='decline-btn' @click="this.declineClicked()">&#10006;</button> 
            </div>
        </div>
        <div v-else-if="invitations.length === 0 && invitations" id='no-invitations'>
            <p id='no-invitations-p'>There Are No Invitations Yet</p>
        </div>
    </div>
</template>

<style scoped>
#root {
    width: 59%;
    height: 45vh;
    padding: 3% 0 3% 0;
}

#no-invitations {
    background-color: white;
    height: 8vh;
    border-radius: 10px;
    color: lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0px 0px 3px 0px gray;
}

#no-invitations-p {
    color: lightgray;
    margin: 0;
}

#buttons-div {
    display: flex;
    justify-content: space-around;
}

#accept-btn, #decline-btn {
    border: none;
    background-color: #0165fc;
    height: 4.3vh;
    border-radius: 15px;
}

#header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 5px 0px;

    padding-right: 10px;
}

#accept-btn:hover, #decline-btn:hover {
    cursor: pointer;
}

#accept-btn {
    color: white;
    width: 80%;
}

#decline-btn {
    border: 1px solid lightgray;
    width: 20%;
    background-color: transparent;
}

#spacer {
    width: 20%;
}

#invite-info {
    height: 90%;
    position: relative
}

#invitation-title {
    font-size: 15px;
    margin: 0;
}

#title-invite {
    position: absolute;
    margin: 0;
    top: 70%;
    padding: 0 5% 3% 5%;
    color: white;
    font-weight: bold;
    text-align: center;
}

#avatar {
    position: absolute;
    width: 25%;
    border-radius: 10px;
    border: 2px solid white;
    background-color: white;
    margin-top: 2%;
    margin-left: 2%;
}

#invite-background {
    height: 93%;
    width: 100%;
    border-radius: 10px;
}

#container {
    height: 80%;
    background-color: white;
    border-radius: 15px;
    width: 100%;
    box-shadow: 0px 0px 10px 1px rgba(128, 128, 128, .3);
    padding: 10px 10px 25px 10px;
}
</style>