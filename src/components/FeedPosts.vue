<script>
import axios from 'axios'
import moment from 'moment'
import UserTag from './UserTag.vue'
import ReportModal from'./ReportModal.vue'

export default {
    name: "FeedPosts",
    components: {
        UserTag,
        ReportModal
    },
    data() {
        return {
            posts: [],
            postOwner:null,
            allTags: [],
            testOwner: {}
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    methods: {
        async getRandomPosts() {
            const res = await axios.get(`${import.meta.env.VITE_API}/post/randomposts`)
            this.posts = res.data.posts
            this.attachOwnerToPost()
        },
        async getPostOwner(id) {
            const res = await axios.get(`${import.meta.env.VITE_API}/user/finduser/${id}`)
            return res.data.user
        },
        async deletePost(postId,index) {
            const res = await axios.delete(`${import.meta.env.VITE_API}/post/delete/post/${postId}`)

            this.clearDeleteElements(index)
            document.querySelector(`.pos-${index}`).style.backgroundColor = 'gray'
        },
        // adds style and selection when deleting post
        handleDeleteStyle(postId, index) {
            document.querySelector(`.pos-${index}`).style.backgroundColor = 'lightgray'
            const elements = document.querySelectorAll(`#pos-${index}`)
            for(let el of elements) {
                el.style.display = 'block'
            }
        },
        // clear style elements
        clearDeleteElements(index) {
            const elements = document.querySelectorAll(`#pos-${index}`)
            document.querySelector(`.pos-${index}`).style.backgroundColor = 'white'
            for(let el of elements) {
                el.style.display = 'none'
            }
        },
        async attachOwnerToPost() {
            for (let post of this.posts) {
                let owner = await this.getPostOwner(post.userId)
                post.owner = owner
                post.ownerAvatar = owner.avatar
            }
        },
        async addFriendRequest(invitedUserID, invitedUsername) {
            const invitingUserID = localStorage.getItem('uId')
            if(invitedUserID !== invitingUserID) {
                const res = await axios.post(`${import.meta.env.VITE_API}/friendreq/new`, {
                    invitedUID: invitedUserID,
                    invitingUID: invitingUserID,
                    invitedUserName: invitedUsername,
                    invitingUserName: this.user.username,
                    avatar: this.user.avatar
                })
            }
        },
        convertToTimePassed(date) {
            return moment(date).fromNow()
        },
        linkToProfile(username) {
            this.$router.push({path: "/profile", query: { user: username}})
        },
        test(owner) {
            console.log(owner)
            this.testOwner = owner
        }
    },
    created() {
        this.getRandomPosts()
    }
}
</script>

<template>
    <div id='post-container'>
        <p class='disclaimer'>The website is currently under construction there are some parts that will not be functional: search bar at the top of the page, Most profile tabs, ande the finish spark button in a created spark. All are known issues.</p>
        <div id='post' v-for="(post, index) in this.posts" :key="index" :class="[`pos-${index}`]">
            <div id='post-header' v-if="post.owner">       
                <div id='left'>
                    <img id='avatar' v-bind:src=post.ownerAvatar alt='avatar' />
                    <div id='username-timeago'>
                        <p id='username' @click="this.linkToProfile(post.owner.username)">{{post.owner.username}}</p>
                        <p id='timeago'>{{this.convertToTimePassed(post.createdAt)}}</p>
                    </div>
                    <UserTag :userId=post.owner.id />
                </div>
                <a role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                    <svg id="dot-menu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                </a>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <!-- THIS WILL BE AN ISSUE. (Spam someone with invitations) ALLOW TO SEE ONLY A CERTAIN AMOUNT OF SPARKS, 
                    OR FROM USERS WITH A RESPECTABLE REP -->
                    <a class="dropdown-item" @click="this.addFriendRequest(post.userId, post.owner.username)" v-if="this.user.username !== post.owner.username">Add Friend</a>
                    <a class="dropdown-item" v-if="this.user.username !== post.owner.username" @click="this.test(post.owner)" data-bs-toggle="modal" data-bs-target="#report-modal">Report</a>
                    <a class="dropdown-item" v-if="this.user.super || post.owner.username === this.user.username" @click="this.handleDeleteStyle(post.id, index)">Delete</a>
                    
                </div>
            </div>

            <!-- POST BODY  /  CONTENT -->
            <div id='post-content'>
                <p id='post-text'>{{post.body}}</p>
                <div id='postimage-container'>
                    <img id='postimage' v-if="post.imagesrc !== null" v-bind:src=post.imagesrc />
                    <video class='video' controls width='400px' v-if="post.videourl !== null && post.type === 'video' ">
                        <source v-bind:src=post.videourl type="video/mp4">
                        <source v-bind:src=post.videourl type="video/webm">
                        <source v-bind:src=post.videourl type="video/ogg">
                    </video>
                    <div id='iframe-div'>
                        <iframe v-if="post.videourl !== null && post.type === 'youtube'"
                            width="560" 
                            height="315" 
                            v-bind:src=post.videourl
                            title="YouTube video player" 
                            frameborder="0" 
                            allowfullscreen>
                        </iframe>
                    </div>
                </div>
                <div class="delete hidden">
                    <button class='hidden decline-del btn btn-danger' :id="[`pos-${index}`]" @click="this.clearDeleteElements(index)">Nevermind</button>
                    <button class='hidden accept-del btn btn-success' :id="[`pos-${index}`]" @click="this.deletePost(post.id, index)">Delete Post</button>
                </div>
            </div>
            <div id='action-icons'>
                <svg id="heart-outline" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
            </div>
        </div>
        <ReportModal :userReported=this.testOwner /> 
    </div>
</template>

<style scoped>
p {
    margin: 0;
}

.disclaimer {
    margin-top: 2%;
}

.iframe-div {
    display: flex;
    justify-content: center;
}
.video {
    height: 70%;
    width: 70%;
    border-radius: 5px;
    margin-top: 5%;
}


.hidden {
    display: none;
}

.delete {
    width: 29%;
    display: flex;
    justify-content: space-between;
    position: absolute;
}

.accept-del {
    background-color: green;
    width: 48%;
}

.decline-del {
    width: 48%;
    background-color: red;
}

#heart-outline {
    margin: 0 1%;
    color: white;
}

.dropdown-item:hover {
    cursor: pointer;
}

.heart {
    color: white;
}

#post-text {
    max-width: 100%;
    height: fit-content;
    padding: 0 2%;
    margin-bottom: 2%;
}

