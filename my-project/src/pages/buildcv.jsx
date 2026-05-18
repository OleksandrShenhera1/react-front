import { useState } from "react";
import PersonalDetailsForm from "../components/personaldetails.jsx";
import TemplateSelector from "../components/templateselector.jsx";
import JobInputPage from "../components/job.jsx";
import EducationExperiencePage from "../components/education.jsx";

const INITIAL_FIELDS = {
  jobTarget: "", firstName: "", lastName: "", email: "", phone: "",
  address: "", cityState: "", dateOfBirth: "", country: "", nationality: "",
  linkedin: "", website: "", photo: "",
};

export default function BuildCv() {
  const [step, setStep] = useState("details"); // "details" | "templates" | "education" | "job"

  // Personal details
  const [fields, setFields] = useState(INITIAL_FIELDS);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showMore, setShowMore] = useState(false);

  // Template
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  // Education & Experience
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [skills, setSkills] = useState([]);

  // Job
  const [jobData, setJobData] = useState(null);

  return (
    <>
      {step === "details" && (
        <PersonalDetailsForm
          fields={fields}
          setFields={setFields}
          touched={touched}
          setTouched={setTouched}
          submitted={submitted}
          setSubmitted={setSubmitted}
          showMore={showMore}
          setShowMore={setShowMore}
          onNext={() => setStep("templates")}
        />
      )}

      {step === "templates" && (
        <TemplateSelector
          selected={selectedTemplate}
          setSelected={setSelectedTemplate}
          onBack={() => setStep("details")}
          onSelect={(templateId) => {
            setSelectedTemplate(templateId);
            setStep("education");
          }}
        />
      )}

      {step === "education" && (
        <EducationExperiencePage
          education={education}
          setEducation={setEducation}
          experience={experience}
          setExperience={setExperience}
          skills={skills}
          setSkills={setSkills}
          onBack={() => setStep("templates")}
          onNext={() => setStep("job")}
        />
      )}

      {step === "job" && (
        <JobInputPage
          onBack={() => setStep("education")}
          onNext={async (data) => {
            setJobData(data);

            const payload = {
              personalDetails: fields,
              template: selectedTemplate,
              education,
              experience,
              skills,
              job: data,
            };
            
            console.log(payload)

            const response = await fetch("http://localhost:8080/api/cv/GEMINI/generate", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });

            const result = await response.json();
            console.log(result);
            // setStep("result");
          }}
        />
      )}
    </>
  );
}