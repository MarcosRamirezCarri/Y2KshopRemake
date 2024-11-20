import { useState } from "react";
import { ValidateRegister } from "@/helpers/Validators/validatorRegister";
import { RegisterData } from "@/helpers/Validators/validatorRegister";
import { useAppDispatch } from "@/lib/hooks/hooks";
import registerFunction from "@/lib/actions/AccountActions/registerFunction";
import Swal from "sweetalert2";

interface Errors {
  email: string;
  password: string;
  name: string;
  phone: string;
}
interface PropModal {
  setModalR: (modalR: boolean) => void;
  modalR: boolean;
  setModalL: (modalL: boolean) => void;
  modalL: boolean;
}

const RegisterForm: React.FC<PropModal> = ({
  setModalR,
  modalR,
  setModalL,
}) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<RegisterData>({
    email: "",
    password: "",
    phone: "",
    name: "",
    admin: false,
  });
  const [error, setError] = useState<Errors>({
    email: "",
    password: "",
    phone: "",
    name: "",
  });

  const handleModals = () => {
    setModalL(true);
    setModalR(false);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errors = await ValidateRegister(formData);
    setError(errors);
    if (!errors.email && !errors.password && !errors.phone) {
      dispatch(registerFunction(formData))
        .then(() => {
          Swal.fire({
            title: "Account Registered!",
            icon: "success",
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              setModalR(!modalR);
            }
          });
        })
        .catch((error) => {
          Swal.fire({
            title: "Registration Failed",
            text: error.message,
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    }
  };

  return (
    <div
      onClick={() => setModalR(!modalR)}
      className={`
    fixed inset-0 flex justify-center items-center transition-colors duration-300 z-[101]
    ${modalR ? "visible bg-gray-950/[0.4]" : "invisible"}
  `}
    >
      <ul
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-Lightblue-100 w-[80%] lg:w-[35%]  gap-6 rounded-lg flex flex-col shadow p-6 transition-all duration-300 p-10
          ${modalR ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
        <div className="flex flex-col">
          <p className="font-titilium text-2xl self-center font-medium">
            Create a new Account
          </p>
          <p className="font-titilium text-md self-center font-normal text-gray-600">
            Enter your details to register
          </p>
        </div>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <li>
            <p>Full Name</p>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              className="rounded-md w-[100%] border-Lightblue-300 border-[0.05rem] focus:outline-Lightblue-300 focus:border-Lightblue-300 focus:border-[0.05rem] p-2 h-10"
            />
            {error.name && <span className="text-gray-400">{error.name}</span>}
          </li>
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
          <li>
            <p>Phone</p>
            <input
              name="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              className="rounded-md w-[100%] border-Lightblue-300 border-[0.05rem] focus:outline-Lightblue-300 focus:border-Lightblue-300 focus:border-[0.05rem] p-2 h-10"
            />
            {error.phone && (
              <span className="text-gray-400">{error.phone}</span>
            )}
          </li>
          <button
            className="bg-Lightblue-200 self-center py-4 px-6 font-titilium font-medium rounded-md text-lg ring-2 ring-Lightblue-100 transition-all duration-200 hover:ring-Lightblue-300"
            type="submit"
          >
            Register Now
          </button>
        </form>
        <button
          className="font-titilium text-xl self-center font-medium text-Lightblue-800"
          onClick={handleModals}
        >
          Sign In
        </button>
      </ul>
    </div>
  );
};

export default RegisterForm;
