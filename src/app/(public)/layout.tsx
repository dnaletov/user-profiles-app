export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <main className="flex-1 container mx-auto py-8 px-4">{children}</main>
    </>
  );
}
