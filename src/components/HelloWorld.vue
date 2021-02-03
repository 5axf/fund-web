<template>
  <div>
    <h5>数据在开盘期间每分钟更新一次</h5>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item>
        <el-input v-model="code" placeholder="请输入基金代码，多个用逗号隔开"></el-input>
      </el-form-item>
      <!-- <el-form-item>
        <el-button type="primary" @click="post">保存数据</el-button>
      </el-form-item> -->
    </el-form>

    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="code" label="基金代码">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="lookDetail(scope.row)">{{scope.row.code}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="基金名称"> </el-table-column>
      <el-table-column label="净值">
        <template slot-scope="scope">
          <div>{{ scope.row.netWorth }}</div>
          <div v-if="scope.row.dayGrowth >= 0">
            <span style="color:red">{{ scope.row.dayGrowth }}%</span>
          </div>
          <div v-if="scope.row.dayGrowth < 0">
            <span style="color:red">{{ scope.row.dayGrowth }}%</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="估值">
        <template slot-scope="scope">
          <div>{{ scope.row.expectWorth }}</div>
          <div v-if="scope.row.expectGrowth >= 0" >
            <span style="color:red">{{ scope.row.expectGrowth }}%</span>
          </div>
          <div v-if="scope.row.expectGrowth < 0" >
            <span style="color:green">{{ scope.row.expectGrowth }}%</span>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="netWorth" label="当前基金单位净值"> </el-table-column>
      <el-table-column prop="dayGrowth" label="单位净值日涨幅"> </el-table-column>
      <el-table-column prop="expectWorth" label="当前基金单位净值估算"> </el-table-column>
      <el-table-column prop="expectGrowth" label="当前基金单位净值估算日涨幅"> </el-table-column> -->
      <el-table-column label="单位净值周涨幅">
        <template slot-scope="scope">
          <!-- <div>{{ scope.row.lastWeekGrowth }}%</div> -->
          <div v-if="scope.row.lastWeekGrowth >= 0" >
            <span style="color:red">{{ scope.row.lastWeekGrowth }}%</span>
          </div>
          <div v-if="scope.row.lastWeekGrowth < 0" >
            <span style="color:green">{{ scope.row.lastWeekGrowth }}%</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单位净值月涨幅">
        <template slot-scope="scope">
          <!-- <div>{{ scope.row.lastMonthGrowth }}%</div> -->
          <div v-if="scope.row.lastMonthGrowth >= 0" >
            <span style="color:red">{{ scope.row.lastMonthGrowth }}%</span>
          </div>
          <div v-if="scope.row.lastMonthGrowth < 0" >
            <span style="color:green">{{ scope.row.lastMonthGrowth }}%</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单位净值三月涨幅">
        <template slot-scope="scope">
          <!-- <div>{{ scope.row.lastThreeMonthsGrowth }}%</div> -->
          <div v-if="scope.row.lastThreeMonthsGrowth >= 0" >
            <span style="color:red">{{ scope.row.lastThreeMonthsGrowth }}%</span>
          </div>
          <div v-if="scope.row.lastThreeMonthsGrowth < 0" >
            <span style="color:green">{{ scope.row.lastThreeMonthsGrowth }}%</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单位净值六月涨幅">
        <template slot-scope="scope">
          <!-- <div>{{ scope.row.lastSixMonthsGrowth }}%</div> -->
          <div v-if="scope.row.lastSixMonthsGrowth >= 0" >
            <span style="color:red">{{ scope.row.lastSixMonthsGrowth }}%</span>
          </div>
          <div v-if="scope.row.lastSixMonthsGrowth < 0" >
            <span style="color:green">{{ scope.row.lastSixMonthsGrowth }}%</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="单位净值年涨幅">
        <template slot-scope="scope">
          <!-- <div>{{ scope.row.lastYearGrowth }}%</div> -->
          <div v-if="scope.row.lastYearGrowth >= 0" >
            <span style="color:red">{{ scope.row.lastYearGrowth }}%</span>
          </div>
          <div v-if="scope.row.lastYearGrowth < 0" >
            <span style="color:green">{{ scope.row.lastYearGrowth }}%</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="netWorthDate" label="净值更新日期"> </el-table-column>
      <el-table-column prop="expectWorthDate" label="净值估算更新日期"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      form: {},
      code: null,
      tableData: []
    }
  },
  created () {
    this.getData()
  },
  methods: {
    getData () {
      var codes = '161725,005928,519126,161028,161726,003096,320007'
      var input = this.code
      if (input) {
        codes = codes + ',' + input
      }
      var url = 'https://api.doctorxiong.club/v1/fund?code=' + codes
      this.$http
        .get(url)
        .then((res) => {
          this.tableData = res.data.data
        })
        .catch((err) => {
          alert(err)
        })
    },
    timer () {
      return setTimeout(() => {
        var date = new Date()
        var seperator2 = ':'
        var hours = ''
        if (date.getHours() < 10) {
          hours = '0' + date.getHours()
        } else {
          hours = date.getHours()
        }
        var currentdate = hours + seperator2 + date.getMinutes() + seperator2 + date.getSeconds()
        // console.log(currentdate)
        // console.log((currentdate >= '09:30:00' && currentdate <= '11:30:59') || (currentdate >= '13:00:00' && currentdate <= '15:00:00'))
        if ((currentdate >= '09:30:00' && currentdate <= '11:30:59') || (currentdate >= '13:00:00' && currentdate <= '15:00:00')) {
          this.getData()
          this.post()
          console.log('数据更新成功')
        } else {
          console.log('停盘不更新')
        }
      }, 60000)
    },
    post () {
      var url = 'http://127.0.1:9999/v1/api/fund'
      this.$http
        .post(url, {
          data: this.tableData
        })
        .then((response) => {
          // console.log(response)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    lookDetail (data) {
      this.$router.push({
        path: '/detail/index',
        query: {
          param: data
        }
      })
    }
  },
  watch: {
    tableData () {
      this.timer()
    }
  },
  destroyed () {
    clearTimeout(this.timer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
