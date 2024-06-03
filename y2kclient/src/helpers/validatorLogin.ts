export interface RegisterData {
    name: string;
    password: string;
    phoneNumber: string;
    email: string;
  }
  
  interface ValidationErrors {
    email: string;
    password: string;
    phoneNumber: string;
    name: string
  }
  
  export default function Validate(register: RegisterData): ValidationErrors {
    let errors: ValidationErrors = {
      email: '',
      password: '',
      phoneNumber: '',
      name: '',
    };
    let regexEmail = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/;
    let regexPassword = /^(?=\w*\d)(?=\w*)(?=\w*[a-z])\S{8,16}$/;
    let regexPhone = /^\d{10}$/; 
  
    if (!regexEmail.test(register.email)) {
      errors.email = "Invalid Email";
    }
    if (!regexPassword.test(register.password)) {
      errors.password =
        "The password must have at least 8 to 16 characters and contain at least one digit";
    }
    if (!regexPhone.test(register.phoneNumber)) {
      errors.phoneNumber = "Invalid phone number (10 digits required)";
    }
  
    return errors;
  }
