"use client";
import { useState } from "react";
import RegisterForm from "./RegisterForm/RegisterForm";
import LoginForm from "./LoginForm/LoginForm";

interface PropModal {
  modal: boolean;
}

const LoginModal: React.FC<PropModal> = ({ modal }) => {
  const [modalL, setModalL] = useState<boolean>(true);
  const [modalR, setModalR] = useState<boolean>(false);
  if (modal === true) {
    return (
      <div>
        <RegisterForm
          modalR={modalR}
          setModalR={setModalR}
          setModalL={setModalL}
        />
        <LoginForm
          modalL={modalL}
          setModalL={setModalL}
          setModalR={setModalR}
        />
      </div>
    );
  }
};

export default LoginModal;
