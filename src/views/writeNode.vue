<template>
        <div class="write-content w1170">
                <div class="title-top">
                        标题
                </div>
                <div class="el-input">
                        <el-input :v-model="formdata.title" placeholder="测试标题"></el-input>
                </div>
                <div class="content">
                        <div class="content-title">内容</div>
                        <quill-editor
                        v-model="formdata.content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        >
                        </quill-editor>
                </div>
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
                        title:'',                              
                      },
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
                 this.$message('upload success')
         }
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
     .btn-upload{
             margin-top: 30px;
             float: left;
     }
}
</style>
