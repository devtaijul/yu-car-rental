import { ReviewsManagementServer } from "@/server/admin/reviews-management.server";
import React, { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReviewsManagementServer />
    </Suspense>
  );
};

export default page;
