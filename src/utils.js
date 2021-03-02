import { ref } from 'vue'

const statuses = {
  error: 'red',
  success: 'green',
  info: 'blue',
  warning: 'orange'
}

function toast (message, dismissOnClick = true, status = 'info') {
  const el = document.createElement('div')
  el.className = `bg-${statuses[status]}-400 z-toast absolute top-8 right-8 text-center text-white font-bold rounded-lg shadow-lg p-4 snackbar`
  el.setAttribute('data-snackbar', '')
  el.textContent = message

  document.body.appendChild(el)

  if (!message || message === '') return
  const snackbar = document.querySelector('[data-snackbar]')

  const hideToast = () => {
    snackbar.className = snackbar.className.replace('show', '_')
    document.body.removeChild(snackbar)
  }

  snackbar.classList.add('show')

  if (dismissOnClick) {
    snackbar.addEventListener('click', hideToast)
  }

  // After 3 seconds, remove the show class from DIV
  setTimeout(() => {
    hideToast()
    dismissOnClick && snackbar.removeEventListener('click', hideToast)
  }, 3000)
}

Object.keys(statuses).forEach(status => {
  toast[status] = (message, dismissOnClick = true) => toast(message, dismissOnClick, status)
})

export {
  toast
}

export const useVideo = (video) => {
  const isVideoPlaying = ref(false)

  async function playVideo () {
    try {
      await videoEl.value.play()
    } catch (err) {
      // Can fail gracefully
    }
  }

  function togglePlayVideo () {
    if (videoEl.value.paused) {
      playVideo()
    } else {
      pauseVideo()
    }
  }

  function pauseVideo () {
    if (!videoEl.value.paused) {
      videoEl.value.pause()
    }
  }

  return {
    videoEl,
    playVideo,
    pauseVideo,
    togglePlayVideo
  }
}
