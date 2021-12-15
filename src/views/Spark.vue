<script>
import Nav from '../components/Nav.vue'
import SideTabs from '../components/SideTabs.vue'
import SparkUserCard from '../components/SparkComponents/SparkUserCard.vue'
import UserCard from '../components/UserCard.vue'
import axios from 'axios'

export default {
    props: {
        id: String
    },
    components: {
        Nav,
        SideTabs,
        UserCard,
        SparkUserCard
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    data() {
        return {
            spark: null,
            otherUser:null,
            message:null,
            type:null,
            videourl:null,
            imageurl:null,
            allSparkMessages:null,
            lastMessageSent:null
        }
    },
    methods: {
        async getSpark() {
            const res = await axios.get(`${import.meta.env.VITE_API}/spark/get/${parseInt(this.$route.query.id)}`)
            this.spark = res.data.spark
        },
        async getUser() {
            if(this.user.id === this.spark.userOneId) {
                const res = await axios.get(`${import.meta.env.VITE_API}/user/finduser/${this.spark.userTwoId}`)
                this.otherUser = res.data.user
            } else {
                const res = await axios.get(`${import.meta.env.VITE_API}/user/finduser/${this.spark.userOneId}`)
                this.otherUser = res.data.user
            }
        },
        async handleSubmit() {
            const res = await axios.post(`${import.meta.env.VITE_API}/spark/message/new`, {
                sparkId: this.spark.id,
                message: this.message,
                messageOwnerId: this.user.id,
                type: this.type,
                videourl: this.videourl,
                imageurl: this.imageurl
            })
            this.message = null
            this.socket()
        },
        async getAllSparkMessages() {
            const res = await axios.get(`${import.meta.env.VITE_API}/spark/messages/all/${parseInt(this.$route.query.id)}`)
            this.allSparkMessages = res.data.messages
            this.lastMessageSent = res.data.messages[res.data.messages.length - 1].createdAt
        },
    },
    watch: {
        user() {
            this.getUser()
            // let longPoll = setInterval(() => {
            //     this.getAllSparkMessages()
            // }, 200)
        }
    },
    created() {
        this.getSpark()
        this.getAllSparkMessages()
    },
}
</script>

<template>
    <div>
        <Nav />
        <div id='page-root'>

            <div id='left'>
                <div id='tabs'>
                    <SideTabs />
                </div>

                <div id='user-card'>
                    <SparkUserCard :user=this.otherUser side="right" />
                </div>
            </div>

            <div id='center'>
                <h3>Question Title</h3>
                <div id='chat'>
                    <div id='chat-content'>
                        <div id='message-chat' v-for="(msg, index) in this.allSparkMessages" :key=index>
                            <div v-if='this.user !== null'>
                                <div id='message-container'>
                                    <div id='message-current-user' v-if="msg.messageOwnerId == this.user.id">
                                        <p id='message'>{{msg.message}}</p>
                                    </div>
                                </div>

                                <!-- TODO: PUT WHAT TIME LAST MESSAGE WAS SENT -->
                                <div id='time' v-if="Math.abs(new Date() - this.lastMessageSent) / (1000 * 30 * 24)">
                                    <p>{{new Date().toDateString()}}</p>
                                </div>

                                <div id='other-user-message-container' v-if="msg.messageOwnerId !== this.user.id">
                                    <div id='message-other-user' >
                                        <p id='message-other-user-p'>{{msg.message}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id='input'>
                        <input 
                        id='message-input' 
                        placeholder="Message..." 
                        v-model='message' 
                        type="text" 
                        spellcheck="off"
                        autocomplete="off"
                    />

                    <button id='send-btn' @click='this.handleSubmit'>Send</button>
                    </div>
                </div>
            </div>

            <div id='right'>
                <div id='user-card'>
                    <SparkUserCard :user=this.user side="left" />
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

#user-card {
    width: 80%;
    height: 20%;
}

#other-user-message-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 4%;

}

#message-other-user {
    background-color: lightgray;
    width: 30%;
    padding: .5%;
    width: 40%;
    margin: 1% 0;
    border-radius: 10px; 
}

#message-other-user-p {
    margin: 0;
    padding: 0 2%;
    height: fit-content;
}

#message-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
}

#message {
    margin: 0;
    padding: 0 2%;
    color: white;
    height: fit-content;
}

#message-current-user {
    background-color: var(--main-color-blue);
    width: 30%;
    padding: .5%;
    width: 40%;
    margin: 1% 4%;
    border-radius: 10px;
}

#send-btn {
    border: 1px solid var(--main-color-blue);
    background-color: var(--main-color-blue);
    color: white;
    width: 15%;
    height: 50%;
    margin-left: 5%;
    border-radius: 5px;
}

#send-btn:hover {
    color: var(--main-color-blue);
    background-color: white;
}

#chat-content {
    height: 90%;
    width: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
}

#input {
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

#message-input {
    width: 70%;
    border: 1px solid var(--main-color-blue);
    border-radius: 15px;
    padding: 0 15px;
    height: 45%;
}

#message-input:focus {
    outline: 2px solid var(--main-color-blue);
}

#page-root {
    margin-top: 3%;
    display: flex;
    justify-content: space-between
}

#chat {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;
    width: 80%;
    height: 75vh;
    box-shadow: 0px 0px 3px 2px lightgray;
    border-radius: 5px;
}

#left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
    width: 25%;
}

#center {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#right {
    width: 25%;
    display: flex;
    align-items: flex-end;
}

#tabs {
    display: flex;
    justify-content: flex-end;
    width: 80%;
    height: fit-content;
}
</style>