import React, {Component, useState, useReducer } from 'react';
import { BrowserRouter, Route, Routes,useParams } from 'react-router-dom';
import Join from './Join.js';
import Login from './Login.js';
import List from './List.js';
import Write from './Write.js';
import Detail from './Detail.js';
import Update from './Update.js';
import NotFound from './NotFound';
import './App.css';


function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  return (
    <BrowserRouter>
    <div className="App">
        <header className="App-header">
          <p>연습용</p>
        </header>
        <div>
          <Routes>
            <Route path='/' element={<Login/>} />
            <Route path='/join' element={<Join/>} />
            <Route path='/list' element={<List/>} />
            <Route path='/write' element={<Write/>} />
            <Route path='/write/:bbsId' element={<Write/>} />

            <Route path='/detail/:bbsId' element={<Detail/>} />
            
            <Route path="*" element={<NotFound/>} />
          </Routes>
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
