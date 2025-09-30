"use client"

import { useRef, useState, useEffect } from "react"
import { Gift, Sparkles } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"


export default function ScratchGift() {
  const canvasRef = useRef(null)
  const [revealed, setRevealed] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)

 useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // 1. Create the gradient scratch layer
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "#FA64B7");
    grad.addColorStop(1, "#AE47FF");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 2. Draw sparkles on top of the gradient
    const sparkleCount = 60; // Adjust as needed for density
    for (let i = 0; i < sparkleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const radius = Math.random() * 2 + 1; // Random radius between 1 and 3

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      ctx.fillStyle = `rgba(255, 255, 150, ${Math.random() * 0.5 + 0.5})`; // Semi-transparent yellow
      ctx.fill();
    }
  }, []);

  // Mouse events
  const handleMouseDown = () => setIsDrawing(true)
  const handleMouseUp = () => setIsDrawing(false)
  const handleMouseMove = (e) => isDrawing && scratch(e.clientX, e.clientY)

  // Touch events
  const handleTouchStart = () => setIsDrawing(true)
  const handleTouchEnd = () => setIsDrawing(false)
  const handleTouchMove = (e) => {
    if (!isDrawing) return
    const touch = e.touches[0]
    scratch(touch.clientX, touch.clientY)
  }

  const scratch = (clientX, clientY) => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const rect = canvas.getBoundingClientRect()
    const x = clientX - rect.left
    const y = clientY - rect.top

    ctx.globalCompositeOperation = "destination-out"
    ctx.beginPath()
    ctx.arc(x, y, 25, 0, Math.PI * 2, false)
    ctx.fill()

    checkReveal(ctx, canvas)
  }

  const checkReveal = (ctx, canvas) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    let cleared = 0
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) cleared++
    }
    const percent = (cleared / (canvas.width * canvas.height)) * 100
    if (percent > 20 && !revealed) setRevealed(true)
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 to-purple-200 p-4">
      <h2 className="text-3xl font-bold text-pink-600 mb-6 text-center drop-shadow-md">
        Scratch & Reveal Your Gift 🎁
      </h2>

      <div className="relative w-[320px] h-[220px] rounded-xl shadow-2xl overflow-hidden">
        {/* Gift Layer */}
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-inner p-6 border-2 border-pink-400">
          (
            <div className="text-center animate-fadeIn">
              <Gift className="w-12 h-12 text-pink-500 mx-auto mb-2" />
              <p className="text-xl font-semibold text-purple-700 mb-2">
                A Small Gift for You 😇
              </p>
              <p className="text-md text-gray-700">
                Amazon Gift Card:
              </p>
              <p className="text-md text-gray-700">
                {" "}
                <a
                  href="https://www.amazon.in/g/5HRGO32H7DT3CIG3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono bg-yellow-200 px-2 py-1 rounded hover:bg-yellow-300 transition-colors"
                >
                  FNV7-8VYFXW-EUXV
                </a>
              </p>
              <p className="text-md text-pink-500">
                Tap code to redirect!
              </p>
            </div>
          ) 
        </div>

        {/* Scratch Layer */}
        {!revealed && (
          <canvas
            ref={canvasRef}
            width={320}
            height={220}
            className="absolute top-0 left-0 rounded-xl cursor-pointer"
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
          />
        )}
      </div>
    </div>
  )
}
