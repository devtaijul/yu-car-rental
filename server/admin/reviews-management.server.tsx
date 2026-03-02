import { getReviewsForAdmin } from "@/actions/query";
import ReviewsPage from "@/components/pages/admin/ReviewsPage";

export const ReviewsManagementServer = async () => {
  const data = await getReviewsForAdmin();

  if (!data.success) {
    return <div>Something is wrong</div>;
  }

  return <ReviewsPage />;
};
