
'use client';
import './globals.css';
import Nav from '../components/Nav';
import { StoreProvider } from '../store/useStore';
import { AssistantProvider } from '../components/ui/AssistantProvider';
import AssistantFab from '../components/ui/AssistantFab';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'Inter, system-ui, Arial' }}>
        <StoreProvider>
          <AssistantProvider>
            <Nav />
            <main style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
              {children}
            </main>
            <AssistantFab />
          </AssistantProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
