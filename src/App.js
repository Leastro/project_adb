import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//page
import Main from "./Main/Main";
import Registration from "./registration/registration.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main/>} />
        <Route path='registration' element={<Registration/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;