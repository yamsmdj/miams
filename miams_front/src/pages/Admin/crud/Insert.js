import React, { useEffect, useState } from "react";
import axios from "axios";

const Insert = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(5);
  const [categorieId, setCategorieId] = useState(0);
  const [categories, setCategories] = useState([]);

  


  useEffect(() => {
    axios
      .get("http://localhost:8000/api/categorie/")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération de la catégorie", error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const selectedCategory = categories.find(cat => cat.id === categorieId);

    if (selectedCategory) {

      const categorieName = selectedCategory.name ;

      console.log(title);
      console.log(description);
      console.log(time);
      console.log(categorieName);

      axios
        .post("http://localhost:8000/api/recette/", {
          title: title,
          description: description,
          time: time,
          categorie: {
            name: categorieName
          },
        })
        .then((res) => {
          console.log("Recette ajoutée avec succès !");
        })
        .catch((error) => {
          console.error("Erreur lors de la création de la recette", error);
        });
    } else {
      console.error("Aucune catégorie sélectionnée");
    }
  };

  return (
    <section className="bg-orange-500 w-10/12 mx-auto">
      <h1 className="text-center text-white font-semibold text-3xl pt-5">
        Ajouter une recette
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col items-center py-10 font-semibold ">
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
          onChange={(e) => setCategorieId(parseInt(e.target.value))}
        >
          <option value="">Sélectionnez une catégorie</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
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
