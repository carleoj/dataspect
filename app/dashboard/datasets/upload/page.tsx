import { Card } from '@/components/ui/card';
import { UploadDropzone } from '@/components/datasets/upload-dropzone';

export default function UploadDatasetPage() {
  return (
    <Card className="max-w-2xl">
      <UploadDropzone />
    </Card>
  );
}