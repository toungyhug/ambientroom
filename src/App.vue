<template>
  <div class="w-screen h-screen bg-usual-background bg-left-top bg-repeat">
    <div class="flex flex-col w-full h-full">
      <div class="h-1/20 w-full flex flex-col relative shadow-2xl">
        <div
          ref="szer"
          @click.self="changeAudio"
          class="pl-5 pr-5 w-full h-full flex flex-row items-center text-white font-montserrat cursor-pointer"
        >
          <div
            v-if="currentTrackPlaying === false"
            @click="playAudio()"
            class="w-20 flex justify-center cursor-pointer font-semibold hover:text-gray-300"
          >PLAY</div>
          <div
            v-else
            @click="pauseAudio()"
            class="w-20 flex justify-center cursor-pointer font-semibold hover:text-gray-300"
          >PAUSE</div>
          <div
            class="w-30 flex justify-center"
          >{{ (Math.floor(currentTrackTime / 60) > 9) ? (Math.floor(currentTrackTime / 60)) : ("0" + Math.floor(currentTrackTime / 60)) + ":" + ((currentTrackTime % 60 > 9) ? (currentTrackTime % 60) : ("0" + currentTrackTime % 60)) }}</div>
          <div
            @click.self="changeAudio"
            class="w-1/2 flex flex-1 justify-center"
          >{{ currentTrackName }}</div>
          <div
            class="w-30 flex justify-center"
          >{{ isNaN(currentTrackMaxTime) ? ("00:00") : (Math.floor(currentTrackMaxTime.toFixed(0) / 60) > 9) ? (Math.floor(currentTrackMaxTime.toFixed(0) / 60)) : ("0" + Math.floor(currentTrackMaxTime.toFixed(0) / 60)) + ":" + ((currentTrackMaxTime.toFixed(0) % 60 > 9) ? (currentTrackMaxTime.toFixed(0) % 60) : ("0" + currentTrackMaxTime.toFixed(0) % 60)) }}</div>
          <div class="w-20 flex justify-center">MENU</div>
        </div>
        <div
          class="bg-yellow h-1/20 absolute bottom-0 left-0 transition rounded-full"
          :style="{ 'width': currentPlayerTime + 'px' }"
        ></div>
      </div>

      <div class="flex flex-col w-full h-full">
        <div class="flex justify-center w-full">
          <img class="h-20 m-10" src="../src/assets/logo.png" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity"
import Sound from "../src/assets/Gayle San Brussels 2002.mp3"


export default {

  name: 'App',
  components: {
  },
  methods: {},
  mounted() { },
  setup() {
    let currentTrack = new Audio(Sound)
    const currentTrackTime = ref(currentTrack.currentTime)
    const currentTrackName = ref()
    const currentRealTrackTime = ref(currentTrack.currentTime)
    const currentTrackMaxTime = ref("00:00")
    const currentTrackPlaying = ref(false);
    const currentPlayerTime = ref(window.innerWidth);

    const playAudio = () => {
      currentTrack.play();
      currentTrackPlaying.value = true;
      currentTrackMaxTime.value = currentTrack.duration
      currentTrackName.value = "Gayle San Brussels 2002";
    }
    const pauseAudio = () => {
      currentTrack.pause();
      currentTrackPlaying.value = false;
    }

    setInterval(() => {
      if (!currentTrack.paused) {
        updateAudio()
      }
      else {
        return
      }

    }, 200)
    const updateAudio = () => {
      currentTrackTime.value = Math.floor(currentTrack.currentTime.toFixed(0))
      currentRealTrackTime.value = currentTrack.currentTime
      currentPlayerTime.value = (currentRealTrackTime.value / currentTrackMaxTime.value * window.innerWidth).toFixed(0);
    }

    const changeAudio = (e) => {
      currentTrack.currentTime = (e.clientX / window.innerWidth * currentTrackMaxTime.value).toFixed(0);
    }

    return { currentTrackName, currentPlayerTime, changeAudio, currentTrackMaxTime, updateAudio, playAudio, pauseAudio, currentTrackTime, currentTrackPlaying }
  }
}
</script>

