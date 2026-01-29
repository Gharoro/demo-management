import type { FeatureCardProps } from "../interfaces";
import featuredIcon from "../assets/featured-icon.svg";

function FeatureCard({ feature }: FeatureCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <img src={featuredIcon} alt="Feature Icon" className="w-10 h-10 mb-4" />
      <h3 className="text-text font-semibold text-lg mb-2">{feature.title}</h3>
      <p className="text-text-light text-sm">{feature.description}</p>
    </div>
  );
}

export default FeatureCard;
