import litecanvas from "@litecanvas/litecanvas"

litecanvas({
  loop: { init, update, draw },
})

function init() {
  // initialize globals
  x = CENTERX
  y = CENTERY
}

function update() {
  // update your things
  // example: tap to change the position
  if (TAPPED) {
    x = TAPX
    y = TAPY
  }
}

function draw() {
  // render your things
  clear(0) // clear the screen
  circfill(x, y, 50, 8) // draw a circle
}
