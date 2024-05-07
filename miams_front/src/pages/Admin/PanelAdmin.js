import axios from "axios";
import Update from "../../assets/Icons/update.svg";
import Delete from "../../assets/Icons/delete.svg";
// import Cancel from "../../assets/Icons/cancel.svg";
// import Check from "../../assets/Icons/check.svg";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const PanelAdmin = () => {
  const [recettes, setRecettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState("")
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [choiceDelete, setChoiceDelete] = useState(null)
  const recettes_id = recettes.map((rec) => (rec.id))


  useEffect(() => {

    

    axios
      .get("http://localhost:8000/api/recette")
      .then((res) => {
        setRecettes(res.data);
        // console.log(res.data);
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

  const handleDeleteClick = (recette) => {
    setChoiceDelete(recette)
    setConfirmDelete(true);
  };

  const handleCancelDelete = () => {
    setConfirmDelete(false);
    setChoiceDelete(null)
  };

  const handleConfirmDelete = () => {
      axios
        .delete(`http://localhost:8000/api/recette/${choiceDelete.id}`)
        .then(() => {
          setRecettes(recettes.filter((rec) => rec.id !== choiceDelete.id));
          setConfirmDelete(false);
          setChoiceDelete(null)
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression de la recette : ", error);
          setConfirmDelete(false);
        });
  };

  return (
    <section className="flex w-full">
      <div className="flex justify-around w-10/12 mx-auto items-center">
        <div className="flex flex-col w-8/12 ">
          <div className="flex flex-row-reverse justify-between items-center py-5 ">
            <NavLink to="/admin/insert/">
              <button className=" bg-green-500 rounded-xl p-3">
                Ajouter une recettes
              </button>
            </NavLink>
            <h1>Liste des recettes : </h1>
          </div>
          <ul className="grid grid-cols-5 p-2 bg-gray-500 text-white text-center font-semibold uppercase rounded-lg">
            <li>Image</li>
            <li>Categorie</li>
            <li>Recettes</li>
            <li>Modifier</li>
            <li>Supprimer</li>
          </ul>
          {loading ? (
            <p>chargement...</p>
          ) : (
            <>
              {recettes.map((recette) => (
                <ul
                className="grid grid-cols-5  py-3 items-center even:bg-slate-300"
                key={recette.id}
                >
                <li>
                  <img src={`/assets/recettes/${recette.title?.replace(/\s+/g,"_")}.jpg`} alt={`image de ${recette.title}`} className="w-16 mx-auto" />
                </li>
                    <li className="flex items-center justify-center  ">
                      {recette.categorie.name}
                    </li>
                  <NavLink to={`/recette/${recette.id}`}>
                    <li className="flex items-center justify-center  ">
                      {recette.title}
                    </li>
                  </NavLink>
                  <NavLink to={`/admin/update/${recette.id}`}>
                    <li>
                      <img src={Update} alt="" className="mx-auto" />
                    </li>
                  </NavLink>



                  <li>
                  {choiceDelete && choiceDelete.id === recette.id ? (
                      <div className="text-center">
                        <p>Confirmer</p>
                        <button onClick={handleConfirmDelete}>Confirmer</button>
                        <button onClick={handleCancelDelete}>Annuler</button>
                      </div>
                    ) : (
                      <div className="text-center">
                        {/* {console.log(recette.id)} */}
                        <button onClick={() => handleDeleteClick(recette)}>
                          <img src={Delete} alt="suppression" />
                        </button>
                      </div>
                    )}
                  </li>



                  
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
