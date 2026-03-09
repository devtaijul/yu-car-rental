import { getMyProfile } from "@/actions/query";
import ProfileDocuments from "@/components/pages/dashboard/ProfileDocuments";

const page = async () => {
  const result = await getMyProfile();
  const user = result?.success ? result.data : null;
  return <ProfileDocuments user={user} />;
};

export default page;
