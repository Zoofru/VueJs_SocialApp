<script>
import axios from 'axios'

export default {
    name: 'Login',
    data() {
        return {
            email:null,
            password:null,
            unAuth:false
        }
    },
    methods: {
        async Login() {
            try {
                if(this.email && this.password)  {
                    const res = await axios.post(`${import.meta.env.VITE_API}/user/login`, {
                        email: this.email,
                        password: this.password
                    })
                    if(res.data.user) {
                        this.unAuth = false
                        localStorage.setItem("uId", res.data.user.id)
                        this.$router.push({ name: "Home" })
                    }
                }
            } catch (error) {
                if(error.response.status === 401) {
                    this.unAuth = true
                }
                this.password = ''
            }
        }
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
                    style="text-decoration: none;">
                    <h1>SparkWire</h1>
                </router-link>
            </div>
            <div id="right">
                <p>New to SparkWire?</p>
                <div id="signup-btn-container">
                    <router-link
                        to='/signup'
                        exact
                        style='text-decoration: none; color: white;'>
                        <button id='signup-btn'>
                                Create Account?
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
        <div id="container">
            <h1>Login</h1>
            <form id="login-form" @submit.prevent="Login">
                <input type='text' v-model="email" spellcheck="false" autocomplete="false" placeholder="Email" />
                <input type='password' v-model="password" placeholder='Password' />
                <p v-if="this.unAuth" id="error">Invalid email or password.</p>
                <button id='signin-btn' type='submit'>Sign in</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
p {
    margin: 0;
}

#container {
    margin-top: 10vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#error {
    color: red;
}

#signup-btn-container {
    width: 20%;
}

#login-form {
    display: flex;
    flex-direction: column;
    width: 100%;
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

input {
    margin-top: 2vh;
    width: 20%;
    border: none;
    height: 4vh;
    border-radius: 5px;
    padding-left: 10px;
    box-shadow: 0px 0px 3px 0px gray;
}

#signin-btn {
    margin-top: 2vh;
    width: 10%;
    height: 6vh;
    border: none;
    border-radius: 5px;
    font-size: large;
    background-color: #0165fc;
    box-shadow: 0px 0px 3px 0px gray;
    color: white;
}

#signup-btn {
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

#signup-btn:hover, #signin-btn:hover {
    cursor: pointer;
    background-color: white;
    color: var(--main-color-blue);
    border: 1px solid var(--main-color-blue);
}
</style>