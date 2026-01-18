<script lang="ts" setup>
import { DrawingUtils, FilesetResolver, PoseLandmarker, RGBAColor } from '@mediapipe/tasks-vision';
import { onMounted, Ref, ref } from 'vue';

const fpos = ref('');
const videoEl: Ref<HTMLVideoElement | null> = ref(null)
const canvasEl: Ref<HTMLCanvasElement | null> = ref(null)
const segMaskEl: Ref<HTMLCanvasElement | null> = ref(null)
const runningMode: Ref<"IMAGE" | "VIDEO"> = ref('VIDEO')
const isCameraOpen: Ref<boolean> = ref(false);

const canvasCtx: Ref<CanvasRenderingContext2D | null> = ref(null)
const drawingUtils: Ref<DrawingUtils | null> = ref(null)

let poseLandmarker: PoseLandmarker = undefined;

// const videoHeight: Ref<string | number> = ref(0);
// const videoWidth: Ref<string | number> = ref(0);

let lastVideoTime = -1;

const createPoseLandmarker = async () => {
    const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
    );
    poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `/models/pose_landmarker_full.task`,
            delegate: "GPU"
        },
        outputSegmentationMasks: true,
        runningMode: runningMode.value,
        numPoses: 2
    });
};
createPoseLandmarker();

function handleClickRec(event) {
    isCameraOpen.value = !isCameraOpen.value
    if (isCameraOpen.value) {
        enableCam(event)
    }


}

function predictWebcam() {
    if (isCameraOpen.value) {
        requestAnimationFrame(predictWebcam);
    }
    console.log('predict')
    // canvasEl.value.style.height = videoHeight;
    // videoEl.value.style.height = videoHeight;
    // canvasEl.value.style.width = videoWidth;
    // videoEl.value.style.width = videoWidth;
    let startTimeMs = performance.now();
    if (lastVideoTime !== videoEl.value.currentTime) {
        lastVideoTime = videoEl.value.currentTime;
        poseLandmarker.detectForVideo(videoEl.value, startTimeMs, (result) => {
            fpos.value = JSON.stringify(result)
            canvasCtx.value.save();
            canvasCtx.value.clearRect(0, 0, canvasEl.value.width, canvasEl.value.height);
            for (const landmark of result.landmarks) {
                drawingUtils.value.drawLandmarks(landmark, {
                    radius: (data) => DrawingUtils.lerp(data.from!.z, -0.15, 0.1, 5, 1),
                });
                drawingUtils.value.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS);
            }
            canvasCtx.value.restore();


        });
    }
}

function enableCam(event) {
    if (!poseLandmarker) {
        console.log("Wait! poseLandmaker not loaded yet.");
        return;
    }

    // getUsermedia parameters.
    const constraints = {
        video: true
    };

    // Activate the webcam stream.
    navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        videoEl.value.srcObject = stream;
    });
}

function setup() {
    if (!videoEl || !canvasEl) return
    canvasCtx.value = canvasEl.value.getContext("2d");
    drawingUtils.value = new DrawingUtils(canvasCtx.value);

    // Check if webcam access is supported.
    const hasGetUserMedia = () => !!navigator.mediaDevices?.getUserMedia;

    // If webcam supported, add event listener to button for when user
    // wants to activate it.
    if (!hasGetUserMedia()) {
        console.warn("getUserMedia() is not supported by your browser");
    }
}


onMounted(() => { setup() })




</script>

<template>
    <div style="width: 100%;">
        <button @click="handleClickRec">{{ isCameraOpen ? 'Stop' : 'Start' }}</button>
        <div style="width: 100%;">
            <div v-show="isCameraOpen" style="display: flex; width: 100%; justify-content: space-between; gap: 10px;">
                <video ref="videoEl" @loadeddata="predictWebcam" autoplay playsinline style="width: 100%; transform: scale(-1,1);"></video>
                <canvas ref="canvasEl" style="background-color: black; width: 100%; transform: scale(-1,1);"></canvas>
            </div>
        </div>

        <div>
            <p>{{ fpos }}</p>
        </div>
    </div>
</template>

<style lang="scss" scoped></style>