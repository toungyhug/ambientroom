<template>
  <div class="w-screen h-screen bg-usual-background bg-left-top bg-repeat">
    <div class="flex flex-col w-full h-full">
      <div class="h-1/15 w-full flex flex-col relative shadow-2xl">
        <div
          ref="szer"
          @click.self="changeAudio"
          class="pl-5 pr-5 w-full h-full flex flex-row items-center text-white font-urbanist font-normal tracking-widest cursor-pointer"
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
            v-if="currentTrackPlaying === true"
            @click.self="changeAudio"
            class="w-1/2 flex flex-1 justify-center text-xl tracking-widetest"
          >{{ currentTrackName }}</div>
          <div
            v-else
            @click.self="changeAudio"
            class="w-1/2 h-full flex flex-1 justify-center items-center"
          >
            <img
              class="flex justify-center items-center h-10 m-2"
              src="../src/assets/logo_pausing_white.svg"
              alt
            />
          </div>
          <div
            class="w-30 flex justify-center"
          >{{ isNaN(currentTrackMaxTime) ? ("00:00") : (Math.floor(currentTrackMaxTime.toFixed(0) / 60) > 9) ? (Math.floor(currentTrackMaxTime.toFixed(0) / 60)) : ("0" + Math.floor(currentTrackMaxTime.toFixed(0) / 60)) + ":" + ((currentTrackMaxTime.toFixed(0) % 60 > 9) ? (currentTrackMaxTime.toFixed(0) % 60) : ("0" + currentTrackMaxTime.toFixed(0) % 60)) }}</div>
          <div class="w-20 flex justify-center font-semibold">MENU</div>
        </div>
        <div class="h-0.5 relative bottom-0 left-0 transition rounded-full w-full">
          <div
            class="h-0.5 absolute bottom-0 left-0 transition rounded-full"
            :style="{ 'width': currentPlayerTime + 'px' }"
            style="background-image: linear-gradient(to right, #d2b7fa 10% , #b9ad46 30%,#b9ad46 60%, #ff99bb 100%); background-size: 1920px 100%; "
          ></div>
        </div>
      </div>

      <div class="flex flex-col w-full h-full">
        <div class="flex justify-center w-full"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity"
import Sound from "../src/assets/somemusic.mp3"


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

