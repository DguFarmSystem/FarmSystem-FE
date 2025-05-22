import { RouterProvider, createBrowserRouter } from 'react-router';
import Layout from '@/pages/Layout';
import Main from '@/pages/Main';
import Recruit from '@/pages/Apply';
import Blog from '@/pages/Blog';
import NotFound from '@/pages/NotFound';
import News from '@/pages/News';
import NewsDetail from '@/pages/News/NewsDetail';
import FAQ from '@/pages/FAQ';
import MaintainPage from '@/pages/MaintainPage';
import RedirectRoute from '@/components/RedirectRoute';
import ProjectDetail from './pages/Blog/Project/ProjectDetail';
import ProjectList from './pages/Blog/Project/ProjectList';
import BlogList from './pages/Blog/Blog/BlogList';


const IS_MAINTENANCE = false; // 유지보수 모드 ON/OFF 설정은 여기서 해주시면 됩니다.
const IS_RECRUIT = false; // 모집 모드 ON/OFF 설정은 여기서 해주시면 됩니다.

export default function Router() {
  if (IS_MAINTENANCE) {
    return <MaintainPage />;
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Main /> },
        { path: '/recruit', element: <RedirectRoute boolean={IS_RECRUIT}><Recruit /></RedirectRoute>},
        { path: '/project', element: <Blog/> },
        { path: '/project/:projectId', element: <ProjectDetail /> },
        { path: '/blog', element: <Blog/> },
        { path: '/news', element: <News /> },
        { path: '/news/:newsId', element: <NewsDetail /> },
        { path: '/FAQ', element: <FAQ /> },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}
