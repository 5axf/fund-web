<template>
  <div class="app-container">
    <h1>{{name}}</h1>
    <!--工具栏-->
    <div class="head-container">
      <!-- 搜索 -->
      <el-form :inline="true" :model="query" class="demo-form-inline">
        <el-form-item label-position="left" label="代码" prop="code">
          <el-input v-model="query.code" placeholder="代码" :disabled="true" />
        </el-form-item>
        <el-button
          class="filter-item"
          size="small "
          type="warning"
          icon="el-icon-refresh-left"
          @click="reset()"
          >重置</el-button
        >
        <el-button
          class="filter-item"
          size="mini"
          type="primary"
          icon="el-icon-back"
          @click="back()"
          >返回</el-button
        >
      </el-form>
      <div class="dashboard-container">
        <div class="dashboard-editor-container">
          <el-row
            style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px"
          >
            <detailDashboard ref="child" />
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import detailDashboard from '@/components/dashboard/detailDashboard'
export default {
  components: { detailDashboard },
  data () {
    return {
      query: {
        code: null
      },
      load: false,
      name: ''
    }
  },
  watch: {
    $route: 'getParams'
  },
  created () {
    this.getParams()
  },
  methods: {
    getParams () {
      // 取到路由带过来的参数
      const data = this.$route.query.param
      this.query.code = data.code
      this.name = data.name
      this.load = true
      setTimeout(() => {
        this.reset(data.code)
      }, 1000)
    },
    back () {
      this.$router.back(-1)
    },
    // 重置
    reset () {
      this.$refs.child.reset(this.query.code)
    }
  }
}
</script>
<style>

</style>
