import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useParams } from "react-router-dom";

const RecetteByIngredient = () => {
  const [recette, setRecette] = useState("");
  const { ingredientName } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/recette/ingredient/${ingredientName}`)
      .then((res) => {
        setRecette(res.data);
        console.log(res.data);
      })
      .catch((e) => {
        console.error("Erreur lors de la recuperations des recettes", e);
      });
  }, [ingredientName]);

  return (
    <section>
      {/* <div className="flex flex-col lg:flex-row justify-around items-center w-1/2">
        {recette.map((recipe) => (
          <img
            src={`/assets/recettes/${recipe[0]?.title.replace(
              /\s+/g,
              "_"
            )}.jpg`}
            alt={recipe[0]?.title}
            className="min-w-64"
          />
        ))}
      </div> */}
    </section>
  );
};

export default RecetteByIngredient;
