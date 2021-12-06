import React, { useEffect } from 'react';
import Header from '../components/Header';
import SideNav from '../components/SideNav';

export default function Dashboard() {
    return (
        <React.Fragment>
            {/* Navbar */}
            <Header />
            {/* Sidebar */}
            <SideNav />
            {/* Content */}
            
        </React.Fragment>
    )
}
