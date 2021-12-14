<script>
import Nav from '../components/Nav.vue'
import SidebarProfile from '../components/SidebarProfile.vue'
import ProfileNavBar from '../components/ProfileNavBar.vue'
import Posts from '../components/ProfileNavComponents/Posts.vue'

export default {
    name: 'Profile',
    components: {
        Nav,
        SidebarProfile,
        ProfileNavBar,
        Posts
    },
    data() {
        return {
            focusedTab: 'Sparks'
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    watch: {
        user() {
            document.body.style.backgroundImage = `url(${this.user.profileBackgroundImage})`
        }
    },
    methods: {
        focusTab(tab) {
            this.focusedTab = tab
        }
    }
}
</script>

<template>
<!-- 
    TODO: 
    Profile Is not user dependant needs to be fixed. no matter whos profile you try to go to
    it will always be yours 
-->
    <div id='page'>
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
                    <ProfileNavBar @tab='focusTab'/>
                    <Posts v-if="this.focusedTab == 'Posts'" />
                </div>
                <div id='sidebar'>
                    <SidebarProfile />
                </div>
            </div>
        </div>
    </div>    
</template>

<style scoped>
#page {
    height: 100vh;
}

#sidebar {
    width: 20%;
    height: 100%;
}

#profile-avatar {
    width: 20%;
    height: 90%;
    border: 4px solid var(--main-color-blue);
    margin-top: 1%;
    margin-left: 1%;
}

#content {
    display: flex;
    justify-content: center;
    width: 55%;
    background-color: rgba(125, 125, 125, .4);
    padding: 30px 0px 10px 0px;
    padding-left: .7%;
    padding-right: .7%;
}

#profile-content-root {
    display: flex;
    justify-content: center;
    height: 100%;
}

#profile {
    width: 80%;
    display: flex;
    align-items: center;
    flex-direction: column;
    height: 21vh;
}

#profile-content {
    width: 100%;
    display: flex;
    height: 21vh;
    border-radius: 5px;
    background-color: rgba(125, 125, 125, 0);
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

#username, #bio {
    color: white;
}

#username, #fullname {
    margin: 0;
}

#fullname {
    color: gray;
}
</style>