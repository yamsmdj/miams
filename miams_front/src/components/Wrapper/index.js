import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const index = ({children}) => {
    return (
        <div>
            <Navbar />
            {children}
            <Footer />
        </div>
    );
};

export default index;