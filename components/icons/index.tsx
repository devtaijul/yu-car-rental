import { ICON_NAMES } from "@/config/icons.config";

interface IconProps {
  name: keyof typeof ICON_NAMES;
  className?: string;
}
export const Icons = ({ name, className }: IconProps) => {
  const CustomIcon = ICON_NAMES[name];
  if (!CustomIcon) {
    return null;
  }
  return <CustomIcon className={className} />;
};
