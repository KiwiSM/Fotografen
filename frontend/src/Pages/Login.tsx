import React from "react";
import { useRef } from "react";

export default function Login() {
    const username = useRef(null);
    const password = useRef(null);

    interface Account {
        username: string;
        password: string;
    }

    async function RegisterLogin(account: Account) {
        const response = await fetch("http://localhost:3000/login", {
            method: "POST",
            body: JSON.stringify(account),
            headers: {"Content-Type" : "application/json"}
        });
        const data = await response.json();
        console.log(data);
    }

    function CheckLogin() {
        let account: Account = {
            username: username.current.value,
            password: password.current.value
        };
        RegisterLogin(account);
    }

    return (
        <section className="App">
            <input ref={username} type="text" placeholder="Username" />
            <input ref={password} type="password" placeholder="Password" />
            <button onClick={CheckLogin}>Log in</button>
        </section>
    )
}