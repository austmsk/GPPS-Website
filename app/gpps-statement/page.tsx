import Breadcrumbs from '../../components/Breadcrumbs';

export const revalidate = 86400;

export const metadata = {
  title: 'GPPS Administration Statement | GPPS',
  description: `Official administrative statement and guidance for admissions and community updates.`,
  alternates: { canonical: 'http://localhost:3000/gpps-statement' },
};

export default function Page(): JSX.Element {
  return (
    <section>
      <Breadcrumbs items={[
  {
    "href": "/",
    "label": "Home"
  },
  {
    "href": "/news",
    "label": "News & Events"
  },
  {
    "href": "/gpps-statement",
    "label": "Administration Statement"
  }
]} />
      <h1>GPPS Administration Statement</h1>
  <p>
    Find official information and updates from the GPPS administration here. For any questions on admissions,
    documentation, or timelines, please contact our admissions office.
  </p>
    </section>
  );
}
