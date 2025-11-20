import { renderTemplate } from './templates.js';

export class Router {
  constructor(mountSelector) {
    this.mount = document.querySelector(mountSelector);
    this.routes = new Map();
  }

  define(path, templateName) {
    this.routes.set(path, templateName);
  }

  parseLocation() {
    const hash = window.location.hash || '#/';
    const [path, queryString] = hash.replace('#', '').split('?');
    const query = new URLSearchParams(queryString || '');
    return { path, query };
  }

  navigate(path) {
    window.location.hash = `#${path}`;
  }

  render() {
    const { path, query } = this.parseLocation();
    const templateName = this.routes.get(path) || 'home';
    this.mount.innerHTML = renderTemplate(templateName, { query });
  }

  start() {
    window.addEventListener('hashchange', () => this.render());
    window.addEventListener('DOMContentLoaded', () => this.render());
  }
}