/**
 * handle any browser error. Useful while developing.
 */
export const onError = /** @__PURE__ */ (callback) => {
  const handleError = (event) => {
    callback(event.reason || event.message, event)
    return false
  }
  window.addEventListener("error", handleError)
  window.addEventListener("unhandledrejection", handleError)
}
