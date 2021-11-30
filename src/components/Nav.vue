<script>

export default {
    name: 'Nav',
    props: {
        avatar: String
    },
    data() {
        return {}
    },
    methods: {
        signInCheck() {
            if(localStorage.getItem('uId')) {
                return true;
            }
            return false;
        },
        
        logout() {
            localStorage.removeItem("uId")
            location.reload()
        }

    }
}


</script>

<template>
    <div id='nav'>
        <div id="logo">
            <h1> SparkWire </h1>
        </div>
        <div id="infonav">
            <input type='text' autocomplete="false" spellcheck="false" placeholder="Search">
            <button id="login" v-if="!signInCheck()" type="button">
                <router-link 
                    to='/login' 
                    style="text-decoration: none; color: white;">
                    Login
                </router-link>
            </button>
            <button id='logout-btn' v-if="signInCheck()" type="button" @click="logout">
                Logout
            </button>
            <img v-if="signInCheck()" v-bind:src=avatar alt='accountimg'>
        </div>
    </div>
</template>

<style scoped>
#nav {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 8vh;
    border-bottom: 2px solid lightgray;
    background-color: white;
    border-bottom-width: thin;
}

#logo {
    display: flex;
    align-items: center;
    width: 50%;
    margin-left: 20px;
}

#infonav {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 50%;
}

#login {
    margin-right: 20px;
}

#logout-btn:hover{
    background-color: white;
    border: 1px solid gray;
    color: #0165fc;
}

img {
    width: 3vw;
    height: 65%;
    border-radius: 10px;
    margin:auto 10px;
}

button {
    color: white;
    background-color: #0165fc;
    border-radius: 10px;
    border: none;
    width: 10%;
    height: 4vh;
    font-size: large;
}

input {
    width: 40%;
    height: 50%;
    margin-right: 20px;
    border-radius: 10px;
    outline: none !important;
    background-color: #f5f5f5;
    padding: 2px 10px;
    border: none;
}

input:focus {
    outline-color: black;
    border-color: black;
}

button:hover {
    cursor: pointer;
}
</style>