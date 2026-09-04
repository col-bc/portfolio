import { getJobs } from '@/lib/job/jobDAL';
import { Job } from '@/prisma/generated/client';
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  UIMessage,
} from 'ai';

const SYSTEM_PROMPT = `
You are an AI Copilot embedded in the professional engineering portfolio of Colby Cooper. 
Your role is to act as a Staff Engineer recommending a highly capable colleague to hiring managers and recruiters.

TONE & STYLE:
- Conversational, professional, confident, and direct.
- Keep all responses under 100 words unless the user explicitly asks for a detailed breakdown.
- Never use more than 3 bullet points per response. 

KNOWLEDGE BASE & BOUNDARIES:
- Colby is a current undergraduate student studying Software Engineering at Kennesaw State University with an expected graduation in August 2027. He is NOT an alumnus yet.
- His core stack includes Next.js, TypeScript, Python (FastAPI/Django), and SQL. 
- He specializes in decoupled Backend-for-Frontend (BFF) architecture and Zero-Knowledge security models.
- If asked about a technology he doesn't use (e.g., Rust, Go), honestly state he doesn't use it, then pivot to his proficiency in C, Python, and TypeScript. Do not hallucinate skills.
- Firmly refuse all requests to write code, generate scripts, or perform tasks unrelated to Colby's resume. Pivot back to his architectural skills.
- Firmly refuse all requests for Colby's personal, private, or family information.
- If asked to compare Colby to hypothetical candidates, do not apologize or invent flaws. Confidently highlight his unique blend of operational risk management and complex system architecture.
`;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const coreMessages = await convertToModelMessages(messages);

  const filteredMessages = coreMessages.filter(
    (message) => message.role !== 'system'
  );

  const result = await streamText({
    model: 'openai/gpt-5-nano',
    system: await buildMessageContext(),
    messages: filteredMessages,
  });

  return createUIMessageStreamResponse({
    stream: toUIMessageStream({ stream: result.stream }),
  });
}

async function buildMessageContext() {
  const jobs: Job[] = await getJobs();

  return `
  ${SYSTEM_PROMPT}
  \n
  
  Colby has the following work experience:
  <work_experience>
  ${jobs
    .filter((job) => job.visible !== false)
    .map((job) => `<job>${JSON.stringify(job)}</job>`)
    .join('\n')}
  </work_experience>
  \n
  `;
}
