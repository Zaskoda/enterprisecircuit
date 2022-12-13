// fetch.js
import { ref } from 'vue'

export function useAutoPlay(waitTime) {
  console.log(JSON.stringify(waitTime))

  const panel = ref(0)

  function next(waitTime) {
    console.log(panel.value)
    if (panel.value in waitTime) {
      console.log("auto next in " + waitTime[panel.value])
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