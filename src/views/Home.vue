<script>
import Nav from '../components/Nav.vue'
import NewPostInput from '../components/NewPostInput.vue'
import SideTabs from '../components/SideTabs.vue'
import UserCard from '../components/UserCard.vue'
import {computed, onMounted} from 'vue'
import axios from 'axios'

export default {
  name: "Home",
  components: {
    Nav, 
    NewPostInput,
    SideTabs,
    UserCard
  },
  data() {
    return {
      user:null
    }
  },
  methods: {
    async getUser() {
      const res = await axios.get(`http://localhost:3001/user/finduser/${localStorage.getItem("uId")}`)
      this.user = res.data.user
    }
  },
  mounted() {
    this.getUser()
  },
  created() {
    this.getUser()
  }
}

</script>

<template>
  <div>
      <Nav />
      <div id="body">
        <div id='left-body'>
          <UserCard :fullname=this.user.name :username=this.user.username />
          <SideTabs  />
        </div>

        <div id='center-body'>
            <NewPostInput />
        </div>

        <div id='right-body'>
          <router-link to='/about' exact>about</router-link>
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
  width: 20%;
  border: 2px solid red;
  margin-top: 5vh;
}

#center-body {
  width: 60%;
  border: 2px solid green;
  display: flex;
  justify-content: center;
  margin-top: 5vh;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>