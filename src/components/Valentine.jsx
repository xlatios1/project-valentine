import { useState } from "react";
import bgImage from "../assets/bg1.jpg";
import sparkImg from "../assets/headache.jpg"; // small image to show on hover

export default function Valentine() {
  const [noPos, setNoPos] = useState({ top: "60%", left: "60%" });
  const [noScale, setNoScale] = useState(1);
  const [yesScale, setYesScale] = useState(1);
  const [accepted, setAccepted] = useState(false);

  const [sparks, setSparks] = useState([]); // store active spark images

  const handleNoButton = (e) => {
    // Move the NO button
    const randomTop = Math.floor(Math.random() * 60) + 20;
    const randomLeft = Math.floor(Math.random() * 60) + 20;

    setNoPos({
      top: `${randomTop}%`,
      left: `${randomLeft}%`,
    });

    setNoScale((prev) => prev / 1.1);
    setYesScale((prev) => prev * 1.2);

    // Spark position relative to container
    const container = e.currentTarget.closest(".relative"); // the div wrapping buttons
    const rect = container.getBoundingClientRect();

    const newSpark = {
      id: Date.now(),
      x: e.clientX - rect.left, // relative to container
      y: e.clientY - rect.top,
    };
    setSparks((prev) => [...prev, newSpark]);

    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => s.id !== newSpark.id));
    }, 500);
  };


  if (accepted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-300 to-rose-400 text-white text-center">
        <h1 className="text-5xl font-bold mb-4">Yay!!! ❤️</h1>
        <p className="text-2xl">You’re officially my Valentine 🕺</p>
        <p className="text-xl mt-2">See you on 14th Feb my baby 😘</p>
        <p className="text-xl mt-2">I love you so much 🥰</p>
        <p className="absolute top-[90%] left-[90%] text-[8px]">Thanks for entertaining me ❤️</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-pink-200/60 backdrop-blur-sm flex flex-col items-center justify-center text-center">
        <h1 className="text-5xl font-bold text-pink-600 mb-12">
          Will you be my Valentine? 💘
        </h1>

        <div className="relative w-full h-80">
          {/* YES button */}
          <button
            className="absolute left-[30%] top-[60%] -translate-x-1/2 px-10 py-4 rounded-full bg-pink-600 text-white text-2xl font-semibold shadow-xl transition-transform duration-300 ease-out"
            style={{ transform: `scale(${yesScale})` }}
            onClick={() => setAccepted(true)}
          >
            YES ❤️
          </button>

          {/* NO button */}
          <button
            className="absolute px-12 py-4 rounded-full bg-white text-pink-600 border-2 border-pink-600 text-xl shadow-md transition-all"
            style={{ top: noPos.top, left: noPos.left, transform: `scale(${noScale})` }}
            onMouseEnter={handleNoButton}
          >
            No 🤨
          </button>

          {/* Spark images */}
          {sparks.map((spark) => (
            <img
              key={spark.id}
              src={sparkImg}
              alt="spark"
              className="absolute w-72 h-72 animate-fadeOut"
              style={{ top: spark.y, left: spark.x, transform: "translate(-50%, -50%)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
