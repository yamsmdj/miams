import React, { useEffect, useState } from "react";
import PanelAdmin from "../../pages/Admin/PanelAdmin";
import CardChef from "../cards/CardChef";
import axios from "axios";

const ChefAxios = () => {
  const [chefs, setChefs] = useState([]);
  const [loading, setLoading] = useState(true);

  

  return (
    <div>
      {loading ? (
        <p>Chargement en cours...</p>
      ) : (
        <>
          {console.log("Data de chefAxios:", chefs)}
          {chefs.length > 0 && <CardChef chefs={chefs} />}
          {chefs.length > 0 && <PanelAdmin chefs={chefs} />}
        </>
      )}
    </div>
  );
};

export default ChefAxios;
