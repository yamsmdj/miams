import axios from "axios";
import Update from "../../assets/Icons/update.svg";
import Delete from "../../assets/Icons/delete.svg";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const PanelAdmin = () => {
  const [recette, setRecette] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(recette);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/recette")
      .then((res) => {
        setRecette(res.data);
        console.log(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la récupération des Recette : ",
          error
        );
        setLoading(false);
      });
  }, []);

  return (
    <section className="flex w-full">
      <div className="flex justify-around w-10/12 mx-auto items-center">
        <div className="flex flex-col w-8/12 ">
          <div className="flex flex-row-reverse justify-between items-center py-5 ">
            <NavLink to="/admin/insert/">
              <button className=" bg-green-500 rounded-xl p-3">
                Ajouter une recette
              </button>
            </NavLink>
          <h1>Liste des recettes : </h1>
          </div>
          <ul className="grid grid-cols-3 p-2 bg-gray-500 text-white text-center font-semibold uppercase rounded-lg">
            <li>Recettes</li>
            <li>Modifier</li>
            <li>Supprimer</li>
          </ul>
          {loading ? (
            <p>chargement...</p>
          ) : (
            <>
              {/* <img src={`/assets/recettes/${recette.title.replace(/\s+/g,"_")}.jpg`} alt="recette" className="w-16" /> */}
              {recette.map((recette) => (
                <ul
                  className="grid grid-cols-3  py-3 items-center even:bg-slate-300"
                  key={recette.id}
                >
                  <NavLink to={`/recette/${recette.id}`}>
                    <li className="flex items-center justify-center  ">{recette.title}</li>
                  </NavLink>
                  <NavLink to={`/admin/update/${recette.id}`}>
                    <li>
                      <img src={Update} alt="" className="mx-auto"/>
                    </li>
                  </NavLink>
                  <NavLink to="/admin/delete">
                    <li>
                      <img src={Delete} alt="" className="mx-auto" />
                    </li>
                  </NavLink>
                </ul>
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PanelAdmin;
