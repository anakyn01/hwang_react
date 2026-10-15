import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Header } from './component/Header';
import { Footer } from './component/Footer';

import { Home } from './Home';
import { Middle } from './sub/Middle';

export const App = () => {
  return(
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/middle" element={<Middle/>}/>
    </Routes>
    </BrowserRouter>
  )
}

