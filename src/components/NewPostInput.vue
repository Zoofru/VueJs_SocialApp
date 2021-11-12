<script setup>
defineProps({
    username: String
})
</script>


<template>      
    <div id='new-post'>
        <div id='accounticon'>
          <img id='new-post-accounticon' src='https://i.imgur.com/EW2PaMZ.jpg' alt='account-icon' />
        </div>
        <input id="new-post-input" placeholder="Whats happening?" type='text' spellcheck="false" autocomplete="false" />
        <div id='submitBtn'>
            <button id='submitSpark'>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" class="bi bi-send" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>



input {
    width: 80%;
    height: 97%;
    border: none;
    font-size: x-large;
}

input:focus {
    outline: none !important;
}

#new-post {
  height: 7vh;
  width: 80%;
  background-color: white;
  border-radius: 15px;
  box-shadow: 0px 0px 10px 1px rgba(128, 128, 128, .3);
  display: flex;
  justify-content: space-between;
}

#new-post-accounticon {
  height: 100%;
  float: left;
  width: 50%;
  height: 65%;
  border-radius: 5px;
}

#accounticon {
  display: flex;
  justify-content: center;
  width: 10%;
  align-items: center;
}

#submitBtn {
    width: 10%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-right: 10px;
}

#submitSpark {
    color: white;
    background-color: #0165fc;
    border: none;
    height: 60%;
    width: 50%;
    border-radius: 10px;
    font-family: 'Inter', sans-serif;
    font-size: large;
    padding-top: 5px;
}
</style>