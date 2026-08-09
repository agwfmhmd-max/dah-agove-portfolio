import { GraduationCap } from "lucide-react";
import { Reveal, SectionHeading } from "./section";
import { useI18n } from "@/lib/i18n";
import { useEducation } from "@/lib/portfolio";

export function Education() {
  const { t } = useI18n();
  const { data: education } = useEducation();

  return (
    <section id="education" className="section-pad">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker={t("education.kicker")} title={t("education.title")} />

        <ul className="space-y-4">
          {education.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 80}>
              <article className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                <span className="absolute inset-y-0 start-0 w-1 bg-primary/70" aria-hidden="true" />
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <GraduationCap className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold leading-snug">{item.institution}</h3>
                      <p className="mt-1 text-sm font-medium text-primary">
                        {item.degree}
                        {item.field ? ` — ${item.field}` : ""}
                      </p>
                      {item.description ? (
                        <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                      ) : null}
                      {item.location ? (
                        <p className="mt-2 text-xs text-muted-foreground">{item.location}</p>
                      ) : null}
                    </div>
                  </div>
                  <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
                    {item.start_year ?? ""}
                    {item.start_year ? " — " : ""}
                    {item.current ? t("education.current") : (item.end_year ?? "")}
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
