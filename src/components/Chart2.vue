<template>
    <div class="chart2">
        <highcharts :options="chartOptions"></highcharts>
    </div>
</template>

<script>
export default {
    props:['data'],
    data() {
        return {
            
            chartOptions: {
                chart:{
                    type:"column",
                    height:350
                },
                title:{
                    text:"",
                },
                credits: {
                  enabled: false
                },
                xAxis:{
                    categories:["1-2", "2-3", "3-4", "4-5"],    
                    min:0,
                    max:3,
                    labels: {
                      useHTML: true,
                      tickPixelInterval:0,
                      x:0,
                      y:40,
                      style: {
                        "font-size": "32px"
                      },
                    }
                },
                yAxis: {
                    min:0,
                    gridLineWidth: 1,
                    lineWidth: 1,
                    title:{
                        text:"Number of reviews",
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
.chart2{
  width:100%
}
</style>
