import { getDatasets } from '@/services/datasetService';
import { Card } from '@/components/ui/card';
import { DatasetsTable } from '@/components/datasets/datasets-table';

export default async function DatasetsPage() {
  const datasets = await getDatasets();
  return (
    <Card>
      <DatasetsTable datasets={datasets} />
    </Card>
  );
}