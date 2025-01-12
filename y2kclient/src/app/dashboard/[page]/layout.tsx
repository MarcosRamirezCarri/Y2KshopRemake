import SideBarDashboard from "../Components/layout/SideBarDashboard";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <SideBarDashboard />
      {children}
    </section>
  );
}
