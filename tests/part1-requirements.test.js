import { describe, test, expect, beforeAll } from 'vitest';
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

const cleanArrFromEmptyItems = (arr) => arr.filter((item) => item !== '');

describe('Part 1: HTML Requirements', { skip: !parsedHtml }, () => {
  test('The document title should include "resume"', () => {
    const title = parsedHtml.querySelector('title');
    expect(title?.text.toLowerCase()).toMatch(/resume/);
  });

  test('The page has a single page heading HTML Element (h1)', () => {
    const h1Elements = parsedHtml.querySelectorAll('h1');
    expect(h1Elements.length).toBe(1);
  });

  test('The page has 5 section heading HTML Elements (h2)', () => {
    const h2Elements = parsedHtml.querySelectorAll('h2');
    expect(h2Elements.length).toBe(5);
  });

  test('The page has a section heading "Talented Frontend Developer"', () => {
    const h2Elements = parsedHtml.querySelectorAll('h2');
    const hasTargetHeading = h2Elements.some((h2) =>
      h2.text.includes('Talented Frontend Developer')
    );
    expect(hasTargetHeading).toBe(true);
  });

  test('The page has a single image HTML Element (img)', () => {
    const imgElements = parsedHtml.querySelectorAll('img');
    expect(imgElements.length).toBe(1);
  });

  test('The image has the src attribute set and the attribute has a value', () => {
    const img = parsedHtml.querySelector('img');
    const src = img?.getAttribute('src');
    expect(src).toBeTruthy();
    expect(src?.length).toBeGreaterThan(0);
  });

  test('The image has the alt attribute set and the attribute has a value', () => {
    const img = parsedHtml.querySelector('img');
    const alt = img?.getAttribute('alt');
    expect(alt).toBeTruthy();
    expect(alt?.length).toBeGreaterThan(0);
  });

  test('The page has a section heading "About Me"', () => {
    const h2Elements = parsedHtml.querySelectorAll('h2');
    const hasAboutMe = h2Elements.some((h2) => h2.text.includes('About Me'));
    expect(hasAboutMe).toBe(true);
  });

  test('The page has a single paragraph HTML Element (p)', () => {
    const pElements = parsedHtml.querySelectorAll('p');
    expect(pElements.length).toBe(1);
  });

  test('The paragraph of text has at least 50 words', () => {
    const p = parsedHtml.querySelector('p');
    const text = p?.text || '';
    const words = cleanArrFromEmptyItems(text.trim().split(' '));
    expect(words.length).toBeGreaterThanOrEqual(50);
  });

  test('The page has a section heading "My Skills"', () => {
    const h2Elements = parsedHtml.querySelectorAll('h2');
    const hasMySkills = h2Elements.some((h2) => h2.text.includes('My Skills'));
    expect(hasMySkills).toBe(true);
  });

  test('The page has a single ordered list', () => {
    const olElements = parsedHtml.querySelectorAll('ol');
    expect(olElements.length).toBe(1);
  });

  test('The ordered list contains 6 list item elements', () => {
    const ol = parsedHtml.querySelector('ol');
    const liElements = ol?.querySelectorAll('li');
    expect(liElements?.length).toBe(6);
  });

  test('The page has a section heading "My Hobbies"', () => {
    const h2Elements = parsedHtml.querySelectorAll('h2');
    const hasMyHobbies = h2Elements.some((h2) =>
      h2.text.includes('My Hobbies')
    );
    expect(hasMyHobbies).toBe(true);
  });

  test('The page has a single unordered list', () => {
    const ulElements = parsedHtml.querySelectorAll('ul');
    expect(ulElements.length).toBe(1);
  });

  test('The unordered list contains 4 list item elements', () => {
    const ul = parsedHtml.querySelector('ul');
    const liElements = ul?.querySelectorAll('li');
    expect(liElements?.length).toBe(4);
  });

  test('The page has a section heading "Contact Me"', () => {
    const h2Elements = parsedHtml.querySelectorAll('h2');
    const hasContactMe = h2Elements.some((h2) =>
      h2.text.toLowerCase().includes('contact me')
    );
    expect(hasContactMe).toBe(true);
  });

  test('The page has a single table HTML Element', () => {
    const tableElements = parsedHtml.querySelectorAll('table');
    expect(tableElements.length).toBe(1);
  });

  test('The table has 4 rows', () => {
    const table = parsedHtml.querySelector('table');
    const trElements = table?.querySelectorAll('tr');
    expect(trElements?.length).toBe(4);
  });

  test('The table has 4 table header cells', () => {
    const table = parsedHtml.querySelector('table');
    const thElements = table?.querySelectorAll('th');
    expect(thElements?.length).toBe(4);
  });

  test('The table has 4 table data cells', () => {
    const table = parsedHtml.querySelector('table');
    const tdElements = table?.querySelectorAll('td');
    expect(tdElements?.length).toBe(4);
  });

  test('The table has required service headers', () => {
    const thElements = parsedHtml.querySelectorAll('th');
    const headerTexts = thElements.map((th) => th.text.toLowerCase());

    expect(headerTexts.some((text) => text.includes('discord'))).toBe(true);
    expect(headerTexts.some((text) => text.includes('email'))).toBe(true);
    expect(headerTexts.some((text) => text.includes('github'))).toBe(true);
    expect(headerTexts.some((text) => text.includes('linkedin'))).toBe(true);
  });

  test('The table has 3 anchor elements', () => {
    const table = parsedHtml.querySelector('table');
    const aElements = table?.querySelectorAll('a');
    expect(aElements?.length).toBe(3);
  });

  test('The table has 2 anchor elements that open in a new tab', () => {
    const table = parsedHtml.querySelector('table');
    const aElements = table?.querySelectorAll('a[target="_blank"]');
    expect(aElements?.length).toBe(2);
  });

  test('Has an anchor element with valid email content', () => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const aElements = parsedHtml.querySelectorAll('a');
    const hasValidEmail = aElements.some((a) => emailRegex.test(a.text));
    expect(hasValidEmail).toBe(true);
  });

  test('Has an anchor element that runs an email client when clicked', () => {
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const aElements = parsedHtml.querySelectorAll('a');
    const emailLink = aElements.find((a) => emailRegex.test(a.text));
    const href = emailLink?.getAttribute('href');
    expect(href).toContain('mailto:');
  });
});
