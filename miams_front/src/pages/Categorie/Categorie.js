import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";

const Categorie = () => {
  const [categorie, setCategorie] = useState([]);
  const { categorieId } = useParams();


  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/categorie/${categorieId}/`)
      .then((res) => {
        setCategorie(res.data);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération de la categorie : ",
          error
        );
      });
  }, [categorieId]);
  return (
      <section className="grow">
        <h1 className=" w-8/12 mx-auto my-3 text-3xl text-center">{categorie?.name}</h1>
        {categorie && (
          <div className="grid grid-cols-1 md:grid-cols-4 mx-auto w-8/12  font-bold text-center ">
            {categorie.recette?.map((recette, index) => (
              <div key={recette.id}>
                <p className="mt-4" >{recette.title}</p>
                <NavLink to={`/recette/title/${recette.title.toLowerCase().replace(/\s+/g,"_")}`}>
                  <img
                    src={`/assets/recettes/${recette.title.replace(/\s+/g,"_")}.jpg`}
                    alt={categorie.title}
                    className=" max-w-40 mx-auto rounded-lg m-4"
                  />
                </NavLink>
              </div>
            ))}
          </div>
        )}
      </section>
  );
};

export default Categorie;
