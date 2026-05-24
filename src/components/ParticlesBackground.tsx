"use client"

import { useState, useEffect } from "react"
import { Particles, ParticlesProvider } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import type { Engine } from "@tsparticles/engine"

export function ParticlesBackground() {
  const [mounted, setMounted] = useState(false)
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 })

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true)
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }, 0)

    let timeoutId: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        setDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      }, 200)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", handleResize)
      clearTimeout(timeoutId)
    }
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
            fpsLimit: 120,
            interactivity: {
              detectsOn: "window",
              events: {
                onHover: {
                  enable: true,
                  mode: "grab",
                },
                resize: {
                  enable: true,
                },
              },
              modes: {
                grab: {
                  distance: 180,
                  links: {
                    opacity: 0.35,
                    color: "#2b7fff",
                  },
                },
              },
            },
            particles: {
              color: {
                value: ["#2b7fff", "#60A5FA"],
              },
              links: {
                color: "#2b7fff",
                distance: 130,
                enable: true,
                opacity: 0.12,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "out",
                },
                random: true,
                speed: 1.0,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  width: dimensions.width,
                  height: dimensions.height,
                },
                value: 100,
              },
              opacity: {
                value: { min: 0.2, max: 0.8 },
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
