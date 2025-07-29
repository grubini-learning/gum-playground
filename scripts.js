// Init stream so we can use it anywhere
let stream = null;
const videoEl = document.querySelector("#my-video");

const getMicAndCamera = async () => {
  // types of hardware that can ask access to
  const constraints = { audio: true, video: true };

  try {
    stream = await navigator.mediaDevices.getUserMedia(constraints);
    changeButtons([
      "green",
      "blue",
      "blue",
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
    ]);
  } catch (error) {
    console.log("user denied access to constraints");
  }
};

const showMyFeed = (e) => {
  if (isStreamAvailable()) {
    // sets MediaStream to video tag
    videoEl.srcObject = stream;
    changeButtons([
      "green",
      "green",
      "blue",
      "blue",
      "blue",
      "grey",
      "grey",
      "blue",
    ]);
  }
};

const stopMyFeed = (e) => {
  if (isStreamAvailable()) {
    const tracks = stream.getTracks();
    tracks.forEach((track) => {
      // disassociates
      track.stop();
    });
    changeButtons([
      "blue",
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
      "grey",
    ]);
  }
};

const __init__ = () => {
  document.querySelector("#share").addEventListener("click", getMicAndCamera);
  document.querySelector("#show-video").addEventListener("click", showMyFeed);
  document.querySelector("#stop-video").addEventListener("click", stopMyFeed);
};

const isStreamAvailable = () => {
  if (!stream) {
    alert("Stream still loading");
    return false;
  }

  return true;
};

__init__();
