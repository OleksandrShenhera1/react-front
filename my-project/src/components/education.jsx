import { useState } from "react";

const EMPTY_EDUCATION = { school: "", degree: "", field: "", startYear: "", endYear: "", current: false };
const EMPTY_EXPERIENCE = { company: "", position: "", startMonth: "", startYear: "", endMonth: "", endYear: "", current: false, description: "" };

function EducationEntry({ entry, onChange, onRemove, index }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-700">Education #{index + 1}</p>
        <button onClick={onRemove} className="text-gray-400 hover:text-red-400 transition text-sm">Remove</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">School / University <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="e.g. Harvard University"
            value={entry.school}
            onChange={(e) => onChange("school", e.target.value)}
            className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-gray-50 text-base text-gray-800 outline-none focus:border-blue-400 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Degree</label>
          <input
            type="text"
            placeholder="e.g. Bachelor's"
            value={entry.degree}
            onChange={(e) => onChange("degree", e.target.value)}
            className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-gray-50 text-base text-gray-800 outline-none focus:border-blue-400 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Field of Study</label>
          <input
            type="text"
            placeholder="e.g. Computer Science"
            value={entry.field}
            onChange={(e) => onChange("field", e.target.value)}
            className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-gray-50 text-base text-gray-800 outline-none focus:border-blue-400 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Start Year</label>
          <input
            type="number"
            placeholder="2018"
            min="1950"
            max="2099"
            value={entry.startYear}
            onChange={(e) => onChange("startYear", e.target.value)}
            className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-gray-50 text-base text-gray-800 outline-none focus:border-blue-400 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">End Year</label>
          <input
            type="number"
            placeholder={entry.current ? "Present" : "2022"}
            min="1950"
            max="2099"
            disabled={entry.current}
            value={entry.current ? "" : entry.endYear}
            onChange={(e) => onChange("endYear", e.target.value)}
            className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-gray-50 text-base text-gray-800 outline-none focus:border-blue-400 transition disabled:opacity-50"
          />
        </div>
        <div className="col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            id={`edu-current-${index}`}
            checked={entry.current}
            onChange={(e) => onChange("current", e.target.checked)}
            className="w-4 h-4 accent-blue-500"
          />
          <label htmlFor={`edu-current-${index}`} className="text-sm text-gray-600 cursor-pointer">Currently studying here</label>
        </div>
      </div>
    </div>
  );
}

