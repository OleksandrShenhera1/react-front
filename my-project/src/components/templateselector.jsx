import { useState } from "react";
import Resume1 from "../assets/resumes/resume1.png";

const TEMPLATES = [
  { id: "template_1",  name: "Basic & Simple resume", image: Resume1 },
  { id: "template_2",  name: "Template 2",  image: "/templates/template_2.png"  },
  { id: "template_3",  name: "Template 3",  image: "/templates/template_3.png"  },
  { id: "template_4",  name: "Template 4",  image: "/templates/template_4.png"  },
  { id: "template_5",  name: "Template 5",  image: "/templates/template_5.png"  },
  { id: "template_6",  name: "Template 6",  image: "/templates/template_6.png"  },
  { id: "template_7",  name: "Template 7",  image: "/templates/template_7.png"  },
  { id: "template_8",  name: "Template 8",  image: "/templates/template_8.png"  },
  { id: "template_9",  name: "Template 9",  image: "/templates/template_9.png"  },
  { id: "template_10", name: "Template 10", image: "/templates/template_10.png" },
];

export default function TemplateSelector({ onBack, onSelect, selected, setSelected }) {
  const [zoomed, setZoomed] = useState(null);
  const [scale, setScale] = useState(1);

  const openZoom = (tpl) => { setZoomed(tpl); setScale(1); };
  const changeScale = (delta) => setScale((s) => Math.min(3, Math.max(0.5, +(s + delta).toFixed(1))));
  const handleWheel = (e) => { e.preventDefault(); changeScale(e.deltaY < 0 ? 0.1 : -0.1); };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition text-base font-medium"
          >
            <span className="text-lg">←</span> Back to Education & Experience
          </button>
          <span className="text-sm text-gray-400">Step 3 of 5</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex justify-center px-6 py-10">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Choose a Template</h1>
          <p className="text-base text-gray-500 mb-8">
            Pick a design that best represents your style.
          </p>

          <div className="grid grid-cols-3 gap-6">
            {TEMPLATES.map((tpl) => (
              <div
                key={tpl.id}
                onClick={() => setSelected(tpl.id)}
                className={`group cursor-pointer rounded-2xl border-2 overflow-hidden transition-all ${
                  selected === tpl.id
                    ? "border-blue-500 shadow-lg scale-[1.02]"
                    : "border-gray-200 hover:border-gray-400 hover:shadow-md"
                }`}
              >
                {/* Preview image */}
                <div className="relative aspect-3/4 bg-gray-100 overflow-hidden">
                  <img
                    src={tpl.image}
                    alt={tpl.name}
                    draggable={false}
                    className="w-full h-full object-cover object-top"
                  />

                  {/* Zoom button — з'являється при наведенні */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openZoom(tpl);
                    }}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white hover:bg-gray-100 text-gray-700 rounded-lg p-1.5 shadow-md"
                    title="Preview"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </button>
                </div>

                {/* Label */}
                <div className="px-4 py-3 bg-white border-t border-gray-100 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-800">{tpl.name}</p>
                  {selected === tpl.id && (
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 mt-10 pt-5 flex items-center justify-between">
            <p className="text-sm text-gray-400">We do not collect your personal data.</p>
            <button
              onClick={() => selected && onSelect(selected)}
              disabled={!selected}
              className={`text-white text-base font-medium px-8 py-3.5 rounded-xl transition whitespace-nowrap ${
                selected
                  ? "bg-[#1db954] hover:bg-[#008200]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Next: Add Resume Details
            </button>
          </div>
        </div>
      </div>

      {/* Zoom modal */}
      {zoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setZoomed(null)}
        >
          <div
            className="relative bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: "90vh", width: "min(640px, 90vw)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <p className="text-base font-semibold text-gray-800">{zoomed.name}</p>
              <button
                onClick={() => setZoomed(null)}
                className="text-gray-400 hover:text-gray-700 transition p-1 rounded-lg hover:bg-gray-100"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal image */}
            <div className="overflow-y-auto">
              <img
                src={zoomed.image}
                alt={zoomed.name}
                draggable={false}
                className="w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}