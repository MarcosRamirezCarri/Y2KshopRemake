import { useState } from "react";
import Validate from "@/helpers/validatorLogin";
import { RegisterData } from "@/helpers/validatorLogin";

interface Errors {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}
interface PropModal {
  setModal: (modal: boolean) => void;
  modal: boolean;
}

const RegisterForm: React.FC<PropModal> = ({ setModal, modal }) => {
  const [formData, setFormData] = useState<RegisterData>({
    email: "",
    password: "",
    phoneNumber: "",
    name: "",
  });
  const [error, setError] = useState<Errors>({
    email: "",
    password: "",
    phoneNumber: "",
    name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(value);
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
    const errors = Validate(formData);
    setError(errors);
    if (!errors.email && !errors.password && !errors.phoneNumber) {
    }
  };

  return (
    <div
      onClick={() => setModal(!modal)}
      className={`
    fixed inset-0 flex justify-center items-center transition-colors duration-500 z-[101]
    ${modal ? "visible bg-gray-950/[0.4]" : "invisible"}
  `}
    >
      <ul
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-Lightblue-100 w-[35%] gap-6 rounded-lg flex flex-col shadow p-6 transition-all duration-500 p-10
          ${modal ? "scale-100 opacity-100" : "scale-125 opacity-0"}
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
              name="phoneNumber"
              type="text"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="rounded-md w-[100%] border-Lightblue-300 border-[0.05rem] focus:outline-Lightblue-300 focus:border-Lightblue-300 focus:border-[0.05rem] p-2 h-10"
            />
            {error.phoneNumber && (
              <span className="text-gray-400">{error.phoneNumber}</span>
            )}
          </li>
          <button type="submit">Submit</button>
        </form>
        
      </ul>
    </div>
  );
};

export default RegisterForm;
