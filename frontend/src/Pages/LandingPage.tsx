import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <section className="App">
            <main className="main">
                <h1>FOTOGRAFEN</h1>
                <h2>Already a member?</h2>
                <Link to="/login">
                    <button>Log In</button>
                </Link>
                <h2>I'M NOT A MEMBER, HELP!</h2>
                <h3>Click here to register an account</h3>
                <Link to="/register">
                    <button>Register</button>
                </Link>
            </main>
        </section>
    )
}