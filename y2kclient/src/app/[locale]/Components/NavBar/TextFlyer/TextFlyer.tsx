"use client";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { usePathname } from "next/navigation";
import { getAllFlyers } from "@/lib/actions/FlyerActions/getAllFlyers";

const TextFlyer = () => {
  const dispatch = useAppDispatch();
  const path = usePathname();

  useEffect(() => {
    dispatch(getAllFlyers());
  }, [dispatch]);

  const flyers = useAppSelector((state) => state.flyers.allFlyers);

  const showFlyers = flyers.filter((fly) => fly.type === "text");
  const finalFlyers = showFlyers.filter((fly) => fly.status === true);

  return (
    <div
      className={` ${
        path !== "/" && path !== "/cart" ? "hidden" : "visible"
      } font-tiltneon flex left-[35%] flex-row self-center top-24 absolute`}
    >
      {finalFlyers
        ? finalFlyers.map((fly, index) => (
            <p key={index} className="font-semibold text-xl">
              {fly.text}{" "}
            </p>
          ))
        : null}
    </div>
  );
};

export default TextFlyer;
