<script>
export default {
    name: "UserCard",
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    methods: {
        signInCheck() {
            if(localStorage.getItem('uId')) {
                return true;
            }
            return false;
        }
    },
}



</script>

<template>
    <div v-if="this.signInCheck()" id='container'>
        <div id='account-icon'>
            <img v-bind:src=user.avatar alt='account-icon' />
        </div>
    
        <div id='username'>
            <p id='name'>{{user.name}}</p>
            <p id='username-name'>@{{user.username}}</p>
        </div>
    </div>
</template>

<style scoped>
#container {
    display: flex;
    flex-direction: row;
    border-radius: 15px;
    background-color: white;
    width: 60%;
    margin-bottom: 5vh;
    height: 10vh;
    box-shadow: 0px 0px 3px 0px gray;
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
    height: 50%;
    width: 60%;
    border-radius: 15px;
}
</style>