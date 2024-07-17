export interface RegisterData {
  name: string ;
  password: string;
  phone: string;
  email: string;
  admin: boolean | null;
}

interface ValidationErrors {
  email: string;
  password: string;
  phone: string;
  name: string;
}
//En un futuro poner aca la peticion para ver si la cuenta ya existe y que lo añada a la base de datos

export default function ValidateRegister(register: RegisterData): ValidationErrors {
  let errors: ValidationErrors = {
    email: "",
    password: "",
    phone: "",
    name: "",
  };
  console.log(errors.phone)
  let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let regexPassword = /^(?=\w*\d)(?=\w*)(?=\w*[a-z])\S{8,16}$/;
  let regexPhone = /^\d{10}$/;

  if (!regexEmail.test(register.email)) {
    errors.email = "Invalid Email";
  }
  if (!regexPassword.test(register.password)) {
    errors.password =
      "The password must have at least 8 to 16 characters and contain at least one digit";
  }
  if (regexPhone.test(register.phone)) {
    errors.phone = "Invalid phone number (10 digits required)";
  }

  return errors;
}
