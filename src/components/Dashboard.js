import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';
import { useParams } from 'react-router-dom';
import { getUserInfo } from '../services/apiService';
import ActivityChart from './ActivityChart';
import AverageSessionsChart from './AverageSessionsChart';
import PerformanceChart from './PerformanceChart';
import ScoreChart from './ScoreChart';
import StatsCard from './StatsCard';
import EnergyIcon from '../assets/energy.png'
import ProteinIcon from '../assets/Path.png'
import GlucideIcon from '../assets/apple.png'
import LipideIcon from '../assets/cheeseburger.png'

function Dashboard() {
    const [userInfo, setUserInfo] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const user = await getUserInfo(id);
                setUserInfo(user);
            } catch (error) {
                console.error("Impossible de récupérer les données de l'utilisateur", error);
            }
        };

        if (id) {
            fetchUserInfo();
        }
    }, [id]);

    if (!userInfo) {
        return <div>Chargement des données utilisateur...</div>;
    }
    
    return (
        <div className='dashboard'>
            <h1 className='title'>Bonjour <span className="dashboard-username">{userInfo.firstName}</span></h1>
            <h2 className='commentary'>Félicitation ! Vous avez explosé vos objectifs hier 👏</h2>
            <div className="charts">
                <div className='left'>
                    <ActivityChart userId={id} />
                    <div className='bottomCharts'>
                        <AverageSessionsChart userId={id} />
                        <PerformanceChart userId={id} />
                        <ScoreChart userId={id} />
                    </div>
                </div>
                <div className='right'>
                    <StatsCard
                    imageSrc={EnergyIcon}
                    color="#FF000006"
                    value={userInfo.calorieCount.toString() + "kCal"}
                    text="Calories"
                    />
                    <StatsCard
                    imageSrc={ProteinIcon}
                    color="#4AB8FF1A"
                    value={userInfo.proteinCount.toString() + "g"}
                    text="Proteines"
                    />
                    <StatsCard
                    imageSrc={GlucideIcon}
                    color="#F9CE2310"
                    value={userInfo.carbohydrateCount.toString() + "g"}
                    text="Glucides"
                    />
                    <StatsCard
                    imageSrc={LipideIcon}
                    color="#FD51811A"
                    value={userInfo.lipidCount.toString() + "g"}
                    text="Lipides"
                    />
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
