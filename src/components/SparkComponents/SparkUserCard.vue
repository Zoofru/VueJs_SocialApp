<script>
import axios from 'axios'
import ActionRespect from './actionRespect.vue'

export default {
    name:'SparkUserCard',
    components: {
        ActionRespect
    },
    props: {
        side: String,
        propsUser: Object,
        isSelf: Boolean,
        spark: Object,
        key: Number
    },
    data() {
        return {
            respectBool: null,
            allTags: []
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    methods: {
        async addFriendRequest() {
            const res = await axios.post(`${import.meta.env.VITE_API}/friendreq/new`, {
                invitedUID: this.propsUser.id,
                invitingUID: this.user.id,
                invitedUserName: this.propsUser.username,
                invitingUserName: this.user.username,
                avatar: this.user.avatar
            })
        },
        async addRespectToUser() {
            const res = await axios.post(`${import.meta.env.VITE_API}/respect/new`, {
                userWhoReceivedRespectId: this.propsUser.id,
                respectGiverId: this.user.id,
                sparkWhereRespectGiven: this.spark.id
            })
            this.respectBool = true
            this.updateRespect('add')
        },
        async removeRespectFromUser() {
            const res = await axios.delete(`${import.meta.env.VITE_API}/respect/delete/${this.user.id}/${this.spark.id}`)
            console.log(res);
            if(res.data.Destroyed) {
                this.respectBool = false
                this.updateRespect('remove')
            }
        },
        async updateRespect(removeOrAdd) {
            if(res.data.newRespect) {
                const res = await axios.put(`${import.meta.env.VITE_API}/user/update/respect`, {
                    addRemove: removeOrAdd,
                    userId: this.propsUser.id,
                })
            }
        },
        //Get respect table from backend, to check if the user has already 
        //respected other user or is wanting to 'un-respect' them
        async getRespectObj() {
            const res = await axios.get(`${import.meta.env.VITE_API}/respect/getbysparkid/${this.spark.id}/${this.user.id}`)
            if(res.data.respectObj.length > 0) {
                this.respectBool = true
            }
        },
        async getTags() {
            const res = await axios.get(`${import.meta.env.VITE_API}/tags/getbyuserid/${this.propsUser.id}`)
            this.allTags = res.data.tags
        },
    },
    watch: {
        spark() {
            setTimeout(() => {
                this.getRespectObj()
            }, 200)
        },
        propsUser() {
            this.getTags()
        }
    }
}
</script>

<template>
    <div id='root'>
        <div id='flex-container' v-if="this.side === 'left'">
            <div id='container' v-if="this.propsUser !== null">
                <img :src=this.propsUser.avatar />

                <div id='content'>
                    <div id='user-info'>
                        <p id='user-username'>{{this.propsUser.username}}</p>
                    </div>

                    <div id='tag-container'>
                        <p v-for="(tag, index) in this.allTags" :key="index" class='tag-style' :style="`background-color: ${tag.tagHexColor}`">{{tag.tagname}}</p>
                    </div>

                    <div id='icons' v-if="this.isSelf == false">
                        <div id='add-friend' @click="this.addFriendRequest()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0165fc" class="bi bi-person-plus" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                            </svg>

                        </div>

                        <ActionRespect @addRespect="addRespectToUser" @removeRespect="removeRespectFromUser" :respect=this.respectBool />

                        <div id='report'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0165fc" class="bi bi-flag" viewBox="0 0 16 16">
                                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div id='flex-container' v-else-if="this.side === 'right'">
            <div id='container-left' v-if="this.otherUser !== null">
                <div id='content-left'>
                    <div id='user-info-left'>
                        <p id='user-username'>{{this.otherUser.username}}</p>
                    </div>

                    <div id='icons-left'>
                        <div id='add-friend' @click="this.addFriendRequest()">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-plus" viewBox="0 0 16 16">
                                <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                                <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
                            </svg>

                        </div>

                        <div id='respect'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-hand-thumbs-up" viewBox="0 0 16 16" @click="this.addRespectToUser()">
                                <path d="M8.864.046C7.908-.193 7.02.53 6.956 1.466c-.072 1.051-.23 2.016-.428 2.59-.125.36-.479 1.013-1.04 1.639-.557.623-1.282 1.178-2.131 1.41C2.685 7.288 2 7.87 2 8.72v4.001c0 .845.682 1.464 1.448 1.545 1.07.114 1.564.415 2.068.723l.048.03c.272.165.578.348.97.484.397.136.861.217 1.466.217h3.5c.937 0 1.599-.477 1.934-1.064a1.86 1.86 0 0 0 .254-.912c0-.152-.023-.312-.077-.464.201-.263.38-.578.488-.901.11-.33.172-.762.004-1.149.069-.13.12-.269.159-.403.077-.27.113-.568.113-.857 0-.288-.036-.585-.113-.856a2.144 2.144 0 0 0-.138-.362 1.9 1.9 0 0 0 .234-1.734c-.206-.592-.682-1.1-1.2-1.272-.847-.282-1.803-.276-2.516-.211a9.84 9.84 0 0 0-.443.05 9.365 9.365 0 0 0-.062-4.509A1.38 1.38 0 0 0 9.125.111L8.864.046zM11.5 14.721H8c-.51 0-.863-.069-1.14-.164-.281-.097-.506-.228-.776-.393l-.04-.024c-.555-.339-1.198-.731-2.49-.868-.333-.036-.554-.29-.554-.55V8.72c0-.254.226-.543.62-.65 1.095-.3 1.977-.996 2.614-1.708.635-.71 1.064-1.475 1.238-1.978.243-.7.407-1.768.482-2.85.025-.362.36-.594.667-.518l.262.066c.16.04.258.143.288.255a8.34 8.34 0 0 1-.145 4.725.5.5 0 0 0 .595.644l.003-.001.014-.003.058-.014a8.908 8.908 0 0 1 1.036-.157c.663-.06 1.457-.054 2.11.164.175.058.45.3.57.65.107.308.087.67-.266 1.022l-.353.353.353.354c.043.043.105.141.154.315.048.167.075.37.075.581 0 .212-.027.414-.075.582-.05.174-.111.272-.154.315l-.353.353.353.354c.047.047.109.177.005.488a2.224 2.224 0 0 1-.505.805l-.353.353.353.354c.006.005.041.05.041.17a.866.866 0 0 1-.121.416c-.165.288-.503.56-1.066.56z"/>
                            </svg>
                        </div>

                        <div id='report'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16">
                                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"/>
                            </svg>
                        </div>
                    </div>
                </div>
                <img :src=this.otherUser.avatar />
            </div>
        </div> -->
    </div>

</template>

<style scoped>
#root {
    box-shadow: 0px 0px 5px .5px black;
    height: 100%;
    display: flex;
    width: 100%;
    background-color: white;
}


#tag-container {
    display: flex;
    width: 100%;
}

.tag-style {
    margin: 0 2%;
    padding: .5% 4%;
    color: white;
    border-radius: 15px;
    font-size: 14px;
}

#add-friend, #respect, #report {
    border-radius: 5px;
    padding: 2%;
    margin-right: 5%;
    display: flex;
    align-items: flex-end;
}

#flex-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

#add-friend:hover, #respect:hover, #report:hover {
    cursor: pointer;
    background-color: #0165fc69;
}

img {
    width: 35%;
    height: 80%;
    border-radius: 10px;
    margin-left: 5%;
}

#right-img {
    margin-right: 2%;
}

#container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
}

#container-left {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    margin-right: 3%;
    width: 100%;
}

#content-left {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 75%;
    margin-right: 5%;   
}

#user-username {
    margin: 0;
    font-size: 25px;
    padding-top: 10%;
}

#content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 5%;
    width: 75%;
    height: 100%;
}

#user-info-left {
    width: 100%;
    display: flex;
    height: 50%;
    justify-content: flex-end;
}

#user-info {
    width: 100%;
    display: flex;
    height: 50%;
    justify-content: flex-start;
}

#icons-left {
    margin-top: 5%;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: 50%;
}

#icons {
    margin-top: 5%;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 50%;
}

</style>