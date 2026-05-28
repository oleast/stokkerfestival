import SectionWrapper from '@/components/ui/SectionWrapper';

export default function About() {
  return (
    <SectionWrapper id="om-festen">
      <h2 className="text-3xl font-bold text-text md:text-4xl">Om festen</h2>
      <div className="mt-8 max-w-3xl space-y-6 text-lg leading-relaxed text-text-muted">
        <p>
          Etter 30 år med tvilsom dømmekraft og tidvis brukbar humor, er det på tide å
          samle gjengen for en skikkelig sommerfest. Velkommen til gården jeg vokste opp
          på — nå uten foreldretilsyn.
        </p>
        <p>
          Konseptet er enkelt: god mat, kalde drikker, varmt vann i bassenget, og null
          agenda utover å ha det bra. Ta med badeklær, godt humør, og den grillmaten du
          selv vil spise.
        </p>
        <p>
          Sørumsvegen 50 ligger i Gjerdrum, midt i det grønne. Gården
          har alt fra tennisbane til ender — og nå altså en 30-åring som insisterer på å
          feire seg selv med en egen nettside.
        </p>
      </div>
    </SectionWrapper>
  );
}
