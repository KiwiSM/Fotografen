import React from "react";
import { useRef, useState } from "react";

export default function Login() {
    const [checkAccount, setCheckAccount] = useState<Object>();
    const username = useRef(null);
    const password = useRef(null);

/*     async function Login(account) {
        const response = await fetch("http://localhost:5000/login", {
            method: "POST",
            body: JSON.stringify(account),
            headers: {"Content-Type": "application/json"}
        });
        const data = await response.json();
    } */

    function CheckAccount() {
        let account = {
            username: username.current.value,
            password: password.current.value
        };

        setCheckAccount(account)
    }

    console.log(checkAccount);
    
    return (
        <section className="App">
            <input ref={username} type="text" placeholder="Username" />
            <input ref={password} type="password" placeholder="Password" />
            <button onClick={CheckAccount}>Log in</button>
        </section>
    )
}