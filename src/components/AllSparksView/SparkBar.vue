<script>
import axios from 'axios'

export default {
    props: {
        spark: Object
    },
    name: 'SparkBar',
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    data() {
        return {
            otherUser:null
        }
    },
    methods: {
        async getUser() {
            if(this.spark.userOneId === this.user.id) {
                const res = await axios.get(`${import.meta.env.VITE_API}/user/finduser/${this.spark.userTwoId}`)
                console.log(res);
                this.otherUser = res.data.user
            } else {
                const res = await axios.get(`${import.meta.env.VITE_API}/user/finduser/${this.spark.userOneId}`)
                console.log(res);
                this.otherUser = res.data.user
            }
        }
    },
    created() {
        this.getUser()
    }
}
</script>

<template>
<!-- DOSENT LOAD ON PAGE REFRESH -->
    <div id='root'>
        <div id='bar-root'>
            <div id='question-title'>
                <h3 id='title'>PLACEHOLDER FOR SPARK QUESTION</h3>
            </div>

            <div id='users'>
                <div id='user-one'>
                    <h3 id='user-one-username'>{{this.user.username}}</h3>
                    <img class='user-avatar' :src=this.user.avatar />
                </div>

                <div id='user-two'>
                    <img class='user-avatar' :src=this.otherUser.avatar />
                    <h3 id='user-two-username' v-if="this.otherUser !== null">{{this.otherUser.username}}</h3>
                </div>
            </div>
        </div>
    </div>    
</template>

<style scoped>
h3 {
    margin: 0;
}

#bar-root {
    width: 60%;
    background-color: white;
    margin-left: 5%;
    padding: 1vh 1.5vw;
    border-radius: 15px;
    border: 1px solid var(--main-color-blue);
}

#bar-root:hover {
    cursor: pointer;
}

#question-title {
    display: flex;
    justify-content: center;
}

#title {
    font-size: 26px;
}

#users {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-top: 1.5vh;
}

#user-one, #user-two {
    display: flex;
    align-items: center;
}

#user-two-username, #user-one-username {
    font-size: 21px;
}

#user-one {
    padding-left: 5%;
}

#user-two {
    justify-content: flex-end;
    padding-right: 5%;
}

.user-avatar {
    width: 12%;
    height: 100%;
}
</style>