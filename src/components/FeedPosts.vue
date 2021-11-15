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
            postOwner:null
        }
    },
    methods: {
        async getRandomPosts() {
            const res = await axios.get("http://localhost:3001/post/randomposts")
            this.posts = res.data.posts
            console.log(res)
        },
        async getPostOwner(id) {
            const res = await axios.get(`http://localhost:3001/user/finduser/${id}`)
            this.postOwner = res.data.user
            console.log(res);
            return
        }
    },
    created() {
        this.getRandomPosts()
    }
}
</script>

<template>
    <!-- * BUGGED *
    HAPPPENING BECAUSE THE GETPOSTOWNER() CALL IS NOT LOOPING IT IS RUNNING ONCE
    GETTING THE OWNER OF THE FIRST POST IN POSTS ARRAY AND ONLY USING THEM FOR
    ALL POSTS. ITS BECAUSE AFTER THE FIRST CALL POSTOWNER IS NO LONGER NULL
    AND IT DOSENT CALL IT ANYMORE. REMOVING IT CAUSES A INFINITE LOOP? 
    
    POSSIBLE SOLUTION: LOOP THROUGH POSTS FIRST AND TURN EACH ITEM INTO A OBJECT 
    WITH THEIR OWNER ALREADY DETERMINED
    -->
    <div id='post-container'>
        <div id='post' v-for="(post, index) in this.posts" :key="index">
            <span id='hidden'>{{this.getPostOwner(post.userId)}}</span>
            <div id='post-header'>
                <div id='left'>
                    <img id='avatar' v-bind:src=this.postOwner.avatar alt='avatar' />
                    <p id='username'>{{this.postOwner.username}}</p>
                </div>
                <div id='right'>
                    <svg v-if="username === this.postOwner.username" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                    </svg>
                </div>
            </div>
            <div id='post-content'>
                <p>{{post.body}}</p>
            </div>
            <div id='action-icons'>
                <svg id="icons" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>

                <svg id="icons" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag" viewBox="0 0 16 16">
                    <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21.294 21.294 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21.317 21.317 0 0 0 14 7.655V1.222z"/>
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
    padding-right: 2.5%;
}

#username {
    margin-left: 10px;
}

#avatar {
    width: 2.5vw;
    height: 90%;
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
    width: 75%;
    border-radius: 5px;
    box-shadow: 0px 0px 3px 0px gray;
    background-color: white;
    margin-top: 1vh;
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