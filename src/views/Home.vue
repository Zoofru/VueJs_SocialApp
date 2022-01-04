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
    UserCard,
  },
  data() {
    return {
      userInvitations: [],
      componentKey: 0,
      friendRequestKey: 0,
      NewPostInputKey: 0,
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  methods: {
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
      <Nav id='nav' />
      <div id="body">
        <div id='left-body'>
          <UserCard v-if="user !== null" />
          <SideTabs v-if="user !== null" />
          <SparkInvites v-if="user !== null" :invitations=this.userInvitations :key="componentKey" @rerender="componentKey++" />
        </div>

        <div id='spacer'></div>

        <div id='center-body'>
          <NewPostInput v-if="user !== null" :key='NewPostInputKey' @rerender='NewPostInputKey++' />
          <FeedPosts />
        </div>

        <div id='right-body'>
          <FriendRequest v-if="user !== null" :key="friendRequestKey" @rerender="friendRequestKey++" />
          <SideFriends v-if="user !== null"/>
        </div>
      </div>
  </div>
</template>

<style scoped>
#body {
  display: flex;
  flex-direction: row;
}

#nav {
  position: fixed;
}

#left-body, #right-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 15vh;
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
  margin-top: 15vh;
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