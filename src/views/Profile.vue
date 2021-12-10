<script>
import Nav from '../components/Nav.vue'
import SidebarProfile from '../components/SidebarProfile.vue'
export default {
    name: 'Profile',
    components: {
        Nav,
        SidebarProfile
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
}
</script>

<template>
    <div>
        <Nav />
        <div id='profile-content-root'>
            <div id='content'>
                <div id='profile'>
                    <div id='profile-content' v-if="this.user !== null">
                        <img id='profile-avatar' v-bind:src='this.user.avatar' />
                        <div id='header-content'>
                            <h1 id='username'>{{this.user.username}}</h1>
                            <h4 id='fullname'>{{this.user.name}}</h4>
                            <p id='bio'>{{this.user.about}}</p>
                        </div>
                    </div>
                </div>
                <div id='sidebar'>
                    <SidebarProfile />
                </div>
            </div>
        </div>
    </div>    
</template>

<style scoped>
#sidebar {
    width: 20%;
    height: 100%;
}

#profile-avatar {
    width: 20%;
    height: 90%;
    border: 2px solid black;
    margin-top: 1%;
    margin-left: 1%;
}

#content {
    display: flex;
    justify-content: center;
    width: 60%;
    background-color: rgba(0, 0, 0, .1);
    box-shadow: 0px 0px 3px 1px black;
}

#profile-content-root {
    display: flex;
    justify-content: center;
    margin-top: 2%;
}

#profile {
    width: 80%;
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 21vh;
}

#profile-content {
    background-color: white;
    width: 100%;
    display: flex;
    height: 21vh;
    border-radius: 5px;
}

#header-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 5%;
}

#bio {
    margin-top: 15%;
}

#username, #fullname {
    margin: 0;
}

#fullname {
    color: gray;
}
</style>