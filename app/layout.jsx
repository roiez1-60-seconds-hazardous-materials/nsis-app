import './globals.css';

export const metadata = {
  title: 'NSIS — מערכת זיהוי רצף גנומי בלתי ממוקד',
  description: 'Non-Targeted Sequencing Identification System — מערכת זיהוי ביולוגי מהפכנית המבוססת על טכנולוגיית רצף ננונקבים',
  keywords: 'NSIS, Nanopore, Sequencing, CBRN, Biological, Defense, MinION',
  authors: [{ name: 'Roie Zukerman' }],
  openGraph: {
    title: 'NSIS — Non-Targeted Sequencing Identification System',
    description: 'Revolutionary biological identification system based on Nanopore Sequencing technology',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>{children}</body>
    </html>
  );
}
