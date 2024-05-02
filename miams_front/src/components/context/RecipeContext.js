import React, { createContext, useState } from 'react';

const RecipeContext = createContext();

const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState(null);
    return (
        <RecipeContext.Provider value={{recipes, setRecipes}}>
            {children}
        </RecipeContext.Provider>
    );
};

export default {RecipeProvider, RecipeContext};