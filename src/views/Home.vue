<template>
  <h1>Akkadu RTC Demo</h1>
  <a
    href="https://github.com/Akkadu/akkadu-rtc-example"
    class="text-blue-400 font-bold underline"
    target="_blank"
  >See source code on Github</a>
  <div class="flex flex-col">
    <div class="flex justify-center mb-4 min-h-md">
      <video
        ref="videoEl"
        style="width: 550px;"
        class="rounded-md outline-none shadow-outline"
        aria-label="Akkadu promo video"
        controls
      >
        <source
          src="https://assets.akkadu.com/homepage/Why+Should+I+Start+a+Startup+by+Michael+Seibel_480p.mp4"
          type="video/mp4"
        >
      </video>
    </div>
    <pre
      :class="{ 'opacity-0': isReady }"
      class="bg-gray-50 text-gray-700 px-2 py-1 font-bold rounded-md mx-auto my-8 inline-block"
    >Loading...</pre>
    <div class="flex justify-center">
      <button
        :disabled="!isReady"
        class="px-4 py-3 transition shadow-md rounded-l-full outline-none focus:shadow-outline font-bold bg-white border-blue-400 border-thin"
        :class="[activeStream === 'original' ? 'bg-blue-400 text-white' : 'text-blue-400', !isReady && 'opacity-60']"
        @click="handleClickOriginal"
      >
        Original
      </button>
      <button
        :disabled="!isReady"
        class="px-4 py-3 transition shadow-md rounded-r-full outline-none focus:shadow-outline font-bold bg-white border-blue-400 border-thin"
        :class="[activeStream === 'translation' ? 'bg-blue-400 text-white' : 'text-blue-400', !isReady && 'opacity-60']"
        @click="handleClickTranslation"
      >
        Translation
      </button>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import Akkadu from '@akkadu/akkadu-rtc'

import { toast } from '../utils'

export default defineComponent({
  setup () {
    // 1. Define component variables
    const videoEl = ref()
    const activeStream = ref('original')
    const isReady = ref(false)
    const route = useRoute()

    // 2. Define streaming variables
    const isStreaming = ref(false)
    const streamer = ref(null)
    const room = computed(() => route.query.room)

    let akkaduActive = false
    let akkaduOnline = false

    // 3. Define utility functions
    const handleClickOriginal = () => {
      unmuteVideo()
      activeStream.value = 'original'
      if (isStreaming.value) {
        streamer.value.toggle()
        isStreaming.value = false
      }
    }

    const handleClickTranslation = () => {
      muteVideo()
      activeStream.value = 'translation'
      if (!isStreaming.value) {
        streamer.value.toggle()
        isStreaming.value = true
      } else {
        streamer.value.toggle()
        isStreaming.value = false
      }
    }

    function unmuteVideo () {
      videoEl.value.muted = false
    }

    function muteVideo () {
      videoEl.value.muted = true
    }

    /**
     * Method to initialize Akkadu
     */
    const initializeAkkadu = async () => {
      const config = {
        roomName: room.value || 'nozj',
        isDevMode: true
      }

      const akkaduRTC = new Akkadu(config)
      streamer.value = await akkaduRTC.init()

      streamer.value.on('connection-status', (msg) => {
        const { id } = msg
        switch (id) {
          case 'connection-active':
            isReady.value = true
            console.log('Akkadu Connection active!')
            toast.success('Akkadu Connection active!')
            akkaduActive = true
            akkaduOnline = true
            break
          case 'connection-offline':
            console.log('Akkadu Connection offline!')
            toast.warning('Akkadu Connection offline!')
            toast('Akkadu Connection offline!')
            akkaduOnline = false
            break
          case 'connection-online':
            console.log('Akkadu Connection online!')
            toast.success('Akkadu Connection online!')
            toast('Akkadu Connection online!')
            akkaduOnline = true
            break
        }
      })
    }

    // Initialize Akkadu and autoplay video
    initializeAkkadu()
      .then(() => {
        toast.success('Akkadu ready')
      })
      .catch(error => {
        console.error(error)
        toast.error(error.message + '. Please make sure that room name \n' + `"${room.value}"` + ' exists on Akkadu')
      })
    try {
      videoEl.value.play()
    } catch (error) {
      // can fail gracefully
    }

    return {
      handleClickTranslation,
      handleClickOriginal,
      isReady,
      videoEl,
      activeStream,
      akkaduActive,
      akkaduOnline
    }
  }
})

</script>

<style>
.transition {
  transition: all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
