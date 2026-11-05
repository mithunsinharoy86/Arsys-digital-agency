import { Link } from 'react-router';
import { ArrowUpRight, Code2, Search, Megaphone, Cpu, PenTool, Palette, ShoppingBag, MessageCircle, FileText, type LucideIcon } from 'lucide-react';
import { services } from '@/data/site';
const icons: LucideIcon[] = [Code2, Search, Megaphone, Cpu, PenTool, Palette, ShoppingBag, MessageCircle, FileText];
export function ServicesGrid({ full = false }: { full?: boolean }) {
  return (
    <section className="section services-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">CONNECTED EXPERTISE</span>
          <h2>
            Big-picture thinking.<br />
            <span>Hands-on expertise.</span>
          </h2>
        </div>
        <div>
          {!full && (
            <Link to="/services" className="text-link">
              Explore all services <ArrowUpRight size={17} />
            </Link>
          )}
        </div>
      </div>
      <div className="services-grid">
        {services.slice(0, full ? 9 : 6).map((s, i) => {
          const Icon = icons[i];
          return (
            <Link className={`service-card ${s.color}`} to={`/services/${s.slug}`} key={s.slug}>
              <div className="service-card-top">
                <span className="service-icon"><Icon size={23} strokeWidth={1.6} /></span>
                <ArrowUpRight size={20} />
              </div>
              <h3>{s.name}</h3>
              <p>{s.summary}</p>
              <span className="service-bottom">{i === 3 ? 'WORK SMARTER' : 'EXPLORE SERVICE'} <span>0{i + 1}</span></span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
