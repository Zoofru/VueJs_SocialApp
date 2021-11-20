<script>
import axios from 'axios'

export default {
    name: "FeedPosts",
    props: {
        username: String
    },
    data() {
        return {
            posts: [],
            postOwner:null,
        }
    },
    methods: {
        async getRandomPosts() {
            const res = await axios.get("http://localhost:3001/post/randomposts")
            this.posts = res.data.posts
            this.attachOwnerToPost()
            console.log(res)
        },
        async getPostOwner(id) {
            const res = await axios.get(`http://localhost:3001/user/finduser/${id}`)
            console.log(res);
            return res.data.user
        },
        async attachOwnerToPost() {
            for (let post of this.posts) {
                let owner = await this.getPostOwner(post.userId)
                post.owner = owner.username
                post.ownerAvatar = owner.avatar
            }
        },
        async addFriend(postUserId) {
            const userTwo = localStorage.getItem('uId')
            if(postUserId !== userTwo) {
                const res = await axios.post('http://localhost:3001/friend/new', {
                    userOneId: postUserId,
                    userTwoId: userTwo,

                })
                console.log(res);
            }
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
                    <p id='username'>{{post.owner}}</p>
                </div>
                <div id='right'>
                    <a href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                        </svg>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                        <!-- THIS WILL BE AN ISSUE. (Spam someone with invitations) ALLOW TO SEE ONLY A CERTAIN AMOUNT OF SPARKS, 
                        OR FROM USERS WITH A RESPECTABLE REP -->
                        <a class="dropdown-item" href="#" @click="$emit('invite', $event, post.userId)">Invite User To A Spark</a>
                        <a class="dropdown-item" href="#" @click="this.addFriend(post.userId)">Add Friend</a>
                        <a class="dropdown-item" href="#">Report</a>
                    </div>
                </div>
            </div>
            <div id='post-content'>
                <p>{{post.body}}</p>
            </div>
            <div id='action-icons'>
                <svg id="icons" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
            </div>
        </div>
    </div>
</template>

<style scoped>
#icons {
    margin: 0 1%
}

#action-icons {
    display: flex;
    justify-content: flex-end;
    padding-right: .45vw;
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
    height: 80%;
    border-radius: 5px;
}

#hidden {
    display: none;
}

#post-container {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}

#post:first-of-type {
    margin-top: 7vh;
}

#post {
    width: 80%;
    border-radius: 5px;
    box-shadow: 0px 0px 3px 0px gray;
    background-color: white;
    padding: .5vh 1vw 2vh 1vw; 
    overflow: auto;
}

#post-header {
    display: flex;
    height: 30%;
}

#left, #right {
    width: 50%;
    /* padding-top: 5px; */
    padding-left: 10px;
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

svg:hover {
    cursor: pointer;
}

#post-content {
    width: 100%;
    padding: 0 10px;
    word-wrap: break-word;
}
</style>