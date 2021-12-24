<script>
export default {
    nmame: "Link",
    props: {
        link: String,
        cssSelector: String,
    },
    data() {
        return {
            jsonLink: null
        }
    },
    methods: {
        convertToJson() {
            return JSON.parse(this.link)
        }
    },
    created() {
        this.jsonLink = this.convertToJson()
    }
}
</script>

<template>
    <div>
        <a :class='`${this.cssSelector}`' :href='`${this.jsonLink.link}`' target="_blank">{{this.jsonLink.linkTitle}}</a>
    </div>
</template>

<style scoped>
.user {
    color: orange;
    padding-left: 2%;
}

.otheruser {
    color: black;
    padding-left: 2%;
}
</style>