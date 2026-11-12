// Fixed-size box with hidden overflow: the icon name never spills out while the icon font is loading.
export default function Icon({ name, size = 20, fill = false, className = "" }) {
  return (
    <span className={`material-symbols-outlined inline-block overflow-hidden align-middle leading-none ${className}`}
      style={{ fontSize: size, width: size, height: size, ...(fill ? { fontVariationSettings: "'FILL' 1" } : {}) }} aria-hidden="true">
      {name}
    </span>
  );
}
