
import './App.css';
import React from 'react';
import { Route , Routes } from "react-router-dom";
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import About from './Component/About';
import Contact from './Component/Contact';





    

function App() {
  return (
    <div className='relative z-0 bg-primary gradient1 '>
      
      <div className='h-full bg-hero-pattern bg-center'>
        <Navbar/>
      </div>
    
       
     
        <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        {/* <Route path="/help" element={<Help />} /> */}
      </Routes>

    



     





      </div>
 
  );
}



export default App;
