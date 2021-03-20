import React from 'react';
import { Link } from 'react-router-dom';
import './Transport.css';

const Transport = (props) => {
    const {name, image, price, id} = props.transport;
    return (
        <div className="col-sm-12 transport-card">
            <img src={image} alt=""/>
            <p>{name}</p>
            <Link to='/destination'>Details</Link>
        </div>
    );
};

export default Transport;