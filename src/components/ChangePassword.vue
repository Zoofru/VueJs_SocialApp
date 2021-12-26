<script>
import emailjs from 'emailjs-com'
export default {
    data() {
        return {
            user: this.$store.getters.user,
            currentPass: null,
            newPass: null,
            newPassConfirm: null
        }
    },
    methods: {
        // sendVerify() {
        //     let templateParams = {
        //         to_name: this.user.name,
        //         to_email: this.user.email
        //     }

        //     emailjs.init(import.meta.env.EMAIL_USER)
        //     emailjs.send(import.meta.env.EMAIL_SERVICE, 'template_5kmbr1c', templateParams)
        // },
        async handleSubmit() {
            if(this.user.password === this.currentPass && this.newPass === this.newPassConfirm && this.newPass !== null) {
                const res = await axios.put(`${import.meta.env.VITE_API}/user/update/password`, {
                    id: this.user.id,
                    pass: this.newPass
                })
                console.log(res);
                if(res.data.user) {
                    // this.sendVerify()
                }
            }
            this.currentPass = null
            this.newPass = null
            this.newPassConfirm = null
        }
    },
}
</script>

<template>
    <div id='settings-content'>
        <div id='update-password'>
            <h3 id='change-pass-title'>Change Password</h3>

            <!-- CHANGE PASSWORD -->
            <form @submit.prevent="handleSubmit" autocomplete="off" id='form'>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-default">Current Password</span>
                    </div>
                        <input 
                            id='avatar-input' 
                            v-model="this.currentpass" 
                            spellcheck="off" 
                            required 
                            type="password" 
                            class="form-control" 
                            aria-label="Default" 
                            aria-describedby="inputGroup-sizing-default"
                        >
                </div>

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-default">New Password</span>
                    </div>
                        <input 
                            id='avatar-input' 
                            v-model="this.newPass" 
                            spellcheck="off" 
                            required 
                            type="password" 
                            class="form-control" 
                            aria-label="Default" 
                            aria-describedby="inputGroup-sizing-default"
                        >
                </div>

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="inputGroup-sizing-default">Confirm Password</span>
                    </div>
                        <input 
                            id='avatar-input' 
                            v-model="this.newPassConfirm" 
                            spellcheck="off" 
                            autocomplete="off" 
                            required 
                            type="text" 
                            class="form-control" 
                            aria-label="Default" 
                            aria-describedby="inputGroup-sizing-default"
                        >
                </div>
                <button id='submit-btn' type='submit'>Submit</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
#change-pass-title {
    margin-bottom: 2%;
}

#settings-content {
    margin-left: 5%;
    width: 100%;
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

#form {
    width: 50%;
}

</style>