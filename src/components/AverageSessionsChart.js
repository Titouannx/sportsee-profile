import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, Rectangle } from 'recharts';
import { getUserAverageSessions } from '../services/apiService';
import '../styles/AverageSessionsChart.css';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip" style={{ backgroundColor: '#FFF', padding: '10px 20px 0px 20px', height:'50px'}}>
        <p style={{color:'black', fontWeight:'bold'}}>{`${payload[0].value} min`}</p>
      </div>
    );
  }
  return null;
};

const CustomizedCursor = ({ x, y }) => (
  <g>
    <Rectangle
      x={x}
      y={y-500}
      width={1000}
      height={1000}
      fill="#000"
      opacity={9.75/100}
    />
  </g>
);

function AverageSessionsChart({ userId }) {
  const [sessionData, setSessionData] = useState([]);
  const [cursorPosition, setCursorPosition] = useState({ x: null, y: null });

  const handleMouseMove = (event) => {
    const { chartX, chartY } = event;
    setCursorPosition({ x: chartX, y: chartY });
  };

  useEffect(() => {
    const fetchSessionData = async () => {
      try {
        const response = await getUserAverageSessions(userId);
        const formattedData = response.sessions.map((session, index) => {
          const daysOfWeek = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
          console.log(daysOfWeek)
          return {
            ...session,
            day: daysOfWeek[index],
          };
        });
        setSessionData(formattedData);
      } catch (error) {
        console.error("Erreur lors de la récupération des sessions moyennes", error);
      }
    };

    fetchSessionData();
    console.log()
  }, [userId]);

  return (
    <div className="chart-container-bottom" style={{ backgroundColor: '#FF0000', padding: '0px'}}>
      <ResponsiveContainer width="99%" aspect={1.3}>
        <AreaChart data={sessionData} onMouseMove={handleMouseMove} margin={{bottom: -30, top: 50}}>
        <text className='textAverageSession' textAnchor="middle" dominantBaseline="middle" style={{transform: 'translate(30%, 10%)', fontSize: '20px', fontWeight: 'bold', fill: '#FFFFFF75'}}>Durée moyenne des sessions</text>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="5%" stopColor="#FFF" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#FFF" stopOpacity={1} />
            </linearGradient>
          </defs>
            <XAxis dx={20} type="category" interval={'preserveStartEnd'} dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#FFFFFF75' }} style={{scale: '0.90'}}/>
          <Tooltip content={<CustomTooltip />} cursor={<CustomizedCursor x={cursorPosition.x} y={cursorPosition.y} />} />
          <Area type="natural" dataKey="sessionLength" fill="#FFFFFF1B" stroke="url(#lineGradient)" strokeWidth={3} dot={false} activeDot={{ r: 8, fill: 'white', stroke: '#FFFFFF33', strokeWidth: 15 }}/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AverageSessionsChart;
