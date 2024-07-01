'use client'
import { useState } from "react";
import RegisterForm from "./RegisterForm/RegisterForm";
import LoginForm from "./LoginForm/LoginForm";



const LoginModal = ({}) =>{
    const [modalL, setModalL] = useState<boolean>(false)
    const [modalR, setModalR] = useState<boolean>(false)
return(
    <div >
        <div>
            <button data-modal-target="default-modal" data-modal-toggle="default-modal" onClick={() => setModalR(!modalR)}>
                Sign Up
            </button>
            <button data-modal-target="default-modal" data-modal-toggle="default-modal" onClick={() => setModalL(!modalL)}>
                Sign In
            </button>
        </div>
       
            <RegisterForm modal={modalR} setModal={setModalR}/>
            <LoginForm modal={modalL} setModal={setModalL}/>
    

    </div>
)
}

export default LoginModal;