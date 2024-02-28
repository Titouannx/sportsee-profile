import React from 'react';
import '../styles/Sidebar.css';
import YogaIcon from '../assets/Yoga.png'
import NatationIcon from '../assets/Natation.png'
import CyclismeIcon from '../assets/Cyclisme.png'
import MusculationIcon from '../assets/Musculation.png'

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className='sidebar-items'>
                <div className="item"><img src={YogaIcon} alt="Icône Yoga" /></div>
                <div className="item"><img src={NatationIcon} alt="Icône Natation" /></div>
                <div className="item"><img src={CyclismeIcon} alt="Icône Cyclisme" /></div>
                <div className="item"><img src={MusculationIcon} alt="Icône Musculation" /></div>
            </div>
            <p className="sidebar-copyright">Copyright, SportSee 2020</p>
        </aside>
    );
}

export default Sidebar;
