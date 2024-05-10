'use client'
import { useState } from "react";
import RegisterForm from "./RegisterForm/RegisterForm";

interface ShowModal {
showmodal: string;
}

const LoginModal: React.FC<ShowModal> = ({showmodal}) =>{
    const [modal, setModal] = useState<boolean>(false)
return(
    <div>
        <div>
            <button onClick={() => setModal(!modal)}>
                Login
            </button>
        </div>
        {modal ? <div>
            <RegisterForm/>
        </div>: null}

    </div>
)
}

export default LoginModal;