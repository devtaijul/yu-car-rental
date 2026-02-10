import { IconName } from "@/config/icons.config";
import { Icons } from "./icons";
import { features } from "@/data/features";

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
        <Icons name={icon} className="h-8 w-8" />
        <h3 className="font-semibold mb-1">{title}</h3>
      </div>
      <div>
        <p className="text-2xl font-bold">{details}</p>
      </div>
    </div>
  );
};

export const FeatureSection = () => {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-14 md:gap-28 flex-col md:flex-row">
          {features.map((feature, index) => (
            <Item
              key={index}
              details={feature.details}
              icon={feature.icon as IconName}
              title={feature.title}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
