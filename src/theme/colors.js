function colors(color, hover, contrast, light) {
  const result = [color];
  result.hover = hover;
  result.contrast = contrast;
  result.light = light;
  return result;
}

const primary = colors("#467fcf", "#316cbe", "#fff");
const secondary = colors("#495057", "#f6f6f6", "#495057");
const success = colors("#5eba00", "#4b9400", "#fff");
const info = colors("#45aaf2", "#219af0", "#fff");
const warning = colors("#f1c40f", "#cea70c", "#fff");
const danger = colors("#cd201f", "#ac1b1a", "#fff");

const background = "#f5f7fb";
const foreground = "#495057";
const muted = "#9aa0ac";

export default {
  primary,
  secondary,
  success,
  info,
  warning,
  danger,
  variants: { primary, secondary, success, info, warning, danger },

  background,
  foreground,
  muted,
  functional: { background, foreground, muted }
};
