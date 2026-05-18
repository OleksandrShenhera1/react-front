import Hero from "../components/hero.jsx"
import Steps from "../components/steps.jsx"
import Carousel from "../components/carousel.jsx"
import Text from "../components/text.jsx"

export default function CVPage() {
  return (
    <div className="bg-gray-100 flex flex-col items-center px-6 py-16 gap-16">

      {/* ── HERO ── */}
      <Hero />
      {/* ── STEPS ── */}
      <Steps />
      {/* ── CAROUSEL ── */}
      <Carousel />
      {/* ── TEXT ── */}
      <Text />
    </div>
  )
}