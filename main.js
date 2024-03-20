const mic_btn = document.querySelector('#mic');
const playback = document.querySelector('.playback')
const generate = document.querySelector(  '#generate' );
const instructions = document.querySelector('.instructions')
mic_btn.addEventListener('click',ToggleMic);

const up_button = document.getElementById("generate");
up_button.addEventListener("click", uploadAudio);

let can_record = false;
let is_recording = false;

let recorder = null;

let blob;
let chunks = [];

function SetUpAudio(){
  console.log("Setup");
  if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices
    .getUserMedia({
      audio: true
    })
    .then(SetupStream)
    .catch((e)=>{
      console.log(e)
    });
  }
}

SetUpAudio();

function SetupStream(stream){
  recorder = new MediaRecorder(stream);

  recorder.ondataavailable = e =>{
    chunks.push(e.data);
  };
  recorder.onstop = e =>{
    blob = new Blob(chunks,{type: "audio/ogg; codecs=opus"});
    chunks=[];
    const audioURL = window.URL.createObjectURL(blob);
    playback.src = audioURL;

    playback.classList.remove('is-hidden');
    generate.classList.remove('is-hidden');
  }

  can_record= true;
}
let startTime; // Variable to store the start time of recording
let elapsedTimeDisplay = document.getElementById('timer'); // Get the element to display elapsed time
let timerInterval; // Variable to store the interval ID for the timer

function ToggleMic() {
    if (!can_record) return;
    is_recording = !is_recording;

    if (is_recording) {
        startTime = Date.now(); // Record the start time
        recorder.start();
        mic_btn.classList.add('is-recording');
        // Start updating the elapsed time display
        instructions.classList.add('is-hidden')
        timerInterval = setInterval(updateElapsedTime, 1000); // Update every second
    } else {
        recorder.stop();
        mic_btn.classList.remove('is-recording');
        

        clearInterval(timerInterval); // Stop updating the elapsed time
    }
}

function updateElapsedTime() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000); // Calculate elapsed time in seconds
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    elapsedTimeDisplay.textContent = formattedTime; // Update the displayed time
}

<<<<<<< HEAD
function uploadAudio() {
  // const fileInput = document.getElementById('playback');
  // // const fileInput= "blob:http://localhost:5175/c93004ea-79d1-4ace-8bce-8a6de905d1fb"
  // const file = fileInput.files[0];

  const formData = new FormData();
  formData.append('audioFile', blob);

  fetch("/api/process_audio", {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())
  .then(data => {
      console.log(data);
      
  })
  .catch(error => console.error('Error:', error));
=======

async function uploadAudio() {
  if (!can_record) return;
  recorder.stop();
  clearInterval(timerInterval); // Stop updating the elapsed time

  const blob = new Blob(chunks, { type: "audio/mp3; codecs=opus" });

  // Request permission to write to Downloads directory
  try {
    const options = {
      types: [
        {
          description: 'Recorded Audio',
          accept: { 'audio/mp3': ['.mp3'] },
        },
      ],
      suggestedName: 'recorded_audio.mp3', // Suggest a filename
    };
    const fileHandle = await window.showSaveFilePicker(options);
    const writable = await fileHandle.createWritable();
    await writable.write(blob);
    await writable.close();
    console.log('Audio saved to Downloads!');
  } catch (error) {
    console.error('Error saving file:', error);
  } finally {
    chunks = []; // Reset chunks array
  }
>>>>>>> 3f837eb (updated files)
}




// function uploadAudio() {
//   // const fileInput = document.getElementById('playback');
//   const fileInput= "blob:http://localhost:5175/c93004ea-79d1-4ace-8bce-8a6de905d1fb"
//   const file = fileInput.files[0];
//   const formData = new FormData();
//   formData.append('audioFile', file);

//   fetch('/api/process_audio', {
//       method: 'POST',
//       body: formData
//   })
//   .then(response => response.json())
//   .then(data => {
//       console.log(data);
      
//   })
//   .catch(error => console.error('Error:', error));
// }

