import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import transportData from '../data/data.json';
import Header from '../Header/Header';
import Transport from '../Transport/Transport';
import './Home.css';

const Home = () => {
    const [transports, setTransports] = useState([]);
    useEffect(() => {
        // const url = `api.mocki.io/v1/a4425ad2`;
        // fetch('api.mocki.io/v1/a4425ad2')
        //     .then(res => res.json())
        //     .then(data => setTransport(data.name));
        setTransports(transportData);
    }, [])
    return (
        <div className="homeBg">
            <Header/>
            <Link to='/book'>Details</Link>
            <div className="row transports-card">
                {
                    transports.map(transport => <Transport transport={transport} key={transport.id}></Transport>)
                }
            </div>

        </div>
    );
};

export default Home;