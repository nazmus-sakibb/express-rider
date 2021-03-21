import React, { useState } from 'react';
import GoogleMap from '../GoogleMap/GoogleMap';
import './Destination.css';

const Destination = () => {

    const [destination, setDestination] = useState(true);
    const [pickFrom, setPickFrom] = useState([]);
    const [pickTo, setPickTo] = useState([]);

    const handleBlurFrom = (e) => {
        setPickFrom(e.target.value);
    }

    const handleBlurTo = (e) => {
        setPickTo(e.target.value);
    }

    return (
        <div className="row destination-container">
            <div className="col-md-2 location-form">
                {destination && <div className="destination-selection">
                    <label for="pick-from">Pick From</label>
                    <input type="text" onBlur={handleBlurFrom} name="pick-from" id="pick-from" placeholder="Farmgate" />
                    <br />
                    <br />
                    <label for="pick-to">Pick To</label>
                    <input type="text" onBlur={handleBlurTo} name="pick-to" id="pick-to" placeholder="Mohammadpur" />
                    <br />
                    <br />
                    <button onClick={() => setDestination(!destination)}>Search</button>
                </div>}
                {!destination && <div className="destination-results">
                    <h5 style={{marginBottom: '0'}}>Mirpur: {pickFrom} </h5>
                    <span>To</span> 
                    <h5>Dhanmondi: {pickTo}</h5>
                    <div>
                        <div className="row transport-container">
                            <div className="col-md-4">
                                <p>Image</p>
                            </div>
                            <div className="col-md-4">
                                <p>Car</p>
                            </div>
                            <div className="col-md-4">
                                <p>$67</p>
                            </div>
                        </div>
                    </div>
                </div>}
            </div>
            <div className="col-md-10 destination-map">
                <GoogleMap />
            </div>
        </div>
    );
};

export default Destination;