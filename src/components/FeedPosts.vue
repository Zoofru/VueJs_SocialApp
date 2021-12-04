<script>
import axios from 'axios'
import moment from 'moment'

export default {
    name: "FeedPosts",
    data() {
        return {
            posts: [],
            postOwner:null,
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
        async attachOwnerToPost() {
            for (let post of this.posts) {
                let owner = await this.getPostOwner(post.userId)
                post.owner = owner.username
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
        }
    },
    created() {
        this.getRandomPosts()
    }
}
</script>

<template>
    <div id='post-container'>
        <div id='post' v-for="(post, index) in this.posts" :key="index">
            <div id='post-header'>
                <div id='left'>
                    <img id='avatar' v-bind:src=post.ownerAvatar alt='avatar' />
                    <div id='username-timeago'>
                        <p id='username'>{{post.owner}}</p>
                        <p id='timeago'>{{this.convertToTimePassed(post.createdAt)}}</p>
                    </div>
                </div>
                <div id='right'>
                    <a role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                        <svg id="dot-menu" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                        </svg>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <!-- THIS WILL BE AN ISSUE. (Spam someone with invitations) ALLOW TO SEE ONLY A CERTAIN AMOUNT OF SPARKS, 
                        OR FROM USERS WITH A RESPECTABLE REP -->
                        <a class="dropdown-item" @click="$emit('invite', $event, post.userId)">Invite User To A Spark</a>
                        <a class="dropdown-item" @click="this.addFriendRequest(post.userId, post.owner)">Add Friend</a>
                        <a class="dropdown-item">Report</a>
                        <a class="dropdown-item" v-if="this.user.super">Delete Post</a>
                        
                    </div>
                </div>
            </div>
            <div id='post-content'>
                <p id='post-text'>{{post.body}}</p>
                <div id='postimage-container'>
                    <img id='postimage' v-if="post.imagesrc !== null" v-bind:src=post.imagesrc />
                </div>
            </div>
            <div id='action-icons'>
                <svg id="heart-outline" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<style scoped>
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
    max-width: 80%;
    height: fit-content;
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
    padding-right: .45vw;
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
    width: 40px;
    height: 40px;
    border-radius: 5px;
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
    padding: .5vh 1vw 2vh .5vw; 
    overflow: auto;
    margin-top: 2vh;
}

#post-header {
    display: flex;
    height: fit-content;
}

#left, #right {
    width: 50%;
    height: fit-content;
}

#left {
    display: flex;
    align-items: center;
}

#right {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 2%;
}

#dot-menu:hover {
    fill: white;
    background-color: gray;
    border-radius: 5px;
}

#post-content {
    width: 100%;
    padding: 2% 10px 2% 0;
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