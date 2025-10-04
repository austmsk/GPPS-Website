import Breadcrumbs from '../../components/Breadcrumbs';

export const revalidate = 86400;

export const metadata = {
  title: 'Redirecting | GPPS',
  description: `This page provides information about recent changes or redirects.`,
  alternates: { canonical: 'http://localhost:3000/redirecting' },
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
    "href": "/redirecting",
    "label": "Redirecting"
  }
]} />
      <h1>Redirecting</h1>
  <p>
    The content you are looking for may have moved. Use the navigation or breadcrumbs above to find the next page,
    or return to the home page.
  </p>
    </section>
  );
}
