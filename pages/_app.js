import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Head>
        <title>Flux Coin - The Future of Digital Currency</title>
        <meta name="description" content="Flux is positioned to become the next Bitcoin. Join the pre-sale now at $1 per coin." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#6C2BD9" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 5000,
          style: {
            background: '#111128',
            color: '#fff',
            border: '1px solid rgba(108, 43, 217, 0.3)',
            borderRadius: '12px',
            padding: '16px',
          },
          success: { iconTheme: { primary: '#00D4FF', secondary: '#111128' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#111128' } },
        }}
      />
      
      <Component {...pageProps} />
    </AuthProvider>
  );
}