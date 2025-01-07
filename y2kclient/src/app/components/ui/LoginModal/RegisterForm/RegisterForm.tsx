import { useState } from "react";
import { ValidateRegister } from "@/helpers/validators/validatorRegister";
import { AccountType } from "@/helpers/types/Account";
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
  modalL,
}) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<AccountType>({
    email: "",
    password: "",
    phone: "",
    name: "",
    location: {
      city: "",
      province: "",
      country: "",
    },
    admin: false,
    history: [],
    id: 0,
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

    if (["city", "province", "country"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        location: {
          ...prevData.location,
          [name]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      setError((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
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

  const renderInputs = (
    type: string,
    name: string,
    title: string,
    value: string,
    onChange: (arg: React.ChangeEvent<HTMLInputElement>) => void,
    error: string
  ) => (
    <li>
      <p>{title}</p>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        className="rounded-md w-[100%] border-Lightblue-300 border-[0.05rem] focus:outline-Lightblue-300 focus:border-Lightblue-300 focus:border-[0.05rem] p-2 h-10"
      />
      {error && <span className="text-gray-400">{error}</span>}
    </li>
  );

  return (
    <div
      onClick={() => setModalR(!modalR)}
      className={`fixed inset-0 flex justify-center items-center transition-colors duration-300 z-[101] ${
        modalR ? "visible bg-gray-950/[0.4]" : "invisible"
      }`}
    >
      <ul
        onClick={(e) => e.stopPropagation()}
        className={`bg-Lightblue-100 w-[80%] font-titilium lg:w-[50%] gap-6 rounded-lg flex flex-col shadow p-6 transition-all duration-300 p-10 ${
          modalR ? "scale-100 opacity-100" : "scale-125 opacity-0"
        }`}
      >
        <div className="flex flex-col">
          <p className="font-titilium text-2xl self-center font-medium">
            Create a new Account
          </p>
          <p className="font-titilium text-md self-center font-normal text-gray-600">
            Enter your details to register
          </p>
        </div>

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            {renderInputs("text", "name", "Full Name", formData.name, handleChange, error.name)}
            {renderInputs("text", "email", "Email", formData.email, handleChange, error.email)}
            {renderInputs("password", "password", "Password", formData.password, handleChange, error.password)}
            {renderInputs("text", "phone", "Phone", formData.phone, handleChange, error.phone)}
          </div>
          <div className="flex flex-col gap-2 ">
            {renderInputs("text", "province", "Province", formData.location.province, handleChange, "")}
            {renderInputs("text", "city", "City", formData.location.city, handleChange, "")}
            {renderInputs("text", "country", "Country", formData.location.country, handleChange, "")}
            
          </div>

          <button
            className="bg-Lightblue-200 w-[50%] justify-self-center col-span-2 py-4 px-6 font-titilium font-medium rounded-md text-lg ring-2 ring-Lightblue-100 transition-all duration-200 hover:ring-Lightblue-300"
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
