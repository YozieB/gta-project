// throttle func - для сглаживания resize, scroll эвентов
const throttle = (func, delay = 250) => {
  let isThrottled = false
  let savedArgs = null
  let savedThis = null

  return function wrap(...args) {
    if (isThrottled) {
      ;(savedArgs = args), (savedThis = this)
      return
    }

    func.apply(this, args)
    isThrottled = true

    setTimeout(() => {
      isThrottled = false

      if (savedThis) {
        wrap.apply(savedThis, savedArgs)
        savedThis = null
        savedArgs = null
      }
    }, delay)
  }
}
// чтобы на моб. устройстве vh работал правильно
const fixFullheight = () => {
  let vh = window.innerHeight
  document.documentElement.style.setProperty('--vh', `${vh}px`)
}

let fixHeight = throttle(fixFullheight)

fixHeight()

window.addEventListener('resize', fixHeight)
