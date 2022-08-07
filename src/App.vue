<template>
  <div
    @keyup.up="volumeUp"
    @keyup.down="volumeDown"
    @keyup.right="seekUp"
    @keyup.left="seekDown"
    @keyup.space="pauseHandler"
    tabindex="0"
    class="w-screen h-screen bg-usual-background bg-left-top bg-repeat select-none overflow-hidden"
  >
    <!-- <div
      v-if="oneStart === false"
      class="absolute flex justify-center items-center top-0 bottom-0 left-0 right-0 w-full h-full bg-gray-200 bg-opacity-100 p-10 z-10"
    >
      <div class="flex flex-col justify-center items-center h-4/5 w-1/">
        <div class="h-px w-full bg-gray-500 bg-opacity-20 mb-1"></div>
        <div class="h-px w-full bg-gray-500 bg-opacity-40 mb-1"></div>
        <div class="h-px w-full bg-gray-500 bg-opacity-60 mb-1"></div>
        <div class="h-px w-full bg-gray-500 bg-opacity-80 mb-1"></div>
        <div class="h-px w-full bg-gray-500 mb-1"></div>
        <div class="flex justify-start items-center h-14 mt-14 mb-12">
          <img
            src="./assets/logo_pausing.svg"
            select-none
            class="h-full"
            alt=""
          />
        </div>
        <div
          class="flex justify-start relative items-center h-76 mb-20 cursor-default"
        >
          <img
            src="./assets/artss.png"
            select-none
            class="h-full shadow-lg border-4 relative border-gray-400 border-opacity-80"
            alt=""
          />
          <input
            ref="file"
            id="file"
            type="file"
            multiple
            @change="handlePath"
            accept="audio/*"
            class="text-xs rounded-full p-0 absolute opacity-0 cursor-pointer h-full w-full"
          />
        </div>
        <div class="h-px w-full bg-gray-500 mb-1"></div>
        <div class="h-px w-full bg-gray-500 bg-opacity-80 mb-1"></div>
        <div class="h-px w-full bg-gray-500 bg-opacity-60 mb-1"></div>
        <div class="h-px w-full bg-gray-500 bg-opacity-40 mb-1"></div>
        <div class="h-px w-full bg-gray-500 bg-opacity-20 mb-1"></div>
        <div></div>
        <div></div>
      </div>
    </div> -->
    <div class="flex flex-col w-full h-full">
      <div
        id="waveform"
        class="h-1/15 flex-shrink-0 w-full flex flex-col relative shadow-2xl z-0"
        :style="{ opacity: 0.1 + eqLine[0] / 500 }"
      ></div>
      <div class="h-1/15 w-full absolute left-0 top-0">
        <div
          ref="szer"
          @click.self="changeAudio"
          class="pl-2 pr-2 w-full h-full flex flex-row items-center text-white bg-black bg-opacity-20 font-urbanist font-normal tracking-widest cursor-pointer z-30"
        >
          <div
            class="flex justify-center items-center border border-gray-700 border-opacity-90 rounded-full h-9 pointer-events-none bg-zinc-800 bg-opacity-70"
          >
            <div
              class="h-8 w-16 flex justify-center items-center pointer-events-none text-base font-light tracking-widest ml-2 text-gray-200 font-nunito"
            >
              {{ currentTrackTime === null ? "00:00" : currentTrackTime }}
            </div>
            <div
              class="flex justify-center items-center font-normal mr-2 ml-2 text-2xs bg-zinc-800 bg-opacity-50 rounded-full h-8"
            >
              <div
                class="flex w-44 justify-around items-center pointer-events-auto"
                v-if="
                  currentTrackPlaying === false && currentTrackIsActive === true
                "
              >
                <div
                  v-if="ready === true"
                  @click="playAudio()"
                  class="flex justify-center items-center cursor-pointer ml-3 mr-2 border border-gray-500 bg-gray-400 bg-opacity-30 rounded-full h-6 w-14 hover:opacity-80"
                >
                  <img
                    src="./assets/icons/play_icon.svg"
                    class="h-3.5 filter grayscale opacity-90"
                    alt=""
                  />
                </div>
                <div
                  v-else-if="ready === false"
                  class="flex justify-center items-center cursor-pointer mr-2 border border-gray-500 bg-gray-400 opacity-30 rounded-full h-6 w-14"
                >
                  <img
                    src="./assets/icons/play_icon.svg"
                    class="h-3.5 filter grayscale opacity-90"
                    alt=""
                  />
                </div>
                <div
                  @click="stopAudio()"
                  class="flex justify-center items-center cursor-pointer mr-2 border border-gray-500 bg-gray-400 bg-opacity-30 rounded-full h-6 w-14 hover:opacity-80"
                >
                  <img
                    src="./assets/icons/stop_icon.svg"
                    class="h-3.5 filter grayscale invert backdrop-brightness-150 brightness-75"
                    alt=""
                  />
                </div>
                <div
                  v-if="shuffleRepeat === 0 && playlist.length === 1"
                  @click="repeat()"
                  class="flex justify-center items-center cursor-pointer mr-3 border border-gray-500 bg-gray-400 bg-opacity-30 rounded-full h-6 w-14 hover:opacity-80"
                >
                  <img
                    src="./assets/icons/repeat_icon.svg"
                    class="h-3.5 filter invert grayscale opacity-70"
                    alt=""
                  />
                </div>
                <div
                  v-else
                  @click="endedAudio()"
                  class="flex justify-center items-center cursor-pointer mr-3 border border-gray-500 bg-gray-400 bg-opacity-30 rounded-full h-6 w-14 hover:opacity-80"
                >
                  <img
                    src="./assets/icons/next_icon.svg"
                    class="h-3.5 filter grayscale brightness-125"
                    alt=""
                  />
                </div>
              </div>
              <div
                class="flex w-44 justify-around items-center pointer-events-auto"
                v-else-if="
                  currentTrackPlaying === true && currentTrackIsActive === true
                "
              >
                <div
                  @click="pauseAudio()"
                  class="flex justify-center items-center cursor-pointer ml-3 mr-2 border border-gray-500 bg-gray-400 bg-opacity-30 rounded-full h-6 w-14 hover:opacity-80"
                >
                  <img
                    src="./assets/icons/pause_icon.svg"
                    class="h-3.5 filter grayscale opacity-90"
                    alt=""
                  />
                </div>
                <div
                  @click="stopAudio()"
                  class="flex justify-center items-center cursor-pointer mr-2 border border-gray-500 bg-gray-400 bg-opacity-30 rounded-full h-6 w-14 hover:opacity-80"
                >
                  <img
                    src="./assets/icons/stop_icon.svg"
                    class="h-3.5 filter grayscale invert backdrop-brightness-150 brightness-75"
                    alt=""
                  />
                </div>
                <div
                  v-if="shuffleRepeat === 0 && playlist.length === 1"
                  @click="repeat()"
                  class="flex justify-center items-center cursor-pointer mr-3 border border-gray-500 bg-gray-400 bg-opacity-30 rounded-full h-6 w-14 hover:opacity-80"
                >
                  <img
                    src="./assets/icons/repeat_icon.svg"
                    class="h-3.5 filter invert grayscale opacity-70"
                    alt=""
                  />
                </div>
                <div
                  v-else
                  @click="endedAudio()"
                  class="flex justify-center items-center cursor-pointer mr-3 border border-gray-500 bg-gray-400 bg-opacity-30 rounded-full h-6 w-14 hover:opacity-80"
                >
                  <img
                    src="./assets/icons/next_icon.svg"
                    class="h-3.5 filter grayscale brightness-125"
                    alt=""
                  />
                </div>
              </div>
              <div
                v-else-if="currentTrackIsActive === false"
                class="cursor-default opacity-90 w-44 h-6 flex justify-center items-center"
              >
                <div
                  class="pointer-events-auto text-xs font-normal relative w-full h-full ml-2 mr-2 flex justify-center items-center bg-gray-200 bg-opacity-30 rounded-full hover:bg-opacity-40 cursor-pointer"
                >
                  <img
                    src="./assets/icons/add_icon.svg"
                    class="h-5 filter invert grayscale opacity-70"
                    alt=""
                  />
                  <input
                    ref="file"
                    id="file"
                    type="file"
                    multiple
                    @change="handlePath"
                    accept="audio/*"
                    class="text-sm rounded-full p-0 absolute opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div
              class="h-8 w-16 flex justify-center items-center pointer-events-none text-base font-light tracking-widest mr-2 text-gray-200 font-nunito"
            >
              {{ currentTrackMaxTime === null ? "00:00" : currentTrackMaxTime }}
            </div>
          </div>
          <div
            class="w-1/2 flex flex-1 justify-center items-center pointer-events-none"
          >
            <div
              v-if="currentStateLoading === false"
              class="justify-center text-xl tracking-widest bg-gray-200 bg-opacity-70 pl-10 pr-10 text-black text-opacity-70 font-semibold font-cinzel rounded-full"
            >
              {{ currentTrackName }}
            </div>
            <div
              v-else
              class="h-full w-1/2 flex justify-center items-center font-cinzel opacity-80"
            >
              <img
                src="./assets/icons/loading_icon.svg"
                class="h-7 filter grayscale invert backdrop-brightness-150 brightness-75 animate-spin-step"
                alt=""
              />
              <span
                class="text-gray-100 text-lg tracking-widest ml-3 mr-3 font-normal font-nunito"
                >loading...</span
              >
            </div>
          </div>
          <div
            @click="changeShuffleRepeat()"
            class="flex h-7 w-14 flex-row justify-center items-center border border-gray-700 rounded-full hover:opacity-70 cursor-pointer ml-0 mr-3"
          >
            <div
              v-if="shuffleRepeat === 0"
              class="h-full w-full flex justify-center items-center bg-zinc-800 bg-opacity-60 rounded-full"
            >
              <img
                src="./assets/icons/order2_icon.svg"
                class="h-4 filter invert opacity-70"
                alt=""
              />
            </div>
            <div
              v-else-if="shuffleRepeat === 1"
              class="h-full w-full flex justify-center items-center bg-purple-400 bg-opacity-50 rounded-full"
            >
              <img
                src="./assets/icons/repeat_icon.svg"
                class="h-4 filter invert opacity-70"
                alt=""
              />
            </div>
            <div
              v-else-if="shuffleRepeat === 2"
              class="h-full w-full flex justify-center items-center bg-yellow bg-opacity-50 rounded-full"
            >
              <img
                src="./assets/icons/shuffle_icon.svg"
                class="h-4 filter invert opacity-70"
                alt=""
              />
            </div>
          </div>
          <div
            @click="isPlaylistHandle()"
            class="flex h-7 w-14 flex-row justify-center items-center border border-gray-700 rounded-full hover:opacity-70 cursor-pointer ml-0 mr-3"
          >
            <div
              v-if="isPlaylist === true"
              class="h-full w-full flex justify-center items-center bg-green-400 bg-opacity-50 rounded-full"
            >
              <img
                src="./assets/icons/playlist_icon.svg"
                class="h-4 filter invert opacity-70"
                alt=""
              />
            </div>
            <div
              v-else-if="isPlaylist === false"
              class="h-full w-full flex justify-center items-center bg-zinc-800 bg-opacity-60 rounded-full"
            >
              <img
                src="./assets/icons/playlist_icon.svg"
                class="h-4 filter invert opacity-70"
                alt=""
              />
            </div>
          </div>
          <div
            @click="isEQHandle()"
            class="flex h-7 w-14 flex-row justify-center items-center border border-gray-700 rounded-full hover:opacity-70 cursor-pointer ml-0 mr-2"
          >
            <div
              v-if="isEQ === true"
              class="h-full w-full flex justify-center items-center bg-sky-400 bg-opacity-40 rounded-full"
            >
              <img
                src="./assets/icons/eq_icon.svg"
                class="h-5 filter invert opacity-70"
                alt=""
              />
            </div>
            <div
              v-else-if="isEQ === false"
              class="h-full w-full flex justify-center items-center bg-zinc-800 bg-opacity-60 rounded-full"
            >
              <img
                src="./assets/icons/eq_icon.svg"
                class="h-5 filter invert opacity-70"
                alt=""
              />
            </div>
          </div>
          <!-- <div
            class="flex flex-row justify-between items-center w-28 mr-1 ml-1 border border-gray-500 rounded-full cursor-default text-sm">
            <div @click="speedDown()"
              class="bg-gray-300 bg-opacity-20 hover:bg-opacity-30 rounded-full p-0.5 pr-3 pl-3 cursor-pointer">
              <p>-</p>
            </div>
            <div class="hover:opacity-60 cursor-pointer w-1/2 flex justify-center items-center">
              <p @click="speedReset()">{{ currentTrackSpeed }}</p>
            </div>
            <div @click="speedUp()"
              class="bg-gray-300 bg-opacity-20 hover:bg-opacity-30 rounded-full p-0.5 pr-3 pl-3 cursor-pointer">+</div>
          </div> -->
          <div
            class="w-36 h-full flex p-1.5 pt-4 pb-4 mr-1 ml-2 pointer-events-none rounded-2xl"
          >
            <div
              class="w-full h-full bg-grayy bg-opacity-90 flex items-end overflow-hidden rounded-2xl"
            >
              <div
                v-for="(line, inddd) in eqForm"
                :key="inddd"
                class="w-full bg-gray-300 bg-opacity-70 rounded-full"
                :style="{
                  height: line - (100 - inddd * 0.2) + '%',
                  opacity: currentTrackVolume * 150 + '%',
                  filter: ' brightness(' + line * 0.7 + '%) ',
                }"
              ></div>
            </div>
          </div>
        </div>
        <div>
          <div
            v-if="currentTrackIsPaused === true || currentTrackPlaying === true"
            class="h-0.5 bottom-0 left-0 transition rounded-full w-full"
          >
            <div
              class="h-0.5 absolute bottom-0 left-0 transition rounded-full bg-seek bg-bottom bg-auto"
              :style="{ width: currentPlayerTime + 'px' }"
            ></div>
          </div>
          <div
            v-else
            class="h-0.5 bg-gray-400 relative bottom-0 left-0 transition rounded-full w-full"
          ></div>
        </div>
      </div>
      <audio
        ref="audioPlayer"
        @timeupdate="updateAudio()"
        @ended="endedAudio()"
      ></audio>
      <div class="flex flex-col w-full h-full relative overflow-hidde">
        <div class="flex items-center p-3 absolute left-0">
          <p
            class="text-gray-200 font-cinzel text-sm tracking-widest text-opacity-80"
          >
            Visualisation - Rain
          </p>
        </div>
        <div
          v-if="isEQ"
          class="flex flex-col justify-start items-center w-52 max-h-8/10 rounded-lg absolute overflow-hidden top-5 right-5 border border-gray-500 border-opacity-90"
        >
          <div
            class="flex flex-col flex-shrink-0 justify-between items-center w-full text-gray-300 tracking-widest font-medium uppercase text-xs bg-gray-600 bg-opacity-80"
          >
            <div class="p-2">
              <p>FILTER STORE</p>
            </div>
            <div
              class="flex justify-between items-center w-full bg-zinc-800 bg-opacity-50 p-2"
            >
              <div>
                <p class="p-1">Bass filter</p>
              </div>
              <div>
                <button
                  @click="bassFilterHandler(-65)"
                  v-if="!bassFilter"
                  class="p-1 pr-4 pl-4 bg-red-500 bg-opacity-70 rounded-lg hover:opacity-90"
                >
                  OFF
                </button>
                <button
                  @click="bassFilterHandler(0)"
                  v-else
                  class="p-1 pr-4 pl-4 bg-green-500 bg-opacity-70 rounded-lg hover:opacity-90"
                >
                  ON
                </button>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="isPlaylist"
          class="flex flex-col justify-start items-center w-52 max-h-8/10 rounded-lg absolute overflow-hidden top-5 right-5 border border-gray-300 border-opacity-90"
        >
          <div
            class="flex flex-shrink-0 justify-between items-center w-full h-8 text-gray-300 tracking-widest font-medium uppercase text-xs bg-gray-600 bg-opacity-80 cursor-pointer"
          >
            <div class="ml-2" @click="isPlaylistHandle()">
              Playlist - {{ playlist.length }} tracks
            </div>
            <div
              class="relative pr-2 pl-2 bg-green-500 bg-opacity-30 border-l border-gray-400 h-full w-10 text-sm hover:bg-opacity-50 cursor-pointer flex justify-center items-center"
            >
              +<input
                ref="file"
                id="file"
                type="file"
                multiple
                @change="handlePathAdd"
                accept="audio/*"
                class="absolute opacity-0 cursor-pointer left-0"
              />
            </div>
          </div>
          <div
            class="overflow-hidden w-52 flex flex-col justify-start items-center pl-5 bg-gray-600 bg-opacity-80"
          >
            <div
              ref="playlistDiv"
              @scroll="getScrollPosition"
              class="overflow-y-auto w-56 h-full"
            >
              <div
                v-for="(track, index) in playlist"
                :key="index"
                class="h-full w-full flex flex-col justify-start items-start bg-black bg-opacity-30"
              >
                <div
                  id="thatTrack"
                  v-if="index === this.currentTrackFromPlaylist"
                  @click="loadAudio()"
                  class="w-full text-2xs flex justify-start items-center p-1 text-black tracking-wider cursor-pointer bg-gray-100 bg-opacity-80 hover:bg-opacity-70"
                >
                  <p>{{ track.name }}</p>
                </div>
                <div
                  v-else-if="index !== this.currentTrackFromPlaylist"
                  @click="playAnotherTrack(track.id)"
                  class="w-full text-2xs flex justify-start items-center p-1 text-gray-300 tracking-wider cursor-pointer hover:bg-gray-300 hover:bg-opacity-10"
                >
                  <p>{{ track.name }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div ref="p5Canvas" id="p5Canvas" class="w-full h-full">
          <!-- <canvas
            webgl
            width="1920"
            height="1000"
            ref="canvas1"
            class="flex justify-center items-end"
          > 
          </canvas>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import p5 from "p5";
import WaveSurfer from "wavesurfer.js";

export default {
  name: "App",
  components: {},

  methods: {
    handlePathAdd(file) {
      this.currentStateLoading = true;
      let counter = 0;
      let playlistLength = this.playlist.length;
      for (let i = 0; i < file.target.files.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(file.target.files[i]);
        reader.onload = () => {
          counter = counter + 1;
          this.playlist.push({
            name: file.target.files[i].name.replace(".mp3", ""),
            base: reader.result,
            id: playlistLength + i,
          });
          if (counter === file.target.files.length) {
            setTimeout(() => {
              this.currentTrackName =
                this.playlist[this.currentTrackFromPlaylist].name;
              this.currentStateLoading = false;
            }, 500);
          }
        };
      }
    },
    handlePath(file) {
      this.audioctx = new AudioContext();
      this.playlist = [];
      let counter = 0;
      this.currentTrackFromPlaylist = 0;
      this.currentTrackIsActive = true;
      if (file.target.files.length > 1) {
        this.isPlaylist = true;
        this.isEQ = false;
      }
      this.currentStateLoading = true;
      for (let i = 0; i < file.target.files.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(file.target.files[i]);
        reader.onload = () => {
          counter = counter + 1;
          this.playlist.push({
            name: file.target.files[i].name.replace(".mp3", ""),
            base: reader.result,
            id: i,
          });
          if (counter === file.target.files.length) {
            setTimeout(() => {
              this.afterFiles();
            }, 500);
          }
        };
      }
    },
    afterFiles() {
      this.currentTrackName = this.playlist[this.currentTrackFromPlaylist].name;
      this.$refs.audioPlayer.src =
        this.playlist[this.currentTrackFromPlaylist].base;
      this.ready = true;
      if (this.oneStart === false) {
        this.eq();
        this.oneStart = true;
      }

      this.wavesurfer.load(this.$refs.audioPlayer);
      this.currentStateLoading = false;
    },
    eq() {
      this.audioSource = this.audioctx.createMediaElementSource(
        this.$refs.audioPlayer
      );
      this.wavesurfer = WaveSurfer.create({
        container: "#waveform",
        barHeight: 0.9,
        barWidth: 1.2,
        barRadius: 2,
        barGap: 0.5,
      });

      this.low = this.audioctx.createBiquadFilter();
      this.low.type = "lowshelf";
      this.low.frequency.value = 50;
      this.low.gain.value = 0;
      this.audioSource.connect(this.low);

      this.analyser = this.audioctx.createAnalyser();
      this.bufferLength = this.analyser.frequencyBinCount;
      this.data = new Uint8Array(this.bufferLength);
      this.analyser.getByteFrequencyData(this.data);
      this.low.connect(this.analyser);
      this.analyser.connect(this.audioctx.destination);

      setInterval(() => {
        this.eqCalculate();
      }, 5);
    },
    bassFilterHandler(value) {
      this.bassFilter = !this.bassFilter;
      this.low.gain.value = value;
    },
    playAudio() {
      this.currentTrackName = this.playlist[this.currentTrackFromPlaylist].name;
      this.currentTrackPlaying = true;
      this.currentTrackIsPaused = false;
      this.$refs.audioPlayer.play();
      this.currentStateLoading = false;
      this.calculateMaxTime();
    },
    playAnotherTrack(id) {
      for (let i = 0; i < this.playlist.length; i++) {
        if (id === this.playlist[i].id) {
          this.currentTrackFromPlaylist = i;
          this.afterFiles();
          this.loadAudio();
        }
      }
    },
    isPlaylistHandle() {
      if (this.isPlaylist === false && this.playlistScrollPosition > 0) {
        setTimeout(() => {
          this.$refs.playlistDiv.scrollTop = this.playlistScrollPosition;
        }, 50);
      }
      this.isPlaylist = !this.isPlaylist;
      if (this.isEQ == true && this.isPlaylist == true) {
        this.isEQ = false;
      }
    },
    isEQHandle() {
      this.isEQ = !this.isEQ;
      if (this.isEQ == true && this.isPlaylist == true) {
        this.isPlaylist = false;
      }
    },
    getScrollPosition(e) {
      this.playlistScrollPosition = e.target.scrollTop;
    },
    calculateMaxTime() {
      this.currentTrackMaxTimeReal = this.$refs.audioPlayer.duration;
      if (isNaN(this.currentTrackMaxTimeReal)) {
        this.currentStateLoading = true;
      } else {
        if (Math.floor(this.currentTrackMaxTimeReal.toFixed(0) / 60) > 9) {
          if (this.currentTrackMaxTimeReal.toFixed(0) % 60 > 9) {
            this.currentTrackMaxTime =
              Math.floor(this.currentTrackMaxTimeReal.toFixed(0) / 60) +
              ":" +
              (this.currentTrackMaxTimeReal.toFixed(0) % 60);
          } else {
            this.currentTrackMaxTime =
              Math.floor(this.currentTrackMaxTimeReal.toFixed(0) / 60) +
              ":" +
              "0" +
              (this.currentTrackMaxTimeReal.toFixed(0) % 60);
          }
        } else {
          if (this.currentTrackMaxTimeReal.toFixed(0) % 60 > 9) {
            this.currentTrackMaxTime =
              "0" +
              Math.floor(this.currentTrackMaxTimeReal.toFixed(0) / 60) +
              ":" +
              (this.currentTrackMaxTimeReal.toFixed(0) % 60);
          } else {
            this.currentTrackMaxTime =
              "0" +
              Math.floor(this.currentTrackMaxTimeReal.toFixed(0) / 60) +
              ":" +
              "0" +
              (this.currentTrackMaxTimeReal.toFixed(0) % 60);
          }
        }
      }
    },
    pauseAudio() {
      this.$refs.audioPlayer.pause();
      this.currentTrackPlaying = false;
      this.currentTrackIsPaused = true;
    },
    pauseHandler() {
      if (this.currentTrackPlaying == false) {
        this.playAudio();
      } else {
        this.pauseAudio();
      }
    },
    stopAudio() {
      this.currentTrackIsActive = false;
      this.reader = null;
      this.$refs.audioPlayer.src = null;
      this.isPlaylist = false;
      this.resetInfo();
      this.ready = false;
    },
    loadAudio() {
      this.currentStateLoading = true;
      this.$refs.audioPlayer.load();
      this.$refs.audioPlayer.currentTime = 0;
      this.wavesurfer.load(this.$refs.audioPlayer);
      this.currentTrackPlaying = false;
      this.currentTrackIsPaused = true;
      this.currentPlayerTime = 0;

      this.updateAudio();
      setTimeout(() => {
        this.playAudio();
      }, 500);
    },
    seekUp() {
      this.$refs.audioPlayer.currentTime =
        this.$refs.audioPlayer.currentTime + 5;
    },
    seekDown() {
      this.$refs.audioPlayer.currentTime =
        this.$refs.audioPlayer.currentTime - 5;
    },
    volumeUp() {
      if (this.currentTrackVolume !== 1) {
        this.currentTrackVolume = this.currentTrackVolume + 0.1;
        this.currentTrackVolume = this.currentTrackVolume.toFixed(1);
        this.currentTrackVolume = parseFloat(this.currentTrackVolume);
        this.$refs.audioPlayer.volume = this.currentTrackVolume;
      }
    },
    volumeDown() {
      if (this.currentTrackVolume !== 0) {
        this.currentTrackVolume = this.currentTrackVolume - 0.1;
        this.currentTrackVolume = this.currentTrackVolume.toFixed(1);
        this.currentTrackVolume = parseFloat(this.currentTrackVolume);
        this.$refs.audioPlayer.volume = this.currentTrackVolume;
      }
    },
    nextAudio() {
      this.playlistScrollPosition = 24 * this.currentTrackFromPlaylist;
      if (this.isPlaylist === true) {
        setTimeout(() => {
          this.$refs.playlistDiv.scrollTop = this.playlistScrollPosition;
        }, 50);
      }
      this.$refs.audioPlayer.src =
        this.playlist[this.currentTrackFromPlaylist].base;
      this.currentTrackName = this.playlist[this.currentTrackFromPlaylist].name;
      this.loadAudio();
    },
    eqCalculate() {
      this.analyser.getByteFrequencyData(this.data);
      for (let i = 0; i < 200; i++) {
        this.eqLine[i] = this.data[i];
        if (i < 20) {
          this.eqForm[i] = this.data[i] * 0.8;
        } else {
          this.eqForm[i] = this.data[i];
        }
      }
    },
    updateAudio() {
      if (isNaN(this.currentTrackMaxTimeReal)) {
        setTimeout(() => {
          this.calculateMaxTime();
        }, 500);
      }
      let timeOfTrack = Math.floor(
        this.$refs.audioPlayer.currentTime.toFixed(0)
      );
      this.currentPlayerTime = (
        (this.$refs.audioPlayer.currentTime / this.$refs.audioPlayer.duration) *
        window.innerWidth
      ).toFixed(0);

      if (Math.floor(timeOfTrack.toFixed(0) / 60) > 9) {
        if (timeOfTrack.toFixed(0) % 60 > 9) {
          this.currentTrackTime =
            Math.floor(timeOfTrack.toFixed(0) / 60) +
            ":" +
            (timeOfTrack.toFixed(0) % 60);
        } else {
          this.currentTrackTime =
            Math.floor(timeOfTrack.toFixed(0) / 60) +
            ":" +
            "0" +
            (timeOfTrack.toFixed(0) % 60);
        }
      } else {
        if (timeOfTrack.toFixed(0) % 60 > 9) {
          this.currentTrackTime =
            "0" +
            Math.floor(timeOfTrack.toFixed(0) / 60) +
            ":" +
            (timeOfTrack.toFixed(0) % 60);
        } else {
          this.currentTrackTime =
            "0" +
            Math.floor(timeOfTrack.toFixed(0) / 60) +
            ":" +
            "0" +
            (timeOfTrack.toFixed(0) % 60);
        }
      }
    },
    changeAudio(e) {
      if (this.currentTrackIsActive === true) {
        this.$refs.audioPlayer.currentTime = (
          (e.clientX / window.innerWidth) *
          this.$refs.audioPlayer.duration
        ).toFixed(0);
        this.playAudio();
      }
    },
    endedAudio() {
      if (this.shuffleRepeat !== 1) {
        if (this.shuffleRepeat === 2) {
          if (this.playlist.length === 1) {
            this.pauseAudio();
          } else {
            let randomNumber = Math.floor(
              Math.random() * (this.playlist.length - 1 - 0 + 1) + 0
            );
            if (this.currentTrackFromPlaylist === randomNumber) {
              this.endedAudio();
            } else {
              this.currentTrackFromPlaylist = randomNumber;
              this.nextAudio();
            }
          }
        } else if (this.shuffleRepeat === 0) {
          if (this.currentTrackFromPlaylist === this.playlist.length - 1) {
            this.pauseAudio();
          } else {
            this.currentTrackFromPlaylist++;
            this.nextAudio();
          }
        }
      } else if (this.shuffleRepeat === 1) {
        this.$refs.audioPlayer.currentTime = 0;
        this.playAudio();
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
    repeat() {
      this.$refs.audioPlayer.currentTime = 0;
      this.playAudio();
    },
    changeShuffleRepeat() {
      this.shuffleRepeat++;
      if (this.shuffleRepeat === 2 && this.playlist.length === 1) {
        this.shuffleRepeat++;
      }
      if (this.shuffleRepeat === 3) {
        this.shuffleRepeat = 0;
      }
    },
  },
  setup() {
    const ready = ref(false);
    const oneStart = ref(false);
    const currentTrackTime = ref(null);
    const currentTrackIsActive = ref(false);
    const currentTrackName = ref(null);
    const currentTrackMaxTime = ref(null);
    const currentTrackMaxTimeReal = ref(null);
    const currentTrackPlaying = ref(false);
    const currentTrackIsPaused = ref(false);
    const currentTrackSpeed = ref(1);
    const currentTrackVolume = ref(1);
    const currentPlayerTime = ref(window.innerWidth);
    const currentStateLoading = ref(false);
    const shuffleRepeat = ref(0);
    const playlist = ref([]);
    const isPlaylist = ref(false);
    const isEQ = ref(false);
    const currentTrackFromPlaylist = ref(null);
    const playlistScrollPosition = ref(0);
    const eqLine = ref([]);
    const eqForm = ref([]);
    const waveForm = ref([]);
    const visualisationVer = ref([]);
    const canvas = ref(null);
    const p5Canvas = ref(null);

    let wavesurfer;
    let source;
    let songLength;
    let low;
    let audioctx;
    let audioSource;
    let analyser;
    let bufferLength;
    let data;
    let bassFilter;
    let reeverb;

    onMounted(() => {
      const script = function (p5) {
        class Drop {
          dropX = Math.floor(Math.random() * innerWidth);
          dropY = Math.floor(Math.random() * innerHeight) - 1200;
          dropYS = Math.floor(Math.random() * 21) + 2;

          fall = () => {
            // console.log(this.dropYS);
            this.dropY = this.dropY + this.dropYS;
            if (this.dropY > innerHeight) {
              this.dropY = Math.floor(Math.random() * innerHeight) - 1200;
            }
            if (eqLine.value[0] > 140) {
              this.dropYS = Math.floor(Math.random() * 30) + 5;
            } else {
              this.dropYS = Math.floor(Math.random() * 15) + 1;
            }
          };
          show = () => {
            p5.stroke(
              eqLine.value[28] * 1.8,
              eqLine.value[32] * 2.1,
              eqLine.value[34] * 1.7
            );
            p5.line(
              this.dropX,
              this.dropY,
              this.dropX,
              this.dropYS > 10
                ? this.dropY +
                    Math.floor((Math.random() * eqLine.value[7]) / 15) +
                    5
                : this.dropY + Math.floor(Math.random() * 3) + 1
            );
          };
        }

        p5.windowResized = () => {
          p5.resizeCanvas(innerWidth, innerHeight);
        };

        p5.setup = () => {
          let canvas = p5.createCanvas(innerWidth, innerHeight);
          canvas.parent("p5Canvas");
        };

        let drops = new Array();
        for (let i = 0; i < 300; i++) {
          drops[i] = new Drop();
        }

        p5.draw = () => {
          p5.background(30);
          for (let i = 0; i < drops.length; i++) {
            drops[i].fall();
            drops[i].show();
          }
        };
      };

      new p5(script);
    });

    return {
      wavesurfer,
      visualisationVer,
      oneStart,
      eqLine,
      eqForm,
      waveForm,
      audioSource,
      data,
      audioctx,
      analyser,
      bufferLength,
      ready,
      currentTrackIsActive,
      currentStateLoading,
      currentTrackVolume,
      currentTrackMaxTimeReal,
      playlistScrollPosition,
      currentTrackFromPlaylist,
      shuffleRepeat,
      isPlaylist,
      isEQ,
      playlist,
      currentPlayerTime,
      currentTrackIsPaused,
      currentTrackMaxTime,
      currentTrackName,
      currentTrackPlaying,
      currentTrackSpeed,
      currentTrackTime,
      p5Canvas,
      canvas,
      low,
      bassFilter,
      reeverb,
    };
  },
};
</script>
