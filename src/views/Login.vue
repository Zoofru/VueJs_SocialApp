<script setup>

</script>

<template>
    <div>
        <div id="top">
            <div id='left'>
                <h1>SparkWire</h1>
            </div>
            <div id="right">
                <p>New to SparkWire?</p>
                <button id='signup-btn'>
                    <router-link
                        to='/signup'
                        exact
                        style='text-decoration: none; color: white;'>
                        Create Account?
                    </router-link>
                </button>
            </div>
        </div>
        <div id="container">
            <h1>Login</h1>
            <form id="login-form">
                <input type='text' spellcheck="false" autocomplete="false" placeholder="Email" />
                <input type='password' placeholder='Password' />
                <button id='signin-btn' type='submit'>Sign in</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
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
    width: 18%;
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
}
</style>