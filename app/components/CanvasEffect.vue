<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const canvas = ref(null)
const spacing = 1
const radius = 20
const repelForce = 0.6
const friction = 0.3
const mouse = { x: null, y: null }
const points = []

let ctx, width, height, animationFrameId
let hiddenCanvas, hiddenCtx

class Point {
  constructor(x, y, color) {
    this.x0 = x
    this.y0 = y
    this.x = x
    this.y = y
    this.vx = 0
    this.vy = 0
    this.color = color
  }

  update() {
    if (mouse.x !== null && mouse.y !== null) {
      const dx = this.x - mouse.x
      const dy = this.y - mouse.y
      const dist = Math.hypot(dx, dy)
      if (dist < radius) {
        const force = (radius - dist) * repelForce
        const angle = Math.atan2(dy, dx)
        this.vx += Math.cos(angle) * force
        this.vy += Math.sin(angle) * force
      }
    }

    const dx0 = this.x0 - this.x
    const dy0 = this.y0 - this.y
    this.vx += dx0 * 0.1
    this.vy += dy0 * 0.1

    this.vx *= friction
    this.vy *= friction

    this.x += this.vx
    this.y += this.vy
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

function initCanvas(img) {
  width = canvas.value.clientWidth
  height = canvas.value.clientHeight

  canvas.value.width = width * devicePixelRatio
  canvas.value.height = height * devicePixelRatio
  ctx = canvas.value.getContext('2d')
  ctx.setTransform(1, 0, 0, 1, 0, 0)
  ctx.scale(devicePixelRatio, devicePixelRatio)

  const imgRatio = img.width / img.height
  const canvasRatio = width / height
  let drawWidth, drawHeight

  if (imgRatio > canvasRatio) {
    drawWidth = width
    drawHeight = width / imgRatio
  } else {
    drawHeight = height
    drawWidth = height * imgRatio
  }

  const offsetX = (width - drawWidth) / 2
  const offsetY = (height - drawHeight) / 2

  hiddenCanvas.width = drawWidth
  hiddenCanvas.height = drawHeight
  hiddenCtx.clearRect(0, 0, hiddenCanvas.width, hiddenCanvas.height)
  hiddenCtx.drawImage(img, 0, 0, drawWidth, drawHeight)

  points.length = 0
  for (let y = 0; y < drawHeight; y += spacing) {
    for (let x = 0; x < drawWidth; x += spacing) {
      const [r, g, b, a] = hiddenCtx.getImageData(x, y, 1, 1).data
      if (a > 128) {
        const color = `rgb(${r},${g},${b})`
        const px = offsetX + x
        const py = offsetY + y
        points.push(new Point(px, py, color))
      }
    }
  }
}


function animate() {
  ctx.clearRect(0, 0, width, height)
  for (const p of points) {
    p.update()
    p.draw()
  }
  animationFrameId = requestAnimationFrame(animate)
}

function handleMouseMove(e) {
  const rect = canvas.value.getBoundingClientRect()
  mouse.x = e.clientX - rect.left
  mouse.y = e.clientY - rect.top
}

function clearMouse() {
  mouse.x = null
  mouse.y = null
}

onMounted(() => {
  hiddenCanvas = document.createElement('canvas')
  hiddenCtx = hiddenCanvas.getContext('2d')

  const img = new Image()
  img.crossOrigin = 'anonymous'
  img.src = '/contact_head.png'
  img.onload = () => {
    initCanvas(img)
    animate()
  }

  canvas.value.addEventListener('mousemove', handleMouseMove)
  canvas.value.addEventListener('mouseleave', clearMouse)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(animationFrameId)
  canvas.value?.removeEventListener('mousemove', handleMouseMove)
  canvas.value?.removeEventListener('mouseleave', clearMouse)
})
</script>

<template>
  <canvas ref="canvas" class="w-full h-full" />
</template>
