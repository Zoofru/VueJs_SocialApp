<script>
import axios from 'axios'
import InputModal from '../components/InputModal.vue'
export default {
    name: 'AutoResizeTextArea',
    props: {
        spark: Object,
        key: Number
    },
    components: {
        InputModal
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    data() {
        return {
            message:null,
            type:null,
            videourl:null,
            imageurl:null,
            links: []
        }
    },
    methods: {
        setupAutoResize() {
            let ta = document.querySelector("#textarea")
            ta.addEventListener('input', this.autoResize, false)
        },
        autoResize() {
            let ta = document.querySelector("#textarea")
            ta.style.height = 'auto'
            ta.style.height = ta.scrollHeight + 'px'
        },
        async handleSubmit() {
            if (this.message || this.imageurl) {
                const res = await axios.post(`${import.meta.env.VITE_API}/spark/message/new`, {
                    sparkId: this.spark.id,
                    message: this.message,
                    messageOwnerId: this.user.id,
                    type: this.type,
                    videourl: this.videourl,
                    imageurl: this.imageurl,
                    links: this.links
                })
                this.message = null
                console.log(res);
                this.$emit('removeImage')
            }
        },
        handleModalInput(input, type) {
            if(type === 'image') {
                document.querySelector('#inputimage').src = input
                this.imageurl = input
                this.type = type
                
            } else if (type === 'video') {
                const divInput = document.querySelector('#inputarea')
                const vid = document.createElement('video')
                let sourceMp4 = document.createElement('source')
                let sourceWebm = document.createElement('source')
                let sourceOgg = document.createElement('source')

                const sources = [sourceOgg, sourceWebm, sourceMp4]
                
                sourceWebm.type = 'video/webm'
                sourceOgg.type = 'video/ogg'
                sourceMp4.type = 'video/mp4'
                
                for(let s of sources) {
                    s.src = input
                    vid.appendChild(s)
                }

                vid.controls = true
                vid.muted = true
                vid.classList.add('video')

                divInput.appendChild(vid)

                this.videourl = input
                this.type = type
            } else if (type === 'youtube') {
                const videoId = input.split('').splice(input.length - 11, 11).join('')
                const iFrame = document.createElement('iframe')
                iFrame.width = '400px'
                iFrame.height = '315px'
                iFrame.src = 'https://www.youtube.com/embed/' + videoId
                iFrame.title = 'Youtube video player'
                // iFrame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;'
                iFrame.allowFullscreen = true
                iFrame.classList.add('iframe')

                document.querySelector('#inputarea').appendChild(iFrame)

                this.videourl = 'https://www.youtube.com/embed/' + videoId
                this.type = type

            }
        },
        confirmLinkValid(input) {
            const extension = input.split('').splice(input.length - 4, 4).join('')
            if(extension === '.jpg' || extension === 'jpeg' || extension === '.png' || extension ==='.gif' || extension === 'gifv') {
                this.handleModalInput(input, 'image')
            } else {
                // Send user an error as feedback for invalid file type
                console.log('not valid');
            }
        },
        confirmVideoValid(input, isYoutube) {
            if(!isYoutube) {
                const extension = input.split('').splice(input.length - 4, 4).join('')
    
                if(extension ==='.gif' || extension === 'gifv') {
                    this.confirmLinkValid(input)
                } else if (extension === '.mp4' || extension === 'webm' || extension === 'ogg') {
                    this.handleModalInput(input, 'video')
                } else {
                    // Send user an error as feedback for invalid file type
                    console.log('not valid')
                }
            } else if(isYoutube) {
                this.handleModalInput(input, 'youtube')
            }
        },
        link(input, youtube, linkTitle) {
            let splitLink = input.split('')
            let addHTTPSToLink = "https://" + splitLink.join('')

            try {
                if(new URL(input)) {
                    this.addLink(input, linkTitle)
                    this.links.push(JSON.stringify({'link': input, 'linkTitle': linkTitle}))
                }
            } catch (error) {
                this.addLink(addHTTPSToLink, linkTitle)
                this.links.push(JSON.stringify({'link': input, 'linkTitle': linkTitle}))
            }

        },
        addLink(input, linkTitle) {
            const iframe = document.createElement('iframe');
            let html = `<a href="${input}" target="_blank">${linkTitle}</a>`;
            iframe.src = 'data:text/html;charset=utf-8,' + encodeURI(html);
            iframe.style.height = "5vh"
            document.querySelector('#inputarea').appendChild(iframe);
        }
    },
    mounted() {
        this.setupAutoResize()
    }
}
</script>

<template>
    <div id='input'>
        <div class='column'>
            <div id='inputarea'>
                <textarea id='textarea' autocomplete="false" spellcheck="false" v-model="message" v-bind:placeholder="`Send Message...`"></textarea>
                <img id='inputimage' src='' />
            </div>
            
            <div class='border'></div>
            <div id='icons'>
                <div id='icn'>
                    <div class='hover-bg'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="20" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16" data-bs-toggle="modal" data-bs-target="#input-modal">
                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                        </svg>
                    </div>
                    <div class='hover-bg'>
                        <svg id='test' xmlns="http://www.w3.org/2000/svg" width="32" height="22" fill="currentColor" class="bi bi-play-btn" viewBox="0 0 16 16" data-bs-toggle="modal" data-bs-target="#video-modal">
                            <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/>
                        </svg>
                    </div>

                    <div class='hover-bg'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="23" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16" data-bs-toggle="modal" data-bs-target="#link-modal">
                            <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9c-.086 0-.17.01-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
                            <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4.02 4.02 0 0 1-.82 1H12a3 3 0 1 0 0-6H9z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <button id='send-btn' @click='this.handleSubmit'>Send</button>
        <!-- MODAL -->
        <InputModal
            type='input'
            :modalTitle="'Attach Image'"
            :modalContent="'Copy the image url and paste\
            it below, then click confirm to add it to your post.'"
            @inputSent="confirmLinkValid"
        />

        <InputModal
            type='video'
            :modalTitle="'Attach video'"
            :modalContent="'Copy the video or gif url and past\
            it below, then click confirm to add it to your post.\
            If your link if from youtube check the box that says youtube link\
            otherwise it may not work correctly.'"
            @inputSent="confirmVideoValid"
        />

        <InputModal
            type='link'
            :modalTitle="'Link'"
            @inputSent="link"
        />
    </div>
</template>

<style scoped>
svg:hover {
    cursor: pointer;
}

.hover-bg {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    width: 5%;
    height: 3vh;
}

.hover-bg:hover {
    background-color: #0165fc7a;
}

#icn {
    display: flex;
    margin-top: 1%;
}

#input {
    display: flex;
    justify-content: center;
    align-items: center;
    height: fit-content;
    margin-top: 10px;
    margin-bottom: 10px;
    width: 20%;
}

#inputarea {
    width: 30%;
    display: flex;
    flex-direction: column;
}

#inputimage {
    width: 500px;
}

#textarea {
    padding: 10px;
    word-wrap: break-word;
    width: 30vw;
    font-size: large;
    overflow: hidden;
    resize: none;
    border: none;
    margin-bottom: 10px;
    height: fit-content;
    background-color: #f5f5f5;
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

#send-btn {
    border: 1px solid var(--main-color-blue);
    background-color: var(--main-color-blue);
    color: white;
    width: 5%;
    height: 5vh;
    margin-left: 2%;
    border-radius: 5px;
    margin-bottom: 1.5%;
}

#send-btn:hover {
    color: var(--main-color-blue);
    background-color: white;
}
</style>