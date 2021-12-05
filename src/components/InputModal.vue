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
        }
    },
    data() {
        return {
            input:null
        }
    },
}
</script>

<template>
    <div>
        <div class="modal fade" id="input-modal" tabindex="-1" aria-labelledby="label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="label">{{modalTitle}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {{modalContent}}
                        <input class='input' type='text' spellcheck="off" autocomplete="off" placeholder="Image url" v-model="this.input" />
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{closeButtonText}}</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="$emit('inputSent', this.input)">{{confirmButtonText}}</button>
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