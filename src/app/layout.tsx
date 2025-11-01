import './globals.css';

export const metadata = {
  title: 'Super App - Modular Web3 Ecosystem',
  description: 'A modular Web3 super app with independent SaaS modules',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}

// Location: src/app/layout.tsx
