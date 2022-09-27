import React, { useState, useEffect, useRef } from "react";

export default function Fotografen() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState<boolean>(false);
    const [photos, setPhotos] = useState<string[]>([]);

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
        audio: false,
        video: true
        }).then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
        }).catch(err => {
        console.error(err);
        });
    };

    const TakePicture = () => {
        const width = 414;
        const height = width / (16/9);

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width
        photo.height = height

        let ctx = photo.getContext("2d");
        ctx.drawImage(video, 0, 0, width, height);

        StoreImage(photo.toDataURL("image/jpeg"));
        setHasPhoto(true);
    }

    async function StoreImage(image:any) {
        const user:string = localStorage.getItem("username");
        
        let userImageObject: object = {
        username: user,
        admin: true,
        image: image
        }

        const response = await fetch("http://localhost:3000/take-picture", {
        method: "POST",
        body: JSON.stringify(userImageObject),
        headers: {"Content-Type" : "application/json"}
        });
        const data = await response.json();
    }

    async function GetPhotos() {
        const user = localStorage.getItem("username");
        const response = await fetch("http://localhost:3000/fotografen", {
            method: "POST",
            body: JSON.stringify({user}),
            headers: { "Content-Type" : "application/json" }
        });
        const data = await response.json();
        console.log(data);
        setPhotos(data);
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
                    });
                };
                deleteProduct();
            });
            document.getElementById("pictures").appendChild(images);
            document.getElementById("pictures").appendChild(deleteButton);
        });
    }, [photos]);

    return (
        <section>
            <div className="camera">
                <video ref={videoRef}>Video goes here:</video>
                <button onClick={getVideo}>Start recording</button>
            </div>
            <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
                <canvas ref={photoRef}></canvas>
                <button onClick={TakePicture}>Take a picture</button>
            </div>
            <h1>Här ska vi kunna se alla BILDER</h1>
            <button onClick={GetPhotos}>BILDER</button>
            <button>SHOW BILDER</button>
            <ul id="pictures"></ul>
        </section>
    )
}