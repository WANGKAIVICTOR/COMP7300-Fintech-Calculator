import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Kellys from "./pages/kelly";
import Main from "./pages/main/index";
import Compound from "./pages/mixed_simple_interest"
import Simple from "./pages/simple_interest"
import Loans from "./pages/loans"
import Loansequal from "./pages/loansequal"
import Purchasingpower from "./pages/Purchasingpower"
import GDP from "./pages/gdp"
import Pincipal from "./pages/principal"
import Percentage from "./pages/percentage"
import './App.css';
import Chat from './pages/chat';


function App() {
  return (
    <div>
      <div className='chat'>
        <Chat />
      </div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/kelly" element={<Kellys />} />
          <Route path="/compound" element={<Compound />} />
          <Route path="/simple" element={<Simple />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/loansequal" element={<Loansequal />} />
          <Route path="/purchasing_power" element={<Purchasingpower />} />
          <Route path="/gdp" element={<GDP />} />
          <Route path="/principal" element={<Pincipal />} />
          <Route path="/percentage" element={<Percentage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
