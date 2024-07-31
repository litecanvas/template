import litecanvas from "litecanvas"

let x, y, fg, bg

litecanvas({
  loop: { init, update, draw, tapped },
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

// handle mouse/touch interactions
function tapped(x, y, tapId) {
  x = TAPX
  y = TAPY
}

// update your game logic
function update() {}

// render your game scene
function draw() {
  // clear the screen
  cls(bg)

  // draw a color filled circle
  // args: x y radius color
  circfill(x, y, lerp(0, 50, ELAPSED / 2), fg)
}
