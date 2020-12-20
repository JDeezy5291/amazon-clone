import axios from 'axios'

const instance = axios.create({
    // baseURL: 'http://localhost:5001/clone-dc5ee/us-central1/api'
    baseURL: 'https://us-central1-clone-dc5ee.cloudfunctions.net/api'
})

export default instance


