import { ComitesData } from '@/app/JsonData/InfoComitesData';
import ProjectDetailsClient from './ProjectDetailsClient';

export async function generateStaticParams() {
  // Ahora usamos las llaves del objeto TS
  return Object.keys(ComitesData).map((id) => ({ id }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params; // "jovenes"

  return <ProjectDetailsClient initialSlug={id} />;
}