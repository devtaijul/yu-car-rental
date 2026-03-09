"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CoverageType } from "@/generated/prisma/enums";
import { PAGES } from "@/config/pages.config";
import { PricingTable } from "./PricingTable";

export const HomePricingSection = () => {
  const router = useRouter();
  const [selected, setSelected] = useState<CoverageType | undefined>();

  const handleSelect = (coverage: CoverageType) => {
    setSelected(coverage);
    router.push(`${PAGES.RESERVE_A_CAR.ROOT}?coverage=${coverage}`);
  };

  return (
    <PricingTable
      isSelectable
      selectedCoverage={selected}
      onSelectCoverage={handleSelect}
    />
  );
};
