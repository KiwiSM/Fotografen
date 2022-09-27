import React, { useState, useRef, useEffect } from "react";

export default function Fotografen() {
    const videoRef = useRef(null);
    const photoRef = useRef(null);
    const [hasPhoto, setHasPhoto] = useState<boolean>(false);
    const [photos, setPhotos] = useState<any>({});

    const getVideo = () => {
        navigator.mediaDevices.getUserMedia({
        audio: false,
        video: { width: 300, height: 300 / (16/9)  }
        }).then(stream => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
        }).catch(err => {
        console.error(err);
        });
    };

    const TakePicture = () => {
        const width = 150;
        const height = width / (16/9);

        let video = videoRef.current;
        let photo = photoRef.current;

        photo.width = width
        photo.height = height

        let ctx = photo.getContext("2d");
        ctx.drawImage(video, 0, 0, width, height);

        let picture = {
            id: Math.floor(Math.random() * 1000),
            URL: photo.toDataURL("image/jpeg")
        }

        StorePicture(picture);
        setHasPhoto(true);
    }

    async function StorePicture(image:any) {
        let images = document.createElement("img");
        images.src = image.URL;

        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";

        let divElem = document.createElement("div");
        divElem.append(images);
        divElem.append(deleteButton);
        document.getElementById("pictures").append(divElem);
        divElem.setAttribute("id", image.id);

        deleteButton.addEventListener("click", () => {
            document.getElementById(`${image.id}`).remove()
            async function deletePicture() {
                const response = await fetch("http://localhost:3000/pictures", 
                {
                  method: "DELETE",
                  headers: {"Content-Type": "application/json"},
                  body: JSON.stringify({image})
                });
                const data = await response.json();
                setPhotos(data);
            };
            deletePicture();
        });

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
    };

 /*    async function GetPhotos() {
        const user = localStorage.getItem("username");
        const response = await fetch("http://localhost:3000/fotografen", {
            method: "POST",
            body: JSON.stringify({user}),
            headers: { "Content-Type" : "application/json" }
        });
        const data = await response.json();
        setPhotos(data);
    };

    useEffect(() => {
        photos.forEach((picture:any) => {
            let images = document.createElement("img");
            images.src = picture.image
            let deleteButton = document.createElement("button");
            deleteButton.innerText = "Delete"
        
            deleteButton.addEventListener("click", () => {
                async function deletePicture() {
                    const response = await fetch("http://localhost:3000/pictures", 
                    {
                      method: "DELETE",
                      headers: {"Content-Type": "application/json"},
                      body: JSON.stringify({picture})
                    });
                    const data = await response.json();
                    setPhotos(data)
                };
                deletePicture();
            });
            document.getElementById("pictures").appendChild(images);
            document.getElementById("pictures").appendChild(deleteButton);
        });
    }, [photos]); */

    return (
        <section className="App-fotografen">
            <div className="camera">
                <button onClick={getVideo}>Start recording</button>
                <video ref={videoRef}>Video goes here:</video>
            </div>
            <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
                <button onClick={TakePicture}>Take a picture</button>
                <canvas ref={photoRef}></canvas>
            </div>
            <h1>All available pictures will be displayed below</h1>
            <ul id="pictures"></ul>
        </section>
    );
};