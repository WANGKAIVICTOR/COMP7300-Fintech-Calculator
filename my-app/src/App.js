import React from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';


import Kellys from "./pages/kelly";
import Main from "./pages/main";
import Test from "./pages/test";

import './App.css';

function App() {
  return (
    <div>
      <h1>我是一个导航栏</h1>
      <BrowserRouter>
      
        <Routes>
          <Route path="/kelly" element={<Kellys />} />
          <Route path="/" element={<Main />} />
          <Route path="/test" element={<Test />} />

          {/* ... 其他六个路由 */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
