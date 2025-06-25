import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//page
import Main from "./Main/Main";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;