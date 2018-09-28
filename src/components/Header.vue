<template>
    <header class="layout-header">
        <div class="w1170 wrap">
            <h1 @click="$router.push('/')">云笔记</h1>
            <i class="el-icon-search    icon-search"></i>
        <el-button class="write-btn" @click="$router.push('/writeNode')">
        写笔记</el-button>
        </div>
    </header>
</template>
<script>
export default {
    data(){
        return{}
    }
}
</script>
<style scoped lang="scss" >
*{
    margin:0;
    padding:0;
}
.layout-header{
    height:50px;
    background:#409eff; 
}
.w1170{
    width: 1170px;
    margin:0 auto;
}
.wrap{
    display:flex;
    justify-content:space-between;

h1{
    margin-top:5px;
    color:#fff;
    font-weight:400;
    font-size:30px;
    cursor: pointer;
}
.icon-search{
    color:#fff;
    font-size: 30px;
    margin-left:800px;
    line-height: 50px;
}
.write-btn{
    height:40px;
    margin-top:5px;
     font-size: 14px;
     width:80px;
}
}

</style>
