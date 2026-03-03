import { ComitesData } from '@/app/JsonData/InfoComitesData';
import ProjectDetailsClient from './ProjectDetailsClient';

export async function generateStaticParams() {
  // Ahora usamos las llaves del objeto TS
  return Object.keys(ComitesData).map((id) => ({ id }));
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <ProjectDetailsClient id={id} />;
}