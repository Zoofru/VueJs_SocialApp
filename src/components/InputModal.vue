<script>
export default {
    name: 'InputModal',
    props: {
        modalTitle: {
            default: 'Title',
            type: String,
        },
        modalContent: {
            default: '',
            type: String
        },
        confirmButtonText: {
            default: 'Confirm',
            type: String
        },
        closeButtonText: {
            default: 'Close',
            type: String
        },
        type:null,
    },
    data() {
        return {
            youtubeLink: false,
            input: '',
            linkTitle:null,
            characterCount: 35
        }
    },
}
</script>

<template>
    <div>
        <div class="modal fade" :id="`${type}-modal`" tabindex="-1" aria-labelledby="label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="label">{{modalTitle}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p id='modal-content'>{{modalContent}}</p>
                        <div id='invite' v-if="this.type === 'invite'">
                            <input class='input-invite input' maxlength="35" type='text' spellcheck="off" autocomplete="off" :placeholder="`Spark Title`" v-model="this.input"  required />
                            <p id='character-count'>{{this.characterCount - this.input.length}} Characters Remaining</p>
                        </div>
                        <input class='input' v-else type='text' spellcheck="off" autocomplete="off" :placeholder="`${this.type.charAt(0).toUpperCase() + this.type.slice(1)} url`" v-model="this.input"  required />
                        <input class='input inputTitle' type='text' spellcheck="off" autocomplete="off" :placeholder="`Link Title (optional)`" v-model="this.linkTitle" v-if="this.type === 'link'" />
                    </div>
                    <div class="form-check youtube-check" v-if="type === 'video'">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" @click='this.youtubeLink = !this.youtubeLink'>
                        <label class="form-check-label" for="flexCheckDefault">
                            Youtube Link
                        </label>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{closeButtonText}}</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="() => {
                            $emit('inputSent', this.input, this.youtubeLink, this.linkTitle)
                            this.input=''
                            }">{{confirmButtonText}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<style scoped>
#modal-content {
    font-size: 20px;
}

.input-invite, #character-count {
    width: 100%;
}

#character-count {
    margin: 0;
    display: flex;
    justify-content: flex-end;
}

#invite {
    width: 100%;
}

.modal-body {
    display: flex;
    flex-direction: column;
}

.youtube-check {
    margin-left: 3%;
}

.modal-header { 
    background-color: var(--main-color-blue);
}

.modal-title {
    color: white;
}

.input {
    margin-top: 10px;
    border: none;
    border-bottom: 1px solid black;
}

.input:focus {
    outline: none;
    border-bottom-color: var(--main-color-blue);
}
</style>