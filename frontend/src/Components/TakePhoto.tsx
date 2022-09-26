import React, { useRef, useState } from "react";

export default function TakePhoto() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);
  const [photo, setPhoto] = useState(null);

  async function StoreImage() {
    const response = await fetch("http://localhost:3000/fotografen", {
      method: "POST",
      //body: JSON.stringify(),
      headers: {"Content-Type" : "application/json"}
    });
    const data = await response.json();
    console.log(data);
  }

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

  const TakePhoto = () => {
    const width = 414;
    const height = width / (16/9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width
    photo.height = height

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

/*     var images:any = [];
    images.push(photo.toDataURL("image/jpeg"));
    localStorage.setItem("photo", images); */

    setPhoto(photo.toDataURL("image/jpeg"));

    setHasPhoto(true);
    //StoreImage();
  }

  function Record() {
    getVideo();
  };

  return (
      <section className="App">
        <div className="camera">
          <video ref={videoRef}>Video goes here:</video>
          <button onClick={Record}>Start recording</button>
        </div>
        <div className={'result' + (hasPhoto ? 'hasPhoto' : '')}>
          <canvas ref={photoRef}></canvas>
          <button onClick={TakePhoto}>Take a picture</button>
        </div>
      </section>
    );
};