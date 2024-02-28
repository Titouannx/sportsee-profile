import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, YAxis, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { getUserActivity } from '../services/apiService';
import '../styles/ActivityChart.css';

function ActivityChart({ userId }) {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    const fetchActivityData = async () => {
      try {
        const userActivity = await getUserActivity(userId);
        setActivityData(userActivity.sessions);
      } catch (error) {
        console.error("Erreur lors de la récupération des données d'activité", error);
        setActivityData([]);
      }
    };

    fetchActivityData();
  }, [userId]);

  function CustomTooltip({ active, payload }) {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{`${payload[0].value}kg`}</p>
          <p>{`${payload[1].value}Kcal`}</p>
        </div>
      );
    }
  
    return null;
  }

  return (
    <div className="chart-container-top">
      <h2 className="chart-title">Activité quotidienne</h2>
      <ResponsiveContainer width="99%" aspect={5}>
        <BarChart barGap={10} data={activityData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke='#DEDEDE' vertical={false} />
          <XAxis dy={10} dataKey="day" tick={{ fill: '#9B9EAC', fontFamily: 'Roboto', fontSize: 14, fontWeight: 'bold'}} axisLine={{ stroke: '#DEDEDE' }} tickLine={false} />
          <YAxis yAxisId="right1" dataKey="calories" stroke='#9B9EAC' orientation="right" axisLine={false} tickLine={false} tick={false}/>
          <YAxis type="number" tickCount={3} tickFormatter={(value) => value.toFixed(0)} domain={['dataMin - 1','dataMax + 1']} yAxisId="right" dataKey="kilogram" stroke='#9B9EAC' orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#9B9EAC', fontFamily: 'Roboto', fontSize: 14, fontWeight: 'bold'}}/>
          <Tooltip content={<CustomTooltip />} cursor={{fill: '#C4C4C480'}}/>
          <Legend align="right" verticalAlign="top" iconType='circle' wrapperStyle={{ top: '-50px' }} />
          <Bar name='Poids (kg)' yAxisId="right" dataKey="kilogram" fill="#000" barSize={8} radius={[10, 10, 0, 0]} />
          <Bar name='Calories brûlées (kCal)' yAxisId="right1" dataKey="calories" fill="#e60000" barSize={8} radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ActivityChart;
