

const MyComponent = ({ data }) => {

    return (
      <div>
        {console.log(data)}
        {data ? (
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    );
  };
  

  const MyComponentWithDataFetching = withDataFetching(MyComponent, "localhost:8000/api/categorie/");
  
  export default MyComponentWithDataFetching;