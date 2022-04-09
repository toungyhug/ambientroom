<template>
  <div class="w-screen h-screen bg-usual-background bg-left-top bg-repeat">
    <div class="flex flex-col w-full h-full">
      <div class="h-1/15 w-full flex flex-col relative shadow-2xl">
        <div
          ref="szer"
          @click.self="changeAudio"
          class="pl-2 pr-2 w-full h-full flex flex-row items-center text-white bg-black bg-opacity-20 font-urbanist font-normal tracking-widest cursor-pointer"
        >
          <div
            class="w-20 flex justify-center"
          >{{ (currentTrackTime === null) ? "00:00" : currentTrackTime }}</div>
          <div class="flex justify-center items-center font-normal mr-2 ml-2 text-2xs">
            <div
              class="flex w-30 justify-between items-center"
              v-if="currentTrackPlaying === false && currentTrackIsActive === true"
            >
              <div
                @click="playAudio()"
                class="flex justify-center items-center cursor-pointer mr-1 border border-gray-300 bg-gray-400 bg-opacity-30 rounded-full p-1 pr-4 pl-4 hover:opacity-80"
              >PLAY</div>
              <div
                @click="stopAudio()"
                class="flex justify-center items-center ml-1 border border-gray-300 bg-gray-400 bg-opacity-20 rounded-full p-1 pr-4 pl-4 hover:opacity-80"
              >STOP</div>
            </div>
            <div
              class="flex w-30 justify-between"
              v-else-if="currentTrackPlaying === true && currentTrackIsActive === true"
            >
              <div
                @click="pauseAudio()"
                class="flex justify-center items-center cursor-pointer mr-1 border border-gray-300 bg-gray-400 bg-opacity-20 rounded-full p-1 pr-4 pl-4 hover:opacity-80"
              >PAUSE</div>
              <div
                @click="stopAudio()"
                class="flex justify-center items-center ml-1 border border-gray-300 bg-gray-400 bg-opacity-20 rounded-full p-1 pr-4 pl-4 hover:opacity-80"
              >STOP</div>
            </div>
            <div v-else-if="currentTrackIsActive === false" class="cursor-default opacity-90 w-22">
              <input
                ref="file"
                type="file"
                id="file"
                @change="handlePath"
                accept="audio/*"
                class="w-full h-full text-sm rounded-full p-0"
              />
            </div>
          </div>
          <div
            v-if="currentTrackName !== null"
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
            @click="changeRepeat()"
            class="flex flex-row justify-center items-center border border-gray-500 rounded-full hover:opacity-70 cursor-pointer ml-3 mr-3"
          >
            <div
              v-if="doRepeat === true"
              class="h-full w-full p-1 pr-3 pl-3 flex justify-center items-center bg-green-400 bg-opacity-30 rounded-full"
            >
              <p class="text-xs font-normal">repeat</p>
            </div>
            <div
              v-else-if="doRepeat === false"
              class="h-full w-full p-1 pr-3 pl-3 flex justify-center items-center bg-red-400 bg-opacity-30 rounded-full"
            >
              <p class="text-xs font-normal">repeat</p>
            </div>
          </div>
          <div
            class="flex flex-row justify-between items-center w-28 border border-gray-500 rounded-full cursor-default text-sm"
          >
            <div
              @click="speedDown()"
              class="bg-gray-300 bg-opacity-20 hover:bg-opacity-30 rounded-full p-0.5 pr-3 pl-3 cursor-pointer"
            >
              <p>-</p>
            </div>
            <div class="hover:opacity-60 cursor-pointer w-1/2 flex justify-center items-center">
              <p @click="speedReset()">{{ currentTrackSpeed }}</p>
            </div>
            <div
              @click="speedUp()"
              class="bg-gray-300 bg-opacity-20 hover:bg-opacity-30 rounded-full p-0.5 pr-3 pl-3 cursor-pointer"
            >+</div>
          </div>

          <div
            class="w-20 flex justify-center items-center"
          >{{ (currentTrackMaxTime === null) ? "00:00" : currentTrackMaxTime }}</div>
        </div>
        <div
          v-if="currentTrackIsPaused === true || currentTrackPlaying === true"
          class="h-0.5 relative bottom-0 left-0 transition rounded-full w-full"
        >
          <div
            class="h-0.5 absolute bottom-0 left-0 transition rounded-full"
            :style="{ 'width': currentPlayerTime + 'px' }"
            style="background-image: linear-gradient(to right, #d2b7fa 10% , #b9ad46 30%,#b9ad46 60%, #ff99bb 100%); background-size: 1920px 100%; "
          ></div>
        </div>
        <div
          v-else
          class="h-0.5 bg-gray-400 relative bottom-0 left-0 transition rounded-full w-full"
        ></div>
      </div>
      <audio ref="audioPlayer" @timeupdate="updateAudio()" @ended="endedAudio()"></audio>
      <div class="flex flex-col w-full h-full">
        <div class="flex justify-center w-full"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity"


