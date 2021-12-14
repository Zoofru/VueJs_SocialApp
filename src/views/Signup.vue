<script>
import axios from 'axios'

export default {
    name: "Signup",
    data()
    {
        return {
            email:null,
            password:null,
            username:null,
            fname:null,
            lname:null,
            signupError:false
        }
    },
    methods: {
        async handleSignup() {
            if (this.username && this.password && this.email) {
                const res = await axios.post(`${import.meta.env.VITE_API}/user/signup`, {
                    username: this.username,
                    password: this.password,
                    email: this.email.toLowerCase(),
                    name: this.fname + " " + this.lname,
                    a: false,
                    s: this.username === 'Zero' ? true : false,
                    bm: false,
                    m: false
                })
                console.log(res);
                if(res.data.error) {
                    this.signupError = true
                    this.email = null,
                    this.fname = null,
                    this.lname = null
                } else {
                    this.$router.push({ name: 'Login'})
                }
            }
        },
    }
}
</script>

<template>
    <div>
        <div id="top">
            <div id='left'>
                <router-link
                    to='/'
                    exact
                    style='text-decoration: none;'>
                    <h1>SparkWire</h1>
                </router-link>
            </div>
            <div id="right">
                <p>Already have an account?</p>
                <div id='signup-container'>
                    <router-link
                        to='/Login'
                        exact
                        style='text-decoration: none; color: white;'>
                        <button id='signin-btn'>
                                Sign in
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
        <!-- THIS NEEDS USER FEEDBACK IF EMAIL IS ALREADY
        IN USE -->
        <div id="container">
            <h1>Create Account</h1>
            <form @submit.prevent="handleSignup" id="login-form">
                <input id='su-inp' required type='email' v-model="email" spellcheck="false" autocomplete="false" placeholder="Email *" />
                <div id="name-inp">
                    <input id='firstname' v-model='fname' required type='text' placeholder='First Name *' />
                    <input id='lastname' v-model='lname' required type='text' placeholder='Last Name *' />
                </div>
                <input id='su-inp' required type='text' v-model="username" placeholder='Username *' />
                <p class='req'>Username must be between 4 - 16 characters.</p>
                <input id='su-inp' required type='password' v-model="password" placeholder='Password *' />
                <p class='req'>Password must be atleast 8 characters.</p>
                <p v-if='this.signupError' id=error>There was and error. Please check your information and try again.</p>
                <button id='signup-btn' type='submit'>
                    Sign Up
                </button>
            </form>
        </div>
    </div>
</template>

<style scoped>
p {
    margin: 0;
}

.req {
    margin: 0;
    padding: none;
    width: 100%;
    font-size: small;
}

#error {
    color: red;
}

#container {
    margin-top: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#login-form {
    display: flex;
    flex-direction: column;
    width: 20%;
    justify-content: center;
    align-items: center;
}

#top {
    width: 100%;
    display: flex;
    flex-direction: row;
}

#right, #left {
    width: 50%;
}

#right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding-right: 70px;
}

#left {
    padding-left: 20px;
}

#name-inp {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 2vh;
}

#firstname, #lastname {
    width: 45%;
    box-shadow: 0px 0px 3px 0px gray;
    border: none;
    padding-left: 10px;
    height: 4vh;
    border-radius: 5px;
}

#su-inp {
    margin-top: 2vh;
    width: 100%;
    border: none;
    height: 4vh;
    border-radius: 5px;
    padding-left: 10px;
    box-shadow: 0px 0px 3px 0px gray;
}


#signup-btn {
    margin-top: 2vh;
    width: 40%;
    height: 6vh;
    border: none;
    border-radius: 5px;
    font-size: large;
    background-color: #0165fc;
    box-shadow: 0px 0px 3px 0px gray;
    color: white;
}

#signin-btn {
    width: 100%;
    padding: none;
    margin-top: none;
    height: 4vh;
    border: none;
    border-radius: 5px;
    font-size: large;
    background-color: #0165fc;
    box-shadow: 0px 0px 3px 0px gray;
    color: white;
    margin-left: 20px;
}

#signup-container {
    width: 20%;
}

#signup-btn:hover, #signin-btn:hover {
    cursor: pointer;
    background-color: white;
    color: var(--main-color-blue);
    border: 1px solid var(--main-color-blue);
}

</style>