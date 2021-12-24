<script>
import axios from 'axios'

export default {
    name: "ChangeProfileBackground",
    data() {
        return {
            url:null
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    methods: {
        async handleSubmit() {
            const res = await axios.put(`${import.meta.env.VITE_API}/user/update/profilebackground`, {
                id: this.user.id,
                profileBackground: this.url
            })
            console.log(res)
            this.url = null
        },
        confirmLinkValid() {
            const extension = this.url.split('').splice(this.url.length - 4, 4).join('')
            if(extension === '.jpg' || extension === 'jpeg' || extension === '.png' || extension ==='.gif' || extension === 'gifv') {
                this.handleSubmit()
            } else {
                // Send user an error as feedback for invalid file type
                console.log('not valid');
            }
        }
    }
}
</script>

<template>
    <div id='profile-background-settings'>
        <h3>Change Profile Background</h3>
        <p>
            Enter a link to a gif or an image.<br/>
            It will be the background of your profile.
        </p>
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">Background URL</span>
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
        <button class='submitBtn' type="submit" @click='this.confirmLinkValid()'>Submit</button>
    </div>    
</template>

<style scoped>
#profile-background-settings {
    width: 50%;
    margin-bottom: 5%;
}

.submitBtn {
    color: white;
    background-color: var(--main-color-blue);
    border: none;
    border-radius: 5px;
    width: 20%;
    height: 3vh;
    margin-top: 1vh;
}

.submitBtn:hover {
    cursor: pointer;
    background-color: white;
    color: var(--main-color-blue);
    border: 1px solid var(--main-color-blue);
}

</style>