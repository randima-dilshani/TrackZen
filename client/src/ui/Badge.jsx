export function Badge({ children, className = "" }) {
  return (
    <span className={`inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full ${className}`}>
      {children}
    </span>
  );
}
