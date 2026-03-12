import { CalenderIcon } from "@/components/icons/Calender.icon";
import { CardIcon } from "@/components/icons/card.icon";
import { ChildIcon } from "@/components/icons/child.icon";
import { CoolIcon } from "@/components/icons/cool.icon";
import { DashbaordCarIcon } from "@/components/icons/DashbaordCarIcon";
import { DashboardIcon } from "@/components/icons/dashboard.icon";
import { DashboardCoupon } from "@/components/icons/DashboardCoupon";
import { DashboardNavCalender } from "@/components/icons/DashboardNavCalender";
import { DashboardSettings } from "@/components/icons/DashboardSettings";
import { DashboardStar } from "@/components/icons/DashboardStar";
import { DashboardUser } from "@/components/icons/DashboardUser";
import { DashboardUserCheck } from "@/components/icons/DashboardUserCheck";
import { FaceIcon } from "@/components/icons/Face.icon";
import { GasIcon } from "@/components/icons/gas.icon";
import { GrayCalenderIcon } from "@/components/icons/gray-calender.icon";
import { HartIcon } from "@/components/icons/Hart.icon";
import { IdentityCard } from "@/components/icons/IdentityCard";
import { LockIcon } from "@/components/icons/lock.icon";
import { LoveHandIcon } from "@/components/icons/love-hand.icon";
import { MilesIcon } from "@/components/icons/miles.icon";
import { ProfileIcon } from "@/components/icons/profile.icon";
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
  hart_icon: HartIcon,
  face_icon: FaceIcon,
  dashbaord_icon: DashboardIcon,
  card_icon: CardIcon,
  gray_calender_icon: GrayCalenderIcon,
  profile_icon: ProfileIcon,
  dashboard_car_icon: DashbaordCarIcon,
  dashboard_callendar_icon: DashboardNavCalender,
  dashboard_user_icon: DashboardUser,
  identity_icon: IdentityCard,
  dashboard_user_check_icon: DashboardUserCheck,
  dashboard_star: DashboardStar,
  dashbaord_coupon_icon: DashboardCoupon,
  dashboard_settings_icon: DashboardSettings,
  cool_icon: CoolIcon,
  lock_icon: LockIcon,
  child_icon: ChildIcon,
};

export { ICON_NAMES };

export type IconName = keyof typeof ICON_NAMES;
