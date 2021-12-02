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
        <div id='input'>
            <div id='accounticon'>
                <img id='new-post-accounticon' v-bind:src=user.avatar alt='account-icon' />
            </div>
            <input id="new-post-input" v-model="text" v-bind:placeholder="`Whats new, ${user.username}?`" type='text' spellcheck="false" autocomplete="false" />
        </div>
        <div class='border'></div>
        <div id='icons'>
            <div id='submitBtn'>
                <div class='btn-group'>
                    <button type="button" class="btn btn-primary" v-on:click="handleSubmit">Post</button>
                    <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                        <span class="visually-hidden">Toggle Dropdown</span>
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item">Full Editor</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
input {
    width: 80%;
    height: 40%;
    border: none;
    font-size: x-large;
    resize: none;
}

input:focus {
    outline: none !important;
}

svg:hover {
    cursor: pointer;
    fill: var(--main-color-blue);
}

.dropdown-item:hover {
    cursor: pointer;
}

.border {
    border: 1px solid var(--main-color-blue) !important;
    width: 95%;
    margin-bottom: 10px;
    opacity: .3;
}

#input {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8vh;
    margin-top: 10px;
    margin-bottom: 10px;
}

#icons {
    width: 100%;
    margin-left: 2vw;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    height: fit-content;
    margin-bottom: 10px;
}

#post-content-p {
    color: white;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 4px;
    font-size: 16px;
    width: 100%;
    height: 100%;
}

#new-post {
  height: fit-content;
  width: 90%;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 3px 0px gray;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
}

#new-post-accounticon {
  width: 100%;
  height: 80%;
  border-radius: 5px;
}

#accounticon {
  width: 10%;
  margin-right: 1vw;
}

#submitBtn {
    width: 30%;
    display: flex;
    justify-content: center;
    align-items: center;
}

</style>