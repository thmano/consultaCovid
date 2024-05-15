import "./App.css";
import Brasil from "./brasil";
import Countries from "./countries";
import FormData from "./formData";
import Menu from "./menu";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//na pagina inicial apenas importamos o componente menu e os outros componentes do sistemas estão envoltos do routes pois para podermos mudar as paginas do sistema utilizamos o react-router

function App() {
  return (
    <div className="content">
      <Router>
        <Menu />
        <Routes>
          <Route exact path="/brasil" element={<Brasil />} />
          <Route exact path="/countries" element={<Countries />} />
          <Route exact path="/sendData" element={<FormData />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
