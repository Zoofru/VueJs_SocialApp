<script>
import ChangePassword from './ChangePassword.vue'
import ChangeEmail from './ChangeEmail.vue'

export default {
    name: "SecuritySettings",
    components: {
        ChangePassword,
        ChangeEmail
    }
}
</script>

<template>
    <div id='container'>
        <ChangePassword />
        <ChangeEmail />
    </div>
</template>

<style scoped>
#container {
    width: 50%;
}
</style>