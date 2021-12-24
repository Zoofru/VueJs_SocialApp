<script>
import UpdateAccountImage from './UpdateAccountImage.vue'
import ChangeProfileBackground from './SettingsComponents/ChangeProfileBackground.vue'
import ChangeAboutInfo from './SettingsComponents/ChangeAboutInfo.vue'

export default {
    name: "ProfileSettings",
    components: {
        UpdateAccountImage,
        ChangeProfileBackground,
        ChangeAboutInfo
    },
}
</script>

<template>
    <div id='container'>
        <UpdateAccountImage />
        <ChangeProfileBackground />
        <ChangeAboutInfo />
    </div>
</template>

<style scoped>
#container {
    width: 50%;
    padding-left: 3%;
}
</style>