import React from 'react';
import NavBarNew from '../../Component/NavBar New/navBarNew';
import CardJobs from './Card Jobs/cardJobs';
import Filter from './Filter/filter';
import './alljobs.css';


export default function AllJobs() {

    return (
        <>
            <NavBarNew />
            <div style={{ backgroundColor: "#eeeeee", height: 'auto' }}>
                <div className='filter-data-block'>
                    <Filter />
                </div>
                <div className='card-jobs'>
                    <CardJobs />
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}