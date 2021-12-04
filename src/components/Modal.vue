<script>
export default {
    name: 'Modal',
    props: {
        modalTitle: {
            default: 'Close',
            type: String,
        },
        modalContent: {
            default: 'Close',
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
        return {}
    },
    methods: {}

}
</script>

<template>
    <div>
        <div class="modal fade" id="remove-modal" tabindex="-1" aria-labelledby="label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="label">{{modalTitle}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        {{modalContent}}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">{{closeButtonText}}</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="this.$emit('remove')">{{confirmButtonText}}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
