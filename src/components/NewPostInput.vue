<script>
import axios from 'axios'
import InputModal from './InputModal.vue'

export default {
    name: "NewPostInput",
    components: {
        InputModal
    },
    data() {
        return {
            text:null,
            imageurl:null,
            videourl:null,
            type:null
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
                    id: localStorage.getItem("uId"),
                    imageurl: this.imageurl,
                    videourl: this.videourl,
                    type: this.type
                })
                this.text = null
                document.querySelector('#inputimage').src = ''
                console.log(res);
            }
        },
        setupAutoResize() {
            let ta = document.querySelector("#textarea")
            ta.addEventListener('input', this.autoResize, false)
        },
        autoResize() {
            let ta = document.querySelector("#textarea")
            ta.style.height = 'auto'
            ta.style.height = ta.scrollHeight + 'px'
        },
        handleModalInput(input, type) {
            document.querySelector('#inputimage').src = input
            
            if(type === 'image') {
                this.imageurl = input
                this.type = type
                console.log('hit');
            }
        },
        confirmLinkValid(input) {
            const extension = input.split('').splice(input.length - 4, 4).join('')
            if(extension === '.jpg' || extension === 'jpeg' || extension === '.png') {
                this.handleModalInput(input, 'image')
            } else {
                // Send user an error as feedback for invalid file type
                console.log('not image');
            }
        }
    },
    mounted() {
        this.setupAutoResize()
    }
}
</script>


<template>
    <div v-if="signInCheck()" id='new-post'>
        <div id='input'>
            <div id='accounticon'>
                <img id='new-post-accounticon' v-bind:src=user.avatar alt='account-icon' />
            </div>
            <div id='inputarea'>
                <textarea id='textarea' autocomplete="false" spellcheck="false" v-model="text" v-bind:placeholder="`Whats new, ${user.username}?`">ass</textarea>
                <img id='inputimage' src='' />
            </div>
        </div>
        <div class='border'></div>

        <!-- bottom bar (icons and post button) -->
        <div id='icons'>
            <div id='icn'>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16" data-bs-toggle="modal" data-bs-target="#input-modal">
                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                </svg>
                <svg id='test' xmlns="http://www.w3.org/2000/svg" width="32" height="22" fill="currentColor" class="bi bi-play-btn" viewBox="0 0 16 16">
                    <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                </svg>
            </div>
            <div id='submitBtn'>
                <button id='post-btn' @click="this.handleSubmit()">Post</button>
            </div>
        </div>

        <!-- MODAL -->
        <InputModal 
            :modalTitle="'Attach Image'"
            :modalContent="'Copy the image url and paste\
            it below, then click confirm to add it to your post.'"
            @inputSent="confirmLinkValid"
        />
    </div>
</template>

<style scoped>

svg:hover {
    cursor: pointer;
    fill: var(--main-color-blue);
}

#textarea {
    padding: 10px;
    word-wrap: break-word;
    width: 75%;
    font-size: large;
    overflow: hidden;
    resize: none;
    border: none;
    margin-bottom: 10px;
}

#textarea:hover {
    cursor: text;
}

#textarea:focus {
    outline: none;
}

#textarea-content {
    color: gray;
    margin: 0;
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

#inputimage {
    width: 75%;
}

#inputarea {
    width: 80%;
    display: flex;
    flex-direction: column;
}

#input {
    display: flex;
    justify-content: center;
    align-items: center;
    height: fit-content;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
}

#icn {
    width: 50%;
    padding-left: 10px;
}

#icons {
    width: 100%;
    display: flex;
    align-items: center;
    height: 40px;
    padding-bottom: 10px;
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
  width: 31vw;
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

#post-btn {
    background-color: var(--main-color-blue);
    color: white;
    border: none;
    border-radius: 10px;
    width:35%;
}

#post-btn:hover {
    background-color: white;
    border: 1px solid var(--main-color-blue);
    color: var(--main-color-blue);
}

#submitBtn {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 15px;
}

</style>