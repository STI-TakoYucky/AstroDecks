import React, { useState } from "react";

export default function Flashcard({front, back}: {front: string, back: string}) {
  const [isFlipped, setFlipped] = useState(false)
  return (
    <div className="w-[30rem] h-[20rem] [perspective:800px]" onClick={() => setFlipped((prev) => back != "" && !prev)}>
      <div
        className={`${
          !isFlipped ? "" : "[transform:rotateY(180deg)]"
        } [transform-style:preserve-3d] w-full h-full transition-transform duration-500 relative ${!back ? "": "cursor-pointer"}`}>
        <div className="absolute w-full h-full p-8 border-2 border-black rounded-md shadow-md backface-hidden">
            <p className="mb-5 text-lg">Term:</p>
            <p className="text-2xl font-semibold whitespace-pre-line">{front}</p>
        </div>
        <div className="absolute [transform:rotateY(180deg)] p-8 backface-hidden border-2 border-black rounded-md shadow-md w-full h-full">
            <p className="mb-5 text-lg">Definition:</p>
            <p className="text-2xl whitespace-pre-line">{back}</p>
        </div>
      </div>
    </div>
  );
}
