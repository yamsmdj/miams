import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Recette = () => {
  const [recettes, setRecettes] = useState([]);
  const { recetteId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/recette/${recetteId}`)
      .then((res) => {
        setRecettes(res.data);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des produits : ",
          error
        );
      });
  }, [recetteId]);

  return (
    <section>
      <div className="flex flex-col items-center w-8/12 mx-auto ">
        <h1 className="font-bold text-xl py-4 my-3">{recettes.title}</h1>
        <div className="flex flex-col lg:flex-row justify-around items-center w-1/2">
            <img
              src={`/assets/recettes/${recettes.title?.replace(
                /\s+/g,
                "_"
              )}.jpg`}
              alt={recettes.title}
              className=" min-w-64"
            />
          <div>
            <h2>Temps de préparation:</h2>
            <p className="my-6 underline font-semibold">{recettes.time} minutes</p>
            <h3>Niveau de difficulté</h3>
          </div>
        </div>
        <div>
          <h1 className="font-bold text-center text-xl my-6 py-4  w-96">INGREDIENTS</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 pb-8">
            {recettes.ingredient?.map((ingredient, index) => (
              <div key={index} className="flex items-center justify-around  even:bg-slate-100  sm:even:bg-transparent">
                <p >{ingredient.name}</p>
                <img
                  src={`/assets/ingredients/fruitslegumes/${ingredient.name.replace(/\s+/g, "_")}.jpg`}
                  className="w-12 rounded-xl "
                  alt={ingredient.name}
                />
              </div>
            ))}
          </div>
        </div>
        {console.log(recettes)}
        <h1 className="font-bold text-xl">PRÉPARATION</h1>
        { recettes.etapes?.map((step) => (
          <div key={step.nEtape} className="grid grid-cols-2 py-3 text-left w-11/12 border-y-2">
          <h3 className="font-bold text-lg pl-5">ETAPE {step.nEtape} : </h3>
          <p>{step.description}</p>
          </div>
        ))}
      </div>

    </section>
  );
};

export default Recette;
