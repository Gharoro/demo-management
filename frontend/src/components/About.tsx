import { useState } from "react";
import credpalDarkLogo from "../assets/credpal-dark-logo.svg";
import credpalLogo from "../assets/credpal-logo.svg";

function About() {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <img
          src={credpalDarkLogo}
          alt="CredPal Logo"
          className="h-12 mx-auto mb-12"
        />

        <p className="text-text text-lg leading-loose">
          To improve their operations, CredPal turned to Enif. By using Enif's
          AI and automation capabilities, CredPal was able to efficiently handle
          a high volume of customer inquiries, improve customer satisfaction,
          and drive growth for their business.{" "}
          <span className="font-bold">
            With Enif's help, CredPal was able to increase conversions
          </span>{" "}
          while reducing cost and stay ahead of the competition by proactively
          addressing customer needs based on data-driven insights
        </p>

        <div className="flex items-center justify-center gap-4 mt-12">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img
              src={credpalLogo}
              alt="CredPal"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-left">
            <p className="text-text font-semibold">Credpal</p>
            <p className="text-text-light text-sm">Head of Operations</p>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                activeSlide === index ? "bg-secondary" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
