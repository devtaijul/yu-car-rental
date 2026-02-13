import { CalenderIcon } from "@/components/icons/Calender.icon";
import { GasIcon } from "@/components/icons/gas.icon";
import { LoveHandIcon } from "@/components/icons/love-hand.icon";
import { MilesIcon } from "@/components/icons/miles.icon";
import { SelfIcon } from "@/components/icons/self.icon";
import { SettingIcon } from "@/components/icons/setting.icon";
import { SheildIcon } from "@/components/icons/sheild.icon";
import { WhatsAppTransparentIcon } from "@/components/icons/whatsapp_transparent.icon";

import { CarIcon, FuelIcon } from "lucide-react";

const ICON_NAMES = {
  mile_icon: MilesIcon,
  gas_icon: GasIcon,
  fuel_icon: FuelIcon,
  setting_icon: SettingIcon,
  car_icon: CarIcon,
  love_hand_icon: LoveHandIcon,
  self_icon: SelfIcon,
  calender_icon: CalenderIcon,
  sheild_icon: SheildIcon,
  whatsapp_transparent_icon: WhatsAppTransparentIcon,
};

export { ICON_NAMES };

export type IconName = keyof typeof ICON_NAMES;
