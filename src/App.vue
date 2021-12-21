<script>
</script>

<template>
  <router-view/>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans+Condensed&family=Inter&family=Josefin+Sans&display=swap');
html * {
  font-family: 'Fira Sans Condensed', sans-serif;
  color: #3a4943;
  --main-color-blue: #0165fc;
  
}

::-webkit-scrollbar {
  width: 9px;
  
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: gray;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: lightgray;
}

body {
  padding-bottom: 50px;
  margin: 0px;
  background-color: #f5f5f5;
  height: 0%;
  background-image: url('http://schools.stlucie.k12.fl.us/swc/files/2014/12/snow-transparent.gif');
  background-size: cover;
}
</style>
