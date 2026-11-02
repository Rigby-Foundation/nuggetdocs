import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { generateOGImage } from 'fumadocs-ui/og';

export const revalidate = false;
export async function GET() {
  const logo = await readFile(join(process.cwd(), 'public/nugget.svg'));
  // Shared branding avoids remote font requests and the renderer's Persian
  // shaping limitation. Each page's social title and description stay localized.
  return generateOGImage({
    title: 'NuggetVPN',
    site: 'Rigby Foundation',
    primaryColor: '#f2b44e',
    primaryTextColor: '#24190a',
    icon: <img src={`data:image/svg+xml;base64,${logo.toString('base64')}`} alt="" width={64} height={64} />,
  });
}
