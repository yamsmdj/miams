import axios from "axios";
import React, { useEffect, useState } from "react";
import { redirect, useParams } from "react-router-dom";

const Update = () => {
  const [recettes, setRecettes] = useState([]);

  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);
  const [categorie, setCategorie] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [etapes, setEtapes] = useState([]);

  const { recetteId } = useParams();
  const { categorieId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/recette/${recetteId}`)
      .then((res) => {
        setRecettes(res.data);
        // console.log(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la recupéaration de la recette", error);
      });
    axios
      .get(`http://localhost:8000/api/categorie/`)
      .then((res) => {
        setCategorie(res.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la recupéaration des categories", error);
      });
  }, []);
  // console.log('id' , recetteId);
  const converToBase64 = (e) => {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      setSelectedImage(reader.result);
    };
  };

  const handleValidation = () => {
    console.log(("titre", title));
    console.log(("description", description));
    console.log(("time", time));
    console.log(("categorie", categorie));

    // Utilise les valeur actuelle de recettes.x si x est vide
    const titleToSend = title || recettes.title;
    const descriptionToSend = description || recettes.description;
    const timeToSend = time || recettes.time;
    const categorieToSend = categorie || recettes.categorie.name;

    let formData = new FormData();
    if (selectedImage) {
      formData.append("image", selectedImage.split(",")[1]);
    }

    axios
      .post("http://localhost:8000/upload-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          console.log("Image uploaded successfully");
          const imagePath = response.data;
          console.log(imagePath);

          axios
            .patch(`http://localhost:8000/api/recette/${recetteId}`, {
              title: titleToSend,
              description: descriptionToSend,
              time: timeToSend,
              categorie: categorieToSend,
              etapes: etapes,
              picture: imagePath, // Mettez à jour l'image avec le nouveau chemin
            })
            .then((res) => {
              console.log("Mise à jour réussie !");
              // Définir le message flash
              // setFlashMessage("Mise à jour réussie !");
              // Redirection vers la page de tableau de bord après la modification réussie
              redirect("/dashboard");
            })
            .catch((error) => {
              console.error("Erreur lors de la mise à jour : ", error);
            });
        } else {
          console.error("Failed to upload image");
        }
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  const handleCancel = () => {
    redirect("/dashboard");
  };

  return (
    <section>
      {/* {console.log("return", recettes)} */}
      <div className="w-1/2 mx-auto text-center bg-orange-500 py-16">
        <form>
          {recettes && (
            <div className="">
              <div className="font-bold text-4xl py-9">
                <h1>{recettes.title}</h1>
                <img
                  src={`/assets/recettes/${recettes.title?.replace(
                    /\s+/g,
                    "_"
                  )}.jpg`}
                  alt={recettes.title}
                  className="mx-auto pt-9 w-52"
                />
              </div>
              <label className="font-bold " htmlFor="title">
                Nom de la recette :
              </label>
              <div>
                <input
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                  defaultValue={recettes.title}
                />
              </div>
              <label className="font-bold " htmlFor="title">
                Temp de la recette :
              </label>
              <div>
                <input
                  type="number"
                  onChange={(e) => setTime(parseInt(e.target.value))}
                  name="time"
                  defaultValue={recettes.time}
                />
              </div>
              <label htmlFor="">Choisir une nouvelle image</label>
              <input
                type="file"
                name="myImage"
                className="bg-white"
                onChange={converToBase64}
              />
              {selectedImage && (
                <img width={100} height={100} src={selectedImage} />
              )}
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

              <div>
                <input
                  type="text"
                  name="categorie"
                  onChange={(e) => setCategorie(e.target.value)}
                  defaultValue={recettes.categorie?.name}
                />
              </div>
              <label className="font-bold " htmlFor="title">
                description :
              </label>
              <div>
                <textarea
                  type="text"
                  name="description"
                  onChange={(e) => setDescription(e.target.value)}
                  defaultValue={recettes.description}
                />
              </div>
            </div>
          )}
          <div className="mt-3 ">
            <button
              type="button"
              className="  p-2 rounded-xl bg-red-600 "
              onClick={handleCancel}
            >
              Annuler
            </button>
            <button
              type="button"
              className="p-2 ml-4 rounded-xl bg-green-600 "
              onClick={handleValidation}
            >
              Valider
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Update;
