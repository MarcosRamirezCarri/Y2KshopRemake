'use client'
import { useState } from "react";
import RegisterForm from "./RegisterForm/RegisterForm";



const LoginModal = ({}) =>{
    const [modal, setModal] = useState<boolean>(false)
return(
    <div >
        <div>
            <button data-modal-target="default-modal" data-modal-toggle="default-modal" onClick={() => setModal(!modal)}>
                Login
            </button>
        </div>
       
            <RegisterForm modal={modal} setModal={setModal}/>
    

    </div>
)
}

export default LoginModal;