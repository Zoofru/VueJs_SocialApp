<script>
import axios from 'axios'

export default {
    name: "UserTag",
    props: {
        userId: Number
    },
    data() {
        return {
            allTags: []
        }
    },
    methods: {
        async getAllTags() {
            const res = await axios.get(`${import.meta.env.VITE_API}/tags/getbyuserid/${this.userId}`)
            this.allTags = res.data.tags
        },
    },
    created() {
        this.getAllTags()
    }
}
</script>

<template>
    <div>
        <p v-for="(tag, index) in this.allTags" :key=index :class="`${tag.tagname} tag-style`" :style="`background-color: ${tag.tagHexColor}`">{{tag.tagname}}</p>    
    </div>
</template>

<style scoped>
div {
    display: flex;
}

.tag-style {
    color: white;
    display: flex;
    justify-content: center;
    flex-direction: row;
    width: fit-content;
    padding: 0 .5vw;
    border-radius: 15px;
    margin: 0 .2vw;
    height: fit-content;
    font-size: 13px;
}
</style>