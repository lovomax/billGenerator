import react from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Bill } from './pages/Bill';
import { Home } from './pages/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/bill" element={<Bill />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
