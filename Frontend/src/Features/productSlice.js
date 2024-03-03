const productSlice=(state,action)=>{
  switch(action.type){
    case 'API_PRODUCTS':return{
        ... state,
        products:action.payload,
    }
    case "API_ERROR":
        return {
            ...state,
            isError: true,
        };    
        case 'API_SINGLE_PRODUCTS':return{
          ... state,
          products:action.payload,
      }
      case "SINGLE_API_ERROR":
          return {
              ...state,
              isError: true,
          };    
  }
    return state
}
export default productSlice