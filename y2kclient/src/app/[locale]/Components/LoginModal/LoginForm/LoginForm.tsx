import { useState, useEffect } from "react";
import ValidateLogin from "@/helpers/validators/validatorLogin";
import { LoginData } from "@/helpers/validators/validatorLogin";
import loginFunction from "@/lib/actions/AccountActions/loginFunction";
import { useAppDispatch, useAppSelector } from "@/lib/hooks/hooks";
import Swal from "sweetalert2";

interface Errors {
  email: string;
  password: string;
}
interface PropModal {
  setModalR: (modalR: boolean) => void;
  setModalL: (modalL: boolean) => void;
  modalL: boolean;
}

const LoginForm: React.FC<PropModal> = ({ setModalR, setModalL, modalL }) => {
  const dispatch = useAppDispatch();
  const token: any = useAppSelector((state) => state.account.token);
  const user: any = useAppSelector((state) => state.account.user);

  console.log("se renderiza");

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
      localStorage.setItem("userId", user.id);
    }
  }, [token]);

  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<Errors>({
    email: "",
    password: "",
  });
  const handleModals = () => {
    setModalL(false);
    setModalR(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = ValidateLogin(formData);
    setError(errors);

    if (!errors.email && !errors.password) {
      dispatch(loginFunction(formData)).then((response: any) => {
        if (response.success) {
          Swal.fire({
            title: "Logged Successfully!",
            text: `Welcome back, ${response.user.name}!`,
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              setModalL(!modalL);
              location.reload();
            }
          });
        } else {
          Swal.fire({
            title: "Login Failed",
            text: response.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      });
    }
  };

  return (
    <div
      onClick={() => setModalL(!modalL)}
      className={`
    fixed inset-0 flex justify-center items-center transition-colors duration-300 z-[101]
    ${modalL ? "visible bg-gray-950/[0.4]" : "invisible"}
  `}
    >
      <ul
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-Lightblue-100 w-[80%] lg:w-[35%] gap-6 rounded-lg flex flex-col shadow p-6 transition-all duration-300 p-10
          ${modalL ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <div className="flex flex-col">
          <p className="font-titilium text-2xl self-center font-medium">
            Sign In
          </p>
          <p className="font-titilium text-md self-center font-normal text-gray-600">
            Enter your information to log in
          </p>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <li>
            <p>Email</p>
            <input
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              className="rounded-md w-[100%] border-Lightblue-300 border-[0.05rem] focus:outline-Lightblue-300 focus:border-Lightblue-300 focus:border-[0.05rem] p-2 h-10"
            />
            {error.email && (
              <span className="text-gray-400">{error.email}</span>
            )}
          </li>
          <li>
            <p>Password</p>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="rounded-md w-[100%] border-Lightblue-300 border-[0.05rem] focus:outline-Lightblue-300 focus:border-Lightblue-300 focus:border-[0.05rem] p-2 h-10"
            />
            {error.password && (
              <span className="text-gray-400">{error.password}</span>
            )}
          </li>
          <button
            className="bg-Lightblue-200 self-center py-4 px-6 font-titilium font-medium rounded-md text-lg ring-2 ring-Lightblue-100 transition-all duration-200 hover:ring-Lightblue-300"
            type="submit"
          >
            Login Now
          </button>
        </form>
        <button
          className="font-titilium text-xl self-center font-medium text-Lightblue-800"
          onClick={handleModals}
        >
          Sign up
        </button>
      </ul>
    </div>
  );
};

export default LoginForm;
