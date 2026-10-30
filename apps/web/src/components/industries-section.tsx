import { useState } from 'react';
import { Link } from 'react-router';
import { ArrowUpRight } from 'lucide-react';
import { images, industries } from '@/data/site';
const photos = [images.property, images.dental, images.commerce, images.team];
export function IndustriesSection() {
  const [selected, setSelected] = useState(0);
  const item = industries[selected];
  return (
    <section className="section industry-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">03 / YOUR INDUSTRY. UNDERSTOOD.</span>
          <h2>
            Different businesses.<br />
            <span>Different possibilities.</span>
          </h2>
        </div>
      </div>
      <div className="industry-layout">
        <div className="industry-tabs" role="tablist" aria-label="Explore industries">
          {industries.map((s, i) => (
            <button
              key={s.slug}
              role="tab"
              aria-selected={selected === i}
              aria-controls="industry-panel"
              id={`industry-tab-${i}`}
              tabIndex={selected === i ? 0 : -1}
              onKeyDown={(event) => {
                if (['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
                  event.preventDefault();
                  const next =
                    event.key === 'Home'
                      ? 0
                      : event.key === 'End'
                      ? industries.length - 1
                      : (selected + (event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : -1) + industries.length) % industries.length;
                  setSelected(next);
                  document.getElementById(`industry-tab-${next}`)?.focus();
                }
              }}
              onClick={() => setSelected(i)}
              className={selected === i ? 'selected' : ''}
            >
              <span className="industry-number">0{i + 1}</span>
              <span>{s.name}</span>
              <ArrowUpRight size={19} />
            </button>
          ))}
        </div>
        <div
          className="industry-panel"
          role="tabpanel"
          id="industry-panel"
          aria-labelledby={`industry-tab-${selected}`}
        >
          <img
            key={item.slug}
            src={photos[selected]}
            width="640"
            height="480"
            loading="lazy"
            alt={`${item.name} digital growth expertise`}
          />
          <div className="industry-panel-copy">
            <span className="eyebrow">{item.label}</span>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <Link to={`/industries/${item.slug}`} className="text-link">
              Explore {item.name} solutions <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
