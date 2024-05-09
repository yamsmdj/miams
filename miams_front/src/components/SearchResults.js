import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const SearchResults = () => {
  const [getRecette, setGetRecette] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filtreCategorie, setFiltreCategorie] = useState(null); // État pour stocker la catégorie de filtre

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8000/api/recette")
      .then((res) => {
        setGetRecette(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.error("Erreur lors de la recuperations des recettes", e);
        setLoading(false);
      });
  }, []);


  const filtrerParCategorie = (categorie) => {
    const recettesFiltrees = getRecette.filter((recette) => recette.categorie.name === categorie);
    return recettesFiltrees;
  };


  const handleFiltreCategorie = (categorie) => {
    setFiltreCategorie(categorie);
  };

  // Filtrer les recettes en fonction de la catégorie sélectionnée
  const recettesAffichees = filtreCategorie ? filtrerParCategorie(filtreCategorie) : getRecette;

  return (
    <section>
      <div className="text-center mb-4">

        <button onClick={() => handleFiltreCategorie('Entrée')} className=" rounded-lg p-2 bg-orange-500">Entrée</button>
        <button onClick={() => handleFiltreCategorie('Plats')} className="mx-2 rounded-lg p-2  bg-orange-500">Plats</button>
        <button onClick={() => handleFiltreCategorie('Dessert')} className=" rounded-lg p-2 bg-orange-500">Dessert</button>
      </div>
      {loading ? (
        <p>Chargement ... </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center w-1/2 mx-auto">
          {recettesAffichees.length > 0 ? (
            recettesAffichees.map((recette, index) => (
              <div key={index} className="flex flex-col justify-around w-full">
                <p>
                  <strong>{recette.title}</strong>
                </p>
                <div className="">
                  <NavLink to={`/${recette.name}/${recette.id}`}>
                    {recette.title ? (
                      <img
                        src={`/assets/recettes/${recette.title.replace(
                          /\s+/g,
                          "_"
                        )}.jpg`}
                        alt={recette.name}
                        className="h-52 object-cover mx-auto rounded-xl"
                      />
                    ) : (
                      <p>Pas d'image disponible</p>
                    )}
                  </NavLink>
                </div>
              </div>
            ))
          ) : (
            <p>Aucune recette trouvée.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default SearchResults;
