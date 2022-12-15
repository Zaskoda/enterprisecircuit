// auto increments panel number based on waitTime delay
import { ref, computed, toRefs, watch, watchEffect } from 'vue'
import { storeToRefs } from 'pinia'

import { useClock } from '../../../stores/clock'

export function useTween(
  fromValue:number=0,
  toValue:number=1,
  duration:number=50,
  easing:number=0,
  loop:boolean=false,
  pingpong:boolean = true
):number {

  const clock = useClock()
  const startTime = clock.gameTime
  const gameTime:any = computed(() => {
    return clock.gameTime
  })

  function alter() {
    return 'time: ' + gameTime.value
  }

  const currentValue = ref(0)

  console.log('the time is ', gameTime.value)

  function percentage() {
    if (duration <=0) return 1

    const elapsed = (gameTime.value - startTime)
    let percentage = (elapsed / duration)
    if (loop) {
      percentage = percentage % 1
    } else if (pingpong) {
      if (Math.floor(percentage) % 2 == 0) {
        //even
        percentage = percentage % 1
      } else {
        //odd
        percentage = (1 - percentage % 1)
      }
    } else {
      percentage = Math.min(1, percentage)
    }
    return percentage.toFixed(3)
  }

  watchEffect(() => {
    console.log('percent ' + percentage())
    const progress = (toValue - fromValue) * percentage()
    console.log('Progress', progress)
    const value = fromValue + progress
    console.log(value)
    currentValue.value = value

//   currentValue.value = alter()
  })

  return currentValue
}