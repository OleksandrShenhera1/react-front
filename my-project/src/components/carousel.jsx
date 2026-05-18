import { useState, useRef } from "react";
import CarouselBg from "../assets/carousel.png"
import Card1 from "../assets/cards/card1.png"
import Card2 from "../assets/cards/card2.png"
import Card3 from "../assets/cards/card3.png"
import Card4 from "../assets/cards/card4.png"
import Card5 from "../assets/cards/card5.png"
const CARD_WIDTH = 350;
const GAP = 30;
const VISIBLE = 3;
const CLONE_COUNT = 5;

const cards = [
  { id: 1, title: "Resume creator", label: "Design a clean, professional resume online without any hassle.", img: Card1 },
  { id: 2, title: "Payment", label: "No need to spend money! Currently free to use, with all features available.", img: Card2 },
  { id: 3, title: "AI Engine", label: "Let AI help you write your resume. Get clear, professional content in seconds.", img: Card3 },
  { id: 4, title: "Pre-crafted content", label: "We take care of everything for you. No extra effort required.", img: Card4 },
  { id: 5, title: "Cover letter", label: "Pre-made cover letter designs ready for quick customization.", img: Card5 },
];

const total = cards.length;
const cloned = [...cards.slice(-CLONE_COUNT), ...cards, ...cards.slice(0, CLONE_COUNT)];
const OFFSET = CLONE_COUNT;

export default function Carousel() {
  const [current, setCurrent] = useState(0);
  const [animate, setAnimate] = useState(true);
  const busy = useRef(false);

  const trackIndex = current + OFFSET;
  const step = CARD_WIDTH + GAP;
  const containerWidth = VISIBLE * CARD_WIDTH + (VISIBLE - 1) * GAP;
  const translateX = trackIndex * step - containerWidth / 2 + CARD_WIDTH / 2;

  function go(dir) {
    if (busy.current) return;
    busy.current = true;
    setAnimate(true);
    setCurrent((prev) => prev + dir);
  }

  function handleTransitionEnd() {
    let next = null;
    if (current >= total) next = current - total;
    else if (current < 0) next = current + total;

    if (next !== null) {
      setAnimate(false);
      setCurrent(next);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setAnimate(true);
          busy.current = false;
        });
      });
    } else {
      busy.current = false;
    }
  }

  const activeDot = ((current % total) + total) % total;

  return (
    <div className="py-10">
      <div
        className="shadow-xl rounded-xl px-8 py-16 w-full relative"
        style={{ backgroundColor: "#EEF2FF" }}
      >
        <img src={CarouselBg} draggable="false" className="absolute inset-0 w-full h-full object-cover rounded-xl opacity-60 " />
        <div className="relative z-10">
          {/* весь контент */}
        
        {/* Header */}
        <div className="flex items-end justify-between mb-8" style={{ width: `${containerWidth}px`, margin: "0 auto 2rem auto" }}>
          <div>
            <h2 className="text-4xl font-semibold text-[#0F1535] mb-1 ml-10">
              Why You Should Choose
            </h2>
            <h2 className="text-4xl font-semibold text-[#0F1535] mb-1 ml-10">
              Our Product
            </h2> 
            <p className="text-xl text-gray-500 mt-5 ml-40">
              Focus on your content — we’ll handle the rest.
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => go(-1)}
              className="w-12 h-12 rounded-full bg-white text-[#0F1535] flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
            ❮
            </button>
            <button
              onClick={() => go(1)}
              className="w-12 h-12 rounded-full bg-white text-[#0F1535] flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
            ❯
            </button>
          </div>
        </div>

        {/* Track wrapper — це маска */}
        <div
          style={{
            width: `${containerWidth}px`,
            overflow: "hidden",
            margin: "0 auto",
          }}
        >
          <div
            className="flex"
            style={{
              gap: `${GAP}px`,
              transform: `translateX(-${translateX}px)`,
              transition: animate ? "transform 0.5s cubic-bezier(.4,0,.2,1)" : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {cloned.map((card, i) => (
              <div
              key={i}
              className="shrink-0 bg-[#EEF2FF] border-2 border-[#0f153550] rounded-xl flex flex-col items-center justify-start text-[#0F1535] text-xl text-center px-6 py-8"
              style={{
                width: `${CARD_WIDTH}px`,
                height: "480px",
              }}
            >
              {/* Фіксована висота для зони фото */}
              <div className="flex items-center justify-center mt-10 mb-15" style={{ height: "150px" }}>
                <img src={card.img} className="max-h-full max-w-full object-contain" draggable="false" />
              </div>
              {card.title && (
              <p className="font-bold text-xl mb-2">{card.title}</p>
            )}
              <p className="text-base text-gray-500">{card.label}</p>
            </div>
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                if (busy.current) return;
                setAnimate(true);
                setCurrent(i);
              }}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                activeDot === i ? "bg-gray-300" : "bg-gray-600"
              }`}
            />
          ))}
          </div>
        </div>
      </div>
    </div>
  );
}