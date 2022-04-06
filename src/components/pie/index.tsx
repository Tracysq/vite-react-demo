import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const Pie = (props) => {
    const divRef = useRef(null)
    useEffect(() => {
        const { data } = props
        console.log(props)
        const statistics = data.statistics
        const legendData = []
        let pieDdata = []

        const keyMap = {
            'notify': '通知',
            'warn': '警告',
            'fault': '故障'
        }

        for (let key in statistics) {
            if(key !== 'total') {
                pieDdata.push({
                    name: key,
                    value: statistics[key]
                })
            }
        }
        console.log(pieDdata, legendData)

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(divRef.current);
        // 绘制图表
        myChart.setOption({
            tooltip: {
                trigger: 'item'
            },
            legend: {
                orient: 'vertical',
                top: 'center',
                bottom: 10,
                right: 10,
                formatter: function (name) {
                    const percent = statistics.total ? statistics[name] / statistics.total : 0
                    return keyMap[name] + ` ${percent}%`;
                }
            },
            series: [
                {
                    // name: 'Access From',
                    type: 'pie',
                    radius: ['40%', '60%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '40',
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    // data: [
                    //     { value: 1048, name: 'Search Engine' },
                    //     { value: 735, name: 'Direct' },
                    //     { value: 580, name: 'Email' },
                    //     { value: 484, name: 'Union Ads' },
                    //     { value: 300, name: 'Video Ads' }
                    // ]
                    data: pieDdata
                }
            ]
        });
    }, [])
    return (
        <div ref={divRef} className="pie"></div>
    )
}