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
                <p id="test">Post</p>
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

#test {
    color: white;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 5px;
}

#new-post {
  height: 5vh;
  width: 90%;
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
    width: 20%;
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
    border-radius: 15px;
    font-family: 'Inter', sans-serif;
    font-size: large;
    padding-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
}

#submitSpark:hover {
    cursor: pointer;
}
</style>