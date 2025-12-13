export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>
    {/* Sidebar */}
    <div className='sidebar w-72 h-screen fixed top-0 left-0 z-1 bg-card'>
      <div className="sidebar-header">
        <h1>Project Manager</h1>
      </div>
      <div className="sidebar-content">
        <ul>
          <li>Dashboard</li>
          <li>Projects</li>
          <li>Teams</li>
          <li>Settings</li>
        </ul>
      </div>
    </div>
    {/* Main Content */}
    <main className='main-content ml-72 h-screen bg-background'>
      {children}
    </main>
  </div>;
} 