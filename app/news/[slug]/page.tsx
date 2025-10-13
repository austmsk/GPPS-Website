export const revalidate = 3600; // 1 hour

import { getAllArticleSlugs, getArticleBySlug } from '../../../lib/fetchers';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { serialize } from 'next-mdx-remote/serialize';
import Image from 'next/image';

type Params = {
  params: { slug: string };
};

export async function generateStaticParams() {
  const slugs = await getAllArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) return {};
  const { meta } = article as any;
  return {
    title: meta.title,
    description: meta.description,
    openGraph: {
      title: meta.title,
      description: meta.description,
      images: meta.image ? [meta.image] : [],
      url: `https://yourdomain.com/news/${meta.slug}`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: meta.image ? [meta.image] : [],
    },
  };
}

export default async function ArticlePage({ params }: Params) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return notFound();

  const { meta, contentHtml, mdxContent } = article as any;

  // If MDX content exists, compile it to a serializable source for MDXRemote (RSC)
  let mdxSource: any = null;
  if (mdxContent) {
    mdxSource = await serialize(mdxContent, {
      mdxOptions: {
        remarkPlugins: [],
        rehypePlugins: [],
      },
    });
  }

  // MDX component overrides: render <img> with Next/Image
  const mdxComponents = {
    Image,
    img: (props: any) => {
      const { src = '', alt = '', width, height, style, ...rest } = props;
      const w = typeof width === 'number' ? width : 1600;
      const h = typeof height === 'number' ? height : 900;
      return (
        <Image
          src={src}
          alt={alt}
          width={w}
          height={h}
          sizes="(max-width: 768px) 100vw, 800px"
          style={{ width: '100%', height: 'auto', ...style }}
          {...rest}
        />
      );
    },
  } as const;

  return (
    <article>
      <header style={{ marginBottom: 20 }}>
        <h1>{meta.title}</h1>
        <p style={{ color: '#666', marginTop: 6 }}>
          {meta.author ? `${meta.author} • ` : ''}
          {meta.date ? new Date(meta.date).toLocaleDateString() : ''}
        </p>
      </header>

      {meta.image && (
        <figure style={{ margin: '16px 0' }}>
          <Image
            src={meta.image}
            alt={meta.title}
            width={1600}
            height={900}
            sizes="(max-width: 768px) 100vw, 1024px"
            style={{ width: '100%', height: 'auto', borderRadius: 8 }}
            priority
          />
        </figure>
      )}

      <section>
        {contentHtml ? (
          <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
        ) : mdxSource ? (
          <MDXRemote {...mdxSource} components={mdxComponents} />
        ) : (
          <p>{meta.description}</p>
        )}
      </section>
    </article>
  );
}
