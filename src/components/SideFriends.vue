<script>
import axios from 'axios'
import Modal from './Modal.vue'
export default {
    name: 'SideFriends',
    components: {Modal},
    data() {
        return {
            friends:null,
            currentFriends:[]
        }
    },
    methods: {
        async getFriends() {
            const userId = localStorage.getItem('uId')
            const res = await axios.post(`${import.meta.env.VITE_API}/friend/getfriends`, {
                id: userId
            })
            this.friends = res.data.friends
        },

        async removeFriend(friend) {
            const res = await axios.delete(`${import.meta.env.VITE_API}/friend/delete/${friend.id}/${localStorage.getItem('uId')}`)
        }
    },
    watch: {
        //Getting friends from friends
        friends: async function() {
            const loggedInUID = localStorage.getItem("uId")
            const userRoute = `${import.meta.env.VITE_API}/user/finduser`
            if(this.friends.length >= 10) {
                for (let i = 0 ; i <= 10 ; i++) {
                    if(this.friends[i].userOneId !== loggedInUID) {
                        const res = await axios.get(`${userRoute}/${this.friends[i].userTwoId}`)
                        this.currentFriend = res.data.user
                    } 
    
                    if (this.friends[i].userTwoId !== loggedInUID) {
                        const res = await axios.get(`${userRoute}/${this.friends[i].userOneId}`)
                        this.currentFriend = res.data.user
                    }
                }
            } else {
                //ID = ids of friends user one/user two
                for(let id of this.friends) {
                    if(id === localStorage.getItem('uId')) { return }
                    if(id.userOneId == loggedInUID) {
                        const res = await axios.get(`${userRoute}/${id.userTwoId}`)
                        this.currentFriends.push(res.data.user)
                    } 
    
                    if (id.userTwoId == loggedInUID) {
                        const res = await axios.get(`${userRoute}/${id.userOneId}`)
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
                    <div id='options'>
                        <a href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>
                            </svg>
                        </a>
                        <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <a class="dropdown-item" href="#" data-toggle="modal" data-target="#exampleModalCenter">Remove Friend</a>
                        </div>
                    </div>
                </div>
                <Modal 
                    modalTitle="Are You Sure?" 
                    :modalContent='`You are about to remove ${item.username} from your friends list.\
                     To confrim this simply tap remove.`'
                    confirmButtonText="Remove"
                    @remove=this.removeFriend(item)
                />
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

#friends-title:hover {
    cursor: pointer;
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

#options {
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
    fill: white;
    background-color: gray;
    border-radius: 5px;
}
</style>