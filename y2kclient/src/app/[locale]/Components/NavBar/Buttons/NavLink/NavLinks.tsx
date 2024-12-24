import Link from "next/link";

const NavLink = ({
    href,
    icon: Icon,
    label,
    isActive,
    onHover,
  }: {
    href?: string;
    icon: React.ElementType;
    label: string;
    isActive: boolean;
    onHover: () => void;
  }) => (
    <Link
      href={href || "#"}
      className="flex flex-col items-center justify-center active:text-Lightblue-300"
      onMouseEnter={onHover}
      onMouseLeave={onHover}
    >
      <button className="text-2xl lg:text-3xl font-normal transition-all duration-300 hover:scale-105">
        <Icon />
      </button>
      <span
        className={`absolute text-lg lg:text-[1.30rem] bottom-1 p-2 font-bold transition-all duration-300 ${
          isActive ? "visible -translate-y-20 lg:translate-y-2 blur-none" : "translate-y-20 lg:-translate-y-2 blur-lg invisible"
        }`}
      >
        {label}
      </span>
    </Link>
  );

  export default NavLink;