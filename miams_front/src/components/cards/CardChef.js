import axios from "axios";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const CardChef = ({chefs}) => {
  // console.log("Data de Cardchef:", chefs)

 

    // const getChef = () => {
    //   axios
    //   .get("http://localhost:8000/api/chef")
    //   .then((res) => {
    //     setChefs(res.data);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     console.error(
    //       "Une erreur s'est produite lors de la récupération des chefs : ",
    //       error
    //     );
    //     setLoading(false);
    //   });
    // } 
 

  return (
    <section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 m-auto w-1/2">
      {/* {console.log("Data de Cardchef:", chefs)} */}
        {chefs ? (
          chefs.map((chef, index) => (
            <div key={index} className="w-52 flex flex-col items-center">
              <NavLink to={`/chef/${chef.id}`} className="justify-center">
                {chef.name ? (
                  <img
                    src={`/assets/chefs/${chef.name.replace(/\s+/g, "_")}.webp`}
                    alt={chef.name}
                    className="h-52 object-cover"
                  />
                ) : (
                  <p>Pas d'image disponible</p>
                )}
              </NavLink>
              <p className="mt-2 text-center">
                <strong>{chef.name}</strong>
              </p>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </section>
  );
};
export default CardChef;


 /* <div className="flex flex-wrap justify-around gap-5 px-3">
      {chefs ? (
        chefs.map((chef, index) => (
          <div key={chef.id} className="bg-white shadow-md rounded-lg overflow-hidden" style={{ width: '18rem' }}>
            <img src={`assets/chefs/${chef.name.replace(/\s+/g, "_")}.webp`} className="w-full h-48 object-cover" alt={chef.name} />
            <div className="px-6 py-4">
              <h5 className="text-xl font-bold mb-2">{chef.name}</h5>
              <p className="text-gray-700 text-base">
                {chef.description}
              </p>
              <a href="#" className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">
                Go somewhere
              </a>
            </div>
          </div>
        ))
      ) : (
        <p>No chefs available.</p>
      )}
      </div> */