import { AdminDriverManagementServer } from "@/server/AdminDriverManagementServer";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminDriverManagementServer />
    </Suspense>
  );
};

export default page;
