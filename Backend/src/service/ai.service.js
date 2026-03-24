const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");
const puppeteer = require("puppeteer");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .describe(
      "The match score between the candidate's profile and the job describe",
    ),
  technicalQuestions: z.array(
    z
      .object({
        question: z
          .string()
          .describe("The technical question asked during the interview"),
        intention: z
          .string()
          .describe("The intention behind asking the technical question"),
        answer: z
          .string()
          .describe("How to answer the technical question effectively"),
      })
      .describe("List of technical questions asked during the interview"),
  ),
  behavioralQuestions: z.array(
    z
      .object({
        question: z
          .string()
          .describe("The behavioral question asked during the interview"),
        intention: z
          .string()
          .describe("The intention behind asking the behavioral question"),
        answer: z
          .string()
          .describe("How to answer the behavioral question effectively"),
      })
      .describe("List of behavioral questions asked during the interview"),
  ),
  skillGaps: z.array(
    z
      .object({
        skill: z
          .string()
          .describe("The skill gap identified during the interview"),
        severity: z.string().describe("The severity of the skill gap"),
      })
      .describe("List of skill gaps identified during the interview"),
  ),
  preparationPlan: z.array(
    z
      .object({
        day: z
          .string()
          .describe("The day for which the preparation plan is relevant"),
        focusArea: z
          .string()
          .describe("The focus area for preparation on that day"),
        tasks: z
          .array(z.string())
          .describe(
            "The specific tasks to focus on for preparation on that day",
          ),
      })
      .describe(
        "Day wise preparation plan for the candidate to address the identified skill gaps and improve performance in future interviews",
      ),
  ),
  title: z
    .string()
    .describe(
      "The title of the job for which the interview report is generated",
    ),
});

async function generateInterviewReport({
  selfDescription,
  jobDescription,
  resume,
}) {
  try {
    const prompt = `
You are an AI interview assistant.

Analyze the following candidate information carefully.

======================
CANDIDATE RESUME:
${resume}
======================

JOB DESCRIPTION:
${jobDescription}
======================

SELF DESCRIPTION:
${selfDescription}
======================

TASK:
1. Evaluate how well the candidate matches the job.
2. Generate relevant technical and behavioral interview questions.
3. Identify skill gaps.
4. Provide a structured preparation plan.

IMPORTANT:
- Return ONLY a valid JSON object.
- Do NOT add extra fields.
- Do NOT add explanations.
- Do NOT include markdown.
- Follow this exact structure strictly.

{
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "behavioralQuestions": [
    {
      "question": string,
      "intention": string,
      "answer": string
    }
  ],
  "skillGaps": [
    {
      "skill": string,
      "severity": string
    }
  ],
  "preparationPlan": [
    {
      "day": string,
      "focusArea": string,
      "tasks": string[]
    }
  ],
  "title": string
}

STRICT RULES:
- technicalQuestions MUST be an array of objects (NOT numbers, NOT strings)
- behavioralQuestions MUST be an array of objects
- skillGaps MUST be an array of objects & severity must be either low , high or medium no other than this
- preparationPlan MUST be an array of objects
- title must be of tech role i.e Devops , Software Engineeer etc

Each object must follow the exact structure.

Do NOT return:
- numbers
- strings
- stringified JSON

Now generate the response.
`;
    const res = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });
    // 🔥 STEP 1: Parse main JSON
    const parsed = JSON.parse(res.text);
    /********* */

    console.log("Raw AI Response:", parsed);

    /********* */
    // 🔥 STEP 2: Fix nested string objects
    const safeParse = (item) => {
      try {
        return typeof item === "string" ? JSON.parse(item) : item;
      } catch {
        return null;
      }
    };

    parsed.technicalQuestions = parsed.technicalQuestions
      .map(safeParse)
      .filter(Boolean);
    parsed.behavioralQuestions = parsed.behavioralQuestions
      .map(safeParse)
      .filter(Boolean);
    parsed.skillGaps = parsed.skillGaps.map(safeParse).filter(Boolean);
    parsed.preparationPlan = parsed.preparationPlan
      .map(safeParse)
      .filter(Boolean);

    // 🔥 STEP 3: Validate with Zod (VERY IMPORTANT)
    const validated = interviewReportSchema.parse(parsed);

    return validated;
    // console.log(JSON.parse(res.text));
    // return JSON.parse(res.text);
  } catch (err) {
    console.error(err);
  }
}

async function generatePdfFromHtml(htmlContent) {
  const browser = await puppeteer.launch({ args: ["--no-sandbox"] });
  try {
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    return pdfBuffer;
  } finally {
    await browser.close();
  }
}

async function generateResumeSummary({
  resume,
  selfDescription,
  jobDescription,
}) {
  const resumePdfSchema = z.object({
    html: z
      .string()
      .describe(
        "The HTML content of resume which can be converted to PDF using any library like puppeteer",
      ),
  });

  const prompt = `Generate resume for a candidate with the following details:
                  Resume : ${resume}
                  Self Description : ${selfDescription}
                  Job Description : ${jobDescription}
                  the response should be JSON object with single field "html" which contains the HTML content of the resume which is later converted into pdf using librray like puppeteer      
   `;
  try {
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: zodToJsonSchema(resumePdfSchema),
      },
    });
    console.log(result.text);
    const response = result.text;
    const jsonContent = JSON.parse(response);
    const pdfBuffer = await generatePdfFromHtml(jsonContent.html);
    console.log("pdf buffer " , pdfBuffer);
    return pdfBuffer;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

module.exports = { generateInterviewReport, generateResumeSummary };
