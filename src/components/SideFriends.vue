<script>
import axios from 'axios'

export default {
    name: 'SideFriends',
    data() {
        return {
            friends:null,
            currentFriend:null
        }
    },
    methods: {
        async getFriends() {
            const userId = localStorage.getItem('uId')
            const res = await axios.post(`http://localhost:3001/friend/getfriends`, {
                id: userId
            })
            console.log(res);
            this.friends = res.data.friends
        },
        // async getFriendsInfo() {
        //     if(this.friends.length >= 10) {
        //         for (let i = 0 ; i <= 10 ; i++) {
        //             if(this.friends[i].userOneId !== localStorage.getItem("uId")) {
        //                 const res = await axios.get(`http://localhost:3001/finduser/${this.friends[i].userOneId}`)
        //                 this.currentFriend = res.data.user
        //                 console.log(res);
        //                 // return res.data.user.username
        //             } 
    
        //             if (this.friends[i].userTwoId !== localStorage.getItem("uId")) {
        //                 const res = await axios.get(`http://localhost:3001/finduser/${this.friends[i].userTwoId}`)
        //                 this.currentFriend = res.data.user
        //                 console.log(res);
        //                 // return res.data.user.username
        //             }
        //         }
        //     } else {
        //         for(let id of this.friends) {
        //             if(id !== localStorage.getItem("uId")) {
        //                 const res = await axios.get(`http://localhost:3001/user/finduser/${id.userOneId}`)
        //                 console.log(res);
        //                 this.currentFriend = res.data.user
        //                 // return res.data.user.username
        //             } 
    
        //             if (id !== localStorage.getItem("uId")) {
        //                 const res = await axios.get(`http://localhost:3001/user/finduser/${id.userTwoId}`)
        //                 console.log(res);
        //                 this.currentFriend = res.data.user
        //                 // return res.data.user.username
        //             }
        //         }
        //     }
        // }
    },
    watch: {
        friends: async function() {
            const loggedInUID = localStorage.getItem("uId")
            if(this.friends.length >= 10) {
                for (let i = 0 ; i <= 10 ; i++) {
                    if(this.friends[i].userOneId !== loggedInUID) {
                        const res = await axios.get(`http://localhost:3001/finduser/${this.friends[i].userTwoId}`)
                        this.currentFriend = res.data.user
                        console.log(res);
                    } 
    
                    if (this.friends[i].userTwoId !== loggedInUID) {
                        const res = await axios.get(`http://localhost:3001/finduser/${this.friends[i].userOneId}`)
                        this.currentFriend = res.data.user
                        console.log(res);
                    }
                }
            } else {
                for(let id of this.friends) {
                    if(id.userOneId !== loggedInUID) {
                        const res = await axios.get(`http://localhost:3001/user/finduser/${id.userTwoId}`)
                        console.log(res);
                        this.currentFriend = res.data.user
                    } 
    
                    if (id.userTwoId == loggedInUID) {
                        const res = await axios.get(`http://localhost:3001/user/finduser/${id.userOneId}`)
                        console.log(res);
                        this.currentFriend = res.data.user
                    }
                }
            }
        }
    },
    created() {
        this.getFriends()
        // this.getFriendsInfo()
    }
}
</script>

<template>
    <div id='root'>
        <h1 id='friends-title'>FRIENDS</h1>
        <div id='container'>
            <div id='friend-tab' v-for="(item, index) in this.friends" :key='index'>
                <div>
                    <p  v-if="this.currentFriend !== null">{{currentFriend.username}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#root {
    border: 2px solid green;
    width: 70%;
}

#container {
    border: 2px solid red;
}

#friends-title {
    font-size: 15px;
}
</style>