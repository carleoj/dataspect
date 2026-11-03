import {api} from '@/lib/axios';
import type { DatasetSummary } from '@/types/dataset';

export async function getDatasets(): Promise<DatasetSummary[]> {
  const { data } = await api.get('/datasets');
  return data.data; 
}