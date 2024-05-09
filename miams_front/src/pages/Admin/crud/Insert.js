import React, { useEffect, useState } from "react";
import axios from "axios";

const Insert = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState(5);
  const [categorieId, setCategorieId] = useState(0);
  const [etapes, setEtapes] = useState([{ n_etape: 1, description: "" }]);
  const [categories, setCategories] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
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

  const handleImageUpload = async (selectedImage) => {
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      await axios.post("http://localhost:8000/upload-image", formData);
      console.log("Image uploaded successfully");
      // Affichez un message de confirmation à l'utilisateur
    } catch (error) {
      console.error("Failed to upload image:", error);
      // Affichez un message d'erreur à l'utilisateur
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedCategory = categories.find((cat) => cat.id === categorieId);
    if (selectedCategory) {
      const categorieName = selectedCategory.name;
      const etapesToSend = etapes.map((etape, index) => ({
        n_etape: index + 1, // Numéro d'étape
        description: etape.description,
      }));
      axios
        .post("http://localhost:8000/api/recette/", {
          title: title,
          description: description,
          time: time,
          categorie: {
            name: categorieName,
          },
          etapes: etapesToSend,
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
  const handleAddEtape = () => {
    const newEtapeNumber = etapes.length + 1;
    setEtapes([...etapes, { n_etape: newEtapeNumber, description: "" }]);
  };
  const handleEtapeChange = (index, value) => {
    const updatedEtapes = [...etapes];
    updatedEtapes[index].description = value;
    setEtapes(updatedEtapes);
  };

  return (
    <section className="bg-orange-500 w-10/12 mx-auto">
      <h1 className="text-center text-white font-semibold text-3xl pt-5">
        Ajouter une recette
      </h1>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="flex flex-col items-center py-10 font-semibold"
      >
        <label htmlFor="">Nom de la recette </label>
        <div>
          <input type="text" onChange={(e) => setTitle(e.target.value)} />
        </div>
        <label htmlFor="">Description </label>
        <div>
          <textarea
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="my-3 flex flex-col">
          <label htmlFor="">Temp total de la recette </label>
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
        <label htmlFor="">Choisir une image</label>
        <div className="flex flex-col-reverse my-3 text-center">
          <input
            type="file"
            name="myImage"
            className="bg-white"
            onChange={(event) => {
              console.log(event.target.files[0]);
              setSelectedImage(event.target.files[0]);
            }}
          />
          <p>(Attention : Nom recette = Nom image // type d'image = jpg // )</p>
        </div>
        <div className="flex flex-wrap w-1/2 justify-around mx-auto">
        {etapes.map((etape, index) => (
          <div key={index} className="my-2">
            <div className="flex flex-col text-center">
              <label>Étape {index + 1}</label>
              <textarea
                type="text"
                value={etape.description}
                onChange={(e) => handleEtapeChange(index, e.target.value)}
              />
            </div>
          </div>
        ))}</div>
        <button
          type="button"
          onClick={handleAddEtape}
          className=" bg-white rounded-xl p-2  w-11"
        > +
        </button>
        <button
          type="submit"
          onClick={() => handleImageUpload(selectedImage)}
          className=" bg-green-600 rounded-xl p-2 mt-6"
        >
          Ajouter la recette
        </button>
      </form>
    </section>
  );
};

export default Insert;
