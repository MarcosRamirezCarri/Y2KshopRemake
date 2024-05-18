import { useState } from "react";
import Validate from "@/helpers/validatorLogin";
import { RegisterData } from "@/helpers/validatorLogin";

interface Errors {
  email: string;
  password: string;
  name: string;
  phoneNumber: string;
}

const RegisterForm = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [error, setError] = useState<Errors>({
    email: "",
    password: "",
    phoneNumber: "",
    name: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setError((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, phoneNumber, name } = error; // Extraer los valores del estado de error
    const registerData: RegisterData = { email, password, phoneNumber, name };
    const errors = Validate(registerData)
    setError(errors);
    if (
      !errors.email &&
      !errors.password &&
      !errors.phoneNumber
    ) {
      // Aquí puedes manejar el envío del formulario si no hay errores
    }
  };


  return (
    <div className="flex flex-col gap-5 w-fit h-fit p-5">
      <ul>
        <p>Login</p>

        <form onSubmit={handleSubmit}>
          <li>
            <p>Name</p>
            <input
              name="name"
              type="text"
              value={error.name}
              onChange={handleChange}
            ></input>
          </li>
          <li>
            <p>Email</p>

            <input
              name="email"
              type="text"
              value={error.email}
              onChange={handleChange}
            ></input>
          </li>
          <li>
            <p>Password</p>
            <input
              name="password"
              type="text"
              value={error.password}
              onChange={handleChange}
            ></input>
          </li>
          <li>
            <p>Phone</p>
            <input
              name="phone"
              type="text"
              value={error.phoneNumber}
              onChange={handleChange}
            ></input>
          </li>
          <button type="submit">Submit</button>
        </form>
      </ul>
    </div>
  );
};

export default RegisterForm