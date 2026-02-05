import { Car, Shield } from "lucide-react";
import React from "react";

const Item = ({
  title,
  details,
  Icon,
}: {
  title: string;
  details: string;
  Icon: React.ElementType;
}) => {
  return (
    <div className="max-w-sm flex flex-col space-y-3">
      <div className="flex items-center gap-4">
        <Icon />
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
      Icon: () => <Car className="h-8 w-8" />,
    },
    {
      title: "Exceptional service",
      details: "Stress-free, trustworthy, no hidden costs",
      Icon: () => <Shield className="h-8  w-8" />,
    },
  ];
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-5 md:gap-28 ">
          {features.map((feature, index) => (
            <Item key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};
