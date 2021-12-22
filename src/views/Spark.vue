<script>
import Nav from '../components/Nav.vue'
import SideTabs from '../components/SideTabs.vue'
import SparkUserCard from '../components/SparkComponents/SparkUserCard.vue'
import UserCard from '../components/UserCard.vue'
import AutoResizeTextArea from '../components/AutoResizeTextArea.vue'
import moment from 'moment'
import axios from 'axios'

export default {
    props: {
        id: String
    },
    components: {
        Nav,
        SideTabs,
        UserCard,
        SparkUserCard,
        AutoResizeTextArea
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
            lastMessageSent:null,
            AutoGrowKey: 0
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
        async getAllSparkMessages() {
            const res = await axios.get(`${import.meta.env.VITE_API}/spark/messages/all/${parseInt(this.$route.query.id)}`)
            this.allSparkMessages = res.data.messages
            this.lastMessageSent = res.data.messages[res.data.messages.length - 1]
        },
        scrollToBottom(querySelect) {
            let items = document.querySelectorAll(querySelect)
            items[items.length -1].scrollIntoView(false)
        },
        timeFromNow(date) {
            return moment(date).fromNow()
        },
        removeImage() {
            document.querySelector('#msg-img').src = null
            this.AutoGrowKey += 1
        },
        waitForLoading() {
            const observer = new MutationObserver((mutations, obs) => {
                const lastMessage = document.querySelector('#time')
                if(lastMessage) {
                    document.querySelector('#chat-content').classList.remove('hidden')
                    document.querySelector('.spinner-border').classList.add('hidden')
                    this.scrollToBottom('#time')
                    obs.disconnect()
                    return;
                }
            })

            observer.observe(document, {
                childList: true,
                subtree: true
            })
        }
    },
    watch: {
        user() {
            this.getUser()
            // let longPoll = setInterval(() => {
            //     this.getAllSparkMessages()
            // }, 200)
        },
    },
    created() {
        this.getSpark()
        this.getAllSparkMessages()
    },
    mounted() {
        this.waitForLoading()
    }
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

            </div>

            <div id='center' v-if="this.spark !== null">
                <h3>Question Title</h3>
                <div id='chat'>
                    <div class="spinner-border text-primary" role="status">
                        <span class="sr-only"></span>
                    </div>
                    <div id='chat-content' class='hidden'>
                        <div id='message-chat' v-for="(msg, index) in this.allSparkMessages" :key=index>
                            <div v-if='this.user !== null && this.otherUser !== null'>
                                <div id='message-container'>
                                    <div id='message-current-user' v-if="msg.messageOwnerId == this.user.id">
                                        <p id='message'>{{msg.message}}</p>
                                        <div id='img'>
                                            <img id='msg-img' :src=msg.imageurl v-if="msg.imageurl !== null"/>
                                        </div>
                                    </div>
                                    <p v-if='this.lastMessageSent.id === msg.id && this.user.id === msg.messageOwnerId' id='time'>{{this.timeFromNow(msg.createdAt)}}</p>
                                </div>

                                <div id='other-user-message-container' v-if="msg.messageOwnerId !== this.user.id">
                                    <div id='message-other-user' >
                                        <p id='message-other-user-p'>{{msg.message}}</p>
                                        <div id='img'>
                                            <img id='msg-img' :src=msg.imageurl v-if="msg.imageurl !== null"/>
                                        </div>
                                    </div>
                                    <p v-if='this.lastMessageSent.id === msg.id && this.otherUser.id === msg.messageOwnerId' id='time'>{{this.timeFromNow(msg.createdAt)}}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id='right'>
                <div id='cards'>
                    <!-- PROPS: side = which way image is faction. isSelf = is current user -->
                    <div id='user-card'>
                        <SparkUserCard :propsUser=this.otherUser side="left" :isSelf=false :spark=this.spark />
                    </div>

                    <div id='user-card'>
                        <SparkUserCard :propsUser=this.user side="left" :isSelf=true />
                    </div>
                </div>
            </div>
        </div>
        <div id='msg-inp'>
            <AutoResizeTextArea :spark=this.spark @removeImage="removeImage" :key="this.AutoGrowKey" />
        </div>
    </div>
</template>

<style scoped>
.hidden {
    display: none;
}
#msg-inp {
    background: transparent
}
#img {
    display: flex;
    justify-content: center;
}

#msg-img {
    width: 75%;
    margin-bottom: 2%;
}

#icn {
    width: 100%;
    display: flex;
    justify-content: center;
}

#user-card {
    width: 80%;
    height: 20%;
}

#cards {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

#time {
    margin-top: .5%;
    margin-right: 4%;
}

#other-user-message-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: 4%;
    padding-top: 1,5vh;
}

#message-other-user {
    background-color: lightgray;
    width: 30%;
    padding: .5%;
    width: 60%;
    margin: 1% 0;
    border-radius: 10px; 
    box-shadow: 0px 2px 4px 0px black;
    overflow-wrap: break-word;

}

#message-other-user-p {
    margin: 0;
    padding: 0 2%;
    height: fit-content;
}

#message-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    padding-top: 1.5vh;
    padding-right: 4%;
}

#message {
    margin: 0;
    padding: 0 2%;
    color: white;
    height: fit-content;
    margin-bottom: 2%;
}

#message-current-user {
    background-color: var(--main-color-blue);
    width: 30%;
    padding: .5%;
    width: 60%;
    margin-bottom: 0;
    border-radius: 10px;
    overflow-wrap: break-word;
    box-shadow: 0px 2px 4px 0px black;
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
}

#tabs {
    display: flex;
    justify-content: flex-end;
    width: 80%;
    height: fit-content;
}
</style>