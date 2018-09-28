import axios from 'axios'
const env = Process.env.NODE_ENV
const instance = axios.create({
    baseURI:'/api',
})
const xhr={
get () {
    return new Promise((resolve,reject)=>{
        
    })
}
}