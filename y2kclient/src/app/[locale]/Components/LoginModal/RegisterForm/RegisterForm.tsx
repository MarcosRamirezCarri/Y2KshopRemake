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
      className={`
    fixed inset-0 flex justify-center items-center transition-colors duration-500
    ${modal ? "visible bg-gray-950/[0.4]" : "invisible"}
  `}
    >
   
      <ul
        onClick={(e) => e.stopPropagation()}
        className={`
          bg-Lightblue-100  gap-3 rounded-xl flex flex-col shadow p-6 transition-all duration-500 p-10
          ${modal ? "scale-100 opacity-100" : "scale-125 opacity-0"}
        `}
      >
           <button onClick={() => setModal(!modal)} className="bg-Lightblue-100 p-2">
        X
      </button>
        <p>Register</p>

        <form onSubmit={handleSubmit}>
          <li>
            <p>Name</p>
            <input
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
            />
            {error.name && <span className="text-red-500">{error.name}</span>}
          </li>
          <li>
            <p>Email</p>
            <input
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
            />
            {error.email && <span className="text-red-500">{error.email}</span>}
          </li>
          <li>
            <p>Password</p>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
            />
            {error.password && (
              <span className="text-red-500">{error.password}</span>
            )}
          </li>
          <li>
            <p>Phone</p>
            <input
              name="phoneNumber"
              type="text"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            {error.phoneNumber && (
              <span className="text-red-500">{error.phoneNumber}</span>
            )}
          </li>
          <button type="submit">Submit</button>
        </form>
      </ul>
    </div>
  );
};

export default RegisterForm;
