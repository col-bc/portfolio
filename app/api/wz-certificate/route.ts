'use server';
import fs from 'fs';
import path from 'path';

function getWzCertificate() {
  const filePath = path.join(process.cwd(), 'public', 'wz-certificate.jpg');
  return fs.promises.readFile(filePath);
}

export async function GET() {
  const certificate = await getWzCertificate();

  return new Response(certificate, {
    headers: {
      'Content-Type': 'image/jpeg',
      'Content-Disposition': 'inline; filename="wz-certificate.jpg"',
    },
  });
}
