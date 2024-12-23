"use client";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import { usePathname } from "next/navigation";
import { getAllFlyers } from "@/lib/actions/FlyerActions/getAllFlyers";

const TextFlyer = () => {
  const dispatch = useAppDispatch();
  const path = usePathname();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    dispatch(getAllFlyers());
  }, [dispatch]);

  const flyers = useAppSelector((state) => state.flyers.allFlyers);
  const showFlyers = flyers.filter((fly) => fly.type === "text");
  const finalFlyers = showFlyers.filter((fly) => fly.status === true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // Oculta si el usuario hace scroll hacia abajo
        setIsVisible(false);
      } else {
        // Muestra si el usuario hace scroll hacia arriba
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY); // Actualiza la posición de scroll
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div
      className={`${
        path !== "/" && path !== "/cart" ? "hidden" : isVisible ? "translate-y-[10vh]" : " -z-1 translate-y-[-30vh] invisible"
      } font-tiltneon text-Lightblue-950   flex left-[35%] flex-row self-center absolute transition-all duration-500`}
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