#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const IGNORE_DIRS = new Set(['.git', 'node_modules', 'dist', '.astro']);
const CSS_EXTENSIONS = new Set(['.css', '.scss', '.sass']);

const colorValueSuggestions = {
  '#ffffff': 'var(--color-bg-body)',
  '#fff': 'var(--color-bg-body)',
  '#000000': 'var(--color-text-primary)',
  '#000': 'var(--color-text-primary)',
  '#f8f9fa': 'var(--color-bg-surface)',
  '#f9fafb': 'var(--color-bg-muted)',
  '#f3f4f6': 'var(--color-bg-hover)',
  '#161618': 'var(--color-bg-body)',
  '#1f2937': 'var(--color-bg-surface)',
  '#111827': 'var(--color-bg-muted)',
  '#1e293b': 'var(--color-bg-hover)',
  '#666666': 'var(--color-text-secondary)',
  '#666': 'var(--color-text-secondary)',
  '#dddddd': 'var(--color-text-on-overlay)',
  '#ddd': 'var(--color-text-on-overlay)',
  '#e1e1e1': 'var(--color-text-primary)',
  '#d1d5db': 'var(--color-text-secondary)',
  '#9ca3af': 'var(--color-text-muted)',
  '#e2e8f0': 'var(--color-border-default)',
  '#e5e7eb': 'var(--color-border-subtle)',
  '#374151': 'var(--color-border-strong)',
  '#2563eb': 'var(--color-action-primary)',
  '#1d4ed8': 'var(--color-action-primary-hover)',
  '#3b82f6': 'var(--color-action-primary)',
  'rgba(0, 0, 0, 0.1)': 'var(--color-bg-overlay)',
  'rgba(255, 255, 255, 0.1)': 'var(--color-bg-overlay)',
  'rgba(0,0,0,0.1)': 'var(--color-bg-overlay)',
  'rgba(255,255,255,0.1)': 'var(--color-bg-overlay)'
};

const spacingValueSuggestions = {
  '0': 'var(--space-0)',
  '0.125rem': 'var(--space-25)',
  '2px': 'var(--space-25)',
  '0.25rem': 'var(--space-50)',
  '4px': 'var(--space-50)',
  '0.375rem': 'var(--space-75)',
  '6px': 'var(--space-75)',
  '0.5rem': 'var(--space-100)',
  '8px': 'var(--space-100)',
  '0.75rem': 'var(--space-150)',
  '12px': 'var(--space-150)',
  '1rem': 'var(--space-200)',
  '16px': 'var(--space-200)',
  '1.25rem': 'var(--space-250)',
  '20px': 'var(--space-250)',
  '1.5rem': 'var(--space-300)',
  '24px': 'var(--space-300)',
  '1.75rem': 'var(--space-350)',
  '28px': 'var(--space-350)',
  '2rem': 'var(--space-400)',
  '32px': 'var(--space-400)',
  '2.5rem': 'var(--space-500)',
  '40px': 'var(--space-500)'
};

function walk(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (!IGNORE_DIRS.has(entry.name)) walk(fullPath, out);
      continue;
    }
    const ext = path.extname(entry.name).toLowerCase();
    if (CSS_EXTENSIONS.has(ext)) out.push(fullPath);
  }
  return out;
}

function suggestColor(prop, value) {
  const key = value.toLowerCase();
  if (colorValueSuggestions[key]) return colorValueSuggestions[key];
  if (prop.includes('border')) return 'var(--color-border-subtle)';
  if (prop.includes('background')) return 'var(--color-bg-surface)';
  return 'var(--color-text-primary)';
}

function suggestSpacing(value) {
  return spacingValueSuggestions[value.toLowerCase()] || 'var(--space-200)';
}

function reportIssue(type, file, line, violation, suggestion, severity) {
  return { type, file, line, violation, suggestion, severity };
}

function scanFile(filePath) {
  const rel = path.relative(ROOT, filePath);
  const lines = fs.readFileSync(filePath, 'utf8').split(/\r?\n/);
  const issues = [];
  let inFontFace = false;

  for (let i = 0; i < lines.length; i += 1) {
    const rawLine = lines[i];
    if (/@font-face\b/.test(rawLine)) inFontFace = true;
    if (inFontFace && rawLine.includes('}')) {
      inFontFace = false;
      continue;
    }

    const line = rawLine.replace(/\/\*.*?\*\//g, '');
    const decl = line.match(/([a-zA-Z-]+)\s*:\s*([^;]+);/);
    if (!decl) continue;

    const prop = decl[1].toLowerCase();
    const value = decl[2].trim();

    if (prop.startsWith('--')) continue;
    if (inFontFace) continue;
    if (/var\(/.test(value)) continue;

    const hexMatches = value.match(/#(?:[0-9a-fA-F]{3,8})\b/g) || [];
    const rgbMatches = value.match(/rgba?\([^\)]+\)/g) || [];
    for (const color of [...hexMatches, ...rgbMatches]) {
      issues.push(reportIssue(
        'hardcoded-color',
        rel,
        i + 1,
        `${prop}: ${color}`,
        suggestColor(prop, color),
        'error'
      ));
    }

    if (/^(margin|margin-|padding|padding-|gap|row-gap|column-gap)$/.test(prop)) {
      const spacingMatches = value.match(/-?\d*\.?\d+(?:px|rem|em)\b/g) || [];
      for (const spacing of spacingMatches) {
        issues.push(reportIssue(
          'raw-spacing',
          rel,
          i + 1,
          `${prop}: ${spacing}`,
          suggestSpacing(spacing),
          'error'
        ));
        if (!spacingValueSuggestions[spacing.toLowerCase()]) {
          issues.push(reportIssue(
            'uncommon-spacing',
            rel,
            i + 1,
            `${prop}: ${spacing}`,
            'Add a dedicated --space-* alias if this value is intentional',
            'warning'
          ));
        }
      }
    }

    if (prop === 'font-size') {
      const fontSizeMatches = value.match(/-?\d*\.?\d+(?:px|rem|em)\b/g) || [];
      for (const size of fontSizeMatches) {
        issues.push(reportIssue(
          'raw-font-size',
          rel,
          i + 1,
          `${prop}: ${size}`,
          'Use a --font-size-* alias',
          'error'
        ));
      }
    }

    if (prop === 'font-weight' && /\b\d{3}\b/.test(value)) {
      const weightMatches = value.match(/\b\d{3}\b/g) || [];
      for (const weight of weightMatches) {
        issues.push(reportIssue(
          'raw-font-weight',
          rel,
          i + 1,
          `${prop}: ${weight}`,
          'Use a --font-weight-* alias',
          'error'
        ));
      }
    }

    if (/radius/.test(prop)) {
      const radiusMatches = value.match(/-?\d*\.?\d+px\b/g) || [];
      for (const radius of radiusMatches) {
        issues.push(reportIssue(
          'raw-radius',
          rel,
          i + 1,
          `${prop}: ${radius}`,
          'Use --radius-sm, --radius-md, --radius-lg, or --radius-pill',
          'error'
        ));
      }
    }

    if (prop === 'z-index' && /-?\d+/.test(value)) {
      issues.push(reportIssue(
        'raw-z-index',
        rel,
        i + 1,
        `${prop}: ${value}`,
        'Use --z-overlay (or add a z-token alias)',
        'error'
      ));
    }

    if (prop === 'box-shadow' && value.toLowerCase() !== 'none') {
      issues.push(reportIssue(
        'raw-box-shadow',
        rel,
        i + 1,
        `${prop}: ${value}`,
        'Use --shadow-sm or --shadow-sm-strong',
        'error'
      ));
    }

    if ((prop === 'transition' || prop === 'transition-duration') && /\b\d*\.?\d+(?:ms|s)\b/.test(value)) {
      const durationMatches = value.match(/\b\d*\.?\d+(?:ms|s)\b/g) || [];
      for (const duration of durationMatches) {
        issues.push(reportIssue(
          'raw-transition-duration',
          rel,
          i + 1,
          `${prop}: ${duration}`,
          'Use --motion-duration-fast (or a motion alias)',
          'warning'
        ));
      }
    }
  }

  return issues;
}

const files = walk(ROOT).sort();
const issues = files.flatMap(scanFile);
const errors = issues.filter((issue) => issue.severity === 'error');
const warnings = issues.filter((issue) => issue.severity === 'warning');

console.log('Token Audit');
console.log(`Scanning ${files.length} CSS file(s)...\n`);

for (const issue of issues) {
  const marker = issue.severity === 'error' ? 'x' : '!';
  console.log(`${issue.file}`);
  console.log(` ${marker} L${issue.line}: ${issue.violation}`);
  console.log(`   Suggestion: ${issue.suggestion}\n`);
}

const filesWithIssues = new Set(issues.map((issue) => issue.file));
console.log('=== Summary ===');
console.log(`Files scanned: ${files.length}`);
console.log(`Files with issues: ${filesWithIssues.size}`);
console.log(`Errors: ${errors.length}`);
console.log(`Warnings: ${warnings.length}`);

process.exit(errors.length > 0 ? 1 : 0);
