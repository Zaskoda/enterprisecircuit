// auto increments panel number based on waitTime delay
import { ref, computed, toRefs, watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'

import { useClock } from '../../../stores/clock'

// add these
// https://9to5answer.com/ease-in-and-ease-out-animation-formula

export function useTween(
  fromValue:number=0,
  toValue:number=1,
  duration:number=2000,
  easing:number=0,
  loop:boolean=false,
  pingpong:boolean=false
):number {

  const clock = useClock()
  const startTime = clock.gameTime
  const gameTime:any = computed(() => {
    return clock.gameTime
  })


  const currentValue = ref(0)

  function percentage() {
    if (duration <=0) return 1

    const elapsed = (gameTime.value - startTime)
    let percentage = (elapsed / duration)
    if (loop) {
      percentage = percentage % 1
    } else if (pingpong) {
      if (Math.floor(percentage) % 2 == 0) { //even
        percentage = percentage % 1
      } else { //odd
        percentage = (1 - percentage % 1)
      }
    } else {
      percentage = Math.min(1, percentage)
    }
    return percentage
  }

  watchEffect(() => {
    const progress = (toValue - fromValue) * percentage()
    const value = fromValue + progress
    currentValue.value = value.toFixed(3)
  })

  return currentValue
}