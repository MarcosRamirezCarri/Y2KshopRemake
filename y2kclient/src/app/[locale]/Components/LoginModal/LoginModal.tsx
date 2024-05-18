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
        {modal ? <div id="default-modal" tabIndex={-1} aria-hidden="true" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <RegisterForm/>
        </div>: null}

    </div>
)
}

export default LoginModal;