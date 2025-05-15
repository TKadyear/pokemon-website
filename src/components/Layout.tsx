import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <main className="flex flex-col md:flex-row">
    {children}
  </main>
);

export default Layout;