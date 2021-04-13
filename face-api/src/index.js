import * as faceapi from 'face-api.js'

// Variables
const container = document.querySelector('.container')
const video = document.getElementById("videoElm")

// Load Face API function
const loadFaceAPI = async () => {
    await faceapi.nets.faceLandmark68Net.loadFromUri('./models')
    await faceapi.nets.faceRecognitionNet.loadFromUri('./models')
    await faceapi.nets.tinyFaceDetector.loadFromUri('./models')
    await faceapi.nets.faceExpressionNet.loadFromUri('./models')
}

// Create camera function
function getCameraStream() {
    if ( navigator.mediaDevices.getUserMedia ) {
        navigator.mediaDevices.getUserMedia({ video: {} })
            .then(stream => {
                video.srcObject = stream
            })
    } else {
        alert('Camera permission!!!')
    }
}

// Video event playing
video.addEventListener('playing', () => {
    const canvas = faceapi.createCanvasFromMedia(video)
    container.append(canvas)
    const displaySize = {
        width: video.videoWidth,
        height: video.videoHeight
    }

    setInterval(async () => {
        const detects = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceExpressions()
            .withAgeAndGender()

        const resizedDetects = faceapi.resizeResults(detects, displaySize)
        canvas.getContext('2d').clearRect(0, 0, displaySize.width, displaySize.height)
        faceapi.draw.drawDetections(canvas, resizedDetects)
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetects)
        faceapi.draw.drawFaceExpressions(canvas, resizedDetects)
    }, 300)
})

// Run
loadFaceAPI().then(getCameraStream)