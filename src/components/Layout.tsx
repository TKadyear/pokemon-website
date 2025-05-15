import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <main className="flex flex-col md:flex-row main_container min-h-dvh">
    {children}
  </main>
);

export default Layout;