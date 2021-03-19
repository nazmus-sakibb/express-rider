import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h2>This is home page</h2>
            <button><Link to='/book'>Details</Link></button>
        </div>
    );
};

export default Home;