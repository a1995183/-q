import axios from 'axios'
const env = process.env.NODE_ENV
//process.env.,MODE_ENV==脚手架(开发)环境development生产环境production
// let baseURL='/apis'
let baseURL='api'
const instance = axios.create({
    baseURL,
    timeout:15000
})
const $axios={
get (url,data,config) {
    return new Promise((resolve,reject)=>{
       instance.get(url,{params:data},config).then(res=>{
resolve(res.data)
       }) .catch(err=>{
           reject(err)
       })
    })
},
fetch(url,data,config,methods){
    return new Promise((resolve,reject)=>{
        instance[methods](url,data,config).then(res=>{
            resolve(res.data)
        }).catch(err=>{
            reject(err)
        })
    })
},post(url,data,config){
    return this.fetch(url,data,config,'post')
}
}
export default $axios