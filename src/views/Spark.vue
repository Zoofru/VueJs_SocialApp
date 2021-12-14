<script>
import Nav from '../components/Nav.vue'
import SideTabs from '../components/SideTabs.vue'
import axios from 'axios'
export default {
    props: {
        id: String
    },
    components: {
        Nav,
        SideTabs
    },
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    data() {
        return {
            token: null
        }
    },
    methods: {
        async getSpark() {
            const res = await axios.get(`${import.meta.env.VITE_API}/spark/get/${parseInt(this.$route.query.id)}`)
            console.log(res);
        },
        async test() {
            const res = await axios.post(`${import.meta.env.VITE_API}/spark/test`)
            console.log(res);
            this.token = res.data.token
        },
        async testVerify() {
            const res = await axios.get(`${import.meta.env.VITE_API}/spark/testy`, {
                headers: {
                    authorization: '55'
                }
            })
            console.log(res);
        },
    },
    created() {
        this.getSpark()
    }
}
</script>

<template>
    <div>
        <Nav />
        <div id='page-root'>

            <div id='left'>
                <div id='tabs'>
                    <SideTabs />
                </div>
            </div>

            <div id='center'>
                <h3>Question Title</h3>
                <div id='chat'>
                </div>
            </div>

            <div id='right'>
                <button @click='this.test()'>hi</button>
                <button @click='this.testVerify()'>test</button>
            </div>

        </div>
    </div>
</template>

<style scoped>
#page-root {
    margin-top: 3%;
    display: flex;
    justify-content: space-between
}

#chat {
    display: flex;
    justify-content: center;
    background-color: white;
    width: 80%;
    height: 75vh;
    box-shadow: 0px 0px 3px 2px lightgray;
    border-radius: 5px;
}

#left {
    display: flex;
    justify-content: flex-end;
    width: 25%;
}

#center {
    width: 50%;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#right {
    width: 25%;
}

#tabs {
    display: flex;
    justify-content: flex-end;
    width: 80%;
    height: fit-content;
}
</style>