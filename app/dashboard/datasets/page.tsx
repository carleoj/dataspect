import { Suspense } from "react";
import { Card } from "@/components/ui/card";
import { DatasetsList } from "@/components/datasets/datasets-list";
import { UploadModal } from "./upload-modal";

export const instant = false;

export default function DatasetsPage() {
  return (
    <>
      <Card>
        <DatasetsList />
      </Card>
      <Suspense fallback={null}>
        <UploadModal />
      </Suspense>
    </>
  );
}