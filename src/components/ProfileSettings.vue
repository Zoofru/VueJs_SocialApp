<script>
import UpdateAccountImage from './UpdateAccountImage.vue'

export default {
    name: "ProfileSettings",
    components: {
        UpdateAccountImage
    },
}
</script>

<template>
    <div id='container'>
        <UpdateAccountImage />
    </div>
</template>

<style scoped>
#container {
    width: 50%;
}
</style>