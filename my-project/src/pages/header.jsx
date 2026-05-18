import { Link } from "react-router-dom";
import Logo from "../assets/logo.png";

export default function Header() {
  return (
    <header style={{ backgroundColor: '#FFFFFF' }} className="w-full px-6 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">

        <div className="w-10 h-10">
          <img src={Logo} alt="Logo" className="w-full h-full object-contain" />
        </div>

        <nav className="flex items-center gap-8">
          <Link to="/" className="text-black font-BaseNeue font-medium text-lg hover:opacity-60 transition-opacity">
            Home
          </Link>

          <Link to="/build-cv" className="text-black font-BaseNeue font-medium text-lg hover:opacity-60 transition-opacity">
            Create
          </Link>

          <Link to="/pricing" className="text-black font-BaseNeue font-medium text-lg hover:opacity-60 transition-opacity">
            Pricing
          </Link>
        </nav>

      </div>
    </header>
  );
}