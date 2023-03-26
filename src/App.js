import React, { useState, useRef, useEffect } from "react";

function WebPlayer() {
  const [mainVideo, setMainVideo] = useState(null);
  const [pipVideo, setPipVideo] = useState(null);
  const mainVideoRef = useRef(null);
  const pipVideoRef = useRef(null);

  const handleMainVideoChange = (event) => {
    setMainVideo(URL.createObjectURL(event.target.files[0]));
  };

  const handlePipVideoChange = (event) => {
    setPipVideo(URL.createObjectURL(event.target.files[0]));
  };

  const handleMainVideoPlay = () => {
    mainVideoRef.current.play();
    if (pipVideoRef.current) {
      pipVideoRef.current.play();
    }
  };

  const handleMainVideoPause = () => {
    mainVideoRef.current.pause();
    if (pipVideoRef.current) {
      pipVideoRef.current.pause();
    }
  };

  const handleTogglePip = () => {
    if (!document.pictureInPictureElement) {
      if (pipVideoRef.current) {
        pipVideoRef.current.requestPictureInPicture();
      } else {
        mainVideoRef.current.requestPictureInPicture();
      }
    } else {
      document.exitPictureInPicture();
    }
  };

  const handleColorSchemeChange = (event) => {
    setColorScheme(event.target.value);
    if (pipVideoRef.current) {
      pipVideoRef.current.style.filter = getColorSchemeFilter(
        event.target.value
      );
    }
  };

  const getColorSchemeFilter = (colorScheme) => {
    switch (colorScheme) {
      case "normal":
        return "none";
      case "protanopia":
        return "url(#protanopia)";
      case "deuteranopia":
        return "url(#deuteranopia)";
      case "tritanopia":
        return "url(#tritanopia)";
      default:
        return "none";
    }
  };

  useEffect(() => {
    if (pipVideoRef.current) {
      pipVideoRef.current.addEventListener("loadedmetadata", () => {
        pipVideoRef.current.requestPictureInPicture();
      });
    }
  }, [pipVideo]);

  const handleBrightnessChange = (event) => {
    mainVideoRef.current.style.filter = `brightness(${event.target.value}%)`;
    if (pipVideoRef.current) {
      pipVideoRef.current.style.filter = `brightness(${event.target.value}%)`;
    }
  };

  const handleContrastChange = (event) => {
    mainVideoRef.current.style.filter = `contrast(${event.target.value}%)`;
    if (pipVideoRef.current) {
      pipVideoRef.current.style.filter = `contrast(${event.target.value}%)`;
    }
  };

  const handleSaturationChange = (event) => {
    mainVideoRef.current.style.filter = `saturate(${event.target.value}%)`;
    if (pipVideoRef.current) {
      pipVideoRef.current.style.filter = `saturate(${event.target.value}%)`;
    }
  };

  const handleClarityChange = (event) => {
    mainVideoRef.current.style.filter = `blur(${event.target.value}px)`;
    if (pipVideoRef.current) {
      pipVideoRef.current.style.filter = `blur(${event.target.value}px)`;
    }
  };

  return (
    <div>
      <video
        src={mainVideo}
        ref={mainVideoRef}
        onPlay={handleMainVideoPlay}
        onPause={handleMainVideoPause}
        controls
      />
      <br />
      <br />
      <label>
        Выберите основное видео:
        <input type="file" accept="video/*" onChange={handleMainVideoChange} />
      </label>
      <br />
      <br />
      {pipVideo && (
        <div
          style={{
            position: "fixed",
            bottom: "2px",
            right: "2px",
            width: "3px",
            height: "2px"
          }}
        >
          <video src={pipVideo} ref={pipVideoRef} muted />
        </div>
      )}
      <label>
        Выберите файл с сурдопереводом:
        <input type="file" accept="video/*" onChange={handlePipVideoChange} />
      </label>
      <br />
      <br />
      <button onClick={handleTogglePip}>
        {document.pictureInPictureElement ? "Отключить" : "Включить"}{" "}
        сурдоперевод
      </button>
      <br />
      <br />
      <div>
        <label htmlFor="brightness">Яркость</label>
        <input
          type="range"
          id="brightness"
          onChange={handleBrightnessChange}
          name="brightness"
          min="0"
          max="200"
          defaultValue="100"
        />
      </div>
      <br />
      <div>
        <label htmlFor="contrast">Контрастность</label>
        <input
          type="range"
          id="contrast"
          onChange={handleContrastChange}
          name="contrast"
          min="0"
          max="200"
          defaultValue="100"
        />
      </div>
      <br />
      <div>
        <label htmlFor="saturation">Насыщенность</label>
        <input
          type="range"
          id="saturation"
          onChange={handleSaturationChange}
          name="saturation"
          min="0"
          max="200"
          defaultValue="100"
        />
      </div>
      <br />
      <div>
        <label htmlFor="clarity">Четкость</label>
        <input
          type="range"
          id="clarity"
          onChange={handleClarityChange}
          name="clarity"
          min="0"
          max="200"
          defaultValue="200"
        />
      </div>
      <br />
    </div>
  );
}
export default WebPlayer;
