import enifLogo from "../assets/enif-logo.svg";
import twitterIcon from "../assets/twitter-icon.svg";
import linkedinIcon from "../assets/linkedin-icon.svg";
import Button from "./Button";
import { footerColumns } from "../data/constants";

function Footer() {
  return (
    <footer className="bg-secondary">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="flex items-start gap-2">
            <img src={enifLogo} alt="Enif Logo" className="h-8" />
            <span className="text-white text-xl font-semibold">enif</span>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-white font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-gray-300 text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-3">
            <Button variant="primary">Get Started</Button>
            <Button variant="outline">Request Demo</Button>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <p className="text-gray-300 text-sm">© 2023 Enif</p>
          <div className="flex items-center gap-4">
            <a href="#">
              <img src={twitterIcon} alt="Twitter" className="w-8 h-8" />
            </a>
            <a href="#">
              <img src={linkedinIcon} alt="LinkedIn" className="w-8 h-8" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
