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
        },
        async handleRequest(request, requestIndex, requestAccepted=false) {
            const res = await axios.delete(`http://localhost:3001/friendreq/delete/request/${this.requests[requestIndex].id}`)
            console.log(res)

            let newReq = this.requests.splice(requestIndex, 1)
            this.requests = newReq
            this.requestsLength--


            //TODO: On accept add friend
            if(requestAccepted) {
                const res = await axios.post('http://localhost:3001/friend/new', {
                    userOneId: request.invitedUserId,
                    userTwoId: request.invitingUserId
                })
                console.log(res);
            }
            
            setTimeout(() => {
                this.$emit('rerender')
            }, 200)
        }
    },
    created() {
        this.getFriendReqs()
    }
}
</script>

<template>
    <div id='root'>
        <div id='header'>
            <h1 id='title'>REQUESTS</h1>
            <NotificationBadge id="notif" v-if="this.requests.length > 0" :notifCount=this.requestsLength />
        </div>
        <div id='container' v-if="this.requests.length === 0">
            <p>You Have No Friend Requests</p>
        </div>
        <div id='request' v-for="(request, index) in this.requests" :key='index'>
            <div id='request-header'>
                <img id='request-img' :src=request.invitingUserAvatar :key=request.invitingUserUsername />
                <h1 id='request-info'><span id='name'>{{request.invitingUserUsername}}</span> has requested to add you to their friends</h1>
            </div>
            <div id='request-btn'>
                <button id='acceptbtn' @click=this.handleRequest(request,index,true)>Accept</button>
                <button id='declinebtn' @click=this.handleRequest(request,index) >Decline</button>
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

#request-header {
    display: flex;
    align-items: center;
    justify-content: center;
}

#request-img {
    height: 45px;
    width: 45px;
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
    /* margin-bottom: 1vh; */
    margin-left: 1vw;
    line-height: 2.5vh;
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
    font-size: 17px;
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