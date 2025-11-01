'use client';

import dynamic from 'next/dynamic';

const ClientApp = dynamic(() => import('./ClientApp'), { ssr: false });

export default function Home() {
  return <ClientApp />;
}
