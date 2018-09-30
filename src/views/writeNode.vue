<template>
        <div class="write-content w1170">
                <div class="title-top">
                        标题
                </div>
                <div class="el-input">
                        <el-input v-model="formdata.title" placeholder="测试标题"></el-input>
                </div>
                <div class="content">
                        <div class="content-title">内容</div>
                        <quill-editor
                        v-model="formdata.content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @change="handleChange"
                        >
                        </quill-editor>
                </div>
                <h3 style="color:blue;float:left;margin-top:35px">分类：</h3>
                <div class="text-type" v-for="item in categories" v-bind:key="item._id">
                       <!-- {{item.name}}
                        <input class="text-radio" v-model="typeId" type="radio" value="item._id" > -->
                        <el-radio-group v-model="formdata.category"  size="medium">
      <el-radio-button :label="item.name"></el-radio-button>
    
    </el-radio-group>
                       
                </div>
                <br/>

          <el-button class="btn-upload" @click="handleUpload" type="primary">发布笔记</el-button>
        </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
  import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  Quill.register('modules/ImageExtend', ImageExtend)
export default {
      components: {quillEditor},
      data(){
              return{
                      formdata:{
                       content: '',
                       contentText:'',
                        title:'', 
                        category:''                             
                      },
                      categories:[],
        // 富文本框参数设置
        editorOption: {  
          modules: {
            ImageExtend: {
              loading: true,
              name: 'img',
              action: 'https://www.qiniu.com',
              response: (res) => {
                return res.info
              }
            },
            toolbar: {
              container: container,
              handlers: {
                'image': function () {
                  QuillWatch.emit(this.quill.id)
                }
              }
            }
          }
        }
   }
 },
 methods:{
         handleUpload(){
             let id=this.categories.findIndex(
                        (index)=>index.name==this.formdata.category
                        )
                        if(id==-1){
                             this.$message('请先选择类别')   
                        }else{
                        this.formdata.category=this.categories[id]._id
                        console.log(this.formdata)
                          this.$axios.post('/article',this.formdata).then(res=>{
                         if(res.code==200){
                                this.$message('upload success')
                                setTimeout(() => {
                                this.$router.push('/')
                                }, 500)
                         }else{
                                 this.$message(res.msg)
                         }
                 })
                        }
               
               
         },handleChange({quill,html,text}){
              this.formdata.contentText=text
               this.formdata.contentText= this.formdata.contentText.substring(0,200)+'...'
               
         },
         getCategory(){
                 this.$axios.get('/category').then(res=>{
                         this.categories=res.data
                 })
         }
 },
 created(){
                     this.getCategory()  
       
   }
}
</script>
<style lang="scss" scoped>
.write-content{
        margin-top:30px;
        background: #fff;
        border-radius: 4px;
        padding: 4px;
     .title-top{
        font-size: 20px;
        color:#333;
        text-align: left;
        font-weight: 700;    
        margin:10px;   
     }   
     .content-title{
        font-size: 20px;
        color:#333;
        text-align: left;
        font-weight: 700;    
        margin:10px;   
     }
     /deep/ .ql-blank{
         height:300px;
     }
     /deep/ .ql-editor{
        height:300px;
     }
   
     .text-type{
        width: 70px;
        float: left;
        margin:30px 0;
        margin-left: 30px;
     }
       .btn-upload{
        height:40px;
        margin-top: 80px;
        float: left;
     }
}
</style>
