'use client'
import { useState } from "react"

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

    </div>
)
}