import React, { useState, useEffect } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, Text } from 'recharts';
import { getUserPerformance } from '../services/apiService';
import '../styles/PerformanceChart.css';

const PerformanceChart = ({ userId }) => {
  const [performanceData, setPerformanceData] = useState([]);

  useEffect(() => {
    const fetchPerformanceData = async () => {
      try {
        const response = await getUserPerformance(userId);
        setPerformanceData(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching performance data: ", error);
      }
    };

    fetchPerformanceData();
  }, [userId]);

  function renderPolarAngleAxis({ payload, x, y, cx, cy, ...rest }) {
    return (
      <Text className='textPerformanceTag' style={{fontSize: '16px', fontWeight: 'bold', fill: '#FFF'}}
        {...rest}
        verticalAnchor="middle"
        y={y + (y - cy) / 8}
        x={x + (x - cx) * 0}
      >
        {payload.value}
      </Text>
    );
  }

  return (
    <div className="chart-container-bottom" style={{ backgroundColor: '#282D30'}}>
      <ResponsiveContainer width="99%" aspect={1.3} className="radar-chart-container">
        <RadarChart className="radar-chart" cx="50%" cy="50%" outerRadius="80%" data={performanceData} style={{width:'80%', margin:'auto'}}>
          <PolarGrid strokeWidth={2} radialLines={false}/>
          <PolarAngleAxis dataKey="kind" tick={props => renderPolarAngleAxis(props)} />
          <Radar name="Performance" dataKey="value" stroke="#FF0101" fill="#FF0101" fillOpacity={0.7} />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PerformanceChart;
