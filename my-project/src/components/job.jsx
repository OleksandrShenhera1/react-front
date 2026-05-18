import { useState } from "react";

export default function JobInput({ onBack, onNext }) {
  const [jobDescription, setJobDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");

  const canProceed = jobTitle.trim().length > 0 && jobDescription.trim().length > 100;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition text-base font-medium"
          >
            <span className="text-lg">←</span> Back to Templates
          </button>
          <span className="text-sm text-gray-400">Step 4 of 5</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex justify-center px-6 py-10">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">Target Job</h1>
          <p className="text-base text-gray-500 mb-8">
            Tell us what position you're applying for. Paste the job description to tailor your resume automatically.
          </p>

          <div className="flex flex-col gap-6">
            {/* Job title */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Job Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Senior Frontend Developer"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className={`w-full h-14 px-4 border rounded-xl text-base outline-none transition ${
                  !jobTitle.trim()
                    ? "border-gray-200 bg-gray-50 focus:border-blue-400 text-gray-800"
                    : "border-gray-200 bg-gray-50 focus:border-blue-400 text-gray-800"
                }`}
              />
            </div>

            {/* Job description */}
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Job Description <span className="text-red-500">*</span>
              </label>
              <textarea
                placeholder="Paste the full job description here. We'll use it to match your resume to the role..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={10}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-base text-gray-800 outline-none focus:border-blue-400 transition resize-none"
              />
              <p className="text-xs mt-1.5">
                <span className={jobDescription.length >= 100 ? "text-green-500" : "text-gray-400"}>
                    {jobDescription.length}/100 minimum characters
                </span>
                </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-200 mt-10 pt-5 flex items-center justify-between">
            <p className="text-sm text-gray-400">We do not collect your personal data.</p>
            <button
              onClick={() => canProceed && onNext({ jobTitle, jobDescription })}
              disabled={!canProceed}
              className={`text-white text-base font-medium px-8 py-3.5 rounded-xl transition whitespace-nowrap ${
                canProceed
                  ? "bg-[#1db954] hover:bg-[#008200]"
                  : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Generate Resume →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}