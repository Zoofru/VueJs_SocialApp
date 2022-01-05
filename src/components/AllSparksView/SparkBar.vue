<script>
import axios from 'axios'
import anime from 'animejs/lib/anime.es.js';

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
        },
        routeTo(routeName) {
            this.$router.push({path: `/${routeName}`, query: {id: this.spark.id}})
        },
        test() {
            anime({
                targets: '#content-sparkbar',
                translateY: '-105%',
                backgroundColor: '#FFF',
                duration: 800
            });
        },
        test2() {
            anime({
                targets: '#content-sparkbar',
                translateY: 0,
                backgroundColor: '#FFF',
                duration: 800
            });
        }
    },
    created() {
        this.getUser()
    }
}
</script>

<template>
    <div id='root'>
        <div id='bar-root' @click="this.routeTo('spark')" @mouseover="this.test()" @mouseleave="this.test2()">
            <div id='content-sparkbar'>
                <div id='question-title'>
                    <h3 id='title'>{{this.spark.sparkTitle}}</h3>
                </div>

                <div id='users'>
                    <div id='user-one'>
                        <img class='user-avatar' :src=this.user.avatar />
                        <h3 id='user-one-username'>{{this.user.username}}</h3>
                    </div>
                    <div id='border'></div>
                    <div id='user-two'>
                        <h3 id='user-two-username' v-if="this.otherUser !== null">{{this.otherUser.username}}</h3>
                        <img class='user-avatar' :src=this.otherUser.avatar  v-if="this.otherUser !== null"/>
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>

<style scoped>
h3 {
    margin: 0;
}

#border {
    border: 1px solid lightgray;
    margin: 0 15%;
}

#content-sparkbar {
    height: 100%;
    background-color: white;
}

#bar-root {
    width: 20%;
    height: 35vh;
    margin-left: 5%;
    border: 1px solid var(--main-color-blue);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    overflow-y: hidden;
}

#bar-root:hover {
    cursor: pointer;
}

#question-title {
    display: flex;
    justify-content: center;
    height: 100%;
}

#title {
    font-size: 26px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
}

#users {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    margin-top: 1.5vh;
    height: 100%;
    background-color: white;
}

#user-one, #user-two {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

#user-two-username, #user-one-username {
    font-size: 21px;
    margin: 0;
}

#user-one {
    padding-top: 15%;
}

#user-two {
    padding-bottom: 15%;
}

.user-avatar {
    width: 40%;
    padding: 0 2%;
    border-radius: 20px;
}
</style>