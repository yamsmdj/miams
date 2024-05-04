import React, { useEffect, useState } from "react";
import axios from "axios";

const Insert = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(5);
  // const [categorie, setCategorie] = useState("");
  const [categories, setCategories] = useState([]);
  const [created_at, setCreated_at] = useState(new Date());

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categorie/")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la recupéaration de la categorie", error);
      });
  }, []);

  const recetteSubmit = {
    title: "yammms2",
    description: "Tres bonne pour l'été fraiche et appetissante",
    time: 20,
    created_at: "2024-04-20"
  };

  // const handleSubmit = () => {
  //   axios
  //     .post("http://localhost:8000/api/recette/", recetteSubmit , {
  //       timeout: 3000
  //     })
  //     .then((res) => {
  //       console.log("Recette ajoutée avec succès !");
  //     })
  //     .catch((error) => {
  //       console.error(error.message,error);
  //     });
  // };
  const handleSubmit = async () => {
    const rawResponse = await fetch("http://localhost:8000/api/recette/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recetteSubmit),
    });
    const content = await rawResponse.json();

    console.log(content);
  };

  return (
    <section className="bg-orange-500 w-10/12 mx-auto">
      <h1 className="text-center text-white font-semibold text-3xl pt-5">
        Ajouter une recette
      </h1>
      <form
        action=""
        method="POST"
        onSubmit={handleSubmit}
        className="flex flex-col items-center py-10 font-semibold "
      >
        <label htmlFor="">Nom de la recette </label>
        <div className="">
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <label htmlFor="">Description </label>
        <div className="">
          <textarea
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <label htmlFor="">Temp total de la recette </label>
        <div className="">
          <input
            type="number"
            onChange={(e) => setTime(parseInt(e.target.value))}
          />
        </div>
        <label htmlFor="">Categorie </label>
        {/* <select
          value={categorie}
          onChange={(e) => setCategorie(e.target.value)}
        >
          <option value="">Selectionnez une catégorie</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select> */}
        <div className="my-2">
          <input
            type="hidden"
            name="created_at"
            onChange={(e) => setCreated_at(new Date())}
          />
        </div>
        <button type="submit" className=" bg-green-600 rounded-xl p-2 mt-6">
          Ajouter la recette
        </button>
      </form>
    </section>
  );
};

export default Insert;
