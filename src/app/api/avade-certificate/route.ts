'use server';
import fs from 'fs';
import path from 'path';

function getAvadeCertificate() {
  const filePath = path.join(process.cwd(), 'public', 'avade-certificate.pdf');
  return fs.promises.readFile(filePath);
}

export async function GET() {
  const certificate = await getAvadeCertificate();

  return new Response(certificate, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'inline; filename="avade-certificate.pdf"',
    },
  });
}
