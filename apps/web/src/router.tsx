import { Box } from "@mui/material";
import SvgColor from "mui-components-tezi/SvgColor";
import { FC, forwardRef } from "react";
import { IndexRouteObject, Navigate, NonIndexRouteObject, createBrowserRouter } from "react-router-dom";
import { DashboardLayout } from "./components/DashboardLayout";

const getIcon = (name: string) => <SvgColor iconFileName={name} sx={{ width: 1, height: 1 }} />;

type NavbarFields = {
  caption?: string,
  disabled?: boolean,
  icon?: ReturnType<typeof getIcon>,
  info?: JSX.Element,
  navLabel?: string,
  navPath?: string, // needed when the actual path has urlParams
  subheader?: string,
  title?: string
}

export type RouteObjectWithNavbar = (IndexRouteObject & NavbarFields) | 
(Omit<NonIndexRouteObject, 'children'> & {children: RouteObjectWithNavbar[]} & NavbarFields);

const ReferenceWrap = forwardRef(({ Component }: {Component: FC}, ref) => (
  <Box height={1} ref={ref} width={1} display= 'flex' justifyContent='center' >
    <Component />
  </Box>
));
const authRouteObj: RouteObjectWithNavbar = 
{
  caseSensitive: false,
  children:[
    {
      element: <Navigate to='/auth/login' replace/>,
      index: true
    },
    {
      caseSensitive: false,
      index: true,
      lazy: async () => {
        const { Signup } = await import('./pages/auth/signup');
        return { element: <ReferenceWrap Component={Signup} />}
      },
      path: '/auth/signup',
      title: 'User Signup'
    },
    {
      caseSensitive: false,
      index: true,
      lazy: async () => {
        const { Login } = await import('./pages/auth/LoginPage');
        return { element: <ReferenceWrap Component={Login} />}
      },
      path: '/auth/login',
      title: 'User Login'
    }
  ],
  path: '/auth',
};

const publicRoutesObjectWithNavbarSettings: RouteObjectWithNavbar[] = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        element: <Navigate to='/auth/login' replace />,
        index: true
      },
      {
        index: true,
        path: '*',
        element: <Navigate to='/auth/login' replace />,
      },
      authRouteObj
    ]
  }
];

export const routeObjectWithNavbarSettings: RouteObjectWithNavbar[] = [
  {
    path: '/',
    element: <DashboardLayout />,
    children: [
      {
        element: <Navigate to="home" replace />,
        index: true
      },
      authRouteObj,
      {
        caseSensitive: false,
        icon: getIcon("material-symbols-home-outline-rounded"),
        index: true,
        lazy: async () => {
            const { HomePage } = await import('./pages/homepage/HomePage');
            return { element: <ReferenceWrap Component={HomePage} /> };
        },
        path: '/home',
        title: 'Home',
      },
      // {
      //   caseSensitive: false,
      //   children:[
      //     {
      //       element: <Navigate to='/devCompany/list' replace/>,
      //       index: true
      //     },
      //     {
      //       caseSensitive: false,
      //       icon: getIcon('file-add-thin'),
      //       index: true,
      //       lazy: async () => {
      //         const { AddEditDevCompany } = await import('./pages/devCompanies/AddEditDevCompany');
      //         return { element: <ReferenceWrap Component={AddEditDevCompany} />}
      //       },
      //       navPath: '/devCompany/add-new',
      //       navLabel: 'Add New',
      //       path: '/devCompany/:actionType',
      //       title: 'Add Dev Company'
      //     },
      //     {
      //       caseSensitive: false,
      //       icon: getIcon('page-list-filter'),
      //       index: true,
      //       lazy: async () => {
      //         const { DevCompaniesList } = await import('./pages/devCompanies/DevCompaniesList');
      //         return { element: <ReferenceWrap Component={DevCompaniesList} />}
      //       },
      //       navLabel: 'List',
      //       path: '/devCompany/list',
      //       title: 'Dev Companies List'
      //     }
      //   ],
      //   icon: getIcon('developer'),
      //   path: '/devCompany',
      //   title: 'Dev Company'
      // },
    ]
  }
];

export const publicRouter = createBrowserRouter(publicRoutesObjectWithNavbarSettings);
export const allRouter = createBrowserRouter(routeObjectWithNavbarSettings);