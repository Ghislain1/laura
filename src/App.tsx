import './i18n';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { AnnouncementBar } from './components/sections/AnnouncementBar';
import { Menu } from './components/sections/Menu';
import { About } from './components/sections/About';
import { Delivery } from './components/sections/Delivery';
import { Hours } from './components/sections/Hours';
import { Testimonials } from './components/sections/Testimonials';
import { FAQ } from './components/sections/FAQ';
import { Contact } from './components/sections/Contact';
import { CartDrawer } from './components/cart/CartDrawer';
import { CartProvider } from './hooks/useCart';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-[hsl(0_0%_4%)] text-[hsl(0_0%_97%)]">
        <Navbar />
        <main>
          <Hero />
          <AnnouncementBar />
          <Menu />
          <About />
          <Delivery />
          <Hours />
          <Testimonials />
          <FAQ />
          <Contact />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}

export default App;
