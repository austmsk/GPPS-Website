import Breadcrumbs from '../../components/Breadcrumbs';

export const revalidate = 86400;

export const metadata = {
  title: 'PEHF | GPPS',
  description: `PEHF information and forms for parents and guardians.`,
  alternates: { canonical: 'http://localhost:3000/pehf' },
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
    "href": "/pehf",
    "label": "PEHF"
  }
]} />
      <h1>PEHF</h1>
  <p>
    Access information related to PEHF. If you need official forms or have questions, please contact our office.
  </p>
    </section>
  );
}
