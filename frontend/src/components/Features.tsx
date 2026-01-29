import FeatureCard from "./FeatureCard";
import { features } from "../data/constants";

function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-text text-3xl md:text-4xl font-bold mb-4">
            Experiment at Scale
          </h2>
          <p className="text-text-light">
            Unlock new possibilities across all teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
