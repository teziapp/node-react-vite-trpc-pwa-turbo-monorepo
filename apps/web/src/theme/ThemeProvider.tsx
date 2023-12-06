import { PropsWithChildren, useContext, useMemo } from "react";
import { ThemeSettingsContext } from "../contexts/SettingsContext";
import palette from "./palette";
import { createTheme, CssBaseline, ThemeProvider as MUIThemeProvider, StyledEngineProvider, ThemeOptions } from "@mui/material";
import shadows, { customShadows } from "./shadows";
import ComponentsOverrides from "./overrides";
import typography from './typography';
import breakpoints from './breakpoints';

export const ThemeProvider = ({children}: PropsWithChildren) => {
  const { themeMode, themeDirection } = useContext(ThemeSettingsContext);
  const isLight = themeMode === 'light';

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      palette: isLight ? palette.light : palette.dark,
      typography,
      breakpoints,
      shape: { borderRadius: 8 },
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight]
  );

  const theme = createTheme(themeOptions);
  theme.components = ComponentsOverrides(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}