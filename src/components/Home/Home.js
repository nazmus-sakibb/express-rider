import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import transportData from '../data/data.json';
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
        <div className="home-bg">
            <h2>This is home page</h2>
            <h3>Transports: {transports.length}</h3>
            <button><Link to='/book'>Details</Link></button>
            <div className="row">
                {
                    transports.map(transport => <Transport transport={transport} key={transport.id}></Transport>)
                }
            </div>
        </div>
    );
};

export default Home;