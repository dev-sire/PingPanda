"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/utils"

type WebGLShaderProps = {
  className?: string
  /** Page/section background (hex). Match the section's own bg so the edges blend. */
  background?: string
  /** Colour of the animated lines (hex). */
  ink?: string
  /** Animation speed multiplier. */
  speed?: number
}

const hexToRgb = (hex: string): [number, number, number] => {
  const n = parseInt(hex.replace("#", ""), 16)
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]
}

const VERTEX = `
  attribute vec2 position;
  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`

// Light-theme take on the original shader: instead of adding glow to a black
// canvas, glow pulls a white background toward the brand colour. Each colour
// channel is sampled at a slightly different x, which keeps the subtle
// chromatic fringe of the original.
const FRAGMENT = `
  #ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
  #else
  precision mediump float;
  #endif

  uniform vec2 resolution;
  uniform float time;
  uniform vec3 bg;
  uniform vec3 ink;

  float wave(float x, float y, float k, float amp, float speed, float weight) {
    return weight / abs(y + sin((x + time * speed) * k) * amp);
  }

  void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
    float d = length(p) * 0.05;

    float xr = p.x * (1.0 + d);
    float xg = p.x;
    float xb = p.x * (1.0 - d);

    vec3 glow;
    glow.r = wave(xr, p.y, 1.0, 0.5, 1.0, 0.05) + wave(xr, p.y, 1.7, 0.3, -0.7, 0.025);
    glow.g = wave(xg, p.y, 1.0, 0.5, 1.0, 0.05) + wave(xg, p.y, 1.7, 0.3, -0.7, 0.025);
    glow.b = wave(xb, p.y, 1.0, 0.5, 1.0, 0.05) + wave(xb, p.y, 1.7, 0.3, -0.7, 0.025);

    vec3 color = mix(bg, ink, clamp(glow, 0.0, 0.9));
    gl_FragColor = vec4(color, 1.0);
  }
`

export function WebGLShader({
  className,
  background = "#F8F9FD", // brand-25
  ink = "#4B76C9", // brand-600
  speed = 0.6,
}: WebGLShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    })
    // No WebGL: the section's plain background simply shows instead.
    if (!gl) return

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.warn("[WebGLShader] shader compile failed:", gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vs = compile(gl.VERTEX_SHADER, VERTEX)
    const fs = compile(gl.FRAGMENT_SHADER, FRAGMENT)
    if (!vs || !fs) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.warn("[WebGLShader] program link failed:", gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    // One oversized triangle covers the whole viewport.
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const positionLoc = gl.getAttribLocation(program, "position")
    gl.enableVertexAttribArray(positionLoc)
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0)

    const uResolution = gl.getUniformLocation(program, "resolution")
    const uTime = gl.getUniformLocation(program, "time")
    gl.uniform3f(gl.getUniformLocation(program, "bg"), ...hexToRgb(background))
    gl.uniform3f(gl.getUniformLocation(program, "ink"), ...hexToRgb(ink))

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let time = reducedMotion ? 2 : 0
    let raf = 0
    let last = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const width = Math.floor(canvas.clientWidth * dpr)
      const height = Math.floor(canvas.clientHeight * dpr)
      if (width === 0 || height === 0) return
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
      }
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    const draw = () => {
      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.uniform1f(uTime, time)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const loop = (now: number) => {
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0
      last = now
      time += dt * speed
      draw()
      raf = requestAnimationFrame(loop)
    }

    const start = () => {
      if (reducedMotion || raf) return
      last = 0
      raf = requestAnimationFrame(loop)
    }

    const stop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    resize()
    draw()

    const resizeObserver = new ResizeObserver(() => {
      resize()
      draw() // keeps the static frame correct for reduced-motion users
    })
    resizeObserver.observe(canvas)

    // Don't burn GPU while the hero is scrolled out of view.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start()
      else stop()
    })
    visibilityObserver.observe(canvas)

    return () => {
      stop()
      resizeObserver.disconnect()
      visibilityObserver.disconnect()
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
      gl.deleteShader(vs)
      gl.deleteShader(fs)
    }
  }, [background, ink, speed])

  return <canvas ref={canvasRef} aria-hidden className={cn("block h-full w-full", className)} />
}
