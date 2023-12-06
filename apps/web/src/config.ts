import { Theme } from '@mui/material';
import * as packageJson from '../package.json';
import { ToastOptions } from 'react-toastify';

const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;
export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

const currentURL = window.location.href;
export const isRemote = currentURL.slice(0, 8) === "https://";
export const be_url: string =  isRemote ? import.meta.env.BE_URL : "http://localhost:4000";

export const fe_version = packageJson.version;

// LAYOUT
// ----------------------------------------------------------------------

export const HEADER = {
  MOBILE_HEIGHT: 45,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 65,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 280,
  DASHBOARD_MINI_WIDTH: 88,
  //
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
};

export const collapseDrawer = {
  BASE_WIDTH: 260,
  DRAWER_WIDTH: 300,
  DRAWER_COLLAPSE_WIDTH: 0,
  DRAWER_ITEM_ROOT_HEIGHT: 48,
  DRAWER_ITEM_SUB_HEIGHT: 40,
  DRAWER_ITEM_HORIZONTAL_HEIGHT: 40,
};

export const ICON = {
  NAV_ITEM: 24,
  NAV_ITEM_HORIZONTAL: 22,
  NAV_ITEM_MINI: 22,
};

// SETTINGS
// ----------------------------------------------------------------------

export const defaultThemeSettings = {
  themeMode: 'light' as 'light' | 'dark',
  themeDirection: 'ltr' as Theme['direction'],
  themeColorPresets: 'default',
  themeLayout: 'horizontal',
  themeStretch: false,
} as const;

// App Level Settings
// ----------------------------------------------------------------------

// currentURL.match("^https://[^/?]+\\.([^.]+)\\.domain\\.com");

// Toast settings
export const toastSuccessSettings: ToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export const toastErrorSettings: ToastOptions = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};