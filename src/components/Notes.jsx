import { useState, useEffect } from "react";
import { useMusic } from "./MusicProvider";
import CloseButtonWithTooltip from "./CloseButtonWithTooltip";
import { useNavigate } from "react-router-dom";

// Dynamically import all images from notes folder
function importAll(r) {
  return r.keys().map(r);
}

const images = importAll(require.context("../assets/notes", false, /\.(png|jpe?g|svg)$/));

export default function EnvelopeNoteFull() {
  const navigate = useNavigate();
  const { playMusic } = useMusic();
  const [opened, setOpened] = useState(false);
  const [jump, setJump] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [closedOnce, setClosedOnce] = useState(false); // track if envelope was opened and closed

  // Shuffle images once
  const [shuffledImages] = useState(() => {
    let copy = [...images];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  });

  // Jumping envelope interval
  useEffect(() => {
    if (opened) return;
    const interval = setInterval(() => {
      setJump(true);
      setTimeout(() => setJump(false), 600);
    }, 1000);
    return () => clearInterval(interval);
  }, [opened]);

  // Image slideshow interval
  useEffect(() => {
    if (!opened) return;
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % shuffledImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [opened, shuffledImages.length]);

  const header = "My dearest Jiayi ❤️,";
  const body = `
Hehehe hii! I hope this little note brings a smile to your face as you read it. I just wanted to put what i can do🤓, and my love for you😍, to make you smile🥰. 

Taking a moment here to tell you how incredibly special you are to me. Your quirkiness, your gentleness, and how deep feelings you have for the things you love makes me feel so touched.

Every day with you feels like a beautiful adventure, and I cherish every moment we share together. Thank you for being you, for being the wonderful, loving, and amazing person that you are.

I look forward to all the memories we will create together in the days to come. You mean the world to me.
  `;

  const footer = `
With all my love,
Yijun <3
  `;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 to-rose-300 p-6 space-y-6">
      {!opened && !closedOnce ? (
        // Envelope closed before first open
        <button
          onClick={() => {
            setOpened(true);
            playMusic();
          }}
          className={`relative w-40 h-20 bg-pink-600 rounded-lg shadow-lg flex items-center justify-center cursor-pointer group overflow-hidden 
            ${jump ? "animate-jumpMail" : ""}`}
        >
          {/* Envelope flap */}
          <div
            className={`absolute top-0 left-0 w-full h-1/2 bg-pink-400 transform origin-bottom transition-transform duration-[2000ms] ease-in-out ${
              opened ? "rotate-[180deg]" : ""
            }`}
          ></div>

          {/* Envelope body */}
          <div className="relative z-10 text-white font-bold text-xl">Whats this? 🫢</div>
        </button>
      ) : opened ? (
        // Envelope opened - left-right layout
        <div className="max-w-4xl w-full shadow-2xl flex animate-fadeIn">
          {/* Left side - image slideshow */}
          <div className="w-1/2 relative bg-gray-200 rounded-l-2xl overflow-hidden">
            {shuffledImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`portrait ${index + 1}`}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentImg ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {/* Right side - note */}
          <div className="w-1/2 p-6 text-left flex flex-col justify-center space-y-4 relative bg-white rounded-r-2xl">
            <p className="text-lg font-semibold">{header}</p>
            <p className="whitespace-pre-line">{body}</p>
            <p className="whitespace-pre-line text-right font-semibold">{footer}</p>

            {/* Close button with tooltip */}
            <CloseButtonWithTooltip
              onClick={() => {
                setOpened(false);
                setClosedOnce(true);
              }}
            />
          </div>
        </div>
      ) : (
        // After closing envelope - show continue button
        <button
          onClick={() => navigate("/valentine")}
          className="px-6 py-3 rounded-lg bg-pink-600 text-white font-bold text-lg hover:bg-pink-700 transition"
        >
          Sooo....
        </button>
      )}
    </div>
  );
}
