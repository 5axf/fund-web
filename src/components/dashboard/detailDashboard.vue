<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '350px'
    },
    autoResize: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      chart: null,
      sidebarElm: null,
      chartData: {
        expectGrowth: []
      },
      expectWorthDate: []
    }
  },
  mounted () {},
  beforeDestroy () {
    if (!this.chart) {
      return
    }
    if (this.autoResize) {
      window.removeEventListener('resize', this.__resizeHandler)
    }

    this.sidebarElm &&
      this.sidebarElm.removeEventListener(
        'transitionend',
        this.sidebarResizeHandler
      )

    this.chart.dispose()
    this.chart = null
  },
  methods: {
    reset (code) {
      var url = 'http://127.0.1:9999/v1/api/fund?code=' + code
      this.$http
        .get(url)
        .then((res) => {
          this.chartData.expectGrowth = res.data.data.expectGrowth
          this.expectWorthDate = res.data.data.expectWorthDate
          if (this.expectWorthDate === null) {
            this.$message.error('未查询到今日数据')
          } else {
            this.initChart()
          }
        })
        .catch((err) => {
          alert(err)
        })
    },

    sidebarResizeHandler (e) {
      if (e.propertyName === 'width') {
        this.__resizeHandler()
      }
    },
    setOptions ({ expectGrowth } = {}) {
      this.chart.setOption({
        xAxis: {
          data: this.expectWorthDate,
          boundaryGap: false,
          axisTick: {
            show: false
          }
        },
        grid: {
          left: 10,
          right: 10,
          bottom: 20,
          top: 30,
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          padding: [5, 10]
        },
        yAxis: {
          axisTick: {
            show: false
          }
        },
        legend: {
          data: ['expectGrowth']
        },
        series: [
          {
            name: 'expectGrowth',
            smooth: true,
            type: 'line',
            itemStyle: {
              normal: {
                color: '#3888fa',
                lineStyle: {
                  color: '#3888fa',
                  width: 2
                },
                areaStyle: {
                  color: '#f3f8ff'
                }
              }
            },
            data: expectGrowth,
            animationDuration: 2800,
            animationEasing: 'quadraticOut'
          }
        ]
      })
    },
    initChart () {
      this.chart = echarts.init(this.$el, 'macarons')
      this.setOptions(this.chartData)
    }
  }
}
</script>
