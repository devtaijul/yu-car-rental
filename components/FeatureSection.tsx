import { IconName } from "@/config/icons.config";
import { Icons } from "./icons";

const Item = ({
  title,
  details,
  icon,
}: {
  title: string;
  details: string;
  icon: IconName;
}) => {
  return (
    <div className="max-w-sm flex flex-col space-y-3">
      <div className="flex items-center gap-4">
        <Icons name="car_icon" className="h-8 w-8" />
        <h3 className="font-semibold mb-1">{title}</h3>
      </div>
      <div>
        <p className="text-2xl font-bold">{details}</p>
      </div>
    </div>
  );
};

export const FeatureSection = () => {
  const features = [
    {
      title: "Distinctive fleet",
      details: "From high-end convertibles to premium SUVs",
      icon: "car_icon ",
    },
    {
      title: "Exceptional service",
      details: "Stress-free, trustworthy, no hidden costs",
      icon: "car_icon ",
    },
  ];
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-14 md:gap-28 flex-col md:flex-row">
          {features.map((feature, index) => (
            <Item key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
