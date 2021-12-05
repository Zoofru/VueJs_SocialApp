<script>
import axios from 'axios'
export default {
    data() {
        return {
            user: this.$store.getters.user,
            newEmail: null,
            pass: null
        }
    },
    methods: {
        async handleSubmit() {
            if(this.user.password === this.pass && this.user.email !== this.newEmail) {
                const res = await axios.put(`${import.meta.env.VITE_API}/user/update/email`, {
                    id: this.user.id,
                    email: this.newEmail
                })
                console.log(res);
                if(res.data.user) {
                    this.sendVerify()
                }
            }
            this.newEmail = null
            this.pass = null
        },
        sendVerify() {
            let templateParams = {
                to_name: this.user.name,
                new_email: this.newEmail,
                send_to: this.user.email,
            }

            emailjs.init(import.meta.env.EMAIL_USER)
            emailjs.send(import.meta.env.EMAIL_SERVICE, 'template_7xhi2uh', templateParams)
        },
    }
}
</script>

<template>  
    <div id="settings-container">
        <h3>Change Email</h3>
        <form id='form' @submit.prevent='handleSubmit'>
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">New Email</span>
                </div>
                    <input 
                        id='avatar-input' 
                        v-model="this.newEmail" 
                        spellcheck="off" 
                        required 
                        type="email" 
                        class="form-control" 
                        aria-label="Default" 
                        aria-describedby="inputGroup-sizing-default"
                    >
            </div>

            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroup-sizing-default">Password</span>
                </div>
                    <input 
                        id='avatar-input' 
                        v-model="this.pass" 
                        spellcheck="off" 
                        required 
                        type="password" 
                        class="form-control" 
                        aria-label="Default" 
                        aria-describedby="inputGroup-sizing-default"
                    >
            </div>
            <button id='submit-btn' type='submit'>Submit</button>
        </form>
    </div>
</template>

<style scoped>
h3 {
    margin-bottom: 2%;
}
#settings-container {
    width: 100%;
    margin-left: 5%;
    margin-top: 5%;
}

#form {
    width: 50%;
}

#submit-btn {
    background-color: var(--main-color-blue);
    color: white;
    border: none;
    border-radius: 5px;
    border: 1px solid var(--main-color-blue);
    width: 25%;
}

#submit-btn:hover {
    background-color: white;
    color: var(--main-color-blue);
    cursor: pointer;
    border: 1px solid var(--main-color-blue);
}
</style>