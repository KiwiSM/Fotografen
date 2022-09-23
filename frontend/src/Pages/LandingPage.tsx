import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <section className="App">
            <header className="App-header">
                <h2>Already a member? Login in</h2>
                <Link to="/login">
                    <button>Log In</button>
                </Link>
                <h3>I'M NOT A MEMBER, HELP! - Click here to register an account</h3>
                <Link to="/register">
                    <button>Register</button>
                </Link>
            </header>
        </section>
    )
}