export interface LoginData {
    password: string;
    email: string;
  }
  
  interface ValidationErrors {
    email: string;
    password: string;
  }

  //En un futuro poner aca la peticion para ver si la cuenta existe y que traiga la informacion
  
  export default function ValidateLogin(login: LoginData): ValidationErrors {
    let errors: ValidationErrors = {
      email: "",
      password: "",
    };
    let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let regexPassword = /^(?=\w*\d)(?=\w*)(?=\w*[a-z])\S{8,16}$/;
  
    if (!regexEmail.test(login.email)) {
      errors.email = "Invalid Email";
    }
    if (!regexPassword.test(login.password)) {
      errors.password =
        "The password must have at least 8 to 16 characters and contain at least one digit";
    }
  
    return errors;
  }