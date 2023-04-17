import React from 'react';
import { BrowserRouter,Route, Routes } from 'react-router-dom';
import Kellys from "./pages/kelly";
import Main from "./pages/main/index";
import Test from "./pages/test";
import Compound from "./pages/mixed_simple_interest"
import Simple from "./pages/simple_interest"
import Loans from "./pages/loans"
import Loansequal from "./pages/loansequal"
import Marketnew  from "./pages/marketnews/index"
import Purchasingpower from "./pages/Purchasingpower"

import './App.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/kelly" element={<Kellys />} />
          <Route path="/test" element={<Test />} />
          <Route path="/compound" element={<Compound />} />
          <Route path="/simple" element={<Simple />} />
          <Route path="/loans" element={<Loans />} />
          <Route path="/loansequal" element={<Loansequal />} />
          <Route path="/marketnews" element={<Marketnew />} />
          <Route path="/purchasing_power" element={<Purchasingpower />} />
          /purchasing_power
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
