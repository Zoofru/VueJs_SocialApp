<script>
export default {
    name: "UserCard",
    props: {
        fullname: String,
        username: String,
        avatar: String
    },
    methods: {
        signInCheck() {
            if(localStorage.getItem('uId')) {
                return true;
            }
            return false;
        }
    }
}



</script>

<template>
    <div v-if="this.signInCheck()" id='container'>
        <div id='account-icon'>
            <img v-bind:src=avatar alt='account-icon'/>
        </div>
    
        <div id='username'>
            <p id='name'>{{fullname}}</p>
            <p id='username-name'>@{{username}}</p>
        </div>
    </div>
</template>

<style scoped>
#container {
    display: flex;
    flex-direction: row;
    border-radius: 15px;
    background-color: white;
    width: 75%;
    margin-bottom: 5vh;
    height: 10vh;
    box-shadow: 0px 0px 10px 1px rgba(128, 128, 128, .3);
}

#username {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 70%;
}

#username-name {
    color: rgba(128, 128, 128, .7);
}

#name, #username-name {
    margin: 0;
    padding: 0%;
}

#account-icon {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
}

img {
    border: 2px solid red;
    height: 60%;
    width: 60%;
    border-radius: 15px;
}
</style>