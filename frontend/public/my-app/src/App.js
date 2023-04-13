import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./pages/Login/";
import Layout from "@/pages/Layout"

import React from 'react';
import { Button } from 'antd';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
     this is home page 
    <Button type="primary">Button</Button>
      <div className="App">  
        <Routes>
          <Route path="/layout" element={<Layout />}></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
