import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Wrapper from "./components/Wrapper";
import Accueil from "./pages/Home/Accueil";
import Log from "./pages/Login/Login";
import Shop from "./pages/Shop";
import Categorie from "./pages/Categorie/Categorie";
import Recette from "./pages/Recette/Recette";
import Dashboard from "./pages/Admin/";
import Update from "./pages/Admin/crud/Update";
import Insert from "./pages/Admin/crud/Insert";
import { useEffect } from "react";
import ChefInsert from "./pages/Admin/crud/ChefInsert";


function App() {

  useEffect(() => {  
    return () => {
      localStorage.clear()
    }
  })
  return (
    <BrowserRouter>
      <Wrapper>
        <Routes>
          <Route path="*" element={<Accueil />} />
          <Route path="/connexion" element={<Log />} />
          <Route path="/register" element={<Log />} />
          <Route path="/boutique" element={<Shop />} />
          <Route path="/:categorieName/:categorieId" element={<Categorie />} />
          <Route path="/recette/:recetteId" element={<Recette />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/update/:recetteId" element={<Update />} />
          <Route path="/admin/chefinsert" element={<ChefInsert />} />
          <Route path="/admin/insert" element={<Insert />} />

        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
