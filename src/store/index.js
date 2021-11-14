import axios from 'axios'

const getUser = (id) => {
    // const res = await axios.post('http://localhost:3001/user/finduser', {
    //     id: localStorage.getItem("uId")
    // })
    fetch(`http://localhost:3001/user/finduser/${id}`)
    .then(res => res.json())
    .then(res => { 
        console.log(res.user);
        if(res.user !== undefined) {
            return res.user
        }
    })
}

export default {
    getUser
}