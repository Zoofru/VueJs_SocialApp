import axios from 'axios'

const getUser = async (id) => {
    const res = await axios.get(`${import.meta.env.VITE_API}/user/finduser/${id}`)
    return res.data.user
}

export default {getUser}