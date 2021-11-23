<script>
import axios from 'axios'

export default {
    name: 'SideFriends',
    data() {
        return {
            friends:null,
            currentFriends:[]
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
                        this.currentFriends.push(res.data.user)
                    } 
    
                    if (id.userTwoId == loggedInUID) {
                        const res = await axios.get(`http://localhost:3001/user/finduser/${id.userOneId}`)
                        console.log(res);
                        this.currentFriends.push(res.data.user)
                    }
                }
            }
        }
    },
    created() {
        this.getFriends()
    }
}
</script>

<template>
    <!-- BUG SOMEWHERE USER WILL SOMETIMES SEE THEMSELVES IN FRIENDS LIST -->
    <div id='root'>
        <h1 id='friends-title'>FRIENDS</h1>
        <div id='container'>
            <p id='nofriends-sadge' v-if="this.currentFriends.length === 0">Add some friends</p>
            <div id='friend-tab' v-for="(item, index) in this.currentFriends" :key='index'>
                <div id='tab'>
                    <div id='userinfo'>
                        <img v-bind:src=item.avatar alt='' />
                        <p  v-if="this.currentFriends !== null">{{item.username}}</p>
                    </div>
                    <div id='dots'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                            <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#root {
    width: 70%;
}

#nofriends-sadge {
    display: flex;
    justify-content: center;
    color: lightgray;
}

#container {
    box-shadow: 0px 0px 3px 0px gray;
    border-radius: 5px;
    background-color: white;
    padding: 3% 0;
}

#friends-title {
    font-size: 15px;
}

#userinfo {
    display: flex;
    align-items: center;
    width: 45%;
}

#friend-tab {
    margin: 2% 5%;
}

#tab {
    display: flex;
    align-items: center;
    
}

#dots {
    width: 50%;
    display: flex;
    justify-content: flex-end;
}

img {
    width: 60px;
    height: 60px;
}

p {
    margin: 0;
}

svg:hover {
    cursor: pointer;
}
</style>