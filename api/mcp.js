import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { z } from "zod";

/**
 * JAL LAW Recruitment Portal — MCP Server
 * ----------------------------------------
 * Exposes your candidate data (the same Google Sheet your portal already
 * writes to) as tools an MCP-compatible AI client can call directly —
 * Claude on claude.ai (as a custom connector), Claude Desktop, or Claude
 * Code.
 *
 * SETUP
 * -----
 * 1. This file goes at api/mcp.js inside your existing recruitment-portal
 *    project (the same repo you already push to GitHub / deploy on Vercel).
 *    Vercel automatically turns anything inside an "api" folder into a
 *    serverless function — you don't configure routing by hand.
 * 2. Add the two dependencies this file needs to package.json (see
 *    package-additions.json alongside this file) and commit/push as usual.
 * 3. In your Vercel project settings → Environment Variables, add:
 *      MCP_SHARED_SECRET   → any private phrase only you know
 *    (GOOGLE_SHEETS_ENDPOINT and RECRUITER_ACCESS_KEY are already baked in
 *    below to match your portal, so you don't have to re-enter those.)
 * 4. Redeploy. Your MCP server's URL will be:
 *      https://YOUR-DOMAIN.vercel.app/api/mcp?key=YOUR_MCP_SHARED_SECRET
 * 5. In claude.ai, add it as a custom connector using that exact URL
 *    (Settings → Connectors — the exact wording/location of "add a custom
 *    connector" can shift over time, so if you don't see it where expected,
 *    support.claude.com will have the current steps).
 *
 * SECURITY NOTE: the ?key=... in the URL is a basic shared-secret check —
 * anyone with that exact URL could query your candidate list. Keep the URL
 * private the same way you'd keep a password private; don't post it
 * anywhere public.
 */

const GOOGLE_SHEETS_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbz9bzKrX6z9s5WG4fRv37I3ao0dhINFr0ORNkZM_Zh3PIO6YLB7J8oYXIRo1UzwTE3i/exec";
const RECRUITER_ACCESS_KEY = "jal-xVGoq9ZgcQcL86BKk7CwRKRG";

// A lightweight, hand-maintained mirror of the roles in App.jsx — keep this
// in sync if you add/remove a position there. Only used for the
// "list_open_roles" tool below, so it's fine if it's a step behind.
const ROLES = [
  {
    title: "Case Captain",
    department: "Immigration Case Management",
    requirements: [
      "Bilingual — English and Spanish, C1 level or higher",
      "2+ years of experience in immigration case management or a similar role",
      "Ability to draft legal documents",
      "Experience tracking deadlines",
      "Law degree (preferred, not required)",
    ],
  },
  {
    title: "Legal Intern",
    department: "Immigration Case Management",
    requirements: [
      "Currently pursuing or recently completed a law degree",
      "Strong written and analytical skills",
      "English proficiency B2 or higher",
    ],
  },
  {
    title: "Client Success Analyst",
    department: "Customer Service",
    requirements: [
      "English proficiency: Intermediate to Advanced",
      "Experience in customer service, preferably in the legal sector",
      "Comfortable with CRMs and digital tools",
    ],
  },
  {
    title: "Community Manager",
    department: "Marketing & Communications",
    requirements: [
      "2+ years of experience in social media management or digital marketing",
      "Experience with video editing and podcast production",
      "Advanced English (professional reading and writing)",
    ],
  },
];

async function fetchApplications() {
  const url = `${GOOGLE_SHEETS_ENDPOINT}?key=${encodeURIComponent(RECRUITER_ACCESS_KEY)}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Sheet request failed: HTTP ${res.status}`);
  const data = await res.json();
  if (!data.ok) throw new Error(data.error || "Sheet returned an error");
  return data.applications || [];
}

