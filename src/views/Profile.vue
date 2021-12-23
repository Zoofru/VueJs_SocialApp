<script>
import Nav from '../components/Nav.vue'
import SidebarProfile from '../components/SidebarProfile.vue'
import ProfileNavBar from '../components/ProfileNavBar.vue'
import Posts from '../components/ProfileNavComponents/Posts.vue'
import axios from 'axios'

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
            focusedTab: 'Sparks',
            userForProfile: null
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    watch: {
        userForProfile() {
            document.body.style.backgroundImage = `url(${this.userForProfile.profileBackgroundImage})`
        }
    },
    methods: {
        focusTab(tab) {
            this.focusedTab = tab
        },
        async setUserProfile() {
            const res = await axios.get(`${import.meta.env.VITE_API}/user/finduserbyusername/${this.$route.query.user}`)
            this.userForProfile = res.data.user
        }
    },
    created() {
        this.setUserProfile()
    }
}
</script>

<template>
    <div id='page'>
        <Nav />
        <div id='profile-content-root'>
            <div id='content'>
                <div id='profile'>
                    <div id='profile-content' v-if="this.userForProfile !== null">
                        <img id='profile-avatar' v-bind:src='this.userForProfile.avatar' />
                        <div id='header-content'>
                            <h1 id='username'>{{this.userForProfile.username}}</h1>
                            <h4 id='fullname'>{{this.userForProfile.name}}</h4>
                            <p id='bio'>{{this.userForProfile.about}}</p>
                        </div>
                    </div>
                    <ProfileNavBar @tab='focusTab'/>
                    <Posts :user=this.userForProfile v-if="this.focusedTab == 'Posts'" />
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