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
        <!-- <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                Launch demo modal
        </button> -->
        <!-- Modal -->
        <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">{{modalTitle}}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">{{modalContent}}</div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">{{closeButtonText}}</button>
                <button type="button" class="btn btn-primary" @click="this.$emit('remove')">{{confirmButtonText}}</button>
            </div>
            </div>
        </div>
        </div>

    </div>
</template>

<style scoped>

</style>
