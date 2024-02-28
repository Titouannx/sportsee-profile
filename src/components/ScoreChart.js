import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Text } from 'recharts';
import { getUserInfo } from '../services/apiService';

const ScoreChart = ({ userId }) => {
  const [todayScore, setTodayScore] = useState(0);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await getUserInfo(userId);
        setTodayScore(userInfo.todayScore * 100);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations utilisateur", error);
      }
    };

    fetchUserInfo();
  }, [userId]);

  const startAngle = 90;
  const endAngle = startAngle + (todayScore * 360) / 100;

  return (
    <div className="chart-container-bottom">
        <ResponsiveContainer width="99%" aspect={1.3} style={{ backgroundColor: '#FBFBFB'}}>
        <PieChart margin={{bottom: -30, top: 50}}>
        <text textAnchor="middle" dominantBaseline="middle" style={{transform: 'translate(15%, 15%)', fontSize: '20px', fontWeight: 'bold', fill: '#20253A'}}>Score</text>
            <Pie
            data={[{ name: 'Empty', value: 100 - todayScore }]}
            dataKey="value"
            cx="50%"
            cy="45%"
            innerRadius="0%"
            outerRadius="60%"
            fill="#fff"
            isAnimationActive={false}
            >
            <Cell fill="#fff" />
            </Pie>
            <Pie
            data={[{ name: 'Score', value: todayScore }]}
            dataKey="value"
            cx="50%"
            cy="45%"
            innerRadius="60%"
            outerRadius="75%"
            startAngle={startAngle}
            endAngle={endAngle}
            fill="white"
            paddingAngle={5}
            cornerRadius={20}
            >
            <Cell fill={`#FF0000`} />
            </Pie>
            <text textAnchor="middle" dominantBaseline="middle" style={{transform: 'translate(50%, 50%)', fontSize: '1.5vh', fill: '#282D30', fontWeight: 'bold'}}>{`${todayScore}%`}</text>
            <text textAnchor="middle" dominantBaseline="middle" style={{transform: 'translate(50%, 60%)', fontSize: '1.5vh', fill: '#74798C', width: '10px'}}>de votre objectif</text>
        </PieChart>
        </ResponsiveContainer>
    </div>
  );
};

export default ScoreChart;
