/**
 * Catch browser error. Useful while developing.
 *
 * @author Luiz Bills <luizbills@pm.me>
 * @licese MIT
 * @version 1.2
 *
 * @param {(message: string, event: Event) => void} callback A function called when an error happens
 * @returns {function} A function to remove the event listeners
 */
export const onError = /** @__PURE__ */ (callback) => {
  const handleError = (event) => {
    callback(event.reason ? event.reason.message : event.message, event)
    return false
  }
  window.addEventListener("error", handleError)
  window.addEventListener("unhandledrejection", handleError)
  return () => {
    window.removeEventListener("error", handleError)
    window.removeEventListener("unhandledrejection", handleError)
  }
}
