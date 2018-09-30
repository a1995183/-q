<template>
    <div>
        <div class="body">
                <div class="top-box">
                        <div class="img-left">
                            <img  width="750" height="340" src="../../static/img/banner.jpg" alt="">
                            <p class="y13">13亿人都会用的云笔记</p>
                        </div>
                        <div v-if="!userInfo.username" class="img-right">
                            <el-form :model="form" label-width="220px" class="demo-ruleForm">
                                    <el-form-item  >
                                        <el-input class="input" placeholder="用户名" v-model="form.email"></el-input>
                                    </el-form-item >
                                    <el-form-item >
                                        <el-input class="input" placeholder="密码" type="password" @keyup.enter="handleLogin" v-model="form.password" ></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="handleLogin" >登录</el-button>
                                        <el-button class="button-zc" @click="$router.push('/region')" type="primary" plain>注册</el-button>
                                    </el-form-item>
                            </el-form>
                        </div>
                        <div v-else  class="img-right">
                            <div class="img-user">
                                <img width="150" height="150" :src="userInfo.avatar">
                            </div>
                            <div class="user-name" >
                                用户名:{{userInfo.username}}
                            </div>
                            <div class="user-email">
                                邮箱地址：{{userInfo.email}}
                            </div>
                            <div class="user-button">
                               <el-button  @click="clearLogin" type="info"> 退出登录</el-button>
                            </div>
                        </div>
                </div>


                <div class="box-bottom">
                    <div class="bottom-header" v-for="item in content" :key="item._id">
                        <router-link :to="{name:'article',params:{id:item._id}}">
                             <div class="left-img">
                            <img width="70" height="70" :src='item.author.avatar'>
                        </div>
                        <div class="right-text">
                            <p style="font-size:16px ;">
                                <span class="name" v-text="item.author.username" style="font-weight:400;color:#409eff"></span>
                                <i class="bottom-i"></i>
                              <span v-text="item.title"> </span>
                            </p>
                            <p class="lll">浏览：{{item.readnumber}}回复：{{item.commonnum}}分类：{{item.category.name}}</p>
                            
                        </div>
                        <div class="bottom-last">
                            <p style="font-size:14px" >{{item.contentText}}</p>
                        </div>
                        </router-link>
                       
                    </div>
                </div>
            </div>
    </div>
</template>
<script>
// import cookies from 'js-cookie'
import {mapState} from 'vuex'
export default {
    data(){
        return{
            form:{
email:"",
password:"",
            },
            content:[],
        }
    },
    methods:{
        getData(){
this.$axios.get('./article').then(res=>{
    this.content=res.data

})
        },
        handleLogin(){
let params=this.form
this.$axios.post('/login',params).then(res=>{
    if(res.code==200){
        // this.usermsg=res.data
        this.$message("登陆成功，欢迎回来"+res.data.username)
        this.$store.commit('CHANGE_userInfo',res.data)
    }
    else{
        this.$message(res.msg)
    }
})
        },
      clearLogin(){
           let data={
              username:'',
              email:'',
              avator:'',
              password:''}
          this.$axios.get('/layout').then(res=>{
             if(res.code==200){
                 this.$message.success(res.msg)
                 this.$store.commit('CHANGE_userInfo',data)
             }else{
                 this.$message('登录已过期')
                this.$store.commit('CHANGE_userInfo',data)
             } 
          })
        
      }
    },
    computed:{
        ...mapState(['userInfo'])
        //computed只在初始化时被调用

// methods会在数据变化时被调用, 即使变动的数据与自身无关
    },
    created(){
        this.getData()
    }
    
}
</script>

<style lang="scss" scoped>
a{
    text-decoration: none;
    color:#333;
}
.body{
    margin-top:20px;
    width:1170px;
    margin:0 auto;
  background: #f1f1f1; 
        .top-box{
            margin-top:50px;
           width:1170px;
           height:340px; 
           .img-left{
        float: left;
position: relative;
         .y13{
               background: rgba($color: #000000, $alpha: .5);
               color:rgba($color:#fff,$alpha:.8);
               font-size:24px;
               line-height: 24px;
               position:absolute;
               bottom:-20px;
               left:0;
               width:750px;
           }
           }
           .demo-ruleForm{
               margin-left: -180px;
           }
           .img-right{
               float:left;
               width:360px;
               margin-left: 60px;
               background: #fff;
             height:340px;
             border-radius: 4px;
             padding-top:50px;
             box-sizing: border-box;
             .user-name{
                 font-size: 16px;
             }user-email{
                 font-size: 16px;            
                  }
       
              .input{
                  width:300px;
                  display: block;
              }
            //    .el-form-item {
            //        margin-bottom: 0px;
            //        margin-left:20px;
            //    }
           }
           button{
               width:280px;
               margin-top:5px;
           }
           .button-zc{
               margin-left: 0px;
           }
          
       
        }
         .box-bottom{
               margin-top:30px;
               width:750px;
               text-align: left;
               float: left;
               .left-img{
                   float: left;
                   height:70px;
                   img{
                       margin-top:10px;
                   }
               }
                  .bottom-i{
              border-left: 1px solid #111;
              margin:0 3px;
          }
          .lll{
              font-size:15px;
              color:#555;
              padding:6px;
              border-radius: 4px;
              background: #bbb;
          }
           }


}
</style>
