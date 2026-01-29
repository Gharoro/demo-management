import checkCircle from "../assets/check-circle.svg";
import { heroFeatures } from "../data/constants";

function Hero() {
  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <p className="text-white text-sm uppercase tracking-widest mb-6">
          Request Demo
        </p>

        <h1 className="text-white text-4xl md:text-5xl font-bold mb-6">
          We'd love to hear from you
        </h1>

        <p className="text-white text-lg mb-10">
          Contact us, and we will promptly respond with real-time solutions
          utilizing:
        </p>

        <div className="flex flex-wrap justify-center gap-8">
          {heroFeatures.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <img src={checkCircle} alt="" className="w-5 h-5" />
              <span className="text-white font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Hero;
