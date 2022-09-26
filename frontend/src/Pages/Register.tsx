import React from "react";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const username = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const [admin, setAdmin] = useState<boolean>(false);
    const navigate = useNavigate();

    interface Account {
        username: string,
        email: string,
        password: any,
        admin: boolean,
        images: string[]
    }

    async function RegisterAccount(account: Account) {
        const response = await fetch("http://localhost:3000/register", {
            method: "POST",
            body: JSON.stringify(account),
            headers: {"Content-Type" : "application/json"}
        });
        const data = await response.json();
        console.log(data);
        
        if(data.success) {
            navigate("/login");
        }
    }

    function CheckAccount() {
        let account: Account

        if(admin) {
                account = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value,
                admin: admin,
                images: []
            };
        } else {
                account = {
                username: username.current.value,
                email: null,
                password: password.current.value,
                admin: admin,
                images: []
            };
        }
        RegisterAccount(account);
    };

    function checkAdmin() {
        setAdmin(!admin);
    }
    
    return (
        <section className="App">
            <input ref={username} type="text" placeholder="Username" />
            <input onClick={checkAdmin} type="checkbox" name="admin" id="admin" />
            { admin ? <input ref={email} type="text" placeholder="Email" /> : null}
            <input ref={password} type="password" placeholder="Password" />
            <button onClick={CheckAccount}>Register Account</button>
        </section>
    )
}