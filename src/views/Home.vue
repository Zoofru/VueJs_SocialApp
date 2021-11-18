<script>
import Nav from '../components/Nav.vue'
import NewPostInput from '../components/NewPostInput.vue'
import SideTabs from '../components/SideTabs.vue'
import UserCard from '../components/UserCard.vue'
import FeedPosts from '../components/FeedPosts.vue'
import SparkInvites from '../components/SparkInvites.vue'
import axios from 'axios'

export default {
  name: "Home",
  components: {
    Nav, 
    NewPostInput,
    SideTabs,
    FeedPosts,
    SparkInvites,
    UserCard
  },
  data() {
    return {
      user:null,
      userInvitations: [],
      componentKey: 0
    }
  },
  methods: {
    async getUser() {
      const res = await axios.get(`http://localhost:3001/user/finduser/${localStorage.getItem("uId")}`)
      if(res.data.user){
        this.user = res.data.user
      }
    },   
    async inviteUser(evt, invitedUser) {
        const res = await axios.post('http://localhost:3001/invitations/inviteUser', {
            invitingUserId: localStorage.getItem("uId"),
            invitedUserId: invitedUser
        })
        console.log(res);
    },
    async getUserInvitations() {
        const res = await axios.post('http://localhost:3001/invitations/getUserInvitations', {
            id: localStorage.getItem("uId")
        })
        this.userInvitations = res.data.invitations
        console.log(res)
    }
  },
  mounted() {
    this.getUser()
    this.getUserInvitations()
  },
}
</script>

<template>
  <div>
      <Nav v-if="user !== null" :avatar=this.user.avatar />
      <Nav v-else />
      <div id="body">
        <div id='left-body'>
          <UserCard v-if="user !== null" :fullname=this.user.name :username=this.user.username :avatar=this.user.avatar />
          <SideTabs  />
          <SparkInvites :invitations=this.userInvitations :key="componentKey" @rerender="componentKey++" />
        </div>

        <div id='center-body'>
            <NewPostInput v-if="user !== null" :avatar=this.user.avatar :username=this.user.username />
            <FeedPosts v-if="user !== null" :username=this.user.username @invite="inviteUser"/>
        </div>

        <div id='right-body'>
        </div>
      </div>
  </div>
</template>

<style scoped>
#body {
  display: flex;
  flex-direction: row;
}


#left-body, #right-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
  /* border: 2px solid red; */
  margin-top: 5vh;
}

#left-body {
  margin-left: 7vw;
  display: flex;
  align-items: flex-end;
}

#right-body {
  margin-right: 7vw;
}

#center-body {
  width: 40%;
  /* border: 2px solid green; */
  display: flex;
  justify-content: center;
  margin-top: 5vh;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>