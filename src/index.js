import "./on-error.js"

import litecanvas from "litecanvas"
import { pluginAssetLoader } from "@litecanvas/plugin-asset-loader"
import { Actor, vec, Camera, ANCHOR_CENTER } from "@litecanvas/utils"

let player, camera

let engine = litecanvas({
  width: 960,
  height: 720,
  pixelart: true,
  loop: { init, update, draw, tapped },
})

// add the Asset Loader plugin
use(pluginAssetLoader)

// initialize your game
async function init() {
  // load a sprite located in the "public" folder
  // see: https://github.com/litecanvas/plugin-asset-loader?tab=readme-ov-file#loading-images
  const sprite = await loadImage("images/mage.png")

  // create a player with the loaded sprite
  player = new Actor(sprite, vec(CX, CY), ANCHOR_CENTER)

  // setup the game camera
  // see: https://github.com/litecanvas/utils/tree/main/src/camera#readme
  camera = new Camera(engine)

  // zoom 5 times to make the graphics bigger
  camera.zoomTo(5)

  // delete this to not show the FPS meter
  loadScript(
    "https://cdn.jsdelivr.net/npm/stats-js@1.0.1/build/stats.min.js",
    () => {
      let stats = new Stats()
      stats.dom.style.right = 0
      stats.dom.style.left = null
      document.body.appendChild(stats.dom)
      listen("before:update", () => stats.begin())
      listen("after:draw", () => stats.end())
    },
  )
}

// handle mouse/touch interactions
function tapped(tapx, tapy, tapId) {
  if (LOADING) return

  // fix the tap X and Y based on the camera transformations
  // only necessary theif the camera move, zoom or rotate
  player.pos = camera.getWorldPoint(tapx, tapy, player.pos)
}

// update your game logic
function update(dt) {
  if (LOADING) return

  // simple movement with arrows
  player.x += 100 * dt * (iskeydown("arrowRight") - iskeydown("arrowLeft"))
  player.y += 100 * dt * (iskeydown("arrowDown") - iskeydown("arrowUp"))
}

// render your game scene
function draw() {
  cls(0) // clear the screen

  if (LOADING) {
    text(10, 10, "Loading assets. Please wait...")
    return
  }

  camera.start()

  player.draw() // draw our game object

  // display the "hello" message
  textalign("center", "middle")
  textsize(6)
  text(player.x, player.y - 16, "Hello!")

  camera.end()

  // anything drawn outside of camera#start and camera#end will stay fixed
  // like game UI (score, lifes, buttons, etc)
  textsize(20)
  text(10, 10, "Tap to change the mage position or press arrow keys")
}
