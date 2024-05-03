"use client";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { usePathname } from "next/navigation";
import { HiMagnifyingGlass } from "react-icons/hi2";
import setSearchBar from "@/lib/actions/SearchBar/searchFunction";

interface Recomended {
  title: string;
}

export default function SearchBar() {
  const [input, setInput] = useState<string>("");
  const [recommend, SetRecomend] = useState<Recomended[]>([]);
  const dispatch = useAppDispatch();
  const path = usePathname();
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
      dispatch(setSearchBar(input));
      SetRecomend(filteredProducts.slice(0, 3));
    } else {
      SetRecomend([]);
    }
  }, [input]);
if(path === '/products')
  return (
    <div className="flex flex-col absolute top-[90%] left-[50%] lg:left-0 lg:top-0 lg:translate-x-0 lg:translate-y-0 translate-x-[-50%] translate-y-[-30%] self-center lg:relative w-[70%] lg:w-[40%] h-[80%] ">
      <form className="grid p-2 rounded-xl grid-cols-3 bg-pink-100 gap-2" onSubmit={onSubmitSearch}>
        <input
          className="bg-pink-50 w-full col-span-2 rounded-xl ring-2 ring-pink-200 focus:outline-pink-300"
          type="text"
          placeholder="Search Products..."
          value={input}
          onChange={onHandleChange}
        ></input>
        <button className="col-span-1" type="submit">
          search
        </button>
      </form>
      {recommend.length > 0 ? (
        <div className="bg-pink-50 flex flex-col mt-1 gap-2 p-2 rounded-md">
          {recommend.map((a, index) => (
            <div className="" key={index}>
              <p onClick={() => setInput(a.title)}>{a.title}</p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
