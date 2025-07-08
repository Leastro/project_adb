import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//page
import Main from "./Main/Main";
import Shelter_detail from "./shelter_detail/detail.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main/>} />
        <Route path='Shelter_detail/:postId' element={<Shelter_detail/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;