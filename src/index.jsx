import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Glowna from './pages/Glowna';
import Onas from './pages/Onas';
import Kontakt from './pages/Kontakt';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" index element={<Glowna />}></Route>
    <Route path="onas" element={<Onas/>}></Route>
    <Route path="kontakt" element={<Kontakt/>}></Route>
  </Routes>
</BrowserRouter>
)
