"use client";
import { useState, useEffect } from "react";
import RegisterForm from "./RegisterForm/RegisterForm";
import LoginForm from "./LoginForm/LoginForm";

interface PropModal {
  modal: boolean;
}

const LoginModal: React.FC<PropModal> = ({ modal }) => {
  const [modalL, setModalL] = useState<boolean>(false);
  const [modalR, setModalR] = useState<boolean>(false);


  useEffect(() => {
    if (modal) {
      setModalL(true);
    } else {
      setModalL(false);
    }
  }, [modal]);

 if(modal) return (
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
};

export default LoginModal;
