<script>
import UpdateAccountImage from './UpdateAccountImage.vue'
import ChangeProfileBackground from './SettingsComponents/ChangeProfileBackground.vue'
export default {
    name: "ProfileSettings",
    components: {
        UpdateAccountImage,
        ChangeProfileBackground
    },
}
</script>

<template>
    <div id='container'>
        <UpdateAccountImage />
        <ChangeProfileBackground />
    </div>
</template>

<style scoped>
#container {
    width: 50%;
    padding-left: 3%;
}
</style>