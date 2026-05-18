import Step1 from "../assets/steps/step1.png"
import Step2 from "../assets/steps/step2.png"
import Step3 from "../assets/steps/step3.png"
import Step4 from "../assets/steps/step4.png"

const steps = [
  { img: Step1, text: "Choose a job vacancy to create your CV." },
  { img: Step2, text: "Copy and paste the job description." },
  { img: Step3, text: "Add more details to your CV." },
  { img: Step4, text: "Download your CV and start applying." },
]

export default function Steps() {
    return(
        <div className="w-full max-w-6xl flex flex-col items-center gap-12">

        <h2 className="text-5xl font-base text-[#0F1535] text-center">
          Create your CV in 4 steps
        </h2>

        <div className="grid grid-cols-4 gap-6 w-full">
          {steps.map((step, i) => (
            <div key={i} className="bg-[#EEF2FF] rounded-2xl overflow-hidden flex flex-col items-center">
              <div className="w-full aspect-4/3 overflow-hidden">
                <img
                  src={step.img}
                  alt={`Step ${i + 1}`}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-center text-gray-700 text-base font-semibold leading-snug px-5 py-5">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        <button className="animate-pulse bg-[#1db954] hover:bg-[#008200] transition-colors text-white font-semibold px-14 py-4 rounded-xl text-base cursor-pointer">
          Create my CV online
        </button>


      </div>
    )
}