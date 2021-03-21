import React from 'react';
import { useHistory } from 'react-router-dom';
import './Transport.css';

const Transport = (props) => {
    const {name, image, price, id} = props.transport;

    const history = useHistory();

    const handleTransportClick = () => {
        history.push('/destination');
    }

    return (
        <div className="transport-card" onClick={handleTransportClick}>
            <img src={image} alt="" className="img-fluid" />
            <p>{name}</p>
        </div>
    );
};

export default Transport;