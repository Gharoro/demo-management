import { useState } from "react";
import Button from "./Button";
import enifLogo from "../assets/enif-logo.svg";
import { navItems } from "../data/constants";

function Header() {
  const defaultActiveLink = navItems[0].href;
  const [activeLink, setActiveLink] = useState(defaultActiveLink);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between relative">
        <div className="flex items-center gap-2">
          <img src={enifLogo} alt="Enif" className="h-8" />
          <p className="text-white text-xl font-semibold">enif</p>
        </div>

        <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setActiveLink(item.href)}
              className={`text-white pb-1 ${
                activeLink === item.href ? "border-b-2 border-primary" : ""
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline">Request Demo</Button>
          <Button variant="primary">Get Started</Button>
        </div>

        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden px-6 pb-4">
          <nav className="flex flex-col gap-4 mb-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  setActiveLink(item.href);
                  setMobileMenuOpen(false);
                }}
                className={`text-white pb-1 ${
                  activeLink === item.href
                    ? "border-b-2 border-primary w-fit"
                    : ""
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="flex flex-col gap-3">
            <Button variant="outline">Request Demo</Button>
            <Button variant="primary">Get Started</Button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
