import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Busqueda } from "./Busqueda";
import { Productos } from "./Productos";
import { Producto } from "./Producto";
import { Compras } from "./Compras";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Busqueda />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:search" element={<Productos />} />
        <Route path="/producto/:id" element={<Producto />} />
        <Route path="/compras" element={<Compras />} />
        <Route path="*" element={<Busqueda />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
