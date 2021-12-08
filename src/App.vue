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

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--main-color-blue);
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: white;
}

body {
  padding-bottom: 50px;
  margin: 0px;
  background-color: #f5f5f5;
}
</style>