export default {

  name: 'App',
  components: {
  },
  methods: {
    handlePath(file) {
      let reader = new FileReader();
      reader.readAsDataURL(file.target.files[0])
      reader.onload = () => {
        this.$refs.audioPlayer.src = reader.result;
        this.currentTrackName = file.target.files[0].name.replace('.mp3', "")
        this.currentTrackIsActive = true;
      }
    },
    playAudio() {
      this.$refs.audioPlayer.play()
      this.currentTrackPlaying = true
      this.currentTrackIsPaused = false
      let timeOfTrack = this.$refs.audioPlayer.duration;

      if (Math.floor(timeOfTrack.toFixed(0) / 60) > 9) {
        if ((timeOfTrack.toFixed(0) % 60 > 9)) {
          this.currentTrackMaxTime = Math.floor(timeOfTrack.toFixed(0) / 60) + ":" + (timeOfTrack.toFixed(0) % 60)
        }
        else {
          this.currentTrackMaxTime = Math.floor(timeOfTrack.toFixed(0) / 60) + ":" + "0" + (timeOfTrack.toFixed(0) % 60)
        }
      }
      else {
        if ((timeOfTrack.toFixed(0) % 60 > 9)) {
          this.currentTrackMaxTime = "0" + Math.floor(timeOfTrack.toFixed(0) / 60) + ":" + (timeOfTrack.toFixed(0) % 60)
        }
        else {
          this.currentTrackMaxTime = "0" + Math.floor(timeOfTrack.toFixed(0) / 60) + ":" + "0" + (timeOfTrack.toFixed(0) % 60)
        }
      }
    },
    pauseAudio() {
      this.$refs.audioPlayer.pause()
      this.currentTrackPlaying = false
      this.currentTrackIsPaused = true
    },
    stopAudio() {
      this.currentTrackIsActive = false;
      this.reader = null;
      this.$refs.audioPlayer.src = null;
      this.resetInfo()
    },
    updateAudio() {
      let timeOfTrack = Math.floor(this.$refs.audioPlayer.currentTime.toFixed(0))
      this.currentPlayerTime = (this.$refs.audioPlayer.currentTime / this.$refs.audioPlayer.duration * window.innerWidth).toFixed(0)


      if (Math.floor(timeOfTrack.toFixed(0) / 60) > 9) {
        if ((timeOfTrack.toFixed(0) % 60 > 9)) {
          this.currentTrackTime = Math.floor(timeOfTrack.toFixed(0) / 60) + ":" + (timeOfTrack.toFixed(0) % 60)
        }
        else {
          this.currentTrackTime = Math.floor(timeOfTrack.toFixed(0) / 60) + ":" + "0" + (timeOfTrack.toFixed(0) % 60)
        }
      }
      else {
        if ((timeOfTrack.toFixed(0) % 60 > 9)) {
          this.currentTrackTime = "0" + Math.floor(timeOfTrack.toFixed(0) / 60) + ":" + (timeOfTrack.toFixed(0) % 60)
        }
        else {
          this.currentTrackTime = "0" + Math.floor(timeOfTrack.toFixed(0) / 60) + ":" + "0" + (timeOfTrack.toFixed(0) % 60)
        }
      }


    },
    changeAudio(e) {
      this.$refs.audioPlayer.currentTime = (e.clientX / window.innerWidth * this.$refs.audioPlayer.duration).toFixed(0)
      this.playAudio()
    },
    endedAudio() {
      if (this.doRepeat === false) {
        this.pauseAudio()
      }
      else if (this.doRepeat === true) {
        this.playAudio()
      }

    },
    resetInfo() {
      this.currentTrackTime = "00:00";
      this.currentTrackName = null;
      this.currentTrackMaxTime = "00:00";
      this.currentTrackPlaying = false;
      this.currentTrackIsPaused = false;
      this.currentTrackSpeed = 1;
      this.currentPlayerTime = window.innerWidth;
    },
    speedDown() {
      this.currentTrackSpeed = this.currentTrackSpeed - 0.02;
      this.currentTrackSpeed = this.currentTrackSpeed.toFixed(2);
      this.currentTrackSpeed = parseFloat(this.currentTrackSpeed);
      this.$refs.audioPlayer.playbackRate = this.currentTrackSpeed;
    },
    speedUp() {
      this.currentTrackSpeed = this.currentTrackSpeed + 0.02;
      this.currentTrackSpeed = this.currentTrackSpeed.toFixed(2);
      this.currentTrackSpeed = parseFloat(this.currentTrackSpeed);
      this.$refs.audioPlayer.playbackRate = this.currentTrackSpeed;
    },
    speedReset() {
      this.currentTrackSpeed = 1;
      this.$refs.audioPlayer.playbackRate = this.currentTrackSpeed;
    },
    changeRepeat() {
      this.doRepeat = !this.doRepeat;
    }
  },
  setup() {
    const currentTrackTime = ref(null);
    const currentTrackIsActive = ref(false);
    const currentTrackName = ref(null);
    const currentTrackMaxTime = ref(null);
    const currentTrackPlaying = ref(false);
    const currentTrackIsPaused = ref(false);
    const currentTrackSpeed = ref(1);
    const currentPlayerTime = ref(window.innerWidth);
    const doRepeat = ref(false)



    return { currentTrackIsActive, doRepeat, currentPlayerTime, currentTrackIsPaused, currentTrackMaxTime, currentTrackName, currentTrackPlaying, currentTrackSpeed, currentTrackTime }
  }
}
</script>

