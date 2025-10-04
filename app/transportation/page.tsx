export const revalidate = 86400;

export const metadata = {
  title: 'Transportation | GPPS',
  description:
    'Information about GPPS transportation options and how families can plan daily commutes to and from school.',
};

export default function Page(): JSX.Element {
  return (
    <section>
      <h1>Transportation</h1>
      <p>
        GPPS provides convenient transportation options to support families and ensure learners can
        arrive safely and on time. Routes are planned to cover key neighborhoods and communities.
      </p>
      <p>
        Please contact our admissions office if you have route suggestions or need assistance
        arranging pick-up and drop-off. We regularly review route efficiency and student safety.
      </p>
    </section>
  );
}
