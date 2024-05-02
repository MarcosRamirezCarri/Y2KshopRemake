"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { HiMagnifyingGlass } from "react-icons/hi2";
import setSearchBar from "@/lib/actions/SearchBar/searchFunction";

interface Recomended{
   title: string
}

export default function SearchBar() {
  const [input, setInput] = useState<string>("");
  const [recommend, SetRecomend] = useState<Recomended[]>([])
  const dispatch = useAppDispatch();
  const recomendedSearch = useAppSelector(
    (state) => state.products.sortProducts
  );

  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val.toLowerCase());
  };
  const filteredProducts = recomendedSearch.filter((product) =>
    product.title.toLowerCase().includes(input.toLowerCase())
  );
  const onSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setSearchBar(filteredProducts));
    setInput("");
  };
  useEffect(() => {
   if (input.length > 0) {
     dispatch(setSearchBar(input))
     SetRecomend(filteredProducts.slice(0, 3));
   } else {
      SetRecomend([]);
   }
 }, [input]);

  return (
    <div className="flex flex-col w-[40%] h-[80%] ">
      <form onSubmit={onSubmitSearch}>
        <input
          type="text"
          placeholder="Search Products..."
          value={input}
          onChange={onHandleChange}
        ></input>
        <button type="submit">
          <HiMagnifyingGlass />
        </button>
      </form>
      {recommend.length > 0 ?  recommend.map((a, index) =>
      <div  key={index}>
      <p value={a.title} onClick={onHandleChange} >{a.title}</p>
   </div> 
      ): null

      }
    </div>
  );
}