function buildEvaluationPrompt(row) {
  const roleDef = ROLES.find((r) => r.title === row.role);
  const locationLine =
    row.city || row.country
      ? `- Approximate location (detected): ${[row.city, row.country].filter(Boolean).join(", ")}\n`
      : "";
  const fileNote = row.pdfLink ? `\nAttached file: ${row.pdfLink}\n` : "";

  return `You are a senior legal recruiter at JAL LAW Group evaluating a candidate for the ${row.role} position (${row.department}).

CANDIDATE PROFILE
- Name: ${row.firstName} ${row.lastName}
- Phone: ${row.phone}
- Email: ${row.email}
${locationLine}- Self-reported English proficiency: ${row.englishLevel}
- Self-reported AI tool experience: ${row.aiExperience}
- Remote work availability: ${row.remoteAvailability}
- Owns a personal laptop/computer: ${row.ownDevice}
- Expected salary range (USD): $${row.salaryMin || "?"} - $${row.salaryMax || "?"}
- Has a bank account in USD: ${row.hasUsdAccount || "not specified"}

ROLE APPLIED FOR
${row.role} — ${row.department}
${roleDef ? "\nREQUIREMENTS\n" + roleDef.requirements.map((r) => "- " + r).join("\n") + "\n" : ""}
CASE ASSESSMENT — CANDIDATE RESPONSES
${row.answersText || "(no answers recorded)"}
${fileNote}
EVALUATION INSTRUCTIONS
Score the candidate from 1-5 (5 = excellent) on each of the following, with one sentence of justification per score:
1. Written communication clarity and professionalism
2. Relevant reasoning/judgment demonstrated in the responses
3. English proficiency evidenced in the writing itself (compare against the self-reported level above)
4. Attention to detail and completeness of the responses
5. Overall fit for the ${row.role} role at a legal services firm

Then flag any notable strengths or red flags, and close with a hiring recommendation of Strong Yes, Yes, Maybe, or No, with a one-sentence rationale.`;
}

function buildServer() {
  const server = new McpServer({ name: "jal-law-recruitment", version: "1.0.0" });

  server.registerTool(
    "list_applications",
    {
      title: "List candidate applications",
      description:
        "List candidate applications submitted through the JAL LAW recruitment portal. Optionally filter by status (\"In progress\" or \"Submitted\") and/or by role title.",
      inputSchema: {
        status: z.enum(["all", "In progress", "Submitted"]).optional(),
        role: z.string().optional(),
      },
    },
    async ({ status, role }) => {
      const apps = await fetchApplications();
      const filtered = apps.filter(
        (a) =>
          (!status || status === "all" || a.status === status) &&
          (!role || (a.role || "").toLowerCase() === role.toLowerCase())
      );
      const summary = filtered.map((a) => ({
        applicationId: a.applicationId,
        name: `${a.firstName || ""} ${a.lastName || ""}`.trim(),
        role: a.role,
        status: a.status,
        email: a.email,
        country: a.country,
        city: a.city,
        lastUpdated: a.lastUpdated,
        submittedAt: a.submittedAt,
      }));
      return {
        content: [{ type: "text", text: JSON.stringify(summary, null, 2) }],
      };
    }
  );

  server.registerTool(
    "get_application",
    {
      title: "Get one application's full details",
      description:
        "Get the full details of a single candidate application, given its Application ID (as returned by list_applications).",
      inputSchema: { applicationId: z.string() },
    },
    async ({ applicationId }) => {
      const apps = await fetchApplications();
      const found = apps.find((a) => a.applicationId === applicationId);
      if (!found) {
        return {
          content: [{ type: "text", text: `No application found with ID ${applicationId}.` }],
          isError: true,
        };
      }
      return { content: [{ type: "text", text: JSON.stringify(found, null, 2) }] };
    }
  );

  server.registerTool(
    "generate_evaluation_prompt",
    {
      title: "Generate an AI evaluation prompt for a candidate",
      description:
        "Build the structured evaluation prompt (candidate profile + case assessment answers + scoring instructions) for one candidate, given their Application ID. Paste the result into any AI assistant to get a structured assessment, or ask this same assistant to evaluate it directly.",
      inputSchema: { applicationId: z.string() },
    },
    async ({ applicationId }) => {
      const apps = await fetchApplications();
      const row = apps.find((a) => a.applicationId === applicationId);
      if (!row) {
        return {
          content: [{ type: "text", text: `No application found with ID ${applicationId}.` }],
          isError: true,
        };
      }
      return { content: [{ type: "text", text: buildEvaluationPrompt(row) }] };
    }
  );

  server.registerTool(
    "list_open_roles",
    {
      title: "List open positions",
      description: "List the positions currently posted on the JAL LAW recruitment portal, with their requirements.",
      inputSchema: {},
    },
    async () => {
      return { content: [{ type: "text", text: JSON.stringify(ROLES, null, 2) }] };
    }
  );

  return server;
}

export default async function handler(req, res) {
  const sharedSecret = process.env.MCP_SHARED_SECRET;
  const providedKey = req.query?.key;

  if (!sharedSecret || providedKey !== sharedSecret) {
    res.statusCode = 401;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "unauthorized" }));
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "method_not_allowed", hint: "MCP clients call this URL with POST." }));
    return;
  }

  try {
    const server = buildServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    res.on("close", () => {
      transport.close();
      server.close();
    });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (err) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "server_error", detail: String(err) }));
  }
}
