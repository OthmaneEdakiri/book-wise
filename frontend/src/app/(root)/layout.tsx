import Header from "./_components/header";

export default async function RootAppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-[linear-gradient(180deg,#090C15_8%,#080B17_100%)] text-secondary">
      <Header />
      {children}
    </div>
  );
}
