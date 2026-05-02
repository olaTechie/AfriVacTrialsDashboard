import PageTransition from '../components/PageTransition.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { usePageTitle } from '../hooks/usePageTitle.js';

export default function About() {
  usePageTitle('About');

  return (
    <PageTransition>
      <SectionHeader
        eyebrow="About"
        title="Guiding global health policy for vaccine-preventable diseases in Africa"
        copy="A mixed scoping review and bibliometric analysis before, during, and post COVID-19 pandemic."
      />
      <article className="about-card">
        <h3>Authors</h3>
        <p>
          Olalekan A. Uthman; Patrick D.M. Katoto; Seun Anjorin; Thinus Marais;
          Amine Amiche; Jean B. Nachega.
        </p>
        <h3>Affiliations</h3>
        <p>
          Warwick Centre for Global Health Research, Stellenbosch University, University of
          Oxford, Sanofi Vaccines, University of Pittsburgh, and Johns Hopkins Bloomberg School of
          Public Health.
        </p>
      </article>
      <article className="about-card">
        <h3>Migration notes</h3>
        <p>
          Streamlit metrics, Plotly visualizations, Altair donuts, word clouds, dataframe views,
          AgGrid references, and sidebar filters were converted into reusable React components. The
          Pygwalker and RAG prototypes are represented as static-friendly exploratory interfaces
          because GitHub Pages cannot execute Python server workloads.
        </p>
      </article>
    </PageTransition>
  );
}
