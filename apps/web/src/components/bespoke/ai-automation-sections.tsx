import { Bot, Cpu, Check, ShieldCheck, ArrowRight, UserCheck, Bell, Database, ArrowUpRight } from 'lucide-react';
import { useConsultationModal } from '@/components/consultation-modal';

export function AiWorkflowCanvasSection() {
  const { openModal } = useConsultationModal();
  const nodes = [
    {
      id: 'n1',
      title: 'Inbound Customer Enquiry',
      type: 'Trigger Node',
      desc: 'Form submission, inbound email, or API webhook captured instantly in sub-100ms.',
      icon: Bell,
      badge: 'Real-Time Event',
    },
    {
      id: 'n2',
      title: 'AI Intelligence Parser',
      type: 'Semantic Reasoning',
      desc: 'Analyzes intent, extracts budget, validates lead criteria, and flags urgency.',
      icon: Cpu,
      badge: 'Zero Hallucinations',
    },
    {
      id: 'n3',
      title: 'CRM Deal Creation & Scoring',
      type: 'Data Action',
      desc: 'Synchronizes enriched record into HubSpot / Salesforce with territory routing.',
      icon: Database,
      badge: 'Bi-Directional Sync',
    },
    {
      id: 'n4',
      title: 'Human Review & Approval Gate',
      type: 'Governance',
      desc: 'Senior partner receives 1-click notification on Slack to review or approve next action.',
      icon: UserCheck,
      badge: 'Human-in-Control',
    },
  ];

  return (
    <section className="section bespoke-section ai-workflow-section" id="interactive-workflow">
      <div className="bespoke-header">
        <span className="eyebrow violet-eyebrow">
          <Bot size={13} className="inline-icon" /> AUTOMATION CANVAS &middot; INTERACTIVE NODE PIPELINE
        </span>
        <h2>
          Automated Repetitive Tasks.<br />
          <span>Humans in Control of Every Strategic Decision.</span>
        </h2>
        <p>
          We engineer deterministic, privacy-first business workflows. By pairing AI reasoning with human oversight, your team scales capacity without sacrificing accountability or customer trust.
        </p>
      </div>

      <div className="workflow-canvas-grid">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          return (
            <div key={node.id} className="workflow-node-card">
              <div className="node-connector-line" />
              <div className="node-header">
                <span className="node-icon-wrap">
                  <Icon size={18} />
                </span>
                <span className="node-step-tag">Stage 0{i + 1}</span>
              </div>
              <span className="node-type-label">{node.type}</span>
              <h3 className="node-title">{node.title}</h3>
              <p className="node-desc">{node.desc}</p>
              <div className="node-footer">
                <span className="node-badge">{node.badge}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="bespoke-cta-banner violet-glow">
        <div className="cta-banner-text">
          <h3>Eliminate manual administrative bottlenecks across your business</h3>
          <p>Let's map your inquiry-to-close pipeline and automate repetitive tasks with humans in control.</p>
        </div>
        <button
          type="button"
          className="bespoke-colourful-cta-btn violet-btn"
          onClick={() => openModal('AI Automation & Workflows')}
        >
          <span>Design Your Automation Pipeline</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

export function AiSecurityShieldSection() {
  const { openModal } = useConsultationModal();
  const protections = [
    {
      title: 'Zero Model Training on Your Data',
      desc: 'All customer and enterprise workflows execute via private enterprise API endpoints with contractual guarantees that data is never retained for LLM model training.',
    },
    {
      title: 'Deterministic Guardrails & Output Validation',
      desc: 'Every AI step uses structured JSON schema validation and deterministic fallbacks. The system never makes rogue commitments or fabricates data.',
    },
    {
      title: 'GDPR, CCPA & Privacy-by-Design',
      desc: 'Full compliance with UK & EU GDPR and US state privacy regulations. Data minimization principles ensure only required fields are passed through pipelines.',
    },
    {
      title: 'Full Audit Logging & Rollback Tracing',
      desc: 'Every automated execution logs complete input, output, timestamp, and latency metrics in your private telemetry store for forensic review and governance.',
    },
  ];

  return (
    <section className="section bespoke-section ai-shield-section">
      <div className="bespoke-header">
        <span className="eyebrow">03 / TRUST &amp; SAFETY</span>
        <h2>
          The Enterprise AI Security Charter.<br />
          <span>Practical Efficiency Without Data Exposure.</span>
        </h2>
        <p>
          We build with enterprise security at the foundation. Protect your intellectual property, client confidentiality, and regulatory compliance.
        </p>
      </div>

      <div className="shield-grid">
        {protections.map((p, idx) => (
          <div key={idx} className="shield-card">
            <div className="shield-top">
              <ShieldCheck size={20} className="shield-icon" />
              <h3>{p.title}</h3>
            </div>
            <p>{p.desc}</p>
          </div>
        ))}
      </div>

      <div className="bespoke-cta-banner green-glow">
        <div className="cta-banner-text">
          <h3>Need enterprise AI solutions backed by strict GDPR &amp; security SLAs?</h3>
          <p>We build with air-gapped models, zero data retention for training, and complete audit logging.</p>
        </div>
        <button
          type="button"
          className="bespoke-colourful-cta-btn"
          onClick={() => openModal('AI Security & Governance')}
        >
          <span>Schedule Security &amp; AI Consultation</span>
          <ArrowUpRight size={17} />
        </button>
      </div>
    </section>
  );
}

