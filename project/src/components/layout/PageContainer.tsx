import { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface PageContainerProps {
  children: ReactNode;
  withFooter?: boolean;
}

const PageContainer = ({ children, withFooter = true }: PageContainerProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-16">{children}</main>
      {withFooter && <Footer />}
    </div>
  );
};

export default PageContainer;