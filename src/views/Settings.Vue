<script>
import Nav from "../components/Nav.vue"

export default {
    props: {

    },
    components: {
        Nav
    },
    data() {
        return {}
    },
    methods: {}
}
</script>

<template>
    <div>
        <Nav />
        <div>
            <input class="form-control" type="file" id="formFile">
        </div>
    </div>
</template>

<style scoped>
</style>