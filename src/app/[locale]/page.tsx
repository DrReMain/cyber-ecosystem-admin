import { redirect } from 'next/navigation';

export default async function RootPage() {
  // auto redirect
  redirect('/ws');
}
