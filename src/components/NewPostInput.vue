<script>
import axios from 'axios'

export default {
    name: "NewPostInput",
    data() {
        return {
            text:null
        }
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    methods: {
        signInCheck() {
            if(localStorage.getItem("uId")) {
                return true
            }
            return false
        },
        async handleSubmit() {
            if(this.text !== null) {
                const res = await axios.post(`${import.meta.env.VITE_API}/post/newpost`, {
                    text: this.text,
                    id: localStorage.getItem("uId")
                })
                this.text = null
            }
        }
    }
}
</script>


<template>      
    <div v-if="signInCheck()" id='new-post'>
        <div id='accounticon'>
          <img id='new-post-accounticon' v-bind:src=user.avatar alt='account-icon' />
        </div>
        <input id="new-post-input" v-model="text" v-bind:placeholder="`Whats new, ${user.username}?`" type='text' spellcheck="false" autocomplete="false" />
        <div id='submitBtn'>
            <button id='submitSpark' v-on:click="handleSubmit">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="26" fill="white" class="bi bi-send" viewBox=".5 5 16 16">
                    <path fill-rule="evenodd" d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576 6.636 10.07Zm6.787-8.201L1.591 6.602l4.339 2.76 7.494-7.493Z"/>
                </svg>
            </button>
        </div>
    </div>
</template>

<style scoped>



input {
    width: 80%;
    height: 90%;
    border: none;
    font-size: large;
    resize: none;
}

input:focus {
    outline: none !important;
}

#new-post {
  height: 5vh;
  width: 80%;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 3px 0px gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#new-post-accounticon {
  height: 100%;
  float: left;
  width: 60%;
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
    width: 15%;
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

#submitSpark:hover {
    cursor: pointer;
}
</style>