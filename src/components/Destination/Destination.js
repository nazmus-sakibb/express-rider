import React from 'react';
import './Destination.css';

const Destination = () => {
    return (
        <div>
            <div className="col-md-2 location-form">
                <label for="pick-from">Pick From</label>
                <input type="text" id="pick-from" placeholder="Farmgate"/>
                <br/>
                <br/>
                <label for="pick-to">Pick To</label>
                <input type="text" id="pick-to" placeholder="Mohammadpur"/>
                <br/>
                <br/>
                <button>Search</button>
            </div>
            <div className="col-md-10"></div>
        </div>
    );
};

export default Destination;