function ExperienceEntry({ entry, onChange, onRemove, index }) {
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-gray-700">Experience #{index + 1}</p>
        <button onClick={onRemove} className="text-gray-400 hover:text-red-400 transition text-sm">Remove</button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Company <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="e.g. Google"
            value={entry.company}
            onChange={(e) => onChange("company", e.target.value)}
            className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-gray-50 text-base text-gray-800 outline-none focus:border-blue-400 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Position <span className="text-red-500">*</span></label>
          <input
            type="text"
            placeholder="e.g. Frontend Developer"
            value={entry.position}
            onChange={(e) => onChange("position", e.target.value)}
            className="w-full h-12 px-4 border border-gray-200 rounded-xl bg-gray-50 text-base text-gray-800 outline-none focus:border-blue-400 transition"
          />
        </div>

        {/* Start */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">Start Date</label>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={entry.startMonth}
              onChange={(e) => onChange("startMonth", e.target.value)}
              className="h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-800 outline-none focus:border-blue-400 transition"
            >
              <option value="">Month</option>
              {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <input
              type="number"
              placeholder="Year"
              min="1950"
              max="2099"
              value={entry.startYear}
              onChange={(e) => onChange("startYear", e.target.value)}
              className="h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-800 outline-none focus:border-blue-400 transition"
            />
          </div>
        </div>

        {/* End */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-2">End Date</label>
          <div className="grid grid-cols-2 gap-2">
            <select
              value={entry.endMonth}
              onChange={(e) => onChange("endMonth", e.target.value)}
              disabled={entry.current}
              className="h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-800 outline-none focus:border-blue-400 transition disabled:opacity-50"
            >
              <option value="">{entry.current ? "Present" : "Month"}</option>
              {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <input
              type="number"
              placeholder={entry.current ? "Present" : "Year"}
              min="1950"
              max="2099"
              disabled={entry.current}
              value={entry.current ? "" : entry.endYear}
              onChange={(e) => onChange("endYear", e.target.value)}
              className="h-12 px-3 border border-gray-200 rounded-xl bg-gray-50 text-sm text-gray-800 outline-none focus:border-blue-400 transition disabled:opacity-50"
            />
          </div>
        </div>

        <div className="col-span-2 flex items-center gap-2">
          <input
            type="checkbox"
            id={`exp-current-${index}`}
            checked={entry.current}
            onChange={(e) => onChange("current", e.target.checked)}
            className="w-4 h-4 accent-blue-500"
          />
          <label htmlFor={`exp-current-${index}`} className="text-sm text-gray-600 cursor-pointer">I currently work here</label>
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-600 mb-2">Description</label>
          <textarea
            placeholder="Describe your responsibilities and achievements..."
            value={entry.description}
            onChange={(e) => onChange("description", e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-base text-gray-800 outline-none focus:border-blue-400 transition resize-none"
          />
        </div>
      </div>
    </div>
  );
}

export default function EducationExperiencePage({ onBack, onNext, education, setEducation, experience, setExperience, skills, setSkills }) {
  const [skillInput, setSkillInput] = useState("");

  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed || skills.includes(trimmed)) return;
    setSkills((prev) => [...prev, trimmed]);
    setSkillInput("");
  };

  const removeSkill = (skill) => setSkills((prev) => prev.filter((s) => s !== skill));

  const handleSkillKey = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addSkill();
    }
  };
  const updateEducation = (index, key, value) => {
    setEducation((prev) => prev.map((e, i) => i === index ? { ...e, [key]: value } : e));
  };
  const removeEducation = (index) => setEducation((prev) => prev.filter((_, i) => i !== index));

  const updateExperience = (index, key, value) => {
    setExperience((prev) => prev.map((e, i) => i === index ? { ...e, [key]: value } : e));
  };
  const removeExperience = (index) => setExperience((prev) => prev.filter((_, i) => i !== index));

  const canProceed =
    education.every((e) => e.school.trim()) &&
    experience.every((e) => e.company.trim() && e.position.trim());

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition text-base font-medium"
          >
            <span className="text-lg">←</span> Back
          </button>
          <span className="text-sm text-gray-400">Step 4 of 5</span>
        </div>
      </div>

      <div className="flex-1 flex justify-center px-6 py-10">
        <div className="w-full max-w-4xl flex flex-col gap-10">

          {/* Education */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-semibold text-gray-900">Education</h2>
              <button
                onClick={() => setEducation((prev) => [...prev, { ...EMPTY_EDUCATION }])}
                className="flex items-center gap-1.5 text-sm font-medium text-blue-500 hover:text-blue-600 transition"
              >
                <span className="text-lg leading-none">+</span> Add Education
              </button>
            </div>
            <p className="text-base text-gray-500 mb-5">Add your academic background.</p>

            {education.length === 0 ? (
              <div
                onClick={() => setEducation([{ ...EMPTY_EDUCATION }])}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition"
              >
                <p className="text-gray-400 text-sm">Click to add your first education entry</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {education.map((entry, i) => (
                  <EducationEntry
                    key={i}
                    index={i}
                    entry={entry}
                    onChange={(key, val) => updateEducation(i, key, val)}
                    onRemove={() => removeEducation(i)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-semibold text-gray-900">Work Experience</h2>
              <button
                onClick={() => setExperience((prev) => [...prev, { ...EMPTY_EXPERIENCE }])}
                className="flex items-center gap-1.5 text-sm font-medium text-blue-500 hover:text-blue-600 transition"
              >
                <span className="text-lg leading-none">+</span> Add Experience
              </button>
            </div>
            <p className="text-base text-gray-500 mb-5">Add your work history, starting from the most recent.</p>

            {experience.length === 0 ? (
              <div
                onClick={() => setExperience([{ ...EMPTY_EXPERIENCE }])}
                className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center cursor-pointer hover:border-blue-300 hover:bg-blue-50 transition"
              >
                <p className="text-gray-400 text-sm">Click to add your first work experience</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {experience.map((entry, i) => (
                  <ExperienceEntry
                    key={i}
                    index={i}
                    entry={entry}
                    onChange={(key, val) => updateExperience(i, key, val)}
                    onRemove={() => removeExperience(i)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Skills */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Skills</h2>
            <p className="text-base text-gray-500 mb-5">Add your technical and soft skills. Press Enter or comma to add.</p>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-4">
              {/* Input */}
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="e.g. React, Python, Leadership..."
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleSkillKey}
                  className="flex-1 h-12 px-4 border border-gray-200 rounded-xl bg-gray-50 text-base text-gray-800 outline-none focus:border-blue-400 transition"
                />
                <button
                  onClick={addSkill}
                  className="h-12 px-5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-xl transition"
                >
                  Add
                </button>
              </div>

              {/* Tags */}
              {skills.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="flex items-center gap-1.5 bg-blue-50 text-blue-700 text-sm font-medium px-3 py-1.5 rounded-lg"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-blue-400 hover:text-blue-600 leading-none transition"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {skills.length === 0 && (
                <p className="text-sm text-gray-400">No skills added yet.</p>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 pt-5 flex items-center justify-between">
            <p className="text-sm text-gray-400">We do not collect your personal data.</p>
            <button
              onClick={() => canProceed && onNext({ education, experience, skills })}
              disabled={!canProceed}
              className={`text-white text-base font-medium px-8 py-3.5 rounded-xl transition whitespace-nowrap ${
                canProceed
                  ? "bg-[#1db954] hover:bg-[#008200]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Next: Job Description →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}