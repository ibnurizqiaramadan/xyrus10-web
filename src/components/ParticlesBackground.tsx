"use client"

import { useState, useEffect } from "react"
import { Particles, ParticlesProvider } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Engine } from "@tsparticles/engine"

export function ParticlesBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setMounted(true)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  const initEngine = async (engine: Engine) => {
    await loadSlim(engine)
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="fixed inset-0 pointer-events-none -z-20">
      <ParticlesProvider init={initEngine}>
        <Particles
          id="tsparticles"
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 60,
            fullScreen: {
              enable: true,
              zIndex: -20,
            },
            pauseOnBlur: true,
            interactivity: {
              detectsOn: "window",
              events: {
                onHover: {
                  enable: false,
                },
                resize: {
                  enable: true,
                  delay: 1,
                },
              },
            },
            particles: {
              color: {
                value: ["#2b7fff", "#60A5FA"],
              },
              links: {
                color: "#2b7fff",
                distance: 120,
                enable: true,
                opacity: 0.1,
                width: 1,
                triangles: {
                  enable: false,
                },
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "out",
                },
                random: false,
                speed: 0.8,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  width: 1920,
                  height: 1080,
                },
                value: 65,
              },
              opacity: {
                value: { min: 0.2, max: 0.7 },
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 3 },
              },
            },
            detectRetina: true,
          }}
        />
      </ParticlesProvider>
    </div>
  )
}
