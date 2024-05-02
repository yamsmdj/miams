import axios from "axios";
import React, { useEffect, useState } from "react";

// Définition de votre HOC
const withDataFetching = (WrappedComponent, apiUrl) => {
  return () => {
    
    const [data, setData] = useState(null);

    useEffect(() => {
      axios.get(apiUrl)
        .then((res) => {
          setData(res.data);
        })
        .catch((error) => {
          console.error("Une erreur s'est produite lors de la récupération des données : ", error);
        });
    }, [apiUrl]);

    return <WrappedComponent data={data} />;
  };
};

export default withDataFetching;