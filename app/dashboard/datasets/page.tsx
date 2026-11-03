import { Suspense } from 'react';
import { getDatasets } from '@/services/datasetService';
import { Card } from '@/components/ui/card';
import { DatasetsTable } from '@/components/datasets/datasets-table';
import { UploadModal } from './upload-modal';

export default async function DatasetsPage() {
  const datasets = await getDatasets();

  return (
    <>
      <Card>
        <DatasetsTable datasets={datasets} />
      </Card>

      <Suspense fallback={null}>
        <UploadModal />
      </Suspense>
    </>
  );
}