import litecanvas from "litecanvas"
import "./on-error.js"
import pluginAssetLoader from "@litecanvas/plugin-asset-loader"
import { Actor, vec, Camera, ANCHOR_CENTER } from "@litecanvas/utils"

let actor, sprites, camera

litecanvas({
  pixelart: true,
  loop: { init, update, draw, tapped },
})

// add the Asset Loader plugin
use(pluginAssetLoader)

// initialize your game
function init() {
  sprites = {}

  // load a sprite located in the "public" folder
  loadImage("images/mage.png", (result) => {
    sprites[result.id] = result
  })

  // setup the game camera
  // see: https://github.com/litecanvas/utils/tree/main/src/camera#readme
  camera = new Camera()

  // zoom 5 times to make the graphics bigger
  camera.zoomTo(5)
}

// handle mouse/touch interactions
function tapped(tapx, tapy, tapId) {
  if (LOADING) return

  // fix the tap X and Y based on the camera transformations
  // only necessary theif the camera move, zoom or rotate
  actor.pos = camera.getWorldPoint(tapx, tapy, actor.pos)
}

// update your game logic
function update(dt) {
  if (LOADING) return

  if (!actor) {
    // create a game object
    // see: https://github.com/litecanvas/utils/tree/main/src/actor#readme
    actor = new Actor(sprites.mage, vec(CENTERX, CENTERY))
    actor.anchor = ANCHOR_CENTER
  }
}

// render your game scene
function draw() {
  cls(0) // clear the screen

  if (LOADING) {
    text(10, 10, "Loading assets. Please wait...")
    return
  }

  camera.start()

  actor.draw() // draw our game object

  // display a text
  textalign("center", "middle")
  textsize(6)
  text(actor.x, actor.y - 16, "Hello!")

  camera.end()

  // anything drawn outside of camera#start and camera#end stay fixed
  // like game UI (score, lifes, buttons, etc)
  textsize(20)
  text(10, 10, "Tap to change the mage position")
}
