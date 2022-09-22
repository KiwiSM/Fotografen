import React, { useRef, useState, useEffect } from "react";

export default function TakePhoto() {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState<boolean>(false);

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

  function Record() {
    getVideo();
  };
  
    return (
        <section>
            <video ref={videoRef}>Video goes here:</video>
            <button onClick={Record}>Start recording</button>
            <button>Take a picture</button>
        </section>
    );
};