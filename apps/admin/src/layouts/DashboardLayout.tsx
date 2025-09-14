import { PATH } from '@/constants/path';
import { Outlet, NavLink, useLocation } from 'react-router-dom';

const DASHBOARD_ITEMS = [
  { label: '홈', path: PATH.DASHBOARD },
  { label: '사용자', path: PATH.DASHBOARD_USERS },
  { label: '블로그', path: PATH.DASHBOARD_BLOGS },
  { label: '소식', path: PATH.DASHBOARD_NEWS },
  { label: '지원서', path: PATH.DASHBOARD_APPLY },
];

export default function DashboardLayout() {
  const location = useLocation();
  const currentTitle =
    DASHBOARD_ITEMS.find(item => item.path === location.pathname)?.label || 'Dashboard';
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-gray-100 flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-gray-700">🌱 관리자 대시보드</div>
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {DASHBOARD_ITEMS.map(item => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === PATH.DASHBOARD}
                  className={({ isActive }) =>
                    `block rounded px-3 py-2 transition ${
                      isActive
                        ? 'bg-gray-700 text-white font-semibold'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">
        <h1 className="font-bold text-2xl mb-6">{currentTitle}</h1>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
