/**
 * display any unhandled error. Useful while developing.
 */

window.addEventListener("error", (event) => {
  alert(event.message)
  return false
})

window.addEventListener("unhandledrejection", function (event) {
  alert(event.reason)
  return false
})
