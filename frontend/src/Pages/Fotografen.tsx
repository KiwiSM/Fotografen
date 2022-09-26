import React from "react";
import TakePhoto from "../Components/TakePhoto";

export default function Fotografen() {

    async function Pictures() {
        const user:string = localStorage.getItem("username");
        const response = await fetch("http://localhost:3000/fotografen", {
            method: "POST",
            body: JSON.stringify({user}),
            headers: {"Content-Type" : "application/json"}
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <section>
            <h1>Här ska vi kunna se alla BILDER</h1>
            {
                <TakePhoto />
            }
            <button onClick={Pictures}>Log here</button>
        </section>
    )
}