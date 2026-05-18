import { useState, useMemo, useEffect, useRef } from "react";

function useAnimatedValue(target, duration = 700) {
  const [display, setDisplay] = useState(target);
  const rafRef = useRef(null);
  const currentRef = useRef(target);

  useEffect(() => {
    const from = currentRef.current;
    const to = target;
    if (from === to) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const startTime = performance.now();

    const animate = (timestamp) => {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(from + (to - from) * eased);
      currentRef.current = next;
      setDisplay(next);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target, duration]);

  return display;
}

const FIELD_WEIGHTS = {
  photo:       10,
  jobTarget:   8,
  firstName:   7,
  lastName:    7,
  email:       8,
  phone:       8,
  address:     6,
  cityState:   5,
  dateOfBirth: 5,
  country:     5,
  nationality: 5,
  linkedin:    8,
  website:     8,
};

const REQUIRED_FIELDS = ["jobTarget", "firstName", "lastName", "email", "phone"];

const inputCls = (isError) =>
  `w-full h-14 px-4 border rounded-xl text-base outline-none transition ${
    isError
      ? "border-red-400 bg-red-50 focus:border-red-400 text-gray-800"
      : "border-gray-200 bg-gray-50 focus:border-blue-400 text-gray-800"
  }`;

const optionalInputCls =
  "w-full h-14 px-4 border border-gray-200 rounded-xl bg-gray-50 text-base text-gray-800 outline-none focus:border-blue-400 transition";

export default function PersonalDetailsForm({
  onNext,
  fields, setFields,
  touched, setTouched,
  submitted, setSubmitted,
  showMore, setShowMore,
}) {
  const set = (key) => (e) => setFields((prev) => ({ ...prev, [key]: e.target.value }));
  const touch = (key) => () => setTouched((prev) => ({ ...prev, [key]: true }));
  const isError = (key) => (touched[key] || submitted) && !fields[key].trim();

  const score = useMemo(() => {
    return Math.min(
      100,
      Object.entries(FIELD_WEIGHTS).reduce((acc, [key, weight]) => {
        return acc + (fields[key]?.trim() ? weight : 0);
      }, 0)
    );
  }, [fields]);

  const animatedScore = useAnimatedValue(score);

  const scoreColor =
    animatedScore < 30 ? "bg-red-400" : animatedScore < 60 ? "bg-amber-400" : "bg-green-500";
  const barColor =
    animatedScore < 30
      ? "from-red-300 to-red-400"
      : animatedScore < 60
      ? "from-amber-300 to-amber-500"
      : "from-green-400 to-green-500";

  const handleNext = () => {
    setSubmitted(true);
    const newTouched = {};
    REQUIRED_FIELDS.forEach((k) => (newTouched[k] = true));
    setTouched((prev) => ({ ...prev, ...newTouched }));

    const allValid = REQUIRED_FIELDS.every((k) => fields[k].trim());
    if (allValid && onNext) {
      onNext();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <span className={`${scoreColor} text-white text-sm font-semibold px-3 py-1 rounded-md transition-colors duration-300`}>
                {animatedScore}%
              </span>
              <span className="text-base text-gray-500">Your resume score</span>
            </div>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-2 bg-linear-to-r ${barColor} rounded-full transition-colors duration-300`}
              style={{ width: `${animatedScore}%` }}
            />
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 flex justify-center px-6 py-10">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Personal Details</h1>
          <p className="text-base text-gray-500 mb-8">
            Users who included complete contact details received significantly more responses from recruiters.
          </p>

          <div className="grid grid-cols-2 gap-6 items-start">
            {/* Job Target */}
            <div>
              <label className="block text-sm font-medium mb-2">
                <span className={isError("jobTarget") ? "text-red-500" : "text-gray-600"}>Target Position*</span>
              </label>
              <input
                type="text"
                placeholder="The role you want"
                value={fields.jobTarget}
                onChange={set("jobTarget")}
                onBlur={touch("jobTarget")}
                className={inputCls(isError("jobTarget"))}
              />
              {isError("jobTarget") && <p className="text-sm text-red-500 mt-1.5">This field is required</p>}
            </div>

            {/* Photo — вирівняно по label + input сусіда */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Photo</label>
              <div className="flex items-center gap-4 h-14">
                <div
                  className="w-14 h-14 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center shrink-0 overflow-hidden cursor-pointer hover:border-blue-400 transition"
                  onClick={() => document.getElementById("photoInput").click()}
                >
                  {fields.photo ? (
                    <img src={fields.photo} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="8" r="4" fill="#9ca3af" />
                      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  )}
                </div>
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    onClick={() => document.getElementById("photoInput").click()}
                    className="text-base text-blue-500 font-medium hover:text-blue-600 transition text-left"
                  >
                    {fields.photo ? "Change photo" : "Upload photo"}
                  </button>
                  {fields.photo && (
                    <button
                      type="button"
                      onClick={() => setFields((prev) => ({ ...prev, photo: "" }))}
                      className="text-sm text-red-400 hover:text-red-500 transition text-left"
                    >
                      Remove
                    </button>
                  )}
                  <span className="text-xs text-gray-400">JPG, PNG up to 5MB</span>
                </div>
                <input
                  id="photoInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const reader = new FileReader();
                    reader.onload = (ev) => setFields((prev) => ({ ...prev, photo: ev.target.result }));
                    reader.readAsDataURL(file);
                  }}
                />
              </div>
            </div>

            {/* First Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                <span className={isError("firstName") ? "text-red-500" : "text-gray-600"}>First Name*</span>
              </label>
              <input
                type="text"
                value={fields.firstName}
                onChange={set("firstName")}
                onBlur={touch("firstName")}
                className={inputCls(isError("firstName"))}
              />
              {isError("firstName") && <p className="text-sm text-red-500 mt-1.5">This field is required</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                <span className={isError("lastName") ? "text-red-500" : "text-gray-600"}>Last Name*</span>
              </label>
              <input
                type="text"
                value={fields.lastName}
                onChange={set("lastName")}
                onBlur={touch("lastName")}
                className={inputCls(isError("lastName"))}
              />
              {isError("lastName") && <p className="text-sm text-red-500 mt-1.5">This field is required</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                <span className={isError("email") ? "text-red-500" : "text-gray-600"}>Email*</span>
              </label>
              <input
                type="email"
                value={fields.email}
                onChange={set("email")}
                onBlur={touch("email")}
                className={inputCls(isError("email"))}
              />
              {isError("email") && <p className="text-sm text-red-500 mt-1.5">This field is required</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-2">
                <span className={isError("phone") ? "text-red-500" : "text-gray-600"}>Phone*</span>
              </label>
              <input
                type="tel"
                value={fields.phone}
                onChange={set("phone")}
                onBlur={touch("phone")}
                className={inputCls(isError("phone"))}
              />
              {isError("phone") && <p className="text-sm text-red-500 mt-1.5">This field is required</p>}
            </div>
          </div>

          {/* Add more details toggle */}
          <button
            onClick={() => setShowMore(!showMore)}
            className="mt-7 text-base text-blue-500 flex items-center hover:text-blue-600 gap-1.5 font-medium transition"
          >
            Add more details
            <span className="text-sm">{showMore ? "✕" : "❯"}</span>
          </button>

          {showMore && (
            <div className="grid grid-cols-2 gap-6 mt-6">
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-2">Address</label>
                <input type="text" value={fields.address} onChange={set("address")} className={optionalInputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">City, State</label>
                <input type="text" value={fields.cityState} onChange={set("cityState")} className={optionalInputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Date of Birth</label>
                <input type="date" value={fields.dateOfBirth} onChange={set("dateOfBirth")} className={optionalInputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Country</label>
                <input type="text" value={fields.country} onChange={set("country")} className={optionalInputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Nationality</label>
                <input type="text" value={fields.nationality} onChange={set("nationality")} className={optionalInputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">LinkedIn</label>
                <input type="text" value={fields.linkedin} onChange={set("linkedin")} className={optionalInputCls} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">Website</label>
                <input type="text" value={fields.website} onChange={set("website")} className={optionalInputCls} />
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t border-gray-200 mt-10 pt-5 flex items-center justify-between">
            <p className="text-sm text-gray-400">We do not collect your personal data.</p>
            <button
              onClick={handleNext}
              className="bg-[#1db954] hover:bg-[#008200] text-white text-base font-medium px-8 py-3.5 rounded-xl transition whitespace-nowrap"
            >
              Next: Choose Perfect Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}