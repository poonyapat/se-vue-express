import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: `http://10.2.49.168:8081/`
    })
}