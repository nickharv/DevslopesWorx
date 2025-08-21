import { describe, test, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { parse } from 'node-html-parser';

let htmlContent = '';
let parsedHtml = null;
let fileExists = false;

const filePath = path.resolve(process.cwd(), 'index.html');
fileExists = fs.existsSync(filePath);

if (fileExists) {
  htmlContent = fs.readFileSync(filePath, 'utf8');
  parsedHtml = parse(htmlContent);
}

describe('HTML Structure Validation', () => {
  test('index.html file exists', () => {
    expect(fileExists).toBe(true);
  });

  test('HTML content can be read', () => {
    expect(htmlContent).toBeTruthy();
  });

  test('DOCTYPE declaration exists', () => {
    if (!htmlContent) return;
    const hasDoctype = htmlContent.toUpperCase().startsWith('<!DOCTYPE');
    expect(hasDoctype).toBe(true);
  });

  test('HTML element exists and there is only 1 in the document', () => {
    if (!htmlContent) return;
    const htmlMatches = htmlContent.match(/<html[\s\S]*?<\/html>/gi);
    expect(htmlMatches).toBeTruthy();
    expect(htmlMatches?.length).toBe(1);
  });

  test('HEAD and BODY elements exist and are only 1 of each in the document', () => {
    if (!htmlContent) return;
    const headMatches = htmlContent.match(/<head[\s\S]*?<\/head>/gi);
    const bodyMatches = htmlContent.match(/<body[\s\S]*?<\/body>/gi);
    expect(headMatches).toBeTruthy();
    expect(bodyMatches).toBeTruthy();
    expect(headMatches?.length).toBe(1);
    expect(bodyMatches?.length).toBe(1);
  });

  test('HTML element has exactly two children (HEAD and BODY)', () => {
    if (!parsedHtml) return;
    const html = parsedHtml.querySelector('html');
    expect(html).toBeTruthy();
    const children = html?.childNodes.filter((node) => node.nodeType === 1);
    expect(children?.length).toBe(2);
  });
});
