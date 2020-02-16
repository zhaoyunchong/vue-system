<template>
  <div style="width:100%" ref="echart"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  props: {
    chartData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: []
        }
      }
    },
    isAxisChart: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    chartData: {
      handler() {
        this.initChart()
      },
      deep: true
    },
    isCollapse() {
      setTimeout(() => {
        this.resizeChart()
      }, 300)
    }
  },
  computed: {
    options() {
      return this.isAxisChart ? this.axisOption : this.normalOption
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse
    }
  },
  data() {
    return {
      echart: '',
      axisOption: {
        title: {
          text: 'echart入门'
        },
        legend: {
          textStyle: {
            color: '#333'
          }
        },
        grid: {
          left: '20%' //表格向右边移动
        },
        tooltip: {
          //鼠标移到 点上 有显示文字  触动是x轴
          trigger: 'axis'
        },
        xAxis: {
          //x轴 设置
          type: 'category',
          data: [],
          axisLine: {
            //坐标线条颜色
            lineStyle: {
              color: '#17b3a3'
            }
          },
          axisLabel: {
            //坐标文字颜色
            color: '#333'
          }
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3'
              }
            }
          }
        ],
        color: [
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
          '#e5cf0d',
          '#97b552',
          '#95706d',
          '#dc69aa',
          '#07a2a4',
          '#9a7fd1',
          '#588dd5',
          '#f5994e',
          '#c05050',
          '#59678c',
          '#c9ab00',
          '#7eb00a',
          '#6f5553',
          '#c14089'
        ],
        series: []
      },
      normalOption: {
        series: []
      }
    }
  },
  mounted() {
    window.addEventListener('resize', this.resizeChart.bind(this))
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeChart())
  },
  methods: {
    resizeChart() {
      this.echart ? this.echart.resize() : ''
    },
    //   初始化echarts
    initChart() {
      this.initChartData()
      if (this.echart) {
        this.echart.setOption(this.options)
      } else {
        this.echart = echarts.init(this.$refs.echart)
        this.echart.setOption(this.options)
      }
    },
    initChartData() {
      if (this.isAxisChart) {
        this.axisOption.xAxis.data = this.chartData.xData
        this.axisOption.series = this.chartData.series
      } else {
        this.normalOption.series = this.chartData.series
      }
    }
  }
}
</script>
<style lang="scss" scoped></style>
