import React, { useEffect, useState } from "react";
import axios from "axios";

const Insert = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(5);
  const [categorieId, setCategorieId] = useState("");
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

  const handleSubmit = (e) => {

    console.log(title);
    console.log(description);
    console.log(time);
    console.log(categorieId);

    const categorieName = categories.find(cat => cat.id === categorieId)?.name;
    e.preventDefault()
    axios 
      .post("http://localhost:8000/api/recette/", {
        title: title,
        description: description,
        time: time,
        categorie: categorieName,
        created_at: new Date().toISOString()
      })
      .then((res) => {
        console.log("Recette ajouté avec succès !");
      })
      .catch((error) => {
        console.error("Erreur lors de la création de la recette", error);
      });
  };

  return (
    <section className="bg-orange-500 w-10/12 mx-auto">
      <h1 className="text-center text-white font-semibold text-3xl pt-5">
        Ajouter une recette
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
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
        <select
          value={categorieId}
          onChange={(e) => setCategorieId(e.target.value)}
        >
          <option >Selectionnez une catégorie</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button type="submit" className=" bg-green-600 rounded-xl p-2 mt-6">
          Ajouter la recette
        </button>
      </form>
    </section>
  );
};

export default Insert;
