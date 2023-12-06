import { PropsWithChildren, createContext } from "react";
import { defaultThemeSettings } from "../config";
import getColorPresets, { colorPresets, defaultColorPreset } from "../utils/getColorPresets";
import { useWatchLocalStorage } from "../hooks/useWatchLocalStorage";
import { themeSettingsCache } from "../utils/localCacheApi";

const initialState = {
  ...defaultThemeSettings,
  onChangeMode: (_event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {},
  onToggleMode: () => {},
  setColor: defaultColorPreset,
  colorOption: colorPresets.map((color) => ({
    name: color.name,
    value: color.main,
  })),
};

const ThemeSettingsContext = createContext(initialState);

const ThemeSettingsProvider =({children}: PropsWithChildren) => {
  const settings = useWatchLocalStorage<typeof defaultThemeSettings>('themeSettings');

  const onChangeMode: typeof initialState['onChangeMode'] = (event) => {
    themeSettingsCache.createOrUpdate({
      ...settings,
      themeMode: event.target.value === 'light' ? 'dark' : 'light',
    });
  };

  const onToggleMode = () => {
    themeSettingsCache.createOrUpdate({
      ...settings,
      themeMode: settings?.themeMode === 'light' ? 'dark' : 'light',
    });
  };

  return (
    <ThemeSettingsContext.Provider
      value={{
        ...(settings || defaultThemeSettings),
        // Mode
        onChangeMode,
        onToggleMode,
        setColor: getColorPresets(settings?.themeColorPresets || defaultThemeSettings.themeColorPresets),
        colorOption: colorPresets.map((color) => ({
          name: color.name,
          value: color.main,
        })),
      }}
    >
      {children}
    </ThemeSettingsContext.Provider>
  );
};

export { ThemeSettingsProvider, ThemeSettingsContext };