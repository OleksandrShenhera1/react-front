import HeroBg from "../assets/welcome.png"

export default function Hero() {
    return(
        <div className="relative w-full max-w-6xl bg-[#EEF2FF] rounded-3xl overflow-hidden shadow-xl flex flex-col md:flex-row items-center min-h-130">

            {/* Left */}
            <div className="flex-1 flex flex-col gap-7 z-10 px-16 py-20">
            <h1 className="text-6xl font-BaseNeue font-base text-[#0F1535] leading-tight">
                Create a perfect CV in minutes
            </h1>
            <p className="text-xl text-gray-500 max-w-md leading-relaxed">
                Create a CV in just a few minutes with our recruiter-approved
                templates and our AI assistant.
            </p>
            <div className="flex gap-4 mt-2">
                <button className="bg-[#1db954] hover:bg-[#008200] transition-colors text-white font-semibold px-8 py-4 rounded-xl text-base cursor-pointer">
                Create my CV
                </button>
                <button className="border border-[#1db954] text-[#1db954] hover:bg-green-100 transition-colors font-semibold px-8 py-4 rounded-xl text-base bg-white cursor-pointer">
                Import my CV
                </button>
            </div>
            </div>

            {/* Right */}
            <div className="relative flex-1 self-stretch min-h-130">
            <img
                src={HeroBg}
                draggable="false"
                alt="Hero"
                className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute top-6 right-6 z-20 bg-white border border-gray-100 shadow-md rounded-xl font-semibold px-4 py-2 flex items-center gap-2">
                <span className="text-indigo-300">✦</span>
                Generate with AI
            </div>
            </div>

        </div>
    )
}