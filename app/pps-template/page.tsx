import Breadcrumbs from '../../components/Breadcrumbs';

export const revalidate = 86400;

export const metadata = {
  title: 'PPS Template | GPPS',
  description: `Reference template resources related to GPPS.`,
  alternates: { canonical: 'http://localhost:3000/pps-template' },
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
    "href": "/pps-template",
    "label": "PPS Template"
  }
]} />
      <h1>PPS Template</h1>
  <p>
    Reference templates and resources used by GPPS will be published on this page. Check back soon for updates.
  </p>
    </section>
  );
}
