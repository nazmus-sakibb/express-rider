import React, { useEffect, useState } from 'react';
import transportData from '../data/data.json';
import Transport from '../Transport/Transport';
import './Home.css';

const Home = () => {
    const [transports, setTransports] = useState([]);
    useEffect(() => {
        setTransports(transportData);
    }, [])
    return (
        <div className="homeBg">
            <div className="transports-card text-center">
                {
                    transports.map(transport => <Transport transport={transport} key={transport.id}></Transport>)
                }
            </div>

        </div>
    );
};

export default Home;