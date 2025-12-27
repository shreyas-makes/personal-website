type OgFont = {
  name: string;
  data: ArrayBuffer;
  weight: number;
  style: 'normal' | 'italic';
};

const loadFont = async (
  baseUrl: string,
  path: string,
  weight: number
): Promise<OgFont> => {
  const url = new URL(path, baseUrl).toString();
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to load font: ${path}`);
  }

  const data = await response.arrayBuffer();
  return {
    name: 'Inter',
    data,
    weight,
    style: 'normal'
  };
};

export const loadOgFonts = async (baseUrl: string) => {
  return Promise.all([
    loadFont(baseUrl, '/images/og/fonts/inter-400.woff', 400),
    loadFont(baseUrl, '/images/og/fonts/inter-600.woff', 600),
    loadFont(baseUrl, '/images/og/fonts/inter-700.woff', 700)
  ]);
};
