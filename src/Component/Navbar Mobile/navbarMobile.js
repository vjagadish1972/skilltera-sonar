import React from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './navbarMobile.css'
import { selectHomeItemSelection } from '../../Redux/Reducer/homeItemSelectionSlice';

export default function NavbarMobile() {
    const ItemSelection = useSelector((state) => {
        return state.homeItemSelection
    })
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const homeSelectionItem = (item) => {
        dispatch(selectHomeItemSelection(item));
        if (item == 'client') {
            navigate('/client')
            document.documentElement.style.setProperty('--list-item-color', '#246DA2');
            document.documentElement.style.setProperty('--list-box-shadow', 'rgba(36, 109, 162, 0.2)');
        }
        if (item == 'refer') {
            navigate('/refer')
            document.documentElement.style.setProperty('--list-item-color', '#750887');
            document.documentElement.style.setProperty('--list-box-shadow', 'rgba(36, 109, 162, 0.2)');
        }
        if (item == 'candidate') {
            navigate('/')
            document.documentElement.style.setProperty('--list-item-color', '#FF8C04');
            document.documentElement.style.setProperty('--list-box-shadow', 'rgba(255, 110, 4, 0.18)');
        }
    }
    return (
        <>
            <div className='mobile-navbar'>


                <div className='d-flex aligns-items-center'>
                    <button className={ItemSelection == 'candidate' ? 'activeClass-mobile' : 'navbar-mobile-button'}
                        onClick={() => homeSelectionItem('candidate')} type="button">Rise and Shine</button>
                </div>
                <div className='d-flex aligns-items-center'>
                    <button className={ItemSelection == 'refer' ? 'activeClass-mobile' : 'navbar-mobile-button'}
                        onClick={() => homeSelectionItem('refer')} type="button">Refer and Earn</button>
                </div>
                <div className='d-flex aligns-items-center'>
                    <button className={ItemSelection == 'client' ? 'activeClass-mobile' : 'navbar-mobile-button'}
                        onClick={() => homeSelectionItem('client')} type="button">Hire Talent</button>
                </div>

            </div>

        </>
    );
}