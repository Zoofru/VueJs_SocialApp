<script>
import axios from 'axios'
import NotificationBadge from './NotificationBadge.vue'

export default {
    name: 'FriendRequests',
    components: {
        NotificationBadge
    },
    data() {
        return {
            requests:[],
            requestsLength:0
        }
    },
    methods: {
        async getFriendReqs () {
            const res = await axios.get(`http://localhost:3001/friendreq/requests/${localStorage.getItem('uId')}`)
            console.log(res);
            if(res.data.request.length > 2) {
                this.requests = res.data.request.slice(0, 2)
            } else {
                this.requests = res.data.request
            }
            this.requestsLength = res.data.request.length
        }
    },
    created() {
        this.getFriendReqs()
        setTimeout(() => {
        }, 200)
    }
}
</script>

<template>
    <div id='root'>
        <div id='header'>
            <h1 id='title'>REQUESTS</h1>
            <NotificationBadge id="notif" v-if="this.requests.length >= 0" :notifCount=this.requestsLength />
        </div>
        <div id='container' v-if="this.requests.length === 0">
            <p>You Have No Friend Requests</p>
        </div>
        <div id='request' v-for="(request, index) in this.requests" :key='index'>
            <h1 id='request-info'><span id='name'>{{request.invitingUserUsername}}</span> wants to add you to their friends</h1>
            <div id='request-btn'>
                <button id='acceptbtn'>Accept</button>
                <button id='declinebtn'>Decline</button>
            </div>
        </div>
    </div>
</template>

<style scoped>

#root {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    width: 70%;
    margin-bottom: 10%;
}

#title:hover {
    cursor: pointer;
}

#notif {
    width: 24px;
    height: 24px;
}

#request {
    background-color: white;
    border-radius: 10px;
    width: 100%;
    padding: 5%;
    justify-content: center;
    align-items: center;
}

#request-info {
    margin-bottom: 1vh;
}

#request-btn {
    height: 5vh;
    display: flex;
    align-items: flex-end;
}

#acceptbtn {
    background-color: #0165fc;
    color: white;
}

#declinebtn {
    margin-left: 5%;
    border: 1px solid lightgray;
    background-color: white;
}

button {
    width: 45%;
    border-radius: 15px;
    border: none;
    height: 75%;
}

button:hover {
    cursor: pointer;
}

#header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

#container {
    background-color: white;
    width: 100%;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    box-shadow: 0px 0px 3px 0px gray;
    align-items: center;
    height: 8vh;
}

#name {
    font-size: 20px;
    font-weight: bold;
}

h1 {
    font-size: 15px;
    margin: 0;
}

P {
    margin: 0;
    color: lightgray;
}
</style>