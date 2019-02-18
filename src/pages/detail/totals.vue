<template>
    <div class="div-detailpage">
        <el-steps :active="active" finish-status="success" class="div-detailpage-padding">
            <el-step title="步骤 1"></el-step>
            <el-step title="步骤 2"></el-step>
            <el-step title="步骤 3"></el-step>
            <el-step title="步骤 4"></el-step>
        </el-steps>

        <el-button style="margin-left: 12px;" @click="next">下一步</el-button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            active: 0
        }
    },
    methods: {
      next() {
        if (this.active++ > 3) this.active = 0;
        if ( this.active == 4){
            this.$message({
                 type: 'success',
                 message : 'well done',
                 showClose: true,
            });
        }
      }
    }
}
</script>


<style scoped>

</style>


