import './globals.css';
import { AuthProvider } from '../context/AuthContext';
import { CartProvider } from '../context/CartContext';
import Footer from '../components/Footer';

export const metadata = {
  title: 'Amazon.in: Online Shopping India - Buy Mobiles, Laptops, Fashion, Electronics & More',
  description: 'Amazon Clone Built with Next.js, Node.js, Express, MongoDB and Razorpay Payment Gateway.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col justify-between">
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
