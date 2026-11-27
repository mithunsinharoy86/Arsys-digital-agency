/**
 * gemini-generator.mjs
 * Google Gemini Content Generation Engine for Klyro Works
 */

import { selectImageForTopic } from './media-licensing.mjs';

const GEMINI_MODELS = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
];

/**
 * Call Gemini API with automatic model fallback
 */
export async function callGemini(prompt, apiKey) {
  let lastError = null;

  for (const model of GEMINI_MODELS) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.65,
            topP: 0.9,
            maxOutputTokens: 8192,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini API HTTP ${response.status} (${model}): ${errorText}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) {
        throw new Error(`Empty response from Gemini API model ${model}`);
      }

      return text;
    } catch (err) {
      console.warn(`[gemini-generator] Model ${model} failed: ${err.message}. Trying next fallback...`);
      lastError = err;
    }
  }

  throw new Error(`All Gemini models failed. Last error: ${lastError?.message}`);
}

/**
 * Generate full 1,200 - 1,800 word SEO article adhering to Klyro Works standards
 */
export async function generateArticleContent(topicSpec, apiKey) {
  const verifiedImage = selectImageForTopic(topicSpec.serviceId, topicSpec.industry);

  const prompt = `
You are a Principal Technical SEO Strategist and Senior Content Architect for Klyro Works (https://klyroworks.com/), a premium digital agency specializing in Web Development, SEO, Digital Marketing, AI Automation, UI/UX Design, and Branding.

Write a complete, highly practical, in-depth, original article based on the following topic specification:

TOPIC SPECIFICATION:
- Title: "${topicSpec.title}"
- Suggested Slug: "${topicSpec.slug}"
- Target Service: "${topicSpec.serviceId}" (Internal link: "${topicSpec.internalLinkTarget}")
- Target Industry: "${topicSpec.industry}"
- Target Market: "${topicSpec.market}"
- Content Format: "${topicSpec.format}"
- Primary Keyword: "${topicSpec.primaryKeyword}"
- Secondary Keywords: ${JSON.stringify(topicSpec.secondaryKeywords)}
- Search Intent: "${topicSpec.searchIntent}"

STRICT CONTENT & SEO RULES:
1. WORD COUNT: The body of the article MUST be between 1,200 and 1,800 words of substantive, high-value content. Do NOT include filler, fluff, or repetitive phrases. Provide actionable frameworks, architectures, real-world examples, and diagnostic checklists.
2. STRUCTURE:
   - Engaging introduction addressing the core problem for ${topicSpec.industry} businesses in ${topicSpec.market}.
   - Logical H2 and H3 headings. Do NOT keyword-stuff headings.
   - At least ONE detailed markdown comparison table or operational checklist.
   - Practical step-by-step diagnostic or implementation framework.
   - A mid-article Call to Action card promoting Klyro Works' ${topicSpec.serviceId} service (${topicSpec.internalLinkTarget}).
   - 3 to 6 FAQs with clear, concise, authoritative answers.
   - An executive conclusion summarizing the primary takeaway and next action steps.
3. INTERNAL LINKS:
   - You MUST link naturally to verified Klyro Works pages:
     - "${topicSpec.internalLinkTarget}" (Anchor text: natural service description, e.g. "Klyro Works web development services", "our SEO audit framework", etc.)
     - "/contact" (for booking consultations or audits)
     - "/case-studies" (for seeing verified results)
     - "/services" (for exploring our core agency capabilities)
   - Do NOT invent non-existent URLs.
4. EXTERNAL CITATIONS:
   - Mention reputable industry standards (e.g., Google Search Central, W3C, WebAIM, NIST) where relevant. Do NOT fabricate statistics or fake URLs.
5. TONE:
   - Professional, authoritative, human-written tone. No AI cliches ("In today's fast-paced digital world", "delve into", "tapestry").

FORMAT REQUIREMENTS:
Respond ONLY with a valid JSON object (no markdown code blocks, no preamble, just raw valid JSON):
{
  "title": "${topicSpec.title}",
  "slug": "${topicSpec.slug}",
  "excerpt": "Compelling 140-160 character meta description summarizing the article with primary keyword.",
  "category": "Engineering / Marketing / AI / Strategy",
  "readTime": "8 min read",
  "primaryKeyword": "${topicSpec.primaryKeyword}",
  "secondaryKeywords": ${JSON.stringify(topicSpec.secondaryKeywords)},
  "searchIntent": "${topicSpec.searchIntent}",
  "targetMarket": "${topicSpec.market}",
  "targetIndustry": "${topicSpec.industry}",
  "content": "Full markdown text of the article (1200+ words). Use ## for H2, ### for H3. Include tables, bullet points, mid-article CTA, FAQs, and conclusion."
}
`;

  const rawJson = await callGemini(prompt, apiKey);

  // Clean JSON output (strip accidental markdown codeblocks like ```json ... ```)
  const cleanJson = rawJson.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

  let parsed;
  try {
    parsed = JSON.parse(cleanJson);
  } catch (err) {
    throw new Error(`Failed to parse Gemini JSON output: ${err.message}\nRaw output sample: ${cleanJson.slice(0, 300)}`);
  }

  // Attach verified media licence
  parsed.image = verifiedImage.imageUrl;
  parsed.imageAlt = `${parsed.title} - ${topicSpec.primaryKeyword}`;
  parsed.imageCredit = verifiedImage.credit;
  parsed.imageSource = verifiedImage.source;
  parsed.imageLicenceUrl = verifiedImage.licenceUrl;
  parsed.imagePhotographer = verifiedImage.photographer;
  parsed.publishedAt = new Date().toISOString().split('T')[0];
  parsed.author = {
    name: 'Klyro Works Editorial Team',
    role: 'Technical SEO & Engineering Group',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  };

  return parsed;
}
