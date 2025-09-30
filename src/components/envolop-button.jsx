"use client";

import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";

export default function EnvelopeButton({ isDone, remainingMessages, onClick }) {
    return (
        <motion.div
            className="relative w-80 rounded-2xl p-6 text-center shadow-2xl transform cursor-pointer overflow-hidden group border-2 border-pink-400 min-h-[180px]"
            style={{
                backgroundImage: `linear-gradient(to bottom, #FECDD8 33.33%, #FDE5EB 33.33%)`,
            }}
            onClick={onClick}
            whileTap={{ scale: 0.95 }}
        >
            {/* The decorative envelope flap that lifts on hover */}
            {(remainingMessages == 4) && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 origin-top transform transition-transform duration-300 ease-in-out group-hover:rotate-x-180"
                    style={{
                        clipPath: "polygon(0 0, 100% 0, 50% 50%)",
                    }}
                ></motion.div>
            )}

            {/* The main content area */}
            <div className="relative z-10 flex flex-col items-center">
                {/* The icon that toggles between sealed and open mail */}
                <motion.div
                    className="p-2 bg-pink-300 rounded-full border-3 shadow-xl"
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isDone ? 360 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {remainingMessages == 4 || isDone ? (
                        <HeartHandshake className="h-8 w-8 text-white animate-bounce" />
                    ) : (
                        <HeartHandshake className="h-8 w-8 text-white" />
                    )}
                </motion.div>
                <p className="text-lg text-purple-500 mt-4 font-inter drop-shadow">
                    {isDone ? "All messages opened. Tap to reset." : remainingMessages === 4 ? "Tap to open your first message" : `${remainingMessages} messages remaining`}
                </p>
            </div>
        </motion.div>
    );
}