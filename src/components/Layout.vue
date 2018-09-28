<template>
    <div class="layout">
        <Header></Header>
        <div class="w1170 content">
            <router-view/>
        </div>
    </div>
</template>
<script>
import Header from '@/components/Header.vue'
export default {
    components:{
        Header
    },
    data(){
        return{}
    }
}
</script>
<style scoped>
.layout{
    background: #f1f1f1;
}
.w1170{
    width: 1170px;
    margin:0 auto;
}
</style>
