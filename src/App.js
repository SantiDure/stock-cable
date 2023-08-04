import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home/Home";
import Layout from "./Layout";
import { ItemProvider } from "./context/ItemContext";
import FormularioNuevoItem from "./pages/FormularioNuevoItem/FormularioNuevoItem";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ItemProvider>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="nuevo-item" element={<FormularioNuevoItem />} />
            </Route>
          </Routes>
        </ItemProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
