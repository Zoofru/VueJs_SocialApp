<script>
export default {
    name: 'InputModal',
    props: {
        modalTitle: {
            default: 'Title',
            type: String,
        },
        modalContent: {
            default: 'Content',
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
            input:null
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
                        {{modalContent}}
                        <input class='input' type='text' spellcheck="off" autocomplete="off" :placeholder="`${this.type} url`" v-model="this.input" />
                    </div>
                    <div class="form-check youtube-check" v-if="type === 'video'">
                        <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" @click='this.youtubeLink = !this.youtubeLink'>
                        <label class="form-check-label" for="flexCheckDefault">
                            Youtube Link
                        </label>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{closeButtonText}}</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="$emit('inputSent', this.input, this.youtubeLink)">{{confirmButtonText}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<style scoped>
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