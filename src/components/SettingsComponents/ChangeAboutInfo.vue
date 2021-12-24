<script>
import axios from 'axios'
import AutoResizeTextArea from '../AutoResizeTextArea.vue'

export default {
    name: "ChangeAboutInfo",
    components: {
        AutoResizeTextArea
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    data() {
        return {
            aboutInfo: '',
            charcterCount: 150
        }
    },
    methods: {
        async handleSubmit() {
            const res = await axios.put(`${import.meta.env.VITE_API}/user/update/about`, {
                id: this.user.id,
                about: this.aboutInfo
            })
            console.log(res);
            this.aboutInfo = ''
        }
    }
}
</script>

<template>
    <div>
        <div id='content'>
            <h3>Change About Information</h3>
            <p>
                Tell people about yourself.<br/>
                Change your about information on your profile.
            </p>
            <textarea id='textarea' maxlength="150" autocomplete="false" spellcheck="false" v-model="aboutInfo" v-bind:placeholder="`Update Information..`"></textarea>
            <p id='character-count' on>{{this.charcterCount - this.aboutInfo.length}} characters remaining</p>
        </div>
        <button class='submitBtn' type="submit" @click='this.handleSubmit()'>Submit</button>
    </div>
</template>

<style scoped>
#content {
    display: flex;
    flex-direction: column;
}

#textarea {
    width: 50%;
    height: 10vh;
    resize: none;
    padding: 10px;
    border: 1px solid gray;
}

#textarea:focus {
    outline: 2px solid var(--main-color-blue)
}

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
</style>