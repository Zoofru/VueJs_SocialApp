<script setup>
import Nav from '../components/Nav.vue'
import NewPostInput from '../components/NewPostInput.vue'
import SideTabs from '../components/SideTabs.vue'
import UserCard from '../components/UserCard.vue'

</script>

<template>
  <Nav username="ZooFru" wins=5 losses=0 />
  <div id="body">
    <div id='left-body'>
      <UserCard name='Mason Bush' username='MasonBush86' />
      <SideTabs  />
    </div>

    <div id='center-body'>
        <NewPostInput :username='Zoofru'/>
    </div>

    <div id='right-body'>
      <router-link to='/about' exact>about</router-link>
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