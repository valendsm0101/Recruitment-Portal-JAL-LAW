import React, { useState, useMemo, useRef, useEffect } from "react";
import {
  Mail,
  Phone,
  Laptop,
  MapPin,
  Clock,
  Briefcase,
  ChevronRight,
  CheckCircle2,
  Circle,
  Copy,
  Check,
  ClipboardList,
  FileText,
  ArrowLeft,
  ShieldCheck,
  Lock,
  Sparkles,
  AlertCircle,
  Paperclip,
  X,
  UploadCloud,
  RefreshCw,
  Loader2,
  WifiOff,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* BRAND ASSETS                                                        */
/* ------------------------------------------------------------------ */

const LOGO_SRC = "data:image/png;base64,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sMvzlA53RERERERENvCA2TdAtK5RJYmrwz05v67D/10d7oaIiIiIiIhIgFwbU2lpQEVERERERHmBW5fJ+lyeImzz/LesPnZUSep7M0RERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERERGQF/z+zWHA8b10crQAAAABJRU5ErkJggg==";

/* ------------------------------------------------------------------ */
/* DATA                                                                */
/* ------------------------------------------------------------------ */

const LEGAL_DRAFTING_CASE_STUDY = {
  clientName: "Diego Martinez Perez",
  story: [
    "Diego Martinez Perez, born in Venezuela on August 30, 1974, endured a tumultuous journey shaped by his career in the oil sector and his wife's courageous journalism amidst political turmoil. Graduating as a mechanical engineer from the University of Zulia in 2000, Diego embarked on a career path intertwined with the volatile landscape of Venezuelan politics.",
    "In 2003, Diego married Sofia Rodriguez Lopez, a dedicated journalist known for her fearless reporting on government corruption and human rights abuses. Their daughter, Isabella Martinez Rodriguez, was born in 2010, marking a moment of personal joy amidst the country's escalating political tensions. Diego's family had a deep-seated connection to the dissident COPEI party, reflecting a tradition of political activism.",
    "Diego's professional journey at PDVSA, Venezuela's state-owned oil company, began in 2003. Despite his technical expertise, Diego faced mounting pressure as the regime tightened its grip on dissenting voices. The political climate grew increasingly hostile, with Diego and Sofia finding themselves targeted for their refusal to align with the government's oppressive tactics.",
    "Sofia's courageous journalism, which exposed rampant corruption and human rights violations within the regime, made her a target for persecution. In January 2018, she was issued a detainment order by the notorious SEBIN, Venezuela's intelligence agency, on fabricated charges of spreading false information. Diego and Sofia's phones were illegally intercepted, their every conversation monitored by government agents.",
    "Tragically, Sofia's relentless pursuit of truth led to her forced disappearance in July 2018, leaving Diego and Isabella devastated and vulnerable to further harassment. Despite facing threats and intimidation, Diego remained steadfast in his commitment to seeking justice for his wife and providing a secure future for their daughter.",
    "Faced with escalating danger, Diego made the agonizing decision to flee Venezuela with Isabella in November 2023. Their journey to the United States was fraught with peril, but Diego remained resolute in his determination to seek asylum and build a new life free from persecution. In the land of opportunity, Diego hopes to honor Sofia's legacy by continuing to fight for justice and freedom, away from the oppressive shadow of the Venezuelan regime.",
  ],
  formattingNote:
    "Your final asylum statement should be formatted with 2.0 line spacing, a hanging indent, and Times New Roman, size 12 — and sent in Word or PDF. For this online exercise, simply paste the text of your draft below; you're welcome to apply the formatting when you send a polished version by email.",
};

const LEGAL_DRAFTING_QUESTIONS = [
  {
    id: "q1",
    rows: 10,
    allowFileUpload: true,
    prompt:
      "Draft an asylum statement based on the story of Diego Martinez Perez above. Ensure the chronology is coherent and the narrative flows logically. Structure the statement into four clear sections: Personal Background, Country Conditions Context, Persecution Facts, and Route Towards the U.S. The statement should not exceed 5 pages. Upload your drafted statement as a PDF or Word document below, or paste the text directly into the box.",
  },
  {
    id: "q2",
    rows: 6,
    prompt:
      "Suggest relevant questions you would ask the client to gather further details relevant to the story.",
  },
];

const ROLES = [
  {
    id: "case-captain",
    title: "Case Captain",
    department: "Immigration Case Management",
    location: "Remote",
    commitment: "Full-time",
    estimatedMinutes: 45,
    blurb:
      "Lead immigration cases from start to finish — auditing digital case files, coordinating processes, and managing case communication with strategic legal judgment.",
    requirements: [
      "2+ years of experience managing immigration cases",
      "Law degree (Licenciatura en Derecho or equivalent)",
      "English proficiency C2",
      "Strong technology and digital case-management skills",
      "Precision, autonomy, and sound judgment in fast-paced environments",
    ],
    caseStudy: LEGAL_DRAFTING_CASE_STUDY,
    questions: LEGAL_DRAFTING_QUESTIONS,
  },
  {
    id: "admin-assistant",
    title: "Administrative Assistant",
    department: "Firm Operations",
    location: "Remote",
    commitment: "Full-time",
    estimatedMinutes: 15,
    blurb:
      "Represent the firm with excellence and provide key support for daily operations — logistics coordination, administrative management, and corporate hospitality.",
    requirements: [
      "2+ years in a similar role, preferably at a law firm or professional office",
      "Fluent English and Spanish, spoken and written",
      "Advanced Microsoft Workspace and digital switchboard system experience",
      "Strong organizational and communication skills",
      "Availability to work remotely",
    ],
    questions: [
      {
        id: "q1",
        prompt:
          "Draft a short, professional email rescheduling a client's consultation because the attorney has a scheduling conflict. Keep the tone warm but firm.",
      },
      {
        id: "q2",
        prompt:
          "It's 4:45 PM and three requests arrive at once: a partner needs a document printed for a 5:00 PM meeting, a client calls asking to reschedule, and IT needs five minutes to fix your calendar sync. How do you triage these, and in what order?",
      },
    ],
  },
  {
    id: "legal-intern",
    title: "Legal Intern",
    department: "Immigration Case Management",
    location: "Remote",
    commitment: "Internship",
    estimatedMinutes: 45,
    blurb:
      "Support the case management team with research, document review, and case file organization while gaining hands-on experience in immigration law practice.",
    requirements: [
      "Currently pursuing or recently completed a law degree",
      "Strong written and analytical skills",
      "English proficiency B2 or higher",
      "Comfort working with digital case-management tools",
      "Availability to work remotely",
    ],
    caseStudy: LEGAL_DRAFTING_CASE_STUDY,
    questions: LEGAL_DRAFTING_QUESTIONS,
  },
  {
    id: "client-success-analyst",
    title: "Client Success Analyst",
    department: "Customer Service",
    location: "Remote",
    commitment: "Full-time",
    estimatedMinutes: 15,
    blurb:
      "Serve as the firm's first point of contact for clients and prospects — managing phone lines and CRM records, following up on immigration and civil cases, and keeping client satisfaction on track across the group's affiliated firms.",
    requirements: [
      "English proficiency: Intermediate to Advanced",
      "Excellent verbal and written communication skills",
      "Strong organization and attention to detail",
      "Experience in customer service, preferably in the legal sector",
      "Comfortable with CRMs and digital tools",
      "Able to work remotely and autonomously",
    ],
    questions: [
      {
        id: "q1",
        rows: 6,
        prompt:
          "A client calls upset because they haven't received an update on their case status in two weeks, and their court hearing is coming up soon. Write the brief, empathetic response you would give them on the call, and describe what you would do afterward to follow up.",
      },
      {
        id: "q2",
        rows: 6,
        prompt:
          "It's Friday afternoon and you need to send your weekly call-quality report to your supervisor, but a client's Google review just came in with a 2-star rating. How do you prioritize these two tasks, and what would you say in your response to the client's review?",
      },
    ],
  },
  {
    id: "community-manager",
    title: "Community Manager",
    department: "Marketing & Communications",
    location: "Remote",
    commitment: "Full-time",
    estimatedMinutes: 20,
    blurb:
      "Design, execute, and oversee the digital and online communication strategy across the group's four brands — social media, video and podcast production, email campaigns, and online reputation, working closely with attorneys and the marketing team.",
    requirements: [
      "2+ years of experience in social media management or digital marketing, preferably at a professional or legal services firm",
      "Degree in Communications, Digital Marketing, Advertising, or a related field",
      "Experience with video editing and podcast production",
      "Comfortable with tools like Meta Business, Hootsuite, Canva, HubSpot, or similar, plus CRM platforms",
      "Advanced English (professional reading and writing)",
      "Strong writing, strategic thinking, and client orientation",
    ],
    questions: [
      {
        id: "q1",
        rows: 6,
        prompt:
          "One of the firm's LinkedIn posts just received a negative public comment from a former client criticizing the firm's service. Draft the response you would post publicly, and briefly describe any follow-up you'd do outside of the comment thread.",
      },
      {
        id: "q2",
        rows: 6,
        prompt:
          "You have three deliverables due this week: editing this week's podcast episode, drafting a bilingual (English/Spanish) email campaign for a client-acquisition push, and preparing the monthly KPI report. How would you prioritize these, and what would you communicate to the team about your plan?",
      },
    ],
  },
];

const EXHIBITS = [
  { key: "openings", label: "Exhibit A", name: "Open Positions" },
  { key: "form", label: "Exhibit B", name: "Candidate Profile" },
  { key: "assessment", label: "Exhibit C", name: "Case Assessment" },
  { key: "confirmation", label: "Exhibit D", name: "Filed" },
];

const EMPTY_FORM = {
  firstName: "",
  lastName: "",
  phoneCountry: "",
  phoneCountryCustom: "",
  phone: "",
  email: "",
  englishLevel: "",
  aiExperience: "",
  remoteAvailable: "",
  ownDevice: "",
};

/* ------------------------------------------------------------------ */
/* HELPERS                                                             */
/* ------------------------------------------------------------------ */

const MAX_FILE_SIZE_MB = 15;
const ACCEPTED_FILE_TYPES =
  ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // reader.result looks like "data:application/pdf;base64,JVBERi0x..."
      const base64 = String(reader.result).split(",")[1] || "";
      resolve(base64);
    };
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

/**
 * Converts an ISO 3166-1 alpha-2 code (e.g. "US") into its flag emoji by
 * mapping each letter to a Unicode regional indicator symbol.
 */
function isoToFlagEmoji(iso2) {
  if (!iso2 || iso2.length !== 2) return "🌐";
  return iso2
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

// A practical set of countries covering the Americas, Europe, and other
// major regions candidates are likely to apply from. Not the full ISO list —
// easy to extend by adding { name, iso2, dial } entries.
const COUNTRY_CODES = [
  { name: "United States", iso2: "US", dial: "+1" },
  { name: "Canada", iso2: "CA", dial: "+1" },
  { name: "Mexico", iso2: "MX", dial: "+52" },
  { name: "Belize", iso2: "BZ", dial: "+501" },
  { name: "Guatemala", iso2: "GT", dial: "+502" },
  { name: "El Salvador", iso2: "SV", dial: "+503" },
  { name: "Honduras", iso2: "HN", dial: "+504" },
  { name: "Nicaragua", iso2: "NI", dial: "+505" },
  { name: "Costa Rica", iso2: "CR", dial: "+506" },
  { name: "Panama", iso2: "PA", dial: "+507" },
  { name: "Cuba", iso2: "CU", dial: "+53" },
  { name: "Dominican Republic", iso2: "DO", dial: "+1" },
  { name: "Haiti", iso2: "HT", dial: "+509" },
  { name: "Jamaica", iso2: "JM", dial: "+1" },
  { name: "Puerto Rico", iso2: "PR", dial: "+1" },
  { name: "Trinidad and Tobago", iso2: "TT", dial: "+1" },
  { name: "Colombia", iso2: "CO", dial: "+57" },
  { name: "Venezuela", iso2: "VE", dial: "+58" },
  { name: "Ecuador", iso2: "EC", dial: "+593" },
  { name: "Peru", iso2: "PE", dial: "+51" },
  { name: "Bolivia", iso2: "BO", dial: "+591" },
  { name: "Chile", iso2: "CL", dial: "+56" },
  { name: "Argentina", iso2: "AR", dial: "+54" },
  { name: "Uruguay", iso2: "UY", dial: "+598" },
  { name: "Paraguay", iso2: "PY", dial: "+595" },
  { name: "Brazil", iso2: "BR", dial: "+55" },
  { name: "Guyana", iso2: "GY", dial: "+592" },
  { name: "Suriname", iso2: "SR", dial: "+597" },
  { name: "Spain", iso2: "ES", dial: "+34" },
  { name: "Portugal", iso2: "PT", dial: "+351" },
  { name: "France", iso2: "FR", dial: "+33" },
  { name: "Germany", iso2: "DE", dial: "+49" },
  { name: "Italy", iso2: "IT", dial: "+39" },
  { name: "United Kingdom", iso2: "GB", dial: "+44" },
  { name: "Ireland", iso2: "IE", dial: "+353" },
  { name: "Netherlands", iso2: "NL", dial: "+31" },
  { name: "Belgium", iso2: "BE", dial: "+32" },
  { name: "Switzerland", iso2: "CH", dial: "+41" },
  { name: "Austria", iso2: "AT", dial: "+43" },
  { name: "Sweden", iso2: "SE", dial: "+46" },
  { name: "Norway", iso2: "NO", dial: "+47" },
  { name: "Denmark", iso2: "DK", dial: "+45" },
  { name: "Finland", iso2: "FI", dial: "+358" },
  { name: "Poland", iso2: "PL", dial: "+48" },
  { name: "Romania", iso2: "RO", dial: "+40" },
  { name: "Greece", iso2: "GR", dial: "+30" },
  { name: "Russia", iso2: "RU", dial: "+7" },
  { name: "Ukraine", iso2: "UA", dial: "+380" },
  { name: "China", iso2: "CN", dial: "+86" },
  { name: "India", iso2: "IN", dial: "+91" },
  { name: "Japan", iso2: "JP", dial: "+81" },
  { name: "South Korea", iso2: "KR", dial: "+82" },
  { name: "Philippines", iso2: "PH", dial: "+63" },
  { name: "Vietnam", iso2: "VN", dial: "+84" },
  { name: "Indonesia", iso2: "ID", dial: "+62" },
  { name: "Nigeria", iso2: "NG", dial: "+234" },
  { name: "South Africa", iso2: "ZA", dial: "+27" },
  { name: "Egypt", iso2: "EG", dial: "+20" },
  { name: "Kenya", iso2: "KE", dial: "+254" },
  { name: "Ghana", iso2: "GH", dial: "+233" },
  { name: "Ethiopia", iso2: "ET", dial: "+251" },
  { name: "Morocco", iso2: "MA", dial: "+212" },
  { name: "Algeria", iso2: "DZ", dial: "+213" },
  { name: "Tunisia", iso2: "TN", dial: "+216" },
  { name: "Senegal", iso2: "SN", dial: "+221" },
  { name: "Ivory Coast", iso2: "CI", dial: "+225" },
  { name: "Cameroon", iso2: "CM", dial: "+237" },
  { name: "Democratic Republic of the Congo", iso2: "CD", dial: "+243" },
  { name: "Angola", iso2: "AO", dial: "+244" },
  { name: "Mozambique", iso2: "MZ", dial: "+258" },
  { name: "Zambia", iso2: "ZM", dial: "+260" },
  { name: "Zimbabwe", iso2: "ZW", dial: "+263" },
  { name: "Tanzania", iso2: "TZ", dial: "+255" },
  { name: "Uganda", iso2: "UG", dial: "+256" },
  { name: "Rwanda", iso2: "RW", dial: "+250" },
  { name: "Sudan", iso2: "SD", dial: "+249" },
  { name: "Libya", iso2: "LY", dial: "+218" },
  { name: "Cape Verde", iso2: "CV", dial: "+238" },
  { name: "Australia", iso2: "AU", dial: "+61" },
  { name: "New Zealand", iso2: "NZ", dial: "+64" },
  { name: "Saudi Arabia", iso2: "SA", dial: "+966" },
  { name: "United Arab Emirates", iso2: "AE", dial: "+971" },
  { name: "Turkey", iso2: "TR", dial: "+90" },
  { name: "Israel", iso2: "IL", dial: "+972" },
  { name: "Pakistan", iso2: "PK", dial: "+92" },
  { name: "Bangladesh", iso2: "BD", dial: "+880" },
].sort((a, b) => a.name.localeCompare(b.name));

// Shown at the end of the dropdown for any country not explicitly listed
// above — lets the candidate type their own code by hand instead of being
// blocked from applying.
const OTHER_COUNTRY_OPTION = { name: "Other (enter code manually)", iso2: "🌐", dial: "OTHER" };

/**
 * Best-effort IP-based geolocation, used to (a) default the phone country
 * code and (b) silently record the candidate's approximate country/city for
 * the recruiter's records. If the request fails or is blocked, the app
 * simply falls back to a default dial code and leaves location blank —
 * nothing about the form breaks either way.
 */
async function detectGeo() {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (!res.ok) return null;
    const data = await res.json();
    return {
      dial: data.country_calling_code || "",
      iso2: data.country_code || "",
      country: data.country_name || "",
      city: data.city || "",
    };
  } catch {
    return null;
  }
}

function getEffectiveDialCode(form) {
  return form.phoneCountry === "OTHER" ? form.phoneCountryCustom.trim() : form.phoneCountry;
}

function validateForm(form) {
  const errors = {};
  if (!form.firstName.trim()) errors.firstName = "First name is required.";
  if (!form.lastName.trim()) errors.lastName = "Last name is required.";
  if (!form.phoneCountry) {
    errors.phone = "Select a country code.";
  } else if (form.phoneCountry === "OTHER" && !/^\+\d{1,4}$/.test(form.phoneCountryCustom.trim())) {
    errors.phone = "Enter your country code as + followed by digits (e.g. +255).";
  } else if (!form.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!/^\d{6,14}$/.test(form.phone.trim())) {
    errors.phone = "Enter a valid phone number (digits only).";
  }
  if (!form.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!form.englishLevel) errors.englishLevel = "Select an English level.";
  if (!form.aiExperience) errors.aiExperience = "Select an AI experience level.";
  if (!form.remoteAvailable) errors.remoteAvailable = "Please select an option.";
  if (!form.ownDevice) errors.ownDevice = "Please select an option.";
  return errors;
}

function buildEvaluationPrompt(app) {
  const { role, form, answers, files, geo } = app;
  const qa = role.questions
    .map((q, i) => {
      const fileNote =
        files && files[q.id]
          ? ` [Candidate attached a file: ${files[q.id].fileName} — see the "PDF Link" column in the Google Sheet to open it.]`
          : "";
      return `Q${i + 1}: ${q.prompt}\nA${i + 1}: ${answers[q.id]?.trim() || "(no answer provided)"}${fileNote}`;
    })
    .join("\n\n");

  const caseStudyBlock = role.caseStudy
    ? `\nCLIENT STORY PROVIDED TO THE CANDIDATE — ${role.caseStudy.clientName}\n${role.caseStudy.story.join("\n\n")}\n`
    : "";

  const locationLine =
    geo && (geo.city || geo.country)
      ? `- Approximate location (detected): ${[geo.city, geo.country].filter(Boolean).join(", ")}\n`
      : "";

  return `You are a senior legal recruiter at JAL LAW Group evaluating a candidate for the ${role.title} position (${role.department}).

CANDIDATE PROFILE
- Name: ${form.firstName} ${form.lastName}
- Phone: ${getEffectiveDialCode(form)} ${form.phone}
- Email: ${form.email}
${locationLine}- Self-reported English proficiency: ${form.englishLevel}
- Self-reported AI tool experience: ${form.aiExperience}
- Remote work availability: ${form.remoteAvailable}
- Owns a personal laptop/computer: ${form.ownDevice}

ROLE APPLIED FOR
${role.title} — ${role.department} (${role.location}, ${role.commitment})
${caseStudyBlock}
CASE ASSESSMENT — CANDIDATE RESPONSES
${qa}

EVALUATION INSTRUCTIONS
Score the candidate from 1-5 (5 = excellent) on each of the following, with one sentence of justification per score:
1. Written communication clarity and professionalism
2. Legal/business reasoning demonstrated in the responses
3. English proficiency evidenced in the writing itself (compare against the self-reported level above)
4. Attention to detail and completeness of the responses
5. Overall fit for the ${role.title} role at a legal services firm

Then flag any notable strengths or red flags, and close with a hiring recommendation of Strong Yes, Yes, Maybe, or No, with a one-sentence rationale.`;
}

/* ------------------------------------------------------------------ */
/* GOOGLE SHEETS SYNC                                                  */
/* ------------------------------------------------------------------ */
/**
 * Paste the "Web app URL" you get after deploying the companion Google Apps
 * Script (see google-apps-script-sync.gs) as a Web App. Until you do, the
 * app runs normally but simply skips the network call.
 */
const GOOGLE_SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycbz9bzKrX6z9s5WG4fRv37I3ao0dhINFr0ORNkZM_Zh3PIO6YLB7J8oYXIRo1UzwTE3i/exec";

/**
 * Must match RECRUITER_ACCESS_KEY exactly inside google-apps-script-sync.gs.
 * This is a basic safeguard, not real security — see the security note in
 * that file for what it does and doesn't protect against.
 */
const RECRUITER_ACCESS_KEY = "jal-xVGoq9ZgcQcL86BKk7CwRKRG";

/**
 * Password typed into the "Recruiter access" prompt to unlock the panel in
 * the UI. Change this to a private phrase only you (and anyone you choose
 * to share it with) know. Like RECRUITER_ACCESS_KEY above, this lives in
 * the site's public code — a technically determined person could find it
 * by reading the page's source. What it DOES stop is any casual visitor,
 * candidate, or search engine from opening the panel just by clicking the
 * link, which is the realistic risk for a tool like this.
 */
const RECRUITER_PASSWORD = "JALLaw2026!";

function buildSheetPayload({ appId, status, role, form, answers, files, geo }) {
  const answersText = (role?.questions || [])
    .map((q, i) => {
      const fileNote = files && files[q.id] ? ` [file attached: ${files[q.id].fileName}]` : "";
      return `Q${i + 1}: ${q.prompt}\nA${i + 1}: ${answers[q.id]?.trim() || ""}${fileNote}`;
    })
    .join("\n\n");

  // Only ever include the raw file bytes on final "Submitted" sends — not on
  // every autosave tick — so we don't re-upload the same document to Drive
  // over and over while the candidate is still typing other fields.
  const fileForUpload =
    status === "Submitted" && files && Object.keys(files).length > 0
      ? Object.values(files)[0]
      : null;

  return {
    applicationId: appId,
    status, // "In progress" | "Submitted"
    role: role?.title || "",
    department: role?.department || "",
    firstName: form.firstName,
    lastName: form.lastName,
    phone: `${getEffectiveDialCode(form)} ${form.phone}`.trim(),
    email: form.email,
    country: geo?.country || "",
    city: geo?.city || "",
    englishLevel: form.englishLevel,
    aiExperience: form.aiExperience,
    remoteAvailable: form.remoteAvailable,
    ownDevice: form.ownDevice,
    answersText,
    answersJson: JSON.stringify(answers),
    clientTimestamp: new Date().toISOString(),
    ...(fileForUpload
      ? {
          fileName: fileForUpload.fileName,
          fileMimeType: fileForUpload.mimeType,
          fileBase64: fileForUpload.base64,
        }
      : {}),
  };
}

/**
 * Pulls every row back from the Google Sheet via doGet(), so the recruiter
 * panel shows ALL applications (any day, any browser session) instead of
 * only what happened in the current tab.
 *
 * Note: unlike postToSheet (which fires blind with mode:"no-cors" because we
 * don't need to read the response), this DOES need to read the response —
 * so it depends on the Apps Script Web App returning a readable, CORS-
 * friendly response. That has been inconsistent across Google's own
 * platform changes over time. If it fails, we surface a clear error instead
 * of a silent blank list, and the Google Sheet itself always remains the
 * reliable source of truth regardless.
 */
async function fetchApplicationsFromSheet() {
  if (!GOOGLE_SHEETS_ENDPOINT || GOOGLE_SHEETS_ENDPOINT.includes("PASTE_YOUR")) {
    return { ok: false, reason: "not_configured" };
  }
  try {
    const url = `${GOOGLE_SHEETS_ENDPOINT}?key=${encodeURIComponent(RECRUITER_ACCESS_KEY)}`;
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) {
      return { ok: false, reason: "http_error", detail: `HTTP ${res.status}` };
    }
    const data = await res.json();
    if (!data.ok) {
      return { ok: false, reason: data.error === "unauthorized" ? "unauthorized" : "server_error", detail: data.error };
    }
    return { ok: true, applications: data.applications || [] };
  } catch (err) {
    return { ok: false, reason: "network_or_cors", detail: String(err) };
  }
}

/**
 * Fetches a single candidate's own saved progress by applicationId — used
 * to restore an in-progress application when someone clicks the "resume"
 * link from a reminder email. Deliberately doesn't require the recruiter
 * key: the applicationId itself (unguessable, sent only to that candidate)
 * is what authorizes this read, and it only ever returns that one record.
 */
async function fetchResumeApplication(applicationId) {
  if (!GOOGLE_SHEETS_ENDPOINT || GOOGLE_SHEETS_ENDPOINT.includes("PASTE_YOUR") || !applicationId) {
    return { ok: false };
  }
  try {
    const url = `${GOOGLE_SHEETS_ENDPOINT}?resumeId=${encodeURIComponent(applicationId)}`;
    const res = await fetch(url, { method: "GET" });
    if (!res.ok) return { ok: false };
    const data = await res.json();
    if (!data.ok || !data.application) return { ok: false };
    return { ok: true, application: data.application };
  } catch {
    return { ok: false };
  }
}

function buildEvaluationPromptFromSheetRow(row) {
  const roleDef = ROLES.find((r) => r.title === row.role);
  const caseStudyBlock = roleDef?.caseStudy
    ? `\nCLIENT STORY PROVIDED TO THE CANDIDATE — ${roleDef.caseStudy.clientName}\n${roleDef.caseStudy.story.join("\n\n")}\n`
    : "";
  const fileNote = row.pdfLink ? `\nAttached file: ${row.pdfLink}\n` : "";
  const locationLine =
    row.city || row.country
      ? `- Approximate location (detected): ${[row.city, row.country].filter(Boolean).join(", ")}\n`
      : "";

  return `You are a senior legal recruiter at JAL LAW Group evaluating a candidate for the ${row.role} position (${row.department}).

CANDIDATE PROFILE
- Name: ${row.firstName} ${row.lastName}
- Phone: ${row.phone}
- Email: ${row.email}
${locationLine}- Self-reported English proficiency: ${row.englishLevel}
- Self-reported AI tool experience: ${row.aiExperience}
- Remote work availability: ${row.remoteAvailability}
- Owns a personal laptop/computer: ${row.ownDevice}

ROLE APPLIED FOR
${row.role} — ${row.department}
${caseStudyBlock}
CASE ASSESSMENT — CANDIDATE RESPONSES
${row.answersText || "(no answers recorded)"}
${fileNote}
EVALUATION INSTRUCTIONS
Score the candidate from 1-5 (5 = excellent) on each of the following, with one sentence of justification per score:
1. Written communication clarity and professionalism
2. Legal/business reasoning demonstrated in the responses
3. English proficiency evidenced in the writing itself (compare against the self-reported level above)
4. Attention to detail and completeness of the responses
5. Overall fit for the ${row.role} role at a legal services firm

Then flag any notable strengths or red flags, and close with a hiring recommendation of Strong Yes, Yes, Maybe, or No, with a one-sentence rationale.`;
}

async function postToSheet(payload) {
  if (!GOOGLE_SHEETS_ENDPOINT || GOOGLE_SHEETS_ENDPOINT.includes("PASTE_YOUR")) {
    // Not configured yet — skip silently so the app still works standalone.
    return false;
  }
  try {
    // Apps Script Web Apps don't return CORS headers, so the response is
    // opaque in "no-cors" mode. We can't read it, but the write still
    // happens on Google's side. text/plain avoids a CORS preflight.
    await fetch(GOOGLE_SHEETS_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    return true;
  } catch {
    return false;
  }
}

/* ------------------------------------------------------------------ */
/* SMALL UI PRIMITIVES                                                 */
/* ------------------------------------------------------------------ */

function SyncBadge({ status }) {
  if (status === "idle") return null;
  const map = {
    saving: { dot: "bg-[#00E4FF] animate-pulse", text: "Saving your progress…" },
    saved: { dot: "bg-[#00D65C]", text: "Progress saved" },
    offline: { dot: "bg-[#DDBB00]", text: "Working offline — progress isn't syncing" },
  };
  const cfg = map[status];
  if (!cfg) return null;
  return (
    <span className="inline-flex items-center gap-1.5 text-[12px] text-[#5B6472]">
      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
      {cfg.text}
    </span>
  );
}

function ExhibitTabs({ currentStep }) {
  const currentIndex = EXHIBITS.findIndex((e) => e.key === currentStep);
  return (
    <div className="flex w-full overflow-x-auto no-scrollbar">
      {EXHIBITS.map((ex, i) => {
        const state =
          i < currentIndex ? "done" : i === currentIndex ? "active" : "upcoming";
        return (
          <div
            key={ex.key}
            className={[
              "relative flex-1 min-w-[130px] px-4 pt-3 pb-2.5 mr-1 rounded-t-lg border border-b-0 transition-colors duration-300",
              state === "active"
                ? "bg-[#0053FF] border-[#0053FF] text-white z-10 shadow-[0_-2px_10px_rgba(0,83,255,0.25)]"
                : state === "done"
                ? "bg-white border-[#E2E5EA] text-[#0A1128]"
                : "bg-[#EEF1F5] border-[#E2E5EA] text-[#8891A0]",
            ].join(" ")}
            style={{ fontFamily: "'IBM Plex Mono', monospace" }}
          >
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider">
              {state === "done" ? (
                <CheckCircle2 size={12} className="text-[#00D65C]" strokeWidth={2.5} />
              ) : (
                <Circle
                  size={10}
                  className={state === "active" ? "text-white" : "text-[#B7BECB]"}
                  strokeWidth={2.5}
                />
              )}
              {ex.label}
            </div>
            <div
              className={[
                "text-[13px] leading-tight mt-0.5 truncate",
                state === "active" ? "font-semibold" : "font-medium",
              ].join(" ")}
              style={{ fontFamily: "'Articulat CF','Poppins',sans-serif" }}
            >
              {ex.name}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-[#3A4150] mb-1.5 block">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1 flex items-center gap-1 text-[12px] text-[#D64545]">
          <AlertCircle size={12} /> {error}
        </span>
      )}
    </label>
  );
}

const inputClass = (hasError) =>
  [
    "w-full rounded-lg border px-3.5 py-2.5 text-[14px] text-[#0A1128] bg-white",
    "placeholder:text-[#A6ADBA] transition-shadow duration-150",
    "focus:outline-none focus:ring-2 focus:ring-[#0053FF]/40 focus:border-[#0053FF]",
    hasError ? "border-[#E9A0A0]" : "border-[#DDE1E8]",
  ].join(" ");

function YesNoToggle({ value, onChange, error }) {
  return (
    <div>
      <div className="flex gap-2">
        {["Yes", "No"].map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={[
              "flex-1 rounded-lg border py-2.5 text-[14px] font-medium transition-all duration-150",
              value === opt
                ? "bg-[#0053FF] border-[#0053FF] text-white"
                : "bg-white border-[#DDE1E8] text-[#5B6472] hover:border-[#0053FF]/50",
            ].join(" ")}
          >
            {opt}
          </button>
        ))}
      </div>
      {error && (
        <span className="mt-1 flex items-center gap-1 text-[12px] text-[#D64545]">
          <AlertCircle size={12} /> {error}
        </span>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* MAIN APP                                                            */
/* ------------------------------------------------------------------ */

export default function App() {
  const [step, setStep] = useState("openings");
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [answers, setAnswers] = useState({});
  const [files, setFiles] = useState({}); // { [questionId]: { fileName, mimeType, base64, sizeMB } }
  const [fileErrors, setFileErrors] = useState({});
  const [submittedApps, setSubmittedApps] = useState([]);
  const [lastAppId, setLastAppId] = useState(null);

  const [appId, setAppId] = useState(null);
  const [syncStatus, setSyncStatus] = useState("idle"); // idle | saving | saved | offline
  const syncTimerRef = useRef(null);

  const [recruiterOpen, setRecruiterOpen] = useState(false);
  const [recruiterUnlocked, setRecruiterUnlocked] = useState(false);
  const [recruiterPasswordInput, setRecruiterPasswordInput] = useState("");
  const [recruiterAuthError, setRecruiterAuthError] = useState(false);
  const [evalAppId, setEvalAppId] = useState(null);
  const [copied, setCopied] = useState(false);
  const topRef = useRef(null);

  const [sheetApps, setSheetApps] = useState([]);
  const [sheetFetchState, setSheetFetchState] = useState("idle"); // idle | loading | loaded | error
  const [sheetFetchReason, setSheetFetchReason] = useState(null);

  const [geo, setGeo] = useState({ dial: "", iso2: "", country: "", city: "" });
  const [assessmentStarted, setAssessmentStarted] = useState(false);
  const [resumeBanner, setResumeBanner] = useState(null); // null | "restored" | "not_found"

  const selectedRole = useMemo(
    () => ROLES.find((r) => r.id === selectedRoleId) || null,
    [selectedRoleId]
  );

  const scrollTop = () => {
    if (topRef.current) topRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // If the page loads with ?resume=APPID (the link inside a reminder
  // email), pull that candidate's own saved progress back from the Sheet
  // and drop them right back where they left off.
  useEffect(() => {
    const resumeId = new URLSearchParams(window.location.search).get("resume");
    if (!resumeId) return;

    fetchResumeApplication(resumeId).then((result) => {
      const roleDef = result.ok ? ROLES.find((r) => r.title === result.application.role) : null;
      if (!result.ok || !roleDef) {
        setResumeBanner("not_found");
        return;
      }

      const app = result.application;
      let restoredAnswers = {};
      try {
        restoredAnswers = JSON.parse(app.answersJson || "{}");
      } catch {
        restoredAnswers = {};
      }
      const hasAnyAnswer = Object.values(restoredAnswers).some(
        (v) => (v || "").toString().trim().length > 0
      );
      const [dial, ...rest] = String(app.phone || "").trim().split(" ");

      setAppId(app.applicationId);
      setSelectedRoleId(roleDef.id);
      setForm({
        firstName: app.firstName || "",
        lastName: app.lastName || "",
        phoneCountry: dial || "",
        phoneCountryCustom: "",
        phone: rest.join(" ") || "",
        email: app.email || "",
        englishLevel: app.englishLevel || "",
        aiExperience: app.aiExperience || "",
        remoteAvailable: app.remoteAvailability || "",
        ownDevice: app.ownDevice || "",
      });
      setAnswers(restoredAnswers);
      setAssessmentStarted(hasAnyAnswer);
      setStep(hasAnyAnswer ? "assessment" : "form");
      setSyncStatus("saved");
      setResumeBanner("restored");
      setTimeout(scrollTop, 50);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Best-effort IP geolocation, fetched once when the app loads. Used to (a)
  // default the phone country-code selector and (b) silently record the
  // candidate's approximate location for the recruiter's records. If it
  // fails or is blocked, the form still works fine — phoneCountry just stays
  // unset until the candidate picks one manually.
  useEffect(() => {
    let cancelled = false;
    detectGeo().then((result) => {
      if (!cancelled && result) setGeo(result);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  // Once geolocation resolves, default the phone country code — but only if
  // the candidate hasn't already picked one themselves.
  useEffect(() => {
    if (geo.dial && !form.phoneCountry && step === "form") {
      setForm((f) => (f.phoneCountry ? f : { ...f, phoneCountry: geo.dial }));
    }
  }, [geo, step]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectRole = (role) => {
    setAppId(`JAL-${Math.floor(100000 + Math.random() * 900000)}`);
    setSyncStatus("idle");
    setSelectedRoleId(role.id);
    setForm({ ...EMPTY_FORM, phoneCountry: geo.dial || "" });
    setFormErrors({});
    setAnswers({});
    setFiles({});
    setFileErrors({});
    setAssessmentStarted(false);
    setStep("form");
    setTimeout(scrollTop, 50);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm(form);
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      setStep("assessment");
      setTimeout(scrollTop, 50);
    }
  };

  const handleFileSelect = async (questionId, file) => {
    if (!file) return;
    setFileErrors((prev) => ({ ...prev, [questionId]: null }));

    const sizeMB = file.size / (1024 * 1024);
    if (sizeMB > MAX_FILE_SIZE_MB) {
      setFileErrors((prev) => ({
        ...prev,
        [questionId]: `That file is ${sizeMB.toFixed(1)} MB — please upload a file under ${MAX_FILE_SIZE_MB} MB.`,
      }));
      return;
    }

    try {
      const base64 = await readFileAsBase64(file);
      setFiles((prev) => ({
        ...prev,
        [questionId]: {
          fileName: file.name,
          mimeType: file.type || "application/octet-stream",
          base64,
          sizeMB: sizeMB.toFixed(1),
        },
      }));
    } catch {
      setFileErrors((prev) => ({
        ...prev,
        [questionId]: "Couldn't read that file — please try again.",
      }));
    }
  };

  const handleFileRemove = (questionId) => {
    setFiles((prev) => {
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
    setFileErrors((prev) => ({ ...prev, [questionId]: null }));
  };

  // Autosave: every change to the profile or assessment answers is synced
  // to the connected Google Sheet after ~1s of inactivity. This runs on
  // every keystroke, so even a candidate who never clicks "Submit" still
  // has their in-progress answers safely recorded as "In progress". File
  // bytes are intentionally excluded here (see buildSheetPayload) — they're
  // only uploaded to Drive once, at final submission.
  useEffect(() => {
    if (!selectedRole || !appId) return;
    if (step !== "form" && step !== "assessment") return;

    setSyncStatus("saving");
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    syncTimerRef.current = setTimeout(async () => {
      const ok = await postToSheet(
        buildSheetPayload({ appId, status: "In progress", role: selectedRole, form, answers, files, geo })
      );
      setSyncStatus(ok ? "saved" : "offline");
    }, 1000);

    return () => clearTimeout(syncTimerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form, answers, step, selectedRole, appId]);

  const allAnswered = selectedRole
    ? selectedRole.questions.every((q) => {
        const hasText = (answers[q.id] || "").trim().length > 0;
        const hasFile = q.allowFileUpload && !!files[q.id];
        return hasText || hasFile;
      })
    : false;

  const handleAssessmentSubmit = async () => {
    if (!allAnswered) return;
    const id = appId || `JAL-${Math.floor(100000 + Math.random() * 900000)}`;
    const application = {
      id,
      role: selectedRole,
      form,
      answers,
      files,
      geo,
      submittedAt: new Date(),
    };
    setSubmittedApps((prev) => [application, ...prev]);
    setLastAppId(id);

    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    setSyncStatus("saving");
    const ok = await postToSheet(
      buildSheetPayload({ appId: id, status: "Submitted", role: selectedRole, form, answers, files, geo })
    );
    setSyncStatus(ok ? "saved" : "offline");

    setStep("confirmation");
    setTimeout(scrollTop, 50);
  };

  const handleStartOver = () => {
    if (syncTimerRef.current) clearTimeout(syncTimerRef.current);
    setStep("openings");
    setSelectedRoleId(null);
    setForm(EMPTY_FORM);
    setFormErrors({});
    setAnswers({});
    setFiles({});
    setFileErrors({});
    setAssessmentStarted(false);
    setAppId(null);
    setSyncStatus("idle");
    setTimeout(scrollTop, 50);
  };

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — fail silently */
    }
  };

  const loadSheetApplications = async () => {
    setSheetFetchState("loading");
    const result = await fetchApplicationsFromSheet();
    if (result.ok) {
      setSheetApps(result.applications);
      setSheetFetchState("loaded");
      setSheetFetchReason(null);
    } else {
      setSheetFetchState("error");
      setSheetFetchReason(result.reason || "unknown");
    }
  };

  // Pull fresh data from the Google Sheet only once the recruiter has
  // unlocked the panel with the password — never before, so no candidate
  // data is fetched or rendered for an unauthenticated visitor.
  useEffect(() => {
    if (recruiterOpen && recruiterUnlocked) {
      loadSheetApplications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recruiterOpen, recruiterUnlocked]);

  const handleRecruiterToggle = () => {
    setRecruiterOpen((v) => {
      const next = !v;
      if (!next) {
        // Closing the panel also re-locks it, so it's never left open and
        // unlocked in the background for the next visitor on a shared
        // computer.
        setRecruiterUnlocked(false);
        setRecruiterPasswordInput("");
        setRecruiterAuthError(false);
      }
      return next;
    });
  };

  const handleRecruiterUnlock = (e) => {
    e.preventDefault();
    if (recruiterPasswordInput === RECRUITER_PASSWORD) {
      setRecruiterUnlocked(true);
      setRecruiterAuthError(false);
      setRecruiterPasswordInput("");
    } else {
      setRecruiterAuthError(true);
    }
  };

  const usingSheetData = sheetFetchState === "loaded";

  // Normalize both data sources (live Sheet rows, or this session's local
  // state as a fallback) into one consistent shape for rendering.
  const displayApps = usingSheetData
    ? sheetApps.map((row) => ({
        id: row.applicationId,
        name: `${row.firstName || ""} ${row.lastName || ""}`.trim() || "(no name)",
        roleTitle: row.role || "—",
        statusLabel: row.status || "Unknown",
        location: [row.city, row.country].filter(Boolean).join(", "),
        reminderSentAt: row.reminderSentAt || null,
        promptText: buildEvaluationPromptFromSheetRow(row),
      }))
    : submittedApps.map((app) => ({
        id: app.id,
        name: `${app.form.firstName} ${app.form.lastName}`,
        roleTitle: app.role.title,
        statusLabel: "Submitted",
        location: [app.geo?.city, app.geo?.country].filter(Boolean).join(", "),
        reminderSentAt: null,
        promptText: buildEvaluationPrompt(app),
      }));

  const evalApp = displayApps.find((a) => a.id === evalAppId) || null;

  const completedApps = displayApps.filter((a) => a.statusLabel === "Submitted");
  const inProgressApps = displayApps.filter((a) => a.statusLabel !== "Submitted");

  function renderCandidateCard(app) {
    return (
      <div key={app.id}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/10 border border-white/15 rounded-lg px-4 py-3.5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-md bg-white/15 flex items-center justify-center shrink-0">
              <Briefcase size={16} className="text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-[14px] font-semibold text-white truncate">
                {app.name}
              </div>
              <div className="text-[12.5px] text-white/70 truncate">
                {app.roleTitle} · {app.id} ·{" "}
                <span
                  className={
                    app.statusLabel === "Submitted" ? "text-[#00FFD2]" : "text-[#FFD866]"
                  }
                >
                  {app.statusLabel}
                </span>
              </div>
              {app.location && (
                <div className="flex items-center gap-1 text-[12px] text-white/55 truncate mt-0.5">
                  <MapPin size={11} /> {app.location}
                </div>
              )}
              {app.statusLabel === "In progress" && app.reminderSentAt && (
                <div className="flex items-center gap-1 text-[12px] text-[#00FFD2]/80 truncate mt-0.5">
                  <Mail size={11} /> Reminder sent {new Date(app.reminderSentAt).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => {
              setEvalAppId(evalAppId === app.id ? null : app.id);
              setCopied(false);
            }}
            className="flex items-center justify-center gap-1.5 rounded-lg bg-[#00FFD2] text-[#0A1128] text-[13px] font-semibold px-4 py-2 hover:bg-white transition-colors duration-200 shrink-0"
          >
            <Sparkles size={14} />
            {evalAppId === app.id ? "Hide prompt" : "Generate evaluation prompt"}
          </button>
        </div>

        {evalAppId === app.id && (
          <div className="mt-2 rounded-lg bg-[#031A57] border border-white/15 p-4">
            <div className="flex items-center justify-between mb-2.5">
              <span
                className="text-[11px] uppercase tracking-wider text-white/60"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                Evaluation prompt — ready to copy
              </span>
              <button
                onClick={() => handleCopy(app.promptText)}
                className="flex items-center gap-1.5 text-[12.5px] font-medium text-[#00FFD2] hover:text-white transition-colors"
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre
              className="text-[12.5px] text-white/85 whitespace-pre-wrap leading-relaxed max-h-72 overflow-y-auto pr-1"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              {app.promptText}
            </pre>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full bg-[#DCE1EB] text-[#0A1128]"
      style={{ fontFamily: "'Articulat CF','Poppins',ui-sans-serif,system-ui,sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500&display=swap');
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @media (prefers-reduced-motion: reduce) {
          * { transition-duration: 0.001ms !important; animation-duration: 0.001ms !important; }
        }
      `}</style>

      <div ref={topRef} />

      {resumeBanner === "restored" && (
        <div className="bg-[#00FF6C] text-[#0A1128]">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-2.5 text-[13px] font-medium flex items-center gap-2">
            <CheckCircle2 size={15} /> Welcome back! We've restored your progress — pick up right where you left off.
          </div>
        </div>
      )}
      {resumeBanner === "not_found" && (
        <div className="bg-[#FFF3CD] text-[#7A5B00]">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-2.5 text-[13px] font-medium flex items-center gap-2">
            <AlertCircle size={15} /> We couldn't find that saved application — no worries, just select your role below to start fresh.
          </div>
        </div>
      )}

      {/* ---------------- HEADER ---------------- */}
      <header className="bg-[#E4E8F0] border-b-[3px] border-[#0053FF]">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={LOGO_SRC} alt="JAL LAW" className="h-9 sm:h-10 w-auto" />
            <span
              className="hidden sm:inline-block text-[10px] uppercase tracking-[0.18em] text-[#5B6472] border-l border-[#C7CDDB] pl-3 ml-1"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Careers
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-5 text-[13px] text-[#5B6472]">
            <span className="flex items-center gap-1.5">
              <Mail size={14} className="text-[#0053FF]" /> seleccionjal@jalgroup.law
            </span>
          </div>
        </div>
      </header>

      {/* ---------------- HERO (only on openings step) ---------------- */}
      {step === "openings" && (
        <section className="border-b border-[#C7CDDB]">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-12 sm:py-16">
            <div
              className="inline-block text-[11px] uppercase tracking-[0.18em] text-[#0053FF] font-medium mb-4"
              style={{ fontFamily: "'IBM Plex Mono', monospace" }}
            >
              Join the firm
            </div>
            <h1 className="text-[32px] sm:text-[42px] leading-[1.1] font-extrabold max-w-2xl text-[#0A1128]">
              Build your career across three firms, one standard of excellence.
            </h1>
            <div className="w-10 h-[3px] bg-[#00FF6C] rounded-full mt-5 mb-5" />
            <p className="text-[15px] sm:text-[16px] text-[#5B6472] max-w-xl leading-relaxed">
              JAL LAW Group is hiring across our legal and operations teams. Review the
              open positions below, then submit your candidate profile to begin the
              application.
            </p>
          </div>
        </section>
      )}

      {/* ---------------- BODY ---------------- */}
      <main className="max-w-5xl mx-auto px-5 sm:px-8 py-8 sm:py-10">
        {step !== "openings" && (
          <div className="mb-5">
            <ExhibitTabs currentStep={step} />
          </div>
        )}

        {/* ===== EXHIBIT A — OPENINGS ===== */}
        {step === "openings" && (
          <div>
            <div className="flex items-center gap-2 mb-5">
              <ClipboardList size={18} className="text-[#0053FF]" />
              <h2 className="text-[20px] font-bold text-[#0A1128]">
                Open Positions
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {ROLES.map((role) => (
                <div
                  key={role.id}
                  className="group flex flex-col bg-white border border-[#E2E5EA] rounded-xl p-5 hover:border-[#0053FF]/50 hover:shadow-[0_6px_24px_rgba(0,83,255,0.10)] transition-all duration-200"
                >
                  <div
                    className="text-[11px] uppercase tracking-wider text-[#0053FF] font-medium mb-1.5"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    {role.department}
                  </div>
                  <h3 className="text-[17px] font-bold text-[#0A1128] mb-2">
                    {role.title}
                  </h3>
                  <p className="text-[13.5px] text-[#5B6472] leading-relaxed mb-4">
                    {role.blurb}
                  </p>
                  <div className="flex flex-col gap-1.5 text-[12.5px] text-[#5B6472] mb-4">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} className="text-[#00E4FF]" /> {role.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} className="text-[#00E4FF]" /> {role.commitment}
                    </span>
                  </div>
                  <ul className="space-y-1.5 mb-5 flex-1">
                    {role.requirements.slice(0, 3).map((req, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-[12.5px] text-[#3A4150]">
                        <CheckCircle2 size={13} className="text-[#00D65C] mt-[2px] shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleSelectRole(role)}
                    className="mt-auto flex items-center justify-center gap-1.5 rounded-lg bg-[#0053FF] text-white text-[13.5px] font-semibold py-2.5 hover:bg-[#0040CC] transition-colors duration-200"
                  >
                    Select position <ChevronRight size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== EXHIBIT B — APPLICATION FORM ===== */}
        {step === "form" && selectedRole && (
          <div className="max-w-2xl">
            <div className="flex items-center justify-between mb-5">
              <button
                onClick={() => setStep("openings")}
                className="flex items-center gap-1.5 text-[13px] text-[#5B6472] hover:text-[#0053FF]"
              >
                <ArrowLeft size={14} /> Back to open positions
              </button>
              <SyncBadge status={syncStatus} />
            </div>

            <div className="bg-white border border-[#E2E5EA] rounded-xl p-5 sm:p-7">
              <div
                className="text-[11px] uppercase tracking-wider text-[#0053FF] font-medium mb-1"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                Applying for
              </div>
              <h2 className="text-[20px] font-bold mb-1 text-[#0A1128]">
                {selectedRole.title}
              </h2>
              <p className="text-[13px] text-[#5B6472] mb-6">
                {selectedRole.department} · {selectedRole.location}
              </p>

              <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="First name" error={formErrors.firstName}>
                    <input
                      type="text"
                      className={inputClass(formErrors.firstName)}
                      value={form.firstName}
                      onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                      placeholder="Jane"
                    />
                  </Field>
                  <Field label="Last name" error={formErrors.lastName}>
                    <input
                      type="text"
                      className={inputClass(formErrors.lastName)}
                      value={form.lastName}
                      onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                      placeholder="Doe"
                    />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Phone number" error={formErrors.phone}>
                    <div className="flex gap-2">
                      <select
                        value={form.phoneCountry}
                        onChange={(e) =>
                          setForm({ ...form, phoneCountry: e.target.value, phoneCountryCustom: "" })
                        }
                        className={inputClass(formErrors.phone) + " w-[128px] shrink-0 pl-2 pr-1"}
                      >
                        <option value="">Code</option>
                        {COUNTRY_CODES.map((c) => (
                          <option key={c.iso2} value={c.dial}>
                            {isoToFlagEmoji(c.iso2)} {c.dial}
                          </option>
                        ))}
                        <option value={OTHER_COUNTRY_OPTION.dial}>
                          {OTHER_COUNTRY_OPTION.iso2} {OTHER_COUNTRY_OPTION.name}
                        </option>
                      </select>
                      <div className="relative flex-1">
                        <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A6ADBA]" />
                        <input
                          type="tel"
                          inputMode="numeric"
                          className={inputClass(formErrors.phone) + " pl-9"}
                          value={form.phone}
                          onChange={(e) =>
                            setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 14) })
                          }
                          placeholder="3312345678"
                        />
                      </div>
                    </div>
                    {form.phoneCountry === "OTHER" && (
                      <input
                        type="text"
                        className={inputClass(formErrors.phone) + " mt-2"}
                        value={form.phoneCountryCustom}
                        onChange={(e) =>
                          setForm({
                            ...form,
                            phoneCountryCustom: e.target.value.replace(/[^\d+]/g, "").slice(0, 5),
                          })
                        }
                        placeholder="Enter your country code, e.g. +255"
                      />
                    )}
                  </Field>
                  <Field label="Email address" error={formErrors.email}>
                    <div className="relative">
                      <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A6ADBA]" />
                      <input
                        type="email"
                        className={inputClass(formErrors.email) + " pl-9"}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        placeholder="jane.doe@email.com"
                      />
                    </div>
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="English proficiency level" error={formErrors.englishLevel}>
                    <select
                      className={inputClass(formErrors.englishLevel)}
                      value={form.englishLevel}
                      onChange={(e) => setForm({ ...form, englishLevel: e.target.value })}
                    >
                      <option value="">Select a level</option>
                      <option value="B1 - Intermediate">B1 - Intermediate</option>
                      <option value="B2 - Upper Intermediate">B2 - Upper Intermediate</option>
                      <option value="C1 - Advanced">C1 - Advanced</option>
                      <option value="C2 / Native">C2 / Native</option>
                    </select>
                  </Field>
                  <Field label="Experience using Artificial Intelligence" error={formErrors.aiExperience}>
                    <select
                      className={inputClass(formErrors.aiExperience)}
                      value={form.aiExperience}
                      onChange={(e) => setForm({ ...form, aiExperience: e.target.value })}
                    >
                      <option value="">Select a level</option>
                      <option value="None">None</option>
                      <option value="Basic">Basic</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Remote work availability" error={formErrors.remoteAvailable}>
                    <YesNoToggle
                      value={form.remoteAvailable}
                      onChange={(v) => setForm({ ...form, remoteAvailable: v })}
                      error={formErrors.remoteAvailable}
                    />
                  </Field>
                  <Field label={<span className="flex items-center gap-1.5"><Laptop size={13}/> Own laptop / computer?</span>} error={formErrors.ownDevice}>
                    <YesNoToggle
                      value={form.ownDevice}
                      onChange={(v) => setForm({ ...form, ownDevice: v })}
                      error={formErrors.ownDevice}
                    />
                  </Field>
                </div>

                <p className="text-[12px] text-[#8891A0] text-center">
                  We use your approximate location (based on your connection) to help
                  route your application to the right team — no need to enter it
                  yourself.
                </p>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-[#0053FF] text-white text-[14px] font-semibold py-3 hover:bg-[#0040CC] transition-colors duration-200"
                >
                  Continue to case assessment <ChevronRight size={16} />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* ===== EXHIBIT C — ASSESSMENT ===== */}
        {step === "assessment" && selectedRole && (
          <div className={selectedRole.caseStudy ? "max-w-3xl" : "max-w-2xl"}>
            <div className="flex items-center justify-between mb-5">
              <button
                onClick={() => setStep("form")}
                className="flex items-center gap-1.5 text-[13px] text-[#5B6472] hover:text-[#0053FF]"
              >
                <ArrowLeft size={14} /> Back to candidate profile
              </button>
              <SyncBadge status={syncStatus} />
            </div>

            {!assessmentStarted ? (
              <div className="bg-white border border-[#E2E5EA] rounded-xl p-6 sm:p-9 text-center">
                <div className="w-14 h-14 rounded-full bg-[#F0F4FF] flex items-center justify-center mx-auto mb-5">
                  <Clock size={26} className="text-[#0053FF]" />
                </div>
                <h2 className="text-[20px] font-bold text-[#0A1128] mb-2">
                  Before you begin
                </h2>
                <p className="text-[13px] text-[#5B6472] mb-5">
                  {selectedRole.title} · {selectedRole.department}
                </p>
                <div className="rounded-lg bg-[#FFF8E6] border border-[#F5DFA0] px-5 py-4 max-w-md mx-auto text-left mb-6">
                  <p className="text-[14px] text-[#7A5B00] leading-relaxed">
                    <strong>
                      This assessment takes approximately {selectedRole.estimatedMinutes}{" "}
                      minutes
                    </strong>{" "}
                    to complete. Please make sure you have that time available right
                    now — once you start, we recommend finishing it in one sitting.
                  </p>
                </div>
                <p className="text-[13px] text-[#5B6472] max-w-md mx-auto mb-7">
                  Only continue if you're ready to begin. You'll be able to save your
                  progress as you go, but the case study and questions won't be shown
                  until you click below.
                </p>
                <button
                  onClick={() => setAssessmentStarted(true)}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#0053FF] text-white text-[14px] font-semibold px-6 py-3 hover:bg-[#0040CC] transition-colors duration-200"
                >
                  I have the time — Start the assessment <ChevronRight size={16} />
                </button>
              </div>
            ) : (
            <div className="bg-white border border-[#E2E5EA] rounded-xl p-5 sm:p-7">
              <div className="flex items-center gap-2 mb-1">
                <FileText size={16} className="text-[#0053FF]" />
                <h2 className="text-[20px] font-bold text-[#0A1128]">
                  Case Assessment
                </h2>
              </div>
              <p className="text-[13px] text-[#5B6472] mb-1">
                {selectedRole.title} · {selectedRole.department}
              </p>

              {selectedRole.caseStudy ? (
                <div className="rounded-lg bg-[#EAFBFF] border border-[#BFF3FF] px-4 py-3 my-5 text-[13px] text-[#0A5A73] leading-relaxed">
                  <strong>Instructions:</strong> Please carefully read the client story
                  below, then complete the two tasks that follow. You're welcome to draw
                  on your own knowledge, independent research, and any technology you find
                  helpful.
                </div>
              ) : (
                <div className="rounded-lg bg-[#EAFBFF] border border-[#BFF3FF] px-4 py-3 my-5 text-[13px] text-[#0A5A73] leading-relaxed">
                  <strong>Instructions:</strong> Read each scenario carefully and respond as
                  you would in a real work situation. There are no trick questions — we're
                  looking for clear thinking and professional judgment. Answer in complete
                  sentences; there is no minimum or maximum length.
                </div>
              )}

              {selectedRole.caseStudy && (
                <div className="mb-6 rounded-lg border border-[#E2E5EA] bg-[#F7F8FA] p-4 sm:p-5">
                  <div
                    className="text-[11px] uppercase tracking-wider text-[#0053FF] font-medium mb-3"
                    style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                  >
                    Client story — {selectedRole.caseStudy.clientName}
                  </div>
                  <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                    {selectedRole.caseStudy.story.map((para, i) => (
                      <p key={i} className="text-[13.5px] text-[#3A4150] leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                  <div className="mt-4 flex items-start gap-1.5 text-[12.5px] text-[#5B6472] border-t border-[#E2E5EA] pt-3">
                    <AlertCircle size={13} className="text-[#0053FF] mt-[2px] shrink-0" />
                    {selectedRole.caseStudy.formattingNote}
                  </div>
                </div>
              )}

              <div className="space-y-6">
                {selectedRole.questions.map((q, i) => (
                  <div key={q.id}>
                    <div
                      className="text-[11px] uppercase tracking-wider text-[#0053FF] font-medium mb-1.5"
                      style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                    >
                      Question {i + 1}
                    </div>
                    <p className="text-[14px] text-[#0A1128] leading-relaxed mb-2.5">
                      {q.prompt}
                    </p>
                    <textarea
                      rows={q.rows || 4}
                      className="w-full rounded-lg border border-[#DDE1E8] px-3.5 py-2.5 text-[14px] text-[#0A1128] bg-white placeholder:text-[#A6ADBA] focus:outline-none focus:ring-2 focus:ring-[#0053FF]/40 focus:border-[#0053FF] resize-y"
                      placeholder={
                        q.allowFileUpload
                          ? "You can paste your draft here, or attach a file below instead..."
                          : "Type your response here..."
                      }
                      value={answers[q.id] || ""}
                      onChange={(e) =>
                        setAnswers({ ...answers, [q.id]: e.target.value })
                      }
                    />

                    {q.allowFileUpload && (
                      <div className="mt-3">
                        {!files[q.id] ? (
                          <label className="flex items-center justify-center gap-2 rounded-lg border-2 border-dashed border-[#DDE1E8] bg-[#F7F8FA] px-4 py-4 text-[13.5px] text-[#5B6472] cursor-pointer hover:border-[#0053FF]/50 hover:bg-[#F0F4FF] transition-colors duration-150">
                            <UploadCloud size={16} className="text-[#0053FF]" />
                            Upload a PDF or Word document (max {MAX_FILE_SIZE_MB} MB)
                            <input
                              type="file"
                              accept={ACCEPTED_FILE_TYPES}
                              className="hidden"
                              onChange={(e) =>
                                handleFileSelect(q.id, e.target.files?.[0])
                              }
                            />
                          </label>
                        ) : (
                          <div className="flex items-center justify-between gap-3 rounded-lg border border-[#BFF3FF] bg-[#EAFBFF] px-4 py-3">
                            <div className="flex items-center gap-2 min-w-0 text-[13.5px] text-[#0A5A73]">
                              <Paperclip size={15} className="shrink-0" />
                              <span className="truncate font-medium">
                                {files[q.id].fileName}
                              </span>
                              <span className="text-[#5B8A94] shrink-0">
                                ({files[q.id].sizeMB} MB)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleFileRemove(q.id)}
                              className="text-[#5B8A94] hover:text-[#D64545] shrink-0"
                              aria-label="Remove file"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        )}
                        {fileErrors[q.id] && (
                          <span className="mt-1.5 flex items-center gap-1 text-[12px] text-[#D64545]">
                            <AlertCircle size={12} /> {fileErrors[q.id]}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={handleAssessmentSubmit}
                disabled={!allAnswered}
                className={[
                  "mt-7 w-full flex items-center justify-center gap-1.5 rounded-lg text-[14px] font-semibold py-3 transition-colors duration-200",
                  allAnswered
                    ? "bg-[#0053FF] text-white hover:bg-[#0040CC]"
                    : "bg-[#E7E9EE] text-[#A6ADBA] cursor-not-allowed",
                ].join(" ")}
              >
                Submit application <ChevronRight size={16} />
              </button>
            </div>
            )}
          </div>
        )}

        {/* ===== EXHIBIT D — CONFIRMATION ===== */}
        {step === "confirmation" && selectedRole && (
          <div className="max-w-2xl">
            <div className="bg-white border border-[#E2E5EA] rounded-xl p-6 sm:p-9 text-center">
              <div className="w-14 h-14 rounded-full bg-[#E3FFF8] flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 size={28} className="text-[#00B37D]" />
              </div>
              <h2 className="text-[22px] font-bold mb-2 text-[#0A1128]">
                Application filed
              </h2>
              <p className="text-[14px] text-[#5B6472] max-w-md mx-auto leading-relaxed mb-6">
                Thank you, {form.firstName}. Your application for{" "}
                <strong className="text-[#0A1128]">{selectedRole.title}</strong> has
                been received. Our recruiting team will review your case assessment and
                reach out to {form.email} regarding next steps.
              </p>
              <div
                className="inline-block rounded-lg bg-[#DCE1EB] border border-[#C7CDDB] px-4 py-2 text-[13px] text-[#5B6472]"
                style={{ fontFamily: "'IBM Plex Mono', monospace" }}
              >
                Reference ID: <span className="text-[#0A1128] font-medium">{lastAppId}</span>
              </div>
              <div className="mt-7">
                <button
                  onClick={handleStartOver}
                  className="text-[13.5px] text-[#0053FF] hover:underline font-medium"
                >
                  Submit another application
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="border-t border-[#E2E5EA] mt-6">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="text-[12.5px] text-[#8891A0]">
            © {new Date().getFullYear()} JAL LAW Group — ZA · LPL · GLA
          </span>
          <button
            onClick={handleRecruiterToggle}
            className="flex items-center gap-1.5 text-[12.5px] text-[#8891A0] hover:text-[#0053FF] transition-colors"
          >
            <Lock size={12} /> Recruiter access
          </button>
        </div>
      </footer>

      {/* ---------------- RECRUITER PANEL ---------------- */}
      {recruiterOpen && (
        <div className="border-t-[3px] border-[#00FF6C] bg-[#0053FF]">
          <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8">
            <div className="flex items-center justify-between gap-3 mb-1">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-[#00FFD2]" />
                <span
                  className="text-[11px] uppercase tracking-[0.18em] text-[#00FFD2] font-medium"
                  style={{ fontFamily: "'IBM Plex Mono', monospace" }}
                >
                  For internal use only
                </span>
              </div>
              {recruiterUnlocked && (
                <button
                  onClick={loadSheetApplications}
                  disabled={sheetFetchState === "loading"}
                  className="flex items-center gap-1.5 text-[12.5px] font-medium text-white/80 hover:text-white transition-colors disabled:opacity-60"
                >
                  {sheetFetchState === "loading" ? (
                    <Loader2 size={13} className="animate-spin" />
                  ) : (
                    <RefreshCw size={13} />
                  )}
                  Refresh
                </button>
              )}
            </div>
            <h3 className="text-[19px] font-bold text-white mb-1">
              Recruiter Evaluation Tool
            </h3>

            {!recruiterUnlocked ? (
              <div className="max-w-sm">
                <p className="text-[13.5px] text-white/75 mb-4">
                  Enter the recruiter password to view candidate data.
                </p>
                <form onSubmit={handleRecruiterUnlock} className="space-y-3">
                  <div className="relative">
                    <Lock
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
                    />
                    <input
                      type="password"
                      autoFocus
                      value={recruiterPasswordInput}
                      onChange={(e) => {
                        setRecruiterPasswordInput(e.target.value);
                        setRecruiterAuthError(false);
                      }}
                      placeholder="Password"
                      className="w-full rounded-lg border border-white/25 bg-white/10 pl-9 pr-3.5 py-2.5 text-[14px] text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-[#00FFD2]/50 focus:border-[#00FFD2]"
                    />
                  </div>
                  {recruiterAuthError && (
                    <span className="flex items-center gap-1 text-[12.5px] text-[#FFB4B4]">
                      <AlertCircle size={12} /> That password isn't right — try again.
                    </span>
                  )}
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-[#00FFD2] text-[#0A1128] text-[13.5px] font-semibold py-2.5 hover:bg-white transition-colors duration-200"
                  >
                    Unlock
                  </button>
                </form>
              </div>
            ) : (
              <>
                {usingSheetData ? (
                  <p className="text-[13.5px] text-white/75 mb-2 max-w-xl">
                    Showing every application recorded in your Google Sheet — submitted
                    or still in progress, from any day, any device.
                  </p>
                ) : sheetFetchState === "loading" ? (
                  <p className="text-[13.5px] text-white/75 mb-2 max-w-xl flex items-center gap-1.5">
                    <Loader2 size={13} className="animate-spin" /> Loading applications
                    from your Google Sheet…
                  </p>
                ) : (
                  <div className="flex items-start gap-2 rounded-lg bg-white/10 border border-white/20 px-4 py-3 mb-2 max-w-xl">
                    <WifiOff size={15} className="text-[#FFD866] mt-0.5 shrink-0" />
                    <p className="text-[13px] text-white/85 leading-relaxed">
                      Couldn't load live data from your Google Sheet
                      {sheetFetchReason === "unauthorized"
                        ? " (access key didn't match — check RECRUITER_ACCESS_KEY in both files)."
                        : sheetFetchReason === "not_configured"
                        ? " (no Sheet connected yet)."
                        : " (likely a browser CORS restriction)."}{" "}
                      Showing this browser session's applications instead. Your Google
                      Sheet itself still has everything — open it directly if you need
                      the full history right now.
                    </p>
                  </div>
                )}

                <p className="text-[13.5px] text-white/75 mb-6 max-w-xl">
                  Generate a structured evaluation prompt for any candidate below, then
                  copy it into your AI assistant of choice for an instant, structured
                  assessment.
                </p>

                {displayApps.length === 0 ? (
                  <div className="rounded-lg border border-dashed border-white/25 px-5 py-8 text-center text-[13.5px] text-white/70">
                    {sheetFetchState === "loading"
                      ? "Loading…"
                      : "No applications found yet."}
                  </div>
                ) : (
                  <div className="space-y-8">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <CheckCircle2 size={15} className="text-[#00FFD2]" />
                        <h4 className="text-[13.5px] font-bold text-white uppercase tracking-wide">
                          Completed
                        </h4>
                        <span className="text-[12px] text-white/60">({completedApps.length})</span>
                      </div>
                      {completedApps.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-white/20 px-4 py-5 text-center text-[13px] text-white/60">
                          No completed applications yet.
                        </div>
                      ) : (
                        <div className="space-y-3">{completedApps.map(renderCandidateCard)}</div>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock size={15} className="text-[#FFD866]" />
                        <h4 className="text-[13.5px] font-bold text-white uppercase tracking-wide">
                          In progress
                        </h4>
                        <span className="text-[12px] text-white/60">({inProgressApps.length})</span>
                      </div>
                      {inProgressApps.length === 0 ? (
                        <div className="rounded-lg border border-dashed border-white/20 px-4 py-5 text-center text-[13px] text-white/60">
                          Nobody currently mid-application.
                        </div>
                      ) : (
                        <div className="space-y-3">{inProgressApps.map(renderCandidateCard)}</div>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
