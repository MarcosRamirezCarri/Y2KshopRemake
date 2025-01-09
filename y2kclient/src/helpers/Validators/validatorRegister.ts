import { checkEmailExists } from "@/lib/actions/AccountActions/checkEmail";
import { validateLocationGeoNames } from "./validateLocation";

interface Location {
  city: string;
  province: string;
  country: string;
}

export interface RegisterData {
  name: string;
  password: string;
  phone: string;
  email: string;
  location: Location;
  admin: boolean | null;
}

interface ValidationErrors {
  email: string;
  password: string;
  phone: string;
  name: string;
  city: string;
  province: string;
  country: string;
}

export async function ValidateRegister(
  register: RegisterData
): Promise<ValidationErrors> {
  let errors: ValidationErrors = {
    email: "",
    password: "",
    phone: "",
    name: "",
    city: "",
    province: "",
    country: "",
  };

  let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let regexPassword = /^(?=\w*\d)(?=\w*)(?=\w*[a-z])\S{8,16}$/;
  let regexPhone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  // Validate email
  if (!regexEmail.test(register.email)) {
    errors.email = "Invalid Email";
  } else {
    const emailExists = await checkEmailExists(register.email);
    if (emailExists) {
      errors.email = "Email is already registered";
    }
  }

  // Validate password
  if (!regexPassword.test(register.password)) {
    errors.password =
      "The password must have at least 8 to 16 characters and contain at least one digit";
  }

  // Validate phone
  if (!regexPhone.test(register.phone)) {
    errors.phone = "Invalid phone number (10 digits required)";
  }

  // Validate name
  if (!register.name.trim()) {
    errors.name = "Name is required";
  }
  if (!register.location.city) {
    errors.city = "City is required";
  }
  if (!register.location.province) {
    errors.province = "Province is required";
  }
  if (!register.location.country) {
    errors.country = "Country is required";
  }


  return errors;
}
