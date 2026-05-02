import { MessageSquare, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import DataTable from '../components/DataTable.jsx';
import PageTransition from '../components/PageTransition.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { useData } from '../data/DataContext';
import { countBy } from '../utils/dataUtils';
import { usePageTitle } from '../hooks/usePageTitle.js';

const prompts = [
  'Which vaccines were tested?',
  'List some malaria vaccines',
  'Which vaccines were tested in South Africa?',
  'Which vaccines were tested in Kenya?',
];

export default function Reports() {
  usePageTitle('Reports');
  const { filteredRows } = useData();
  const [question, setQuestion] = useState('');

  const answer = useMemo(() => {
    const q = question.toLowerCase();
    if (!q) return null;
    const country = ['south africa', 'kenya', 'uganda', 'malawi', 'ghana', 'nigeria'].find((name) =>
      q.includes(name),
    );
    const scoped = country
      ? filteredRows.filter((row) => row.Country?.toLowerCase().includes(country))
      : filteredRows;
    const vaccines = countBy(scoped, 'VaccineNameCategory', { limit: 8 });
    const conditions = countBy(scoped, 'ConditionCategory', { limit: 5 });
    return { scoped, vaccines, conditions, country };
  }, [filteredRows, question]);

  return (
    <PageTransition>
      <SectionHeader
        eyebrow="Reports"
        title="Question-led trial summaries"
        copy="The original RAG prototype required a Python/LangChain backend. This static React version provides deterministic dataset summaries and leaves room for a future API-backed assistant."
      />

      <div className="prompt-grid">
        {prompts.map((prompt) => (
          <button key={prompt} type="button" onClick={() => setQuestion(prompt)}>
            <Sparkles size={16} aria-hidden="true" />
            {prompt}
          </button>
        ))}
      </div>

      <section className="assistant-panel">
        <label className="field">
          <span>Ask about the filtered trials</span>
          <div className="assistant-input">
            <MessageSquare size={18} aria-hidden="true" />
            <input
              value={question}
              placeholder="Example: Which vaccines were tested in Kenya?"
              onChange={(event) => setQuestion(event.target.value)}
            />
          </div>
        </label>

        {answer && (
          <div className="assistant-answer">
            <h3>
              {answer.country
                ? `Summary for ${answer.country.replace(/\b\w/g, (letter) => letter.toUpperCase())}`
                : 'Summary across filtered trials'}
            </h3>
            <p>
              Found {answer.scoped.length.toLocaleString()} matching trial records. Leading vaccine
              categories include {answer.vaccines.map((item) => item.name).join(', ') || 'no reported categories'}.
              Common condition categories include {answer.conditions.map((item) => item.name).join(', ') || 'no reported categories'}.
            </p>
          </div>
        )}
      </section>

      {answer && (
        <DataTable
          rows={answer.scoped}
          columns={['StudyTitle', 'Country', 'PublicationYear', 'VaccineNameCategory', 'ConditionCategory']}
          pageSize={8}
        />
      )}
    </PageTransition>
  );
}
