import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css'
import Glowna from './pages/glowna';
import Onas from './pages/Onas';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Routes>
    <Route path="/" index element={<Glowna />}>
    </Route>
    <Route path="onas" element={<Onas/>}></Route>
  </Routes>
</BrowserRouter>
)
