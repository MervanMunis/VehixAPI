// /app/documentation/layout.tsx
"use client";

import Sidebar from '@/components/Sidebar';
import React from 'react';

const DocumentationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col lg:flex-row">
      <Sidebar />
      <main className="flex-1 p-8">
        {children}
      </main>
    </div>
  );
};

export default DocumentationLayout;
