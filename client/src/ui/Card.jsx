// src/components/ui/card.jsx
import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`bg-black/40 backdrop-blur-xl border border-gray-700/50 rounded-xl shadow-md ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`px-6 py-4 border-b border-gray-700/30 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return (
    <h3 className={`text-white text-xl font-semibold ${className}`}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}
