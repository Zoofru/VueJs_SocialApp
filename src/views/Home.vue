<script>
import Nav from '../components/Nav.vue'
import NewPostInput from '../components/NewPostInput.vue'
import SideTabs from '../components/SideTabs.vue'
import UserCard from '../components/UserCard.vue'
import FeedPosts from '../components/FeedPosts.vue'
import SparkInvites from '../components/SparkInvites.vue'
import SideFriends from '../components/SideFriends.vue'
import FriendRequest from '../components/FriendRequest.vue'
import axios from 'axios'

export default {
  name: "Home",
  components: {
    Nav, 
    NewPostInput,
    SideTabs,
    FeedPosts,
    SparkInvites,
    SideFriends,
    FriendRequest,
    UserCard
  },
  data() {
    return {
      userInvitations: [],
      componentKey: 0,
      friendRequestKey: 0
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
    async inviteUser(evt, invitedUser) {
        const res = await axios.post(`${import.meta.env.VITE_API}/invitations/inviteUser`, {
            invitingUserId: localStorage.getItem("uId"),
            invitedUserId: invitedUser
        })
        console.log(res);
    },
    async getUserInvitations() {
        const res = await axios.post(`${import.meta.env.VITE_API}/invitations/getUserInvitations`, {
            id: localStorage.getItem("uId")
        })
        this.userInvitations = res.data.invitations
    }
  },
  mounted() {
    this.getUserInvitations()
  },
  created() {
    this.$store.dispatch('getUser')
  }
}
</script>

<template>
  <div>
      <Nav v-if="user !== null" :avatar=this.user.avatar />
      <Nav v-else />
      <div id="body">
        <div id='left-body'>
          <UserCard v-if="user !== null" />
          <SideTabs v-if="user !== null" />
          <SparkInvites :invitations=this.userInvitations :key="componentKey" @rerender="componentKey++" />
        </div>

        <div id='spacer'></div>

        <div id='center-body'>
          <NewPostInput v-if="user !== null" />
          <FeedPosts v-if="user !== null" @invite="inviteUser"/>
        </div>

        <div id='right-body'>
          <FriendRequest :key="friendRequestKey" @rerender="friendRequestKey++" />
          <SideFriends v-if="user !== null"/>
        </div>
      </div>
      <!-- <div>Icons made by <a href="https://www.flaticon.com/authors/good-ware" title="Good Ware">Good Ware</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
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
  margin-top: 5vh;
}

#left-body {
  display: flex;
  align-items: flex-end;
  position: fixed;
  width: 25%;
  margin-left: 7vw;
}

#right-body {
  margin-right: 7vw;
  align-items: flex-start;
  width: 30%;
}

#spacer {
  width: 30%;
  margin-left: 7vw;
}

#center-body {
  width: 40%;
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