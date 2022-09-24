import React from "react";
import { useRef } from "react";

export default function Register() {
    const username = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    interface Account {
        username: string,
        email: string,
        password: any
    }

    async function RegisterAccount(account) {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            body: JSON.stringify(account),
            headers: {"Content-Type" : "application/json"}
        });
        const data = await response.json();
        console.log(data);
    }

    function CheckAccount() {
        let account: Account = {
            username: username.current.value,
            email: email.current.value,
            password: password.current.value
        };
        RegisterAccount(account);
    }
    
    return (
        <section className="App">
            <input ref={username} type="text" placeholder="Username" />
            <input ref={email} type="text" placeholder="Email" />
            <input ref={password} type="password" placeholder="Password" />
            <button onClick={CheckAccount}>Register Account</button>
        </section>
    )
}