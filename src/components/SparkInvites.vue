<script>
import NotificationBadge from '../components/NotificationBadge.vue'

export default {
    props: {
        invitations: Number
    },
    components: {
        NotificationBadge
    },
}
</script>

<template>
    <div id="root">
        <div id="header">
            <p id="invitation-title">INVITATIONS</p>
            <NotificationBadge v-if="invitations >= 1" v-bind:notifCount=invitations />
        </div>
        <div v-if="invitations >=1" id="container">
            <div id='invite-info'>
                <img id='avatar' src='https://robohash.org/27.115.124.66.png' alt='avatar' />
                <img id='invite-background' src='https://static.vecteezy.com/system/resources/previews/001/849/553/original/modern-gold-background-free-vector.jpg' alt='bg-cover' >
                <p id='title-invite'>hh</p>
            </div>
            <div id='buttons-div'>
                <button id='accept-btn'>Accept Invitation</button>
                <span id='spacer'></span>
                <button id='decline-btn'>&#10006;</button>
            </div>
        </div>
        <!-- ELSE A BOX THAT SAYS NO INVITATIONS YET -->
    </div>
</template>

<style scoped>
#root {
    /* border: 2px solid green */
    width: 59%;
    height: 45vh;
    padding: 3% 0 3% 0;
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
    /* margin: 1.5vh 0 .5vh 0; */
    font-size: 15px;
    margin: 0;
}

#title-invite {
    position: absolute;
    margin: 0;
    top: 75%;
    left: 5%;
    color: white;
    font-weight: bold;
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