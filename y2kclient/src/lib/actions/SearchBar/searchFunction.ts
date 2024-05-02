import { setSearch } from "@/lib/slices/productsReducer";
import { Dispatch } from "@reduxjs/toolkit";

 const setSearchBar = (search: any) => async(dispatch: Dispatch) =>{
if (Array.isArray(search) && search.length !== 0){
    console.log('se busco a', search)
    dispatch(setSearch(search))
}
console.log('no se admitio')
}

export default setSearchBar;