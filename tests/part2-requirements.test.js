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

describe(
  'Part 2: CSS and JS Integration Requirements',
  { skip: !parsedHtml },
  () => {
    test('Has the link tag set in the head', () => {
      const head = parsedHtml.querySelector('head');
      const link = head?.querySelector('link');
      expect(link).toBeTruthy();
    });

    test('Has the link rel attribute value equal to "stylesheet"', () => {
      const head = parsedHtml.querySelector('head');
      const link = head?.querySelector('link');
      const rel = link?.getAttribute('rel');
      expect(rel).toBe('stylesheet');
    });

    test('The link tag href attribute value should be a valid path to the css file', () => {
      const validPaths = [
        './css/styles.css',
        '/css/styles.css',
        'css/styles.css',
      ];
      const head = parsedHtml.querySelector('head');
      const link = head?.querySelector('link');
      const href = link?.getAttribute('href');
      expect(validPaths.includes(href || '')).toBe(true);
    });

    test('The script tag src attribute value should be a valid path to the js file', () => {
      const validPaths = ['./js/scripts.js', '/js/scripts.js', 'js/scripts.js'];
      const head = parsedHtml.querySelector('head');
      const script = head?.querySelector('script');
      const src = script?.getAttribute('src');
      expect(validPaths.includes(src || '')).toBe(true);
    });

    test('The script tag includes the defer attribute', () => {
      const head = parsedHtml.querySelector('head');
      const script = head?.querySelector('script');
      const hasDefer = script?.hasAttribute('defer');
      expect(hasDefer).toBe(true);
    });

    test('The page heading should have an id of "candidate-name"', () => {
      const h1 = parsedHtml.querySelector('h1');
      const id = h1?.getAttribute('id');
      expect(id).toBe('candidate-name');
    });

    test('The section heading with an ID of "candidate-desired-role" should exist', () => {
      const element = parsedHtml.querySelector('#candidate-desired-role');
      expect(element).toBeTruthy();
      expect(element?.tagName.toLowerCase()).toBe('h2');
    });

    test('The section heading with an ID of "about-me" should exist', () => {
      const element = parsedHtml.querySelector('#about-me');
      expect(element).toBeTruthy();
      expect(element?.tagName.toLowerCase()).toBe('h2');
    });

    test('The person image HTML element should have an id of "candidate-image"', () => {
      const img = parsedHtml.querySelector('img');
      const id = img?.getAttribute('id');
      expect(id).toBe('candidate-image');
    });

    test('The bio paragraph HTML element should have class "candidate-bio"', () => {
      const p = parsedHtml.querySelector('p');
      const className = p?.getAttribute('class');
      expect(className).toBe('candidate-bio');
    });

    test('The section heading with an ID of "skills" should exist', () => {
      const element = parsedHtml.querySelector('#skills');
      expect(element).toBeTruthy();
      expect(element?.tagName.toLowerCase()).toBe('h2');
    });

    test('The skills ordered list HTML element should have an id of "skills-list"', () => {
      const ol = parsedHtml.querySelector('ol');
      const id = ol?.getAttribute('id');
      expect(id).toBe('skills-list');
    });

    test('The section heading with an ID of "hobbies" should exist', () => {
      const element = parsedHtml.querySelector('#hobbies');
      expect(element).toBeTruthy();
      expect(element?.tagName.toLowerCase()).toBe('h2');
    });

    test('The hobbies unordered list HTML element should have an id of "hobbies-list"', () => {
      const ul = parsedHtml.querySelector('ul');
      const id = ul?.getAttribute('id');
      expect(id).toBe('hobbies-list');
    });

    test('The section heading with an ID of "contacts" should exist', () => {
      const element = parsedHtml.querySelector('#contacts');
      expect(element).toBeTruthy();
      expect(element?.tagName.toLowerCase()).toBe('h2');
    });

    test('The contacts table HTML element should have class "contacts-table"', () => {
      const table = parsedHtml.querySelector('table');
      const className = table?.getAttribute('class');
      expect(className).toBe('contacts-table');
    });

    test('The document body should have "fancy-body" class', () => {
      const body = parsedHtml.querySelector('body');
      const className = body?.getAttribute('class');
      expect(className).toBe('fancy-body');
    });
  }
);
