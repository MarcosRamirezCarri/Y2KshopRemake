import { Server } from "../server";
import axios from "axios";

export interface RegisterData {
  name: string;
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

const checkEmailExists = async (email: string) => {
  
  try {
    const response = await axios.get(`${Server}/user/checkemail/${email}`);

    if (response.data.exists) {
      return response.data.exists;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking email:", error);
    return false;
  }
};

export async function ValidateRegister(
  register: RegisterData
): Promise<ValidationErrors> {
  let errors: ValidationErrors = {
    email: "",
    password: "",
    phone: "",
    name: "",
  };

  let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let regexPassword = /^(?=\w*\d)(?=\w*)(?=\w*[a-z])\S{8,16}$/;
  let regexPhone = /^\d{10}$/;

  if (!regexEmail.test(register.email)) {
    errors.email = "Invalid Email";
  } else {
    const emailExists = await checkEmailExists(register.email);
    if (emailExists) {
      errors.email = "Email is already registered";
    }
  }

  if (!regexPassword.test(register.password)) {
    errors.password =
      "The password must have at least 8 to 16 characters and contain at least one digit";
  }

  if (!regexPhone.test(register.phone)) {
    errors.phone = "Invalid phone number (10 digits required)";
  }

  return errors;
}
