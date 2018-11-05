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
    <div class="answer">
        <p style="">评论</p>
        <div style="width:50px;height:50px;float:left;border-radius:50%;overflow:hidden;margin-top:-5px">
            <img width="100%" height="100%" :src="userInfo.avatar" alt="">
        </div>
            <el-input v-model="comment" placeholder="输入评论..."></el-input>
            <el-button @click="addComment(userInfo._id)" type="primary">评论</el-button>
    </div>
    <div v-for="(item,index) in answer" :key="index" class="both-answer">
        <div style="width:50px;height:50px;float:left;border-radius:50%;overflow:hidden;margin-top:15px">
            <img width="100%" height="100%" :src="item.user.avatar" alt="">
        </div>
        <div class="both-answer-content" style="float:left">
            <p style="font-size:16px" class="both-answer-userName">{{item.user.username}}</p>
            <p class="both-answer-content">{{item.content}}</p>
        </div>
        <div style="float:left;width:1050px;margin-left:50px;" class="answer-time">
           <div >{{item.createdTime}}
            <div @click="addComment(item._id,index)" style="cursor:pointer;margin-right:150px;position:relative;top:-15px" class="flr">
                 <i class="icon" style="right:5px;top:4px"><img width="15px" height="20px" src="./../img/hf.svg" alt=""></i>
                 回复</div>
               <i style="right:40px" class="icon flr"><img width="15px" height="20px" src="./../img/dz.svg" alt=""></i>
           </div>
           
            <div v-if="item.show" style="wihth:100%;" class="answ">
                <el-input style="width:90%" v-model="comment" placeholder="输入回复..."></el-input>
                <el-button @click="addComment(item._id)" type="primary">回复</el-button>
            </div>
        </div>
    </div>
    <div style="width:100%;height:50px;float:left" class="bottom"></div>
</div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    
    data(){
        return{
               content:[],
               comment:'',
               answer:[],
               show:false
        }
    },
    methods:{
        getData(){
            if(this.$route.params.id){
                localStorage.setItem('article_id',this.$route.params.id)
            }
        let id=localStorage.getItem('article_id')
        this.$axios.get(`/article/${id}`).then(res=>{
        this.content=res.data
               console.log(res.data)
                })
            },
            getComment(){
                let Params={
                    auid:localStorage.getItem('article_id')
                }
                this.$axios.get(`/getComment`,Params).then(res=>{
                    if(res.code==200){
                        this.answer=res.data
                        this.answer.forEach((item)=>{
                            
                        })
                     
                    }
                })
            },
            addComment(auid,index){
               this.answer[index].show=true
                this.show=!this.show
                console.log(index,this.answer[index])
                console.log(this.comment)
               let content=this.comment
              let user=this.userInfo._id
            //   let auid=this.content._id
            if(content!=''){
                 this.$axios.post('/addcomment',{content,user,auid}).then(res=>{
                  console.log(res)
                  if(res.code==200){
                      this.$message(res.msg)
                      this.getComment()
                      this.comment=''
                  }
              })
            }
             

            }
        },
        created(){
            this.getData()
            this.getComment()
        },
        computed:{
            ...mapState(['userInfo'])
        }
}
</script>
<style lang="scss" scoped>
.flr{
    float: right;
}
body{
    background: #2c3e50;
}
.body-content{
    text-align: left;
    overflow: hidden;
    width: 1170px;
    background: #fff;
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
.answer{
    height: 110px;
    width: 100%;
    margin-top: 50px;
    float: left;
    .el-input{
        float: left;
        width:945px;
    }
    .el-button{
        margin-left: 10px;
        width:70px;
        float: left;
    }
    
}
.both-answer{
    .both-answer-content{
        width: 1000px;
    }
    .answer-time{
        .icon{
            position: relative;
            cursor:pointer;
            top: -11px;
            padding-top: 4px;
            display: inline-block;
            width:15px;
            height:20px;
            img{
                margin-top: 4px;
            }
}
    }
}

</style>

