<template >
  <div class="w-screen h-screen bg-usual-background bg-left-top bg-repeat">
    <div class="flex flex-col w-full h-full">
      <div class="h-1/15 w-full flex flex-col relative shadow-2xl">
        <div ref="szer" @click.self="changeAudio"
          class="pl-2 pr-2 w-full h-full flex flex-row items-center text-white bg-black bg-opacity-20 font-urbanist font-normal tracking-widest cursor-pointer">
          <div class="w-20 flex justify-center">{{ (currentTrackTime === null) ? "00:00" : currentTrackTime }}</div>

          <div class="flex justify-center items-center font-normal mr-2 ml-2 text-2xs">
            <div class="flex w-36 justify-around items-center "
              v-if="currentTrackPlaying === false && currentTrackIsActive === true">
              <div @click="playAudio()"
                class="flex justify-center items-center cursor-pointer mr-1 border border-gray-300 bg-gray-400 bg-opacity-30 rounded-full p-1 pr-4 pl-4 hover:opacity-80">
                PLAY</div>
              <div @click="stopAudio()"
                class="flex justify-center items-center ml-1 border border-gray-300 bg-gray-400 bg-opacity-20 rounded-full p-1 pr-4 pl-4 hover:opacity-80">
                STOP</div>
            </div>
            <div class="flex w-36 justify-between"
              v-else-if="currentTrackPlaying === true && currentTrackIsActive === true">
              <div @click="pauseAudio()"
                class="flex justify-center items-center tracking-widetest cursor-pointer mr-1 border border-gray-500 bg-gray-400 bg-opacity-20 rounded-full p-1 pr-4 pl-4 hover:opacity-80">
                PAUSE</div>
              <div @click="stopAudio()"
                class="flex justify-center items-center tracking-widetest ml-1 border border-gray-500 bg-gray-400 bg-opacity-20 rounded-full p-1 pr-4 pl-4 hover:opacity-80">
                STOP</div>
            </div>
            <div v-else-if="currentTrackIsActive === false"
              class="cursor-default opacity-90 w-22 h-6 flex justify-center items-center">
              <input ref="file" type="file" id="file" multiple @change="handlePath" accept="audio/*"
                class="w-22 h-full text-sm rounded-full p-0" />
            </div>
          </div>
          <div class="w-20 flex justify-center items-center">{{
            (currentTrackMaxTime === null) ? "00:00" :
              currentTrackMaxTime
          }}</div>
          <div v-if="currentTrackName !== null" @click.self="changeAudio"
            class="w-1/2 flex flex-1 justify-center text-xl tracking-widetest">{{ currentTrackName }}</div>
          <div v-else @click.self="changeAudio" class="w-1/2 h-full flex flex-1 justify-center items-center">
            <img class="flex justify-center items-center h-8 m-2" src="../src/assets/logo_pausing_white.svg" alt />
          </div>
          <div @click="changeShuffle()"
            class="flex flex-row justify-center items-center border border-gray-500 rounded-full hover:opacity-70 cursor-pointer ml-0 mr-3">
            <div v-if="doShuffle === true"
              class="h-full w-full p-1 pr-3 pl-3 flex justify-center items-center bg-green-400 bg-opacity-30 rounded-full">
              <p class="text-xs font-normal">shuffle</p>
            </div>
            <div v-else-if="doShuffle === false"
              class="h-full w-full p-1 pr-3 pl-3 flex justify-center items-center bg-red-400 bg-opacity-30 rounded-full">
              <p class="text-xs font-normal">shuffle</p>
            </div>
          </div>
          <div @click="changeRepeat()"
            class="flex flex-row justify-center items-center border border-gray-500 rounded-full hover:opacity-70 cursor-pointer ml-0 mr-3">
            <div v-if="doRepeat === true"
              class="h-full w-full p-1 pr-3 pl-3 flex justify-center items-center bg-green-400 bg-opacity-30 rounded-full">
              <p class="text-xs font-normal">repeat</p>
            </div>
            <div v-else-if="doRepeat === false"
              class="h-full w-full p-1 pr-3 pl-3 flex justify-center items-center bg-red-400 bg-opacity-30 rounded-full">
              <p class="text-xs font-normal">repeat</p>
            </div>
          </div>
          <div @click="isPlaylistHandle()"
            class="flex flex-row justify-center items-center border border-gray-500 rounded-full hover:opacity-70 cursor-pointer ml-0 mr-3">
            <div v-if="isPlaylist === true"
              class="h-full w-full p-1 pr-3 pl-3 flex justify-center items-center bg-green-400 bg-opacity-30 rounded-full">
              <p class="text-xs font-normal">playlist</p>
            </div>
            <div v-else-if="isPlaylist === false"
              class="h-full w-full p-1 pr-3 pl-3 flex justify-center items-center bg-red-400 bg-opacity-30 rounded-full">
              <p class="text-xs font-normal">playlist</p>
            </div>
          </div>
          <div
            class="flex flex-row justify-between items-center w-28 border border-gray-500 rounded-full cursor-default text-sm">
            <div @click="speedDown()"
              class="bg-gray-300 bg-opacity-20 hover:bg-opacity-30 rounded-full p-0.5 pr-3 pl-3 cursor-pointer">
              <p>-</p>
            </div>
            <div class="hover:opacity-60 cursor-pointer w-1/2 flex justify-center items-center">
              <p @click="speedReset()">{{ currentTrackSpeed }}</p>
            </div>
            <div @click="speedUp()"
              class="bg-gray-300 bg-opacity-20 hover:bg-opacity-30 rounded-full p-0.5 pr-3 pl-3 cursor-pointer">+</div>
          </div>
        </div>
        <div v-if="currentTrackIsPaused === true || currentTrackPlaying === true"
          class="h-0.5 relative bottom-0 left-0 transition rounded-full w-full">
          <div class="h-0.5 absolute bottom-0 left-0 transition rounded-full"
            :style="{ 'width': currentPlayerTime + 'px' }"
            style="background-image: linear-gradient(to right, #d2b7fa 10% , #b9ad46 30%,#b9ad46 60%, #ff99bb 100%); background-size: 1920px 100%; ">
          </div>
        </div>
        <div v-else class="h-0.5 bg-gray-400 relative bottom-0 left-0 transition rounded-full w-full"></div>
      </div>
      <audio ref="audioPlayer" @timeupdate="updateAudio()" @ended="endedAudio()"></audio>
      <div class="flex flex-col w-full h-full relative">
        <div v-if="isPlaylist"
          class="flex flex-col justify-start items-center w-52 max-h-64 absolute overflow-hidden top-5 right-5 border-2 border-gray-400 border-opacity-90">
          <div @click="isPlaylistHandle()"
            class="flex justify-center items-center w-full text-gray-300 tracking-widest uppercase text-sm p-0.5 bg-gray-200 bg-opacity-30 cursor-pointer">
            Playlist
          </div>
          <div class="overflow-hidden w-52 flex flex-col justify-start items-center pl-5">
            <div ref="playlistDiv" @scroll="getScrollPosition" class="overflow-y-auto w-56 h-full">
              <div v-for="(track, index) in playlist" :key="index"
                class="h-full w-full flex flex-col justify-start items-start bg-black bg-opacity-30 ">
                <div id="thatTrack" v-if="index === this.currentTrackFromPlaylist" @click="loadAudio()"
                  class="w-full text-2xs flex justify-start items-center p-1  text-gray-300 tracking-wider cursor-pointer bg-gray-400 bg-opacity-30 hover:bg-gray-400 hover:bg-opacity-50">
                  <p>{{ track.name }}</p>
                </div>
                <div v-else-if="index !== this.currentTrackFromPlaylist" @click="playAnotherTrack(track.id)"
                  class="w-full text-2xs flex justify-start items-center p-1   text-gray-300 tracking-wider cursor-pointer hover:bg-gray-400 hover:bg-opacity-50">
                  <p>{{ track.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      this.playlist = [];
      let counter = 0;
      this.currentTrackFromPlaylist = 0;
      this.currentTrackIsActive = true;
      if (file.target.files.length > 1) {
        this.isPlaylist = true;
        this.currentTrackName = "loading..."
      }
      for (let i = 0; i < file.target.files.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(file.target.files[i])
        reader.onload = () => {
          counter = counter + 1;
          this.playlist.push({
            name: file.target.files[i].name.replace('.mp3', ""),
            base: reader.result,
            id: i,
          });
          if (counter === file.target.files.length) {
            setTimeout(() => {
              this.afterFiles()
            }, 200)
          }
        }
      }
    },
    afterFiles() {
      this.currentTrackName = this.playlist[this.currentTrackFromPlaylist].name
      this.$refs.audioPlayer.src = this.playlist[this.currentTrackFromPlaylist].base;
    },
    playAudio() {
      this.currentTrackName = this.playlist[this.currentTrackFromPlaylist].name
      this.$refs.audioPlayer.play()
      this.currentTrackPlaying = true
      this.currentTrackIsPaused = false
      this.calculateMaxTime()

    },
    playAnotherTrack(id) {
      for (let i = 0; i < this.playlist.length; i++) {
        if (id === this.playlist[i].id) {
          this.currentTrackFromPlaylist = i
          this.afterFiles()
          this.loadAudio()
        }
      }
    },
    isPlaylistHandle() {
      if (this.isPlaylist === false && this.playlistScrollPosition > 0) {
        setTimeout(() => {
          this.$refs.playlistDiv.scrollTop = this.playlistScrollPosition
        }, 50)

      }
      this.isPlaylist = !this.isPlaylist
    },
    getScrollPosition(e) {
      this.playlistScrollPosition = e.target.scrollTop
    },
    calculateMaxTime() {
      this.currentTrackMaxTimeReal = this.$refs.audioPlayer.duration;
      if (isNaN(this.currentTrackMaxTimeReal)) {
        this.currentTrackMaxTime = "loading.."
      }
      else {

        if (Math.floor(this.currentTrackMaxTimeReal.toFixed(0) / 60) > 9) {
          if ((this.currentTrackMaxTimeReal.toFixed(0) % 60 > 9)) {
            this.currentTrackMaxTime = Math.floor(this.currentTrackMaxTimeReal.toFixed(0) / 60) + ":" + (this.currentTrackMaxTimeReal.toFixed(0) % 60)
          }
          else {
            this.currentTrackMaxTime = Math.floor(this.currentTrackMaxTimeReal.toFixed(0) / 60) + ":" + "0" + (this.currentTrackMaxTimeReal.toFixed(0) % 60)
          }
        }
        else {
          if ((this.currentTrackMaxTimeReal.toFixed(0) % 60 > 9)) {
            this.currentTrackMaxTime = "0" + Math.floor(this.currentTrackMaxTimeReal.toFixed(0) / 60) + ":" + (this.currentTrackMaxTimeReal.toFixed(0) % 60)
          }
          else {
            this.currentTrackMaxTime = "0" + Math.floor(this.currentTrackMaxTimeReal.toFixed(0) / 60) + ":" + "0" + (this.currentTrackMaxTimeReal.toFixed(0) % 60)
          }
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
      this.isPlaylist = false;
      this.resetInfo()
    },
    loadAudio() {
      this.currentTrackName = "loading..."
      this.$refs.audioPlayer.load()
      this.$refs.audioPlayer.currentTime = 0;
      this.currentTrackPlaying = false
      this.currentTrackIsPaused = true
      this.currentPlayerTime = 0;

      this.updateAudio()
      setTimeout(() => {
        this.playAudio()
      }, 500)

    },
    nextAudio() {
      this.$refs.audioPlayer.src = this.playlist[this.currentTrackFromPlaylist].base
      this.currentTrackName = this.playlist[this.currentTrackFromPlaylist].name
      this.loadAudio()
    },
    updateAudio() {
      if (isNaN(this.currentTrackMaxTimeReal)) {
        setTimeout(() => {
          this.calculateMaxTime()
        }, 500)
      }
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

        if (this.currentTrackFromPlaylist === this.playlist.length - 1) {
          this.pauseAudio()
        }
        else {
          this.currentTrackFromPlaylist++
          this.nextAudio()
        }
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
    },
    changeShuffle() {
      this.doShuffle = !this.doShuffle;
    }
  },
  setup() {
    const currentTrackTime = ref(null);
    const currentTrackIsActive = ref(false);
    const currentTrackName = ref(null);
    const currentTrackMaxTime = ref(null);
    const currentTrackMaxTimeReal = ref(null);
    const currentTrackPlaying = ref(false);
    const currentTrackIsPaused = ref(false);
    const currentTrackSpeed = ref(1);
    const currentPlayerTime = ref(window.innerWidth);
    const doRepeat = ref(false)
    const doShuffle = ref(false)
    const playlist = ref([])
    const isPlaylist = ref(false)
    const currentTrackFromPlaylist = ref(null)
    const playlistScrollPosition = ref(0)



    return { currentTrackIsActive, currentTrackMaxTimeReal, playlistScrollPosition, currentTrackFromPlaylist, doShuffle, isPlaylist, playlist, doRepeat, currentPlayerTime, currentTrackIsPaused, currentTrackMaxTime, currentTrackName, currentTrackPlaying, currentTrackSpeed, currentTrackTime }
  }
}
</script>

