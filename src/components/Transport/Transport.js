import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Transport.css';

const Transport = (props) => {
    const {name, image, price, id} = props.transport;

    const history = useHistory();

    const handleTransportClick = () => {
        history.push('/destination');
    }

    return (
        <div className="col-sm-12 transport-card" onClick={handleTransportClick}>
            <img src={image} alt=""/>
            <p>{name}</p>
        </div>
    );
};

export default Transport;