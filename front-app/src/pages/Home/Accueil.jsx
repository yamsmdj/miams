import React from "react";
import CardCategorie from "../../components/cards/CardCategorie";
import CardIngredient from "../../components/cards/CardIngredient";

import { jwtDecode } from 'jwt-decode'



const Accueil = () => {
  return (
    <section>
      <div className="m-auto bg-orange-400 w-10/12">
        <h1 className=" text-center">Les recettes du jour</h1>
        <div className="w-10/12 m-auto">
          <CardCategorie />
        </div>

        <h2 className="text-center">Découvrez nos ingrédients de saison</h2>
        <div className="w-10/12 m-auto">
        <CardIngredient />
        </div>

        <h2 className="text-center">Recettes de saisons</h2>

      </div>
    </section>
  );
};

export default Accueil;
