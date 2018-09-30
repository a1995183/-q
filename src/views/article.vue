<template>
<div class="body-content" v-if="content.author">
    <div class="left-img">
        <img width="140" height="140" :src='content.author.avatar'>
    </div>
    <div class="right-text">
        <p style="font-size:16px ;">
            作者：<span class="name" v-text="content.author.username" style="font-weight:400;color:#409eff">
            </span>
           <i style="border-left:1px solid #333;margin:0 5px"></i>
            <span v-text="content.title">
            </span>
        </p>
        <span v-text="content.createdTime"></span>
        <p class="lll">浏览：{{content.readnumber}}回复：{{content.commonnum}}分类：{{content.category.name}}</p>
    </div>
    <br>
    <div class="bottom-last" v-html="content.content">
    </div>

</div>
</template>
<script>
export default {
    
    data(){
        return{
               content:[],
        }
    },
    methods:{
        getData(){
        this.$axios.get(`/article/${this.$route.params.id}`).then(res=>{
        this.content=res.data
        console.log(this.content)
                })
            },
        },
        created(){
            this.getData()
        }
}
</script>
<style lang="scss" scoped>
body{
    background: #2c3e50;
}
.body-content{
    text-align: left;
    overflow: hidden;
    width: 1170px;
    background: #AEC;
    box-sizing: border-box;
    padding-left: 30px;
    margin:50px auto 0;
.left-img{
    float: left;
img{
    border-radius: 50%;
}
}
.right-text{
    float: left;
    margin-left: 30px;
}
.bottom-last{
   float: left; 
   width:1170px;
}
}

</style>

