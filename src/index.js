import litecanvas from "@litecanvas/litecanvas"

let x, y, fg, bg

litecanvas({
  loop: { init, update, draw },
})

// initialize your game
function init() {
  // initial y value = center X
  x = CENTERX

  // initial y value = center Y
  y = CENTERY

  // background color
  bg = 0

  // circle color
  fg = 5
}

// update your game
function update() {
  // use TAPPED and TAPPING to detect taps/clicks
  if (TAPPED || TAPPING) {
    // use the tap/click to change the x y variables
    x = TAPX
    y = TAPY
  }
}

// render your game
function draw() {
  // clear the screen
  cls(bg)

  // draw a color filled circle
  // args: x y radius color
  circfill(x, y, lerp(0, 50, ELAPSED / 2), fg)
}
