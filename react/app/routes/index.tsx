import { createFileRoute } from '@tanstack/react-router';
import { Layout } from '../components/Layout';
import { ReceiveWidget } from '../components/receive-widget';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  return (
    <Layout>
      <ReceiveWidget />
    </Layout>
  );
}
