import React from "react";
import { useRef, useState } from "react";

export default function Register() {
    const [registerAccount, setRegisterAccount] = useState<Object>();
    const username = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    function RegisterAccount() {
        let account = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value
        };

        setRegisterAccount(account)
    }

    console.log(registerAccount);
    
    return (
        <section className="App">
            <input ref={username} type="text" placeholder="Username" />
            <input ref={email} type="text" placeholder="Email" />
            <input ref={password} type="password" placeholder="Password" />
            <button onClick={RegisterAccount}>Register Account</button>
        </section>
    )
}