// auto increments panel number based on waitTime delay
import { ref } from 'vue'

export function useAutoPlay(waitTime) {
  const panel = ref(0)

  function next(waitTime) {
    if (panel.value in waitTime) {
      setTimeout(() => {
        panel.value = panel.value + 1
        next(waitTime)
      },  waitTime[panel.value])
    }
    return panel
  }

  next(waitTime)
  return panel
}