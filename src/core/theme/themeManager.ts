import {
  argbFromHex,
  themeFromSourceColor,
  applyTheme as applyMaterialTheme,
  hexFromArgb,
} from '@material/material-color-utilities';

/**
 * Converts a Scheme object to a set of CSS variables.
 * We use a flattened mapping to match Tailwind's utility classes easily.
 */
export const applyTheme = (sourceColorHex: string, isDark: boolean) => {
  // 1. Generate the theme from the source color
  const sourceColor = argbFromHex(sourceColorHex);
  const theme = themeFromSourceColor(sourceColor);

  // 2. Select the correct scheme (light or dark)
  const scheme = isDark ? theme.schemes.dark : theme.schemes.light;

  // 3. Apply CSS variables to the document root
  const root = document.documentElement;

  // We manually map the core palette to CSS variables that Tailwind will use.
  // Format: --md-sys-color-[name]
  const colors = [
    'primary', 'onPrimary', 'primaryContainer', 'onPrimaryContainer',
    'secondary', 'onSecondary', 'secondaryContainer', 'onSecondaryContainer',
    'tertiary', 'onTertiary', 'tertiaryContainer', 'onTertiaryContainer',
    'error', 'onError', 'errorContainer', 'onErrorContainer',
    'background', 'onBackground',
    'surface', 'onSurface', 'surfaceVariant', 'onSurfaceVariant',
    'outline', 'outlineVariant',
    'shadow', 'scrim', 'inverseSurface', 'inverseOnSurface', 'inversePrimary',
  ] as const;

  colors.forEach((key) => {
    // Convert CamelCase to kebab-case for CSS variables
    // e.g., onPrimary -> on-primary
    const cssKey = key.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase();
    const argb = scheme[key];
    const hex = hexFromArgb(argb);
    
    root.style.setProperty(`--md-sys-color-${cssKey}`, hex);
  });

  // Store the current source color for persistence (optional, can be handled by store)
  return hexFromArgb(theme.source);
};
