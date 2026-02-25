import { getReviewsForAdmin } from "@/actions/query";
import { ReviewsManagement } from "@/components/pages/admin/ReviewsManagement";

import React from "react";

export const ReviewsManagementServer = async () => {
  const data = await getReviewsForAdmin();

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <ReviewsManagement reviews={data.reviews} />;
};
