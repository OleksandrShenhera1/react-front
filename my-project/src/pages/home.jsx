import { useState } from "react";
import Banner from "../assets/banner4k.png";

const YOUTUBE_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ";

const TutorialBanner = () => {
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);

  return (
    <>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setPlaying(true)}
        className="relative w-full h-screen overflow-hidden cursor-pointer"
      >
        <img
          src={Banner}
          alt="Tutorial banner"
          className="w-full h-full object-cover transition-all duration-700"
          style={{ filter: hovered ? "brightness(0.5)" : "brightness(1)" }}
        />
        <div
          className="absolute inset-0 transition-all duration-500"
          style={{
            background: hovered
              ? "radial-gradient(ellipse at center, rgba(123,255,0,0.25) 0%, rgba(0,0,0,0.5) 80%)"
              : "transparent",
          }}
        />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 transition-all duration-500"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)" }}
        >
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300"
            style={{ borderColor: "#aaff00", backgroundColor: "rgba(170,255,0,0.15)" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <polygon points="6,3 17,10 6,17" fill="#aaff00" />
            </svg>
          </div>
          <span className="text-white text-lg font-medium tracking-wide">Watch Tutorial</span>
        </div>
      </div>

      {playing && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.75)" }}
          onClick={() => setPlaying(false)}
        >
          <div
            className="relative w-full max-w-4xl rounded-xl overflow-hidden"
            style={{ aspectRatio: "16/9" }}
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`${YOUTUBE_URL}?autoplay=1`}
              title="Tutorial"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className="w-full h-full"
            />
            <button
              onClick={() => setPlaying(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white transition-colors"
              style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default function Home() {
  const [fields, setFields] = useState({ user: "", phone: "", mail: "", additional: "" });
  const [inputText, setInputText] = useState("");
  const [result, setResult] = useState(null);
  const [errors, setErrors] = useState({});

  const handleField = (key, value) => {
    setFields((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: false }));
  };

  const handleExtract = () => {
    const newErrors = {};
    if (!fields.user.trim()) newErrors.user = true;
    if (!fields.phone.trim()) newErrors.phone = true;
    if (!fields.mail.trim()) newErrors.mail = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const items = [];
    items.push({ key: "Client", val: fields.user });
    items.push({ key: "Phone", val: fields.phone });
    items.push({ key: "Mail", val: fields.mail });
    if (fields.additional) items.push({ key: "Additional", val: fields.additional });
    if (inputText) items.push({ key: "Text", val: inputText.length > 120 ? inputText.slice(0, 120) + "…" : inputText });
    setResult(items);
  };

  const handleClear = () => {
    setFields({ user: "", phone: "", mail: "", additional: "" });
    setInputText("");
    setResult(null);
    setErrors({});
  };

  const requiredFields = [
    { label: "Client", key: "user", placeholder: "full name" },
    { label: "Phone", key: "phone", placeholder: "+181..." },
    { label: "Mail", key: "mail", placeholder: "example@gmail.com" },
  ];

  return (
  <div className="bg-gray-50">

    {/* 🔥 SECTION 1 — BANNER */}
    <section className="w-full h-[60vh] md:h-[80vh] lg:h-screen">
      <TutorialBanner />
    </section>

    {/* 🔥 SECTION 2 — FORM */}
    <section className="h-screen snap-start bg-white flex flex-col">

      {/* форма займає весь екран */}
      <div className="flex-1 min-h-0 flex flex-col p-4 md:p-6">

        <div className="flex-1 min-h-0 flex flex-col lg:grid lg:grid-cols-[180px_180px_1fr_1fr] gap-4">

          {/* LEFT FIELDS */}
          <div className="flex flex-col gap-3">
            {requiredFields.map(({ label, key, placeholder }) => (
              <div key={key} className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <span className="text-xs text-gray-500">{label}</span>
                  <span className="text-xs text-red-400">*</span>
                </div>
                <input
                  type="text"
                  value={fields[key]}
                  onChange={(e) => handleField(key, e.target.value)}
                  placeholder={placeholder}
                  className={`h-11 px-3 text-base border rounded-lg bg-white text-gray-900 outline-none transition-colors w-full ${
                    errors[key]
                      ? "border-red-400 focus:border-red-500"
                      : "border-gray-300 focus:border-gray-500"
                  }`}
                />
                {errors[key] && (
                  <span className="text-xs text-red-400">This field is required</span>
                )}
              </div>
            ))}
          </div>

          {/* ADDITIONAL */}
          <div className="flex flex-col gap-1 min-h-0">
            <span className="text-xs text-gray-500 shrink-0">Additional</span>
            <textarea
              value={fields.additional}
              onChange={(e) => handleField("additional", e.target.value)}
              placeholder="additional information..."
              className="flex-1 min-h-0 w-full p-3 text-base border border-gray-300 rounded-lg bg-white text-gray-900 resize-none outline-none focus:border-gray-500 transition-colors leading-relaxed"
            />
          </div>

          {/* CV */}
          <div className="flex flex-col gap-2 min-h-0">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide shrink-0">CV</span>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste CV here."
              className="flex-1 min-h-0 w-full p-3 text-base border border-gray-300 rounded-lg bg-gray-50 text-gray-900 resize-none outline-none focus:border-gray-500 focus:bg-white transition-colors leading-relaxed"
            />
          </div>

          {/* RESULT */}
          <div className="flex flex-col gap-2 min-h-0">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide shrink-0">Result</span>
            <div className="flex-1 min-h-0 p-3 border border-gray-200 rounded-lg bg-gray-50 overflow-y-auto">
              {result ? (
                <div className="flex flex-col gap-2">
                  {result.map(({ key, val }) => (
                    <div key={key} className="flex flex-col gap-0.5 pb-2 border-b border-gray-200 last:border-none">
                      <span className="text-xs text-gray-400">{key}</span>
                      <span className="text-base font-medium text-gray-900">{val}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <span className="text-base text-gray-400">Your CV waiting for you...</span>
              )}
            </div>
          </div>

        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-2 mt-3 shrink-0">
          <button
            onClick={handleClear}
            className="px-4 h-11 text-base border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-100 hover:scale-105 active:scale-95"
          >
            Clear
          </button>
          <button
            onClick={handleExtract}
            className="px-4 h-11 text-base rounded-lg font-medium hover:scale-105 active:scale-95"
            style={{ backgroundColor: "#20ca44", color: "#111" }}
          >
            Create
          </button>
        </div>

      </div>
    </section>

  </div>
);
}