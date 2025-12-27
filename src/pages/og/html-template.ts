type OgMetaItem = {
  label: string;
  value: string;
};

type OgHtmlProps = {
  title: string;
  description: string;
  badge: string;
  meta: OgMetaItem[];
  backgroundUrl: string;
  avatarUrl: string;
  siteText?: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const safeText = (value: string) => escapeHtml(value || '');

export const buildOgHtml = ({
  title,
  description,
  badge,
  meta,
  backgroundUrl,
  avatarUrl,
  siteText = 'shreyasprakash.com'
}: OgHtmlProps) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      html, body {
        margin: 0;
        width: 1200px;
        height: 630px;
        font-family: 'Inter', sans-serif;
      }
      body {
        background-color: #050707;
      }
    </style>
  </head>
  <body>
    <div class="relative w-[1200px] h-[630px] overflow-hidden">
      <img src="${backgroundUrl}" class="absolute inset-0 h-full w-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-black/55 to-black/85"></div>
      <div class="absolute -top-40 -right-28 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_70%)]"></div>
      <div class="absolute left-0 top-1/2 h-px w-[72px] bg-white/70"></div>

      <div class="relative z-10 flex h-full flex-col justify-between px-[72px] py-[72px] text-white">
        <div class="flex items-center justify-end">
          <div class="rounded-full border border-white/30 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.24em] text-white/80">
            ${safeText(badge)}
          </div>
        </div>

        <div class="flex items-center justify-between gap-10">
          <div class="max-w-[760px]">
            <h1 class="text-[72px] font-bold leading-[1.05] tracking-[-0.02em]">${safeText(title)}</h1>
            <p class="mt-5 max-w-[680px] text-[24px] leading-[1.5] text-white/80">${safeText(description)}</p>
          </div>
          <div class="flex h-[180px] w-[180px] items-center justify-center rounded-full border-2 border-white/55 bg-black/30 p-[6px]">
            <img src="${avatarUrl}" class="h-full w-full rounded-full object-cover" />
          </div>
        </div>

        <div class="flex items-end justify-between">
          <div class="flex gap-9">
            ${meta
              .map(
                item => `
              <div class="flex flex-col gap-1">
                <span class="text-[11px] font-bold uppercase tracking-[0.16em] text-white/65">${safeText(
                  item.label
                )}</span>
                <span class="text-[18px] font-semibold text-white">${safeText(item.value)}</span>
              </div>`
              )
              .join('')}
          </div>
          <div class="rounded-xl border border-white/25 px-4 py-2 text-[14px] font-semibold uppercase tracking-[0.08em] text-white/75">
            ${safeText(siteText)}
          </div>
        </div>
      </div>
    </div>
  </body>
</html>`;
