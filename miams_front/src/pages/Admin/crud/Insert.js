import axios from "axios";
import React, { useEffect, useState } from "react";

const Insert = () => {

    const [recettes, setRecettes] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [time, setTime] = useState(5)
    const [categorie, setCategorie] = useState('')
    const [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get('http://localhost:8000/api/categorie/')
        .then((res) => {
            setCategories(res.data)
        })
    }, [])

    const handleSubmit = () => {

        axios.post('http://localhost:8000/api/recette/', {
            title: title,
            description: description,
            time: time,
            categorie: categorie

        })
        .then((res) => {
            console.log('Recette ajouté avec succès !');
        }).catch((error) => {
           console.error('Erreur lors de la création de la recette', error)
        });
    };


  return (
    <section className="bg-orange-500 w-10/12 mx-auto">
     
        <h1 className="text-center text-white font-semibold text-3xl pt-5">Ajouter une recette</h1>
      <form action="" method="POST" onSubmit={handleSubmit} className="flex flex-col items-center py-10 font-semibold ">
        <label htmlFor="">Nom de la recette </label>
        <div className="">
          <input type="text"
          onChange={(e) => setTitle(e.target.value)} />
        </div>
        <label htmlFor="">Description </label>
        <div className="">
          <textarea type="text" onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <label htmlFor="">Temp total de la recette </label>
        <div className="">
          <input type="number"  onChange={(e) => setTime(e.target.value)}/>
        </div>
        <label htmlFor="">Categorie </label>
       <select value={categorie} onChange={(e) => setCategorie(e.target.value)}>
        <option value="">Selectionnez une catégorie</option>
        {categories.map((cat , index) => (
            <option key={index} value={cat.name}>{cat.name}</option>
        ))}
       </select>
        <button type="submit" className=" bg-green-600 rounded-xl p-2 mt-6">Ajouter la recette</button>
      </form>
    </section>
  );
};

export default Insert;
