<template >
<div class="body-login">
    <div class="clear"></div>
    <div class="login">
<h2>新用户注册</h2>
<el-form >
    <el-form-item >
        <el-input placeholder="用户名" v-model="user"></el-input>
    </el-form-item>
    <el-form-item>
        <el-input placeholder="邮箱" v-model="email"></el-input>
    </el-form-item>
    <el-form-item>
        <el-input placeholder="密码" v-model="password"></el-input>
    </el-form-item>
    <el-button type="primary" @click="handleLogin" >注册</el-button>
</el-form>
    </div>
</div>
    
</template>
<script>
export default {
    data(){
        return{
         user:"",
         password:"",
         email:""   
        }
    },
    methods:{
        handleLogin(){
            this.$axios.post('/user',{username:this.user,password:this.password,email:this.email}).then(
                res=>{
                    if(res.data.code==200){
                        this.$message('注册成功！')
                        this.$router.push('/')
                    }else{
                        this.message(res.data.msg)
                    }
                }
            )
        }
    }
}
</script>
<style lang="scss" scoped>
.body-login{
    background: #f1f1f1;
    padding-top:100px;
.login{
    background: #fff;
    width:400px;
    margin:0px auto 0;
    position: relative;
    padding-top:10px;
    input{
        margin-top:30px;
    }
 button{
     width:400px;
     margin-top:30px;
 }
}
}
</style>
