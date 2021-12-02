<script>
import axios from 'axios'
export default {
    data() {
        return {
            url:null
        }
    },
    methods: {
        async handleAvatarUpdate() {
            const res = await axios.put(`${import.meta.env.VITE_API}/user/update/avatar`, {
                uID: this.$store.getters.user.id,
                avatarLink: this.url 
            })
            console.log(res)
            this.url = null
        }
    }
}
</script>

<template>
    <div class='settings-content'>
        <h3>Update Avatar</h3>
        <p>
            To update your avatar, you currently must copy the URL of the image<br/>
            you would like to use and post the URL here. Click Submit when done.<br/>
            <br/>
            Sorry im poor and not currently renting a file server.
        </p>
        <form id='form' @submit.prevent="this.handleAvatarUpdate()">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">URL</span>
                </div>
                    <input 
                        id='avatar-input' 
                        v-model="this.url" 
                        spellcheck="off" 
                        autocomplete="off" 
                        required 
                        type="text" 
                        class="form-control" 
                        aria-label="Default" 
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Ex: https://i.imgur.com/1OcJq38.jpg"
                    >
            </div>
            <button class='submitBtn' type="submit">Submit</button>
        </form>
    </div>
</template>

<style scoped>
.submitBtn {
    color: white;
    background-color: var(--main-color-blue);
    border: none;
    border-radius: 5px;
    width: 10%;
    height: 3vh;
    margin-top: 1vh;
}

.submitBtn:hover {
    cursor: pointer;
    background-color: white;
    color: var(--main-color-blue);
    border: 1px solid var(--main-color-blue);
}

#avatar-input {
    border: 1px solid black;
    width: 20%;
}

#form {
    display: flex;
    flex-direction: column;
    width: 50%;
}

.settings-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    width: 65%;
    margin-left: 5%;
}
</style>
