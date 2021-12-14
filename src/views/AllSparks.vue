<script>
import Nav from '../components/Nav.vue'
import SideTabs from '../components/SideTabs.vue'
import UserCard from '../components/UserCard.vue'
import axios from 'axios'

export default {
    name: 'All Sparks',
    components: {
        Nav,
        SideTabs,
        UserCard
    }, 
    computed: {
        user() {
            return this.$store.getters.user
        }
    },
    methods: {
        async getActiveSparks() {
            const res = await axios.get(`${import.meta.env.VITE_API}/spark/all`, {
                headers: {
                    authorization: localStorage.getItem('uId')
                }
            })
            console.log(res);
        }
    },
    created() {
        this.getActiveSparks()
    }
}
</script>

<template>
    <div>
        <Nav />
        <div id='page-root'>
            <div id='left'>
                <div id='content'>
                    <UserCard v-if="this.user !== null"/>
                    <SideTabs />
                </div>
            </div>

            <div id='center'>
            </div>

            <div id='right'>
            </div>
        </div>
    </div>
</template>

<style scoped>
#page-root {
    display: flex;
    flex-direction: row;
    margin-top: 3%;
}

#content {
    width: 75%;    
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

#left {
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

#center {
    width: 60%;
}
</style>