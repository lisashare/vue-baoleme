<template>
  <div class="ratings">
    <div id="myChart" :style="{width:'3rem',height:'3rem'}">

    </div>
  </div>
</template>
<script>
export default {
  name:'Ratings',
  mounted() {
    this.drawLine();
  },
  methods:{
    drawLine(){
      //基于准备好的dom,初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById('myChart'))
      var colors = ['#5793f3', '#d14a61'];
      //绘制图表
      myChart.setOption({
          // 标题组件，包含主标题和副标题。
          title: {
              text: '数学平均成绩'
          },
          color: colors,
          tooltip: {  //提示框组件
              trigger: 'none',  //触发类型：什么都不触发
              axisPointer: {    //坐标轴指示器配置项
                  type: 'cross' //设置 tooltip.axisPointer.type 为 'cross' 时会自动显示 axisPointer 的 label。
              }
          },
          legend: { //图例组件:展现了不同系列的标记(symbol)，颜色和名字。可以通过点击图例控制哪些系列不显示
                  data:[{name:'我的成绩曲线',icon:'square',textStyle: {
                    padding:-6
                  }},{name:'班级平均成绩曲线',icon:'square',textStyle: {
                    padding:-6
                  }}],
              // 'circle圆', 'rect矩形', 'roundRect绘制的', 'triangle三角形', 'diamond钻石', 'pin销', 'arrow箭头'
              top:30,  //图例组件离容器上侧的距离
              left:0
          },
          grid: {
              top: 80,
              bottom: 50  //grid 组件离容器下侧的距离
          },
          xAxis: [//直角坐标系 grid 中的 x 轴，一般情况下单个 grid 组件最多只能放上下两个 x 轴，多于两个 x 轴需要通过配置 offset 属性防止同个位置多个 x 轴的重叠。
              {
                  type: 'category',//坐标轴类型'category' 类目轴，适用于离散的类目数据，为该类型时必保证刻度线和标签赌气须通过 data 设置类目数据。
                  axisTick: {  //坐标轴刻度相关设置
                      alignWithLabel: true  //保证刻度线和标签对齐
                  },
                  axisLine: {  //坐标轴轴线相关设置
                      onZero: false,  //X 轴或者 Y 轴的轴线是否在另一个轴的 0 刻度上，只有在另一个轴为数值轴且包含 0 刻度时有效。
                      lineStyle: {  //刻度线的颜色
                          color: colors[1]
                      }
                  },
                  axisPointer: {
                      label: {
                          formatter: function (params) {
                              return '我的成绩曲线  ' + params.value
                                  + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                          }                        
                      },
                  },
                  data: ["3月月考", "4月月考", "期中考试"]
              },
              {
                  type: 'category',
                  axisTick: {
                      alignWithLabel: true
                  },
                  axisLine: {
                      onZero: false,
                      lineStyle: {
                          color: colors[0]
                      }
                  },
                  axisPointer: {
                      label: {
                          formatter: function (params) {
                              return '班级平均成绩曲线  ' + params.value
                                  + (params.seriesData.length ? '：' + params.seriesData[1].data : '');
                          }
                      }
                  },
                  data: ["3月", "4月", "期中"]                  
              }
          ],
          yAxis: [
              {
                  type: 'value'  //value' 数值轴，适用于连续数据
              }
          ],
          // 系列列表
          series: [
              {
                  name:'我的成绩曲线', //系列名称，用于tooltip的显示
                  type:'line',        //折线
                  xAxisIndex: 1,      //使用的 x 轴的 index，在单个图表实例中存在多个 x 轴的时候有用
                  smooth: true,//如果是 boolean 类型，则表示是否开启平滑处理。如果是 number 类型（取值范围 0 到 1），表示平滑程度，越小表示越接近折线段，反之则反。设为 true 时相当于设为 0.5  是否平滑曲线显示
                  data: [80, 95, 90]
              },
              {
                  name:'班级平均成绩曲线',
                  type:'line',
                  smooth: true,
                  data: [90, 94, 98]
              }
          ]
          })
          }
        }
      }
      

</script>
<style lang="scss" scoped>

</style>

