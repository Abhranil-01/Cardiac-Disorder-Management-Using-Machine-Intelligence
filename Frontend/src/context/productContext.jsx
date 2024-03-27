import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import reducer from '../Features/productSlice'
const AppContext=createContext();

const url='http://127.0.0.1:8000/api/medicines/'
const initialState={
    isLoading:false,
    isError: false,
    products:[],
    featuredProducts:[]
  
}
const AppProvider=({children})=>{
    const [state,dispatch]=useReducer(reducer,initialState)
    const getProducts=async (url)=>{
       try {
         const res = await axios.get(url);
         const products =await res.data;
         dispatch({type:'API_PRODUCTS',payload:products})
       } catch (error) {
        dispatch({type:'API_ERROR',})
       }
    };
    // second data fetch for single page
    // const getSingleProduct=async (api)=>{
    //     try {
    //       const res = await axios.get(url);
    //       const singleProduct =await res.data;
    //       console.log(singleProduct);
    //       dispatch({type:'API_SINGLE_PRODUCTS',payload:singleProduct})
    //     } catch (error) {
    //      dispatch({type:'SINGLE_API_ERROR',})
    //     }
    //  };

    useEffect(()=>{
        getProducts(url);
    },[]);
    return <AppContext.Provider value={{ ...state}}>{children}</AppContext.Provider>
}

// custom hook
const useProductContext=()=>{
    return useContext(AppContext)
}
export { AppProvider,AppContext,useProductContext};