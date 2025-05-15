import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <div className="min-h-screen flex flex-col">
    <header className="bg-blue-600 text-white p-4 text-2xl">
      Pokémon Gallery
    </header>
    <div className="flex flex-1">
      {children}
    </div>
  </div>
);

export default Layout;