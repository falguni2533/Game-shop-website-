import React from 'react';
import './main.css';
import SideMenu from '../components/SideMenu';
import Header from '../components/Header';


function Main() {
   return(
   <main>
   <SideMenu />
    <div className="banner">
    <Header />
    </div>
   </main>
   
   ); 
}

export default Main;
