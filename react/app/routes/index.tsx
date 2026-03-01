import { createFileRoute } from '@tanstack/react-router';
import { Layout } from '../components/Layout';
import { SwapWidget } from '../components/swap-widget';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <Layout>
      <SwapWidget />
    </Layout>
  );
}