#postimage-container {
    display: flex;
    justify-content: center;
    height: fit-content;
}

#postimage {
    max-height: 450px;
    max-width: 90%;
    border-radius: 10px;
    box-shadow: 0px 0px 1px 0px gray;
}

#heart-outline:hover {
    fill: red;
}

#action-icons {
    display: flex;
    justify-content: flex-end;
    padding-right: .1vw;
}

#timeago {
    margin: 0;
    margin-left: 10px;
    color: gray;
    font-size: 13px;
}

#username-timeago {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
}

#username {
    margin: 0;
    margin-left: 10px;
}

#username:hover {
    cursor: pointer;
}

#avatar {
    width: 2.5vw;
    height: 2vhpx;
    border-radius: 50px;
}

#hidden {
    display: none;
}

#post-container {
    width: 90%;
    display: flex;
    align-items: center;
    flex-direction: column;
}

#post:first-of-type {
    margin-top: 7vh;
}

#post {
    max-width: 100%;
    min-width: 100%;
    width: 100%;
    border-radius: 5px;
    box-shadow: 0px 0px 3px 0px gray;
    background-color: white;
    padding: .5vh .5vw 2vh .5vw; 
    overflow: auto;
    margin-top: 2vh;
}

#post-header {
    display: flex;
    height: fit-content;
}

#left {
    width: 50%;
    height: fit-content;
    display: flex;
    width: 95%;
}

#dot-menu:hover {
    fill: white;
    background-color: gray;
    border-radius: 5px;
}

#post-content {
    width: 100%;
    padding: 2% 0;
    word-wrap: break-word;
}

#heart:hover {
    fill: red;
    background-color: red;
}

svg:hover {
    cursor: pointer;
}

</style>