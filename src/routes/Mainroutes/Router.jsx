import { createBrowserRouter } from 'react-router-dom';
import AboutUs from '../../pages/About Us/AboutUs';
import Contact from '../../pages/Contact/Contact';
import HomePage from '../../pages/Home Page/HomePage';
import HomeLayout from '../../layout/HomeLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'about',
        element: <AboutUs />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
    ],
  },
]);

export default router;