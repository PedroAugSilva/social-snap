import { Navbar } from "@/modules/user/feed/components/navbar";

export default function LayoutFeed({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}
