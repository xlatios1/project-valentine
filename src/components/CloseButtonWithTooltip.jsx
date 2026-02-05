import { useState, useEffect } from "react";

export default function CheekyTooltipButton({ onClick }) {
  const texts = [
    "Omg thank god you saw this cross button",
    "i mean, *ahem*",
    "Please click here to continue!!!",
  ];
  const [hovered, setHovered] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    let interval;
    if (hovered) {
      setTextIndex(0);
      setFade(true);

      interval = setInterval(() => {
        setFade(false); // fade out
        setTimeout(() => {
          setTextIndex((prev) => {
            if (prev === texts.length - 2) {
              clearInterval(interval);
            }
            return prev + 1;
          });
          setFade(true); // fade in
        }, 500); // fade duration
      }, 2000); // change text every 2s
    } else {
      setTextIndex(0);
      setFade(true);
    }

    return () => clearInterval(interval);
  }, [hovered, texts.length]);

  return (
    <div
      className="absolute top-1 right-3"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={onClick}
        className="px-2 py-1 rounded-full text-white hover:bg-rose-50 transition relative z-10"
      >
        ✖️
      </button>

      {/* Render tooltip only if hovered */}
      {hovered && (
        <span
          className="absolute -top-8 left-8 w-[150px] break-normal transform bg-pink-200 text-black border border-black text-xs px-2 py-1 rounded transition-opacity duration-500 pointer-events-none"
          style={{ opacity: fade ? 1 : 0 }}
        >
          {texts[textIndex]}
        </span>
      )}
    </div>
  );
}
