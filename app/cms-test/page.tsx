import { PageContainer } from "@/components/PageContainer";
import { SectionHeader } from "@/components/SectionHeader";
import { getLatestWordPressPdfMedia, getLatestWordPressPosts, plainTextFromHtml } from "@/lib/wordpress";

export const dynamic = "force-dynamic";

export default async function CmsTestPage() {
  const [postsResult, pdfResult] = await Promise.allSettled([
    getLatestWordPressPosts(5),
    getLatestWordPressPdfMedia(20),
  ]);

  const posts = postsResult.status === "fulfilled" ? postsResult.value : [];
  const pdfs = pdfResult.status === "fulfilled" ? pdfResult.value : [];
  const hasError = postsResult.status === "rejected" || pdfResult.status === "rejected";

  return (
    <PageContainer className="py-16">
      <SectionHeader
        eyebrow="CMS-test"
        title="WordPress till Next"
        description="Denna interna testsida visar innehall som hamtas fran WordPress-admin pa admin.brfpilot.se."
      />

      {hasError ? (
        <div className="mt-8 rounded border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          WordPress API kunde inte lasas for alla innehallstyper just nu. Testa igen om en stund.
        </div>
      ) : null}

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <h2 className="text-xl font-semibold text-brand-900">Senaste WordPress-inlagg</h2>
          <div className="mt-4 grid gap-4">
            {posts.length > 0 ? (
              posts.map((post) => {
                const title = plainTextFromHtml(post.title.rendered) || "Rubrik saknas i WordPress";
                const excerpt =
                  plainTextFromHtml(post.excerpt.rendered) ||
                  plainTextFromHtml(post.content.rendered).slice(0, 220) ||
                  "Inlagget saknar text.";

                return (
                  <article key={post.id} className="rounded border border-slate-200 bg-white p-5 shadow-sm">
                    <p className="text-sm font-medium text-slate-500">
                      {new Intl.DateTimeFormat("sv-SE", { dateStyle: "long" }).format(new Date(post.date))}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-brand-900">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{excerpt}</p>
                    <a
                      href={post.link}
                      className="mt-4 inline-flex text-sm font-semibold text-brand-700 hover:text-brand-900"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Oppna i WordPress
                    </a>
                  </article>
                );
              })
            ) : (
              <div className="rounded border border-slate-200 bg-white p-5 text-sm text-slate-600">
                Inga publicerade WordPress-inlagg hittades.
              </div>
            )}
          </div>
        </div>

        <aside>
          <h2 className="text-xl font-semibold text-brand-900">PDF fran Media Library</h2>
          <div className="mt-4 rounded border border-slate-200 bg-white p-5 shadow-sm">
            {pdfs.length > 0 ? (
              <ul className="space-y-3">
                {pdfs.map((pdf) => {
                  const title = plainTextFromHtml(pdf.title.rendered) || pdf.source_url.split("/").pop() || "PDF";

                  return (
                    <li key={pdf.id}>
                      <a
                        href={pdf.source_url}
                        className="text-sm font-semibold text-brand-700 hover:text-brand-900"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm leading-6 text-slate-600">
                Inga PDF-filer hittades i WordPress Media Library. Ladda upp en PDF och uppdatera sidan.
              </p>
            )}
          </div>
        </aside>
      </section>
    </PageContainer>
  );
}
