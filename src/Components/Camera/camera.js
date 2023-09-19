// import React from "react";
// import Webcam from "react-webcam";

// function Camera(props){

//   // const webcamRef = useRef(null);
//   // const [imgSrc, setImgSrc] = useState(null);

//   //   const capture = React.useCallback(() => {
//   //     const imageSrc = webcamRef.current.getScreenshot();
//   //     setImgSrc(imageSrc);
//   //   }, [webcamRef, setImgSrc]);

//     return (
//       <div>
//         <Webcam
//           audio={false}
//           ref={props.webcamRef}
//           screenshotFormat="image/png" />

//         <button onClick={props.capture}>Capture photo</button>
//         {props.imgSrc && (
//           <img
//             src={props.imgSrc}
//             alt="User Captured"
//           />
//         )}
//       </div>
//     )

//   };


// export default Camera;
import React, { useEffect, useRef } from 'react';

const Camera = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const stripRef = useRef(null);

  useEffect(() => {
    getVideo();
  }, [videoRef]);

  const getVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        var isPlaying = video.currentTime > 0 && !video.paused && !video.ended
    && video.readyState > video.HAVE_CURRENT_DATA;

if (!isPlaying) {
  video.play();
}
      })
      .catch((err) => {
        console.error('error:', err);
      });
  };

  const paintToCanvas = () => {
    let video = videoRef.current;
    let photo = photoRef.current;
    let ctx = photo.getContext('2d');

    const width = 320;
    const height = 240;
    photo.width = width;
    photo.height = height;

    return setInterval(() => {
      ctx.drawImage(video, 0, 0, width, height);
    }, 200);
  };

  const takePhoto = () => {
    let photo = photoRef.current;
    let strip = stripRef.current;

    console.warn(strip);

    // const blob = new Blob([JSON.stringify(photo, null, 2)], {
    //   type: "image/jpeg",
    // });

    // console.log(blob)

    let please = photo.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      console.log(url)
      console.log(blob);
    }, 'image/jpeg');

    console.log(please);
    console.log(photo);
    const data = photo.toDataURL('image/jpeg');

    console.warn(data);
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', 'myWebcam');
    link.innerHTML = `<img src='${data}' alt='thumbnail'/>`;
    strip.insertBefore(link, strip.firstChild);
  };

  return (
    <div>
      <button onClick={() => takePhoto()}>Take a photo</button>
      <video onCanPlay={() => paintToCanvas()} ref={videoRef} />
      <canvas ref={photoRef} />
      <div>
        <div ref={stripRef} />
      </div>
    </div>
  );
};

export default Camera;
