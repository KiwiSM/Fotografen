import React, { useEffect, useState } from "react";
import TakePhoto from "../Components/TakePhoto";

export default function Fotografen() {
    const [photos, setPhotos] = useState<string[]>([]);

    async function GetPhotos() {
        const user = localStorage.getItem("username");
        const response = await fetch("http://localhost:3000/fotografen", {
            method: "POST",
            body: JSON.stringify({user}),
            headers: { "Content-Type" : "application/json" }
        });
        const data = await response.json();
        console.log(data);
        setPhotos(data)
    };

    useEffect(() => {
        photos.forEach((picture:any) => {
            let images = document.createElement("img");
            images.src = picture.image
            let deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete"
        
            deleteButton.addEventListener("click", () => {
                function deleteProduct() {
                    fetch("http://localhost:3000/images", 
                    {
                      method: "DELETE",
                      headers: {"Content-Type": "application/json"},
                      body: JSON.stringify({picture})
                    })
                };
                deleteProduct();
            }) 
            document.getElementById("pictures").appendChild(images);
            document.getElementById("pictures").appendChild(deleteButton);
        });
    }, [photos])

    return (
        <section>
            <h1>Här ska vi kunna se alla BILDER</h1>
            {
                <TakePhoto />
            }
            <button onClick={GetPhotos}>BILDER</button>
            <button>SHOW BILDER</button>
            <ul id="pictures"></ul>
        </section>
    )
}