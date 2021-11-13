<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Nav from './components/Nav.vue'
import SideTabs from './components/SideTabs.vue'
import UserCard from './components/UserCard.vue'
import NewPostInput from './components/NewPostInput.vue'
import Home from './views/Home.vue'
</script>

<template>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
html * {
  font-family: 'Inter', sans-serif;
  color: #3a4943;

}

body {
  margin: 0px;
  background-color: #f5f5f5;
}
</style>
