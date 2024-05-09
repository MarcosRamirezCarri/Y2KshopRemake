import { useState } from "react";

interface Errors{
    email: string,
    password: string,
    phone: string,
}

const LoginForm = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [error, setError] = useState<Errors>({
    email: '',
    password: '',
    phone: ''
  })

  
  return (
    <div className="flex flex-col gap-5 p-5">
      <ul>
        <p>Login</p>
        
          <form>
            <li>
                <p>Email</p>
            
            <input type="text">
            </input>
            </li>
            <li>
                <p>Password</p>
                <input type="text">

                </input>
            </li>
            <li>
                <p>Phone</p>
                <input type="text">
                </input>
            </li>
          </form>
        
      </ul>
    </div>
  );
};
