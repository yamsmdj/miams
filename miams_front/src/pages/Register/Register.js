import { useState } from "react";
import eye from '../../assets/Icons/eye.svg'
import { NavLink, Navigate } from "react-router-dom";

import axios from "axios";

const Register = () => {

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmpwd, setConfirmPwd] = useState("");
  const [eyes, setEyes] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("http://localhost:8000/api/user/",
    {
      email: email,
      password: pwd,
    })
      .then((res) => {
        console.log("Produit créé avec succès !");
        Navigate("/admin/dashboard");
      })
      .catch((err) => {
        console.error("Erreur lors de l'enregistrement d'un utilisateur");
      });
  };
  const showPwd = () => {
    setEyes(!eyes)
  }
  return (
    <section>
      <form autoComplete="off" onSubmit={handleSubmit} className="my-4" >
        <div className="flex flex-col ">
        <label htmlFor="email">Adresse mail</label>
        <input 
        type="email" 
        name="email" 
        id="email"
        onChange={(e) => setEmail(e.target.value)} 
        />
        <label htmlFor="pwd">Mot de passe</label>
        <div className=" relative">
        <input 
        type={eyes ? 'text' : 'password'}
        name="pwd"
        id="pwd"
        onChange={(e) => setPwd(e.target.value)}
        />
        <img src={eye} alt="show password" id='eye' className="w-5 absolute right-2 top-1" onClick={showPwd} />
        </div>
        <label htmlFor="confirmPwd">Confirmez le mot de passe</label>

        <input 
        type="password"
        name="confirmPwd"
        id="confirmPwd"
        onChange={(e) => setConfirmPwd(e.target.value)}
        />
        </div>
        <button type="submit" className=" bg-orange-500 rounded-xl p-2 mt-2">
          Je m'inscrit
        </button>
      </form>
      <NavLink to="/connexion">
        <button className="my-4">Déja un compte ?</button>{" "}
      </NavLink>
    </section>
  );
};

export default Register;
