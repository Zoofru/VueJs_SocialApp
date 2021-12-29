<script>
export default {
    name: "ReportModal",
    props: {
        userReported: Object,
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    data() {
        return {
            HarrassmentOrHateSpeech: false,
            inappropiateContent: false,
            inappropiateName: false,
            threatsOrHarmOfSomeone: false
        }
    },
    methods: {
        userReportedEmail() {
            let templateParams = {
                reported_user: this.userReported.username,
                reason: this.reasonForReport,
                location_occured: this.location_occured
            }

            emailjs.init(import.meta.env.EMAIL_USER)
            emailjs.send(import.meta.env.EMAIL_SERVICE, 'template_5kmbr1c', templateParams)
        },
        test() {
            console.log(this.userReported)
        }
    }
}
</script>

<template>
    <div>
        <div class="modal fade" :id="`report-modal`" tabindex="-1" aria-labelledby="label" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="label">Report {{this.userReported.username}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p id='modal-body-content'>What is the reason for the report?</p>
                    </div>

                    <div class='check-box-container'>
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">
                                <span class='check-box'>Harrassment or hate speech</span>
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">
                                <span class='check-box'>Inappropriate or obscene content</span>
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">
                                <span class='check-box'>Inappropiate name</span>
                            </label>
                        </div>

                        <div class="form-check" id='final-check-box'>
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">
                                <span class='check-box'>Threats or harm of someone</span>
                            </label>
                        </div>

                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
                            <label class="form-check-label" for="defaultCheck1">
                                <span class='check-box'>Failure to have a respectful conversation in spark</span>
                            </label>
                        </div>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="this.test()">Next</button>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<style scoped>
.modal-content {
    width: 70%;
    background-color: rgb(51, 48, 48);
}

.modal-header {
    border-bottom: 0;
    padding-bottom: 0;
}

.modal-body {
    padding-top: 2%;
}

.modal-footer {
    border-top: 0;
    padding-top: 0;
}

.check-box-container {
    margin-left: 5%;
}

#modal-body-content {
    font-size: 20px;    
}

.check-box {
    color: white;
}

#final-check-box { 
    margin-bottom: 7%;
}

.modal-title {
    color: white;
}

#modal-body-content {
    color: white;
}

.modal-dialog {
    display: flex;
    justify-content: center;
}
</style>