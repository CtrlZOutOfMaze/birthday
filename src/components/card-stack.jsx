// src/components/CardStackWidget.js

"use client";

import { useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import EnvelopeButton from "./envolop-button";
import { HeartHandshake, Mail, Rocket, Sparkles, Gem } from "lucide-react"

const messagesData = [
  { 
    icon: HeartHandshake, 
    title: "Sweet Soul", 
    text: "You have such a kind and sweet nature — our conversations always feel warm and effortless.", 
    color: "bg-pink-400" 
  },
  { 
    icon: Sparkles, 
    title: "Adventurous Spirit", 
    text: "There’s something about you that feels adventurous — like you’re always ready to explore new vibes and experiences.", 
    color: "bg-yellow-400" 
  },
  { 
    icon: Rocket, 
    title: "Positive Energy", 
    text: "You carry a bright energy that instantly lifts the mood, even in the smallest of chats.", 
    color: "bg-purple-400" 
  },
  { 
    icon: Gem, 
    title: "Unique Gem", 
    text: "You’re one of a kind — a rare mix of sweetness, strength, and a great listener for me.", 
    color: "bg-green-400" 
  },
]


export default function CardStackWidget() {
  const [openedCount, setOpenedCount] = useState(0);
  const cardRefs = useRef([]);

  const handleCardClick = () => {
    if (openedCount < messagesData.length) {
      setOpenedCount((prev) => prev + 1);
    } else {
      setOpenedCount(0);
    }
  };

  const remainingMessages = messagesData.length - openedCount;
  const isDone = remainingMessages === 0;

  // Determine how many cards to show based on remaining
  const cardsToShow = (() => {
    if (remainingMessages === 4) return 0;
    if (remainingMessages === 3) return 1;
    if (remainingMessages === 2) return 2;
    if (remainingMessages === 1) return 3;
    if (remainingMessages === 0) return 4;
    return 0;
  })();

  const cardStack = useMemo(() => {
    const visibleMessages = messagesData.slice(0, openedCount).slice(-cardsToShow);

    return visibleMessages.map((message, index) => {
      const zIndex = index + 1;
      const rotation = index * 5 - (cardsToShow - 1) * 2.5; // tilt cards
      const translateY = -index * 20; // stack upwards

      return (
        <motion.div
          key={`${message.title}-${index}`}
          ref={(el) => (cardRefs.current[index] = el)}
          initial={{ opacity: 0, y: 100, scale: 0.9, rotate: 0 }}
          animate={{
            opacity: 1,
            y: translateY,
            scale: 1,
            rotate: rotation,
          }}
          exit={{ opacity: 0, y: 50 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          style={{
            zIndex,
            left: `${index * 5}px`,
            bottom: `${index * 5}px`,
          }}
          className={`absolute w-full h-80 rounded-3xl shadow-xl flex flex-col justify-center items-center p-8 ${message.color} transform-gpu`}
        >
          <message.icon className="w-10 h-10 mx-auto mb-2" />
          <div className="absolute top-4 right-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-yellow-200" />
            </motion.div>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-sm font-inter">
            {message.title}
          </h2>
          <p className="text-white text-center font-medium leading-relaxed drop-shadow-sm font-inter">
            {message.text}
          </p>
        </motion.div>

      );
    });
  }, [openedCount, cardsToShow]);

  return (
    <div className="flex flex-col items-center justify-center p-4 font-inter">
      <div className="relative w-72 h-82 mb-12">
        {cardStack.length > 0 ? (
          cardStack
        ) : (
          <div className="absolute h-80 inset-0 flex flex-col items-center justify-center rounded-3xl bg-rose-100 shadow-inner">
            <motion.div
              className="absolute inset-0 flex items-center justify-center rounded-3xl bg-rose-50 shadow-inner"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Sparkles className="w-10 h-10 text-pink-400 animate-pulse" />
            </motion.div></div>
        )}      </div>

      <EnvelopeButton
        isDone={isDone}
        remainingMessages={remainingMessages}
        onClick={handleCardClick}
      />
    </div>
  );
}
