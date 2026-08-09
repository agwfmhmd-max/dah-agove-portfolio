import { Building2 } from "lucide-react";
import { Reveal, SectionHeading } from "./section";
import { useI18n } from "@/lib/i18n";
import { useExperience } from "@/lib/portfolio";

function formatDate(value: string | null) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short" });
}

export function Experience() {
  const { t } = useI18n();
  const { data: experience } = useExperience();

  return (
    <section id="experience" className="section-pad bg-surface">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <SectionHeading kicker={t("experience.kicker")} title={t("experience.title")} />

        <ol className="relative ms-4 space-y-8 border-s border-border ps-8">
          {experience.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 90} className="relative">
              <span
                className="absolute -start-[2.6rem] top-1.5 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card text-primary shadow-soft"
                aria-hidden="true"
              >
                <Building2 className="h-4 w-4" />
              </span>
              <div className="rounded-2xl border border-border bg-card p-6 shadow-soft transition-all hover:-translate-y-1 hover:shadow-lift">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  {formatDate(item.start_date)}
                  {item.start_date ? " — " : ""}
                  {item.current ? t("education.current") : formatDate(item.end_date)}
                </p>
                <h3 className="mt-2 text-lg font-semibold">{item.organization}</h3>
                <p className="mt-1 text-sm font-medium text-primary">{item.position}</p>
                {item.department ? (
                  <p className="mt-3 rounded-lg bg-secondary px-3 py-2 text-sm text-secondary-foreground">
                    <span className="font-semibold">{t("experience.department")}: </span>
                    {item.department}
                  </p>
                ) : null}
                {item.description ? (
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                ) : null}
                {item.location ? (
                  <p className="mt-3 text-xs text-muted-foreground">{item.location}</p>
                ) : null}
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
