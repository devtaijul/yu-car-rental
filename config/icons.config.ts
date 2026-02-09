import { GasIcon } from "@/components/icons/gas.icon";
import { MilesIcon } from "@/components/icons/miles.icon";
import { SettingIcon } from "@/components/icons/setting.icon";
import { CarIcon, FuelIcon } from "lucide-react";

const ICON_NAMES = {
  mile_icon: MilesIcon,
  gas_icon: GasIcon,
  fuel_icon: FuelIcon,
  setting_icon: SettingIcon,
  car_icon: CarIcon,
};

export { ICON_NAMES };

export type IconName = keyof typeof ICON_NAMES;
