<script>
import Nav from '../components/Nav.vue'
export default {
    components: {
        Nav
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
}
</script>

<template>
    <div>
        <Nav />
        <div id='settings-root'>
            <div id='settings-tab-container'>
                <p>Profile</p>
            </div>
        <div>
                <input class="form-control" type="file" id="formFile">
        </div>
        </div>
    </div>
</template>

<style scoped>
input {
    border: 1px solid black;
}
</style>
