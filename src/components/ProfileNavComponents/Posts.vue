<script>
import axios from 'axios'

export default {
    name: "Posts",
    props: {
        user: Object
    },
    data() {
        return {
            posts: []
        }
    },
    methods: {
        async getPosts() {
            const res = await axios.get(`${import.meta.env.VITE_API}/post/user/post/${this.user.id}`)

            if(res.data.posts.length > 10) {
                this.posts = res.data.posts.splice(0, 10)
            } else {
                this.posts = res.data.posts
            }
        }
    },
    watch: {
        user() {
            this.getPosts()
        }
    },
    created() {
        this.getPosts()
    }
}
</script>

<template>
    <div id='root'>
        <div id='post' v-for="(post, index) in this.posts" :key=index>
            <p id='post-body'>{{post.body}}</p>
            <p id='post-likes'>Likes: {{post.likes}}</p>
        </div>
    </div>
</template>

<style scoped>
#root {
    width: 75%;
    margin-top: 5%;
}

#post {
    border: 2px solid white;
    background-color: white;
    border-radius: 5px;
    padding: 1%;
}

#post-likes {
    margin: 0;
}

</style>