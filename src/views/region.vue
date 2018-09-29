<template >
<div class="body-login">
    <div class="clear"></div>
    <div class="login">
<h2>新用户注册</h2>
<el-form >
    <el-form-item >
        <el-input placeholder="用户名" v-model="formData.username"></el-input>
    </el-form-item>
    <el-form-item>
        <el-input placeholder="邮箱" v-model="formData.email"></el-input>
    </el-form-item>
    <el-form-item>
        <el-input type="password" placeholder="密码" v-model="formData.password" 
        @keyup.enter.native="handleRegister"></el-input>
    </el-form-item>
    <el-button type="primary" @click="handleRegister" >注册</el-button>
</el-form>
    </div>
</div>
    
</template>
<script>
export default {
    data(){
        return{
        formData:{
         username:"",
         password:"",
         email:""   
        }
        }
    },
    methods:{
        handleRegister(){
            this.$axios.post('/user',this.formData).then(
                res=>{
                    console.log(res)
                    if(res.code==200){
                        this.$message('注册成功！')
                      setTimeout( ()=> this.$router.push('/'),500)
                    }else{
                        this.$message(res.msg)
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
