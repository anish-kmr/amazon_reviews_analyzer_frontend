<template>
    <div class="chart">
        <highcharts :options="chartOptions"></highcharts>
    </div>
</template>

<script>
export default {
    props:['data','categories'],
    data() {
        return {
            
            chartOptions: {
                chart:{
                    type:"column",
                    height:350,
                    groupPadding:0.1,
                },
                title:{
                    text:"",
                },
                credits: {
                  enabled: false
                },
                xAxis:{
                    categories:this.categories,    
                    min:0,
                    max:1,
                    labels: {
                      // useHTML: true,
                      tickPixelInterval:1,
                      x:0,
                      y:40,
                      style: {
                        "font-size": "28px"
                      },
                    }
                },
                yAxis: {
                    min:0,
                    gridLineWidth: 2,
                    lineWidth: 1,
                    title:{
                        text:"Number of Reviews",
                        style:{
                            "font-size":"18px"
                        }
                    },
                    labels:{
                        style: {
                          "font-size": "17px"
                        }
                    }
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.1,
                        groupPadding:0.1

                    },
                     series: {
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.y}',
                            style:{
                                "color":"#4d4d4d"
                            }
                        }
                    }
                },
                series: [
                    {
                      name: "",
                      data: this.data,
                      color: "#5c81e7"
                    }
                ],
                legend:{
                    enabled:false
                }
            }
        }
    },
}
</script>

<style scoped>
.chart{
  width: 100%;
}
</style>