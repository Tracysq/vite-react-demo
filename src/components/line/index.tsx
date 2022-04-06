import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

export const Line = (props) => {
    const divRef = useRef(null)
    useEffect(() => {
        const { data } = props
        console.log(props)
        const cool_power = data.cool_power

        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(divRef.current);
        // 绘制图表
        myChart.setOption({
            title: {
                text: '总制冷功率(单位:KWH)',
                textStyle: {
                    fontSize: 12,
                    color: '#555',
                },
                // padding: 15
                right: 0
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                data: cool_power && cool_power.map(item => item.time),
                axisTick: {
                    show: false
                }
            },
            yAxis: {
                type: 'value',
                boundaryGap: false,
                axisLine: { 
                    show: true
                }
            },
            series: [
                {
                    // data: [820, 932, 901, 934, 1290, 1330, 1320],
                    data: cool_power && cool_power.map(item => item.val),
                    type: 'line',
                    areaStyle: {}
                }
            ]
        });
    }, [])
    return (
        <div ref={divRef} className="line"></div>
    )
}