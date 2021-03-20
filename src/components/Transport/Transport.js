import React from 'react';
import './Transport.css';

const Transport = (props) => {
    const {name, image, price, id} = props.transport;
    return (
        <div className="col-md-3 transport-card">
            {/* <h2>This is transport</h2> */}
            <img src={image} alt=""/>
            <p>{name}</p>
        </div>
    );
};

export default Transport;