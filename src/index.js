import litecanvas from "@litecanvas/litecanvas"

let x, y, fg, bg

litecanvas({
  loop: { init, update, draw },
})

// initialize your game
function init() {
  x = CENTERX
  y = CENTERY
  bg = 0 // background color
  fg = 5 // circle color
}

// update your game
function update() {
  // use TAPPED to detect taps/clicks
  if (TAPPED) {
    x = TAPX
    y = TAPY
  }
}

// render your game
function draw() {
  cls(bg) // clear the screen
  circfill(x, y, lerp(0, 50, ELAPSED / 2), fg) // draw a circle
}
