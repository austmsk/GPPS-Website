import React from 'react';
import Image from 'next/image';
import Breadcrumbs from '../../components/Breadcrumbs';

export const revalidate = 604800; // weekly (content changes infrequently)

export const metadata = {
  title: 'Mission & Vision | GPPS',
  description:
    'Our mission and vision form the cornerstone of the GPPS educational philosophy—holistic excellence, innovation, and character.',
  alternates: { canonical: '/mission-and-vision' },
};

export default function Page(): JSX.Element {
  return (
    <main>
      <Breadcrumbs
        items={[
          { href: '/', label: 'Home' },
          { href: '/mission-and-vision', label: 'Mission & Vision' },
        ]}
      />

      {/* HERO */}
      <section className="mv-hero" style={{ padding: '12px 0 10px 0' }}>
        <div className="container">
          <div style={{ borderRadius: 8, overflow: 'hidden' }}>
            <Image
              src="/images/MissionVision-hero.jpeg"
              alt="Learners in class at GPPS"
              sizes="(max-width: 768px) 100vw, 1100px"
              width={2200}
              height={1466}
              style={{ width: '100%', height: 'auto', display: 'block' }}
              priority={false}
            />
          </div>
        </div>
      </section>

      {/* INTRO + TITLE */}
      <section className="mv-body" style={{ padding: '8px 0 28px 0' }}>
        <div className="container" style={{ display: 'grid', gap: 20 }}>
          <header>
            <h1
              style={{
                margin: '0 0 12px 0',
                fontFamily: 'var(--header-font)',
                fontWeight: 800,
                fontSize: '1.8rem',
                
              }}
            >
              Mission & Vision
            </h1>
            <div style={{ lineHeight: 1.7, fontSize: '1rem' }}>
              <p>
                At Premier Preparatory School, our mission and vision form the cornerstone of our
                educational philosophy and community life. We believe that education transcends
                academics, focusing on nurturing well-rounded, empathetic individuals poised to make
                a positive impact globally.
              </p>
              <p>
                Our mission statement and goals reflect an unwavering commitment to excellence,
                innovation, and holistic student development. We foster a supportive, inspiring
                environment where learners thrive academically, emotionally, and socially.
              </p>
              <p>
                As you explore this page, discover the core values driving us, ambitious objectives
                for learners and staff, and our forward-looking vision for education's future.
                These principles underpin the Premier Preparatory experience, embodying our promise
                to learners, families, and the broader community.
              </p>
              <p>
                Join us in shaping the next generation of thinkers, leaders, and global citizens.
                Together, we're building a legacy of excellence that will inspire a brighter
                future, one learner at a time.
              </p>
            </div>
          </header>

          {/* VISION */}
          <section style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Image
                src="/images/vision.png"
                alt="Vision icon"
                width={36}
                height={36}
                style={{ width: 36, height: 36 }}
              />
              <h2
                style={{
                  margin: 0,
                  fontFamily: 'var(--header-font)',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                }}
              >
                Our Vision
              </h2>
            </div>
            <div style={{ lineHeight: 1.7, fontSize: '1rem' }}>
              <p>
                At Premier Preparatory Schools, we envision a future where our institution is
                renowned as the leading primary education provider in the region. We strive to
                nurture young minds, fostering academic excellence, emotional intelligence, and
                social growth through a holistic approach to education.
              </p>
              <p>
                Our aspiration is to shape confident, compassionate, and values-driven individuals
                who are equipped to navigate life's challenges and contribute positively to a
                harmonious, inclusive, and socioeconomically balanced global community.
              </p>
              <p>
                By inspiring a love for learning and instilling strong moral values, we aim to
                provide each learner with a solid foundation for future success, empowering them to
                reach their full potential and become impactful, responsible, and engaged global
                citizens.
              </p>
            </div>
          </section>

          {/* MISSION */}
          <section style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Image
                src="/images/mission.png"
                alt="Mission icon"
                width={36}
                height={36}
                style={{ width: 36, height: 36 }}
              />
              <h2
                style={{
                  margin: 0,
                  fontFamily: 'var(--header-font)',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                }}
              >
                Our Mission
              </h2>
            </div>
            <div style={{ lineHeight: 1.7, fontSize: '1rem' }}>
              <p>
                Premier Primary School (PPS) is deeply committed to delivering a comprehensive and
                high-quality educational experience that lays a strong foundation of knowledge,
                skills, and core values for every learner. Our mission is to create a nurturing and
                inclusive environment where learners are inspired to achieve academic excellence
                while developing the critical thinking, creativity, and practical skills needed for
                lifelong success. We prioritize fostering a culture of mutual respect, self-discipline,
                and a profound sense of social responsibility, ensuring each learner grows into a
                well-rounded individual prepared to contribute positively to their community and
                beyond. Our holistic approach to education aims to empower young minds to thrive
                personally and socially in an ever-changing world.
              </p>
            </div>
          </section>

          {/* CORE OBJECTIVES */}
          <section style={{ display: 'grid', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <Image
                src="/images/list.png"
                alt="Objectives icon"
                width={36}
                height={36}
                style={{ width: 36, height: 36 }}
              />
              <h2
                style={{
                  margin: 0,
                  fontFamily: 'var(--header-font)',
                  fontWeight: 700,
                  fontSize: '1.3rem',
                }}
              >
                Our Core Objectives
              </h2>
            </div>

            <div style={{ lineHeight: 1.7, fontSize: '1rem' }}>
              <h3 style={h3Style}>1. To provide a holistic, high-quality education to the learners</h3>
              <p>
                Premier Preparatory School is dedicated to offering a comprehensive education that goes
                beyond academics to include the physical, emotional, and social dimensions of learning.
                By integrating innovative teaching methods, a diverse curriculum, and extracurricular
                opportunities, we ensure our learners are well-prepared to excel in all areas of life.
                This holistic approach empowers learners to think critically, solve problems creatively,
                and develop the resilience to navigate a dynamic and ever-changing world.
              </p>

              <h3 style={h3Style}>2. To inculcate discipline and morals in our learners and future global leaders</h3>
              <p>
                We aim to shape our learner into morally upright, disciplined, and responsible individuals
                who embody integrity and respect. By fostering a strong ethical foundation and instilling
                values such as honesty, compassion, and accountability, we prepare our learners to lead
                purposefully and positively influence their communities in Uganda and globally.
              </p>

              <h3 style={h3Style}>3. To develop social and communication skills for future success</h3>
              <p>
                Recognizing the importance of effective communication and collaboration in today's
                interconnected world, we emphasize developing social and interpersonal skills in our
                learners. Through group activities, public speaking opportunities, and a focus on emotional
                intelligence, we equip our learners with the ability to express themselves confidently,
                work harmoniously with others, and adapt to diverse environments—essential for national and
                global economic success.
              </p>

              <h3 style={h3Style}>4. To promote environmental stewardship and a corruption-free society</h3>
              <p>
                We believe education is a powerful tool for fostering a sense of responsibility toward
                society and the environment. By integrating environmental education and sustainability
                practices into our curriculum, we inspire learners to become advocates for a cleaner, greener
                future. Additionally, we actively encourage ethical behavior and transparency, nurturing a
                generation that values integrity and is committed to building a corruption-free society that
                prioritizes the well-being of all its citizens.
              </p>
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}

const h3Style: React.CSSProperties = {
  margin: '12px 0 6px 0',
  fontFamily: 'var(--header-font)',
  fontWeight: 700,
  fontSize: '1.05rem',
};
