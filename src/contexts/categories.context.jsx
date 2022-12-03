import { useState, createContext  , useEffect} from "react";

import { addCollectionAndDocuments , getCategoriesAndDocuments } from '../utils';

// import SHOP_DATA from "../data/shop-data.js";

export const CategoriesContext = createContext({
  categoriesMap: {},
  //   setProducts: () => null,
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});
  const value = { categoriesMap }

  useEffect(() => {
    // addCollectionAndDocuments('categories' , SHOP_DATA);
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  },[])

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
