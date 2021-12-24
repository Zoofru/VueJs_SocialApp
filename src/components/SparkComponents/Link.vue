<script>
export default {
    nmame: "Link",
    props: {
        link: String
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
        <a :href='`${this.jsonLink.link}`' target="_blank">{{this.jsonLink.linkTitle}}</a>
    </div>
</template>

<style scoped>
a {
    color: orange;
    padding-left: 2%;
}
</style>