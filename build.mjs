import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { cvVariants, experience, freelance, profile, projects, skills, testimonials } from './portfolio.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const output = join(root, 'dist');
const siteUrl = new URL(process.env.PORTFOLIO_SITE_URL || profile.domain);
const publish = process.argv.includes('--publish');
if (siteUrl.protocol !== 'https:' || siteUrl.search || siteUrl.hash || siteUrl.username || siteUrl.password) {
  throw new Error('PORTFOLIO_SITE_URL must be an HTTPS website URL without credentials, query or fragment.');
}
if (!siteUrl.pathname.endsWith('/')) siteUrl.pathname += '/';
if (publish && siteUrl.href !== new URL('/', profile.domain).href) throw new Error('Branch publishing requires the production URL.');
const basePath = siteUrl.pathname.slice(0, -1);
const template = readFileSync(join(root, 'index.template.html'), 'utf8');
const media = JSON.parse(readFileSync(join(root, 'assets/media.json'), 'utf8'));
const published = projects.filter(project => !project.draft);
const files = new Set(['style.css', 'JavaScript.js', 'assets/fonts/playfair-display.woff2', 'assets/fonts/OFL.txt', 'assets/media/avatar.webp', 'assets/media/favicon.png', 'assets/media/social.jpg']);
const cvs = cvVariants.filter(({ file }) => {
  if (!/^[a-z0-9-]+\.pdf$/.test(file)) throw new Error(`Invalid CV filename: ${file}`);
  const path = join(root, 'cv', file);
  return existsSync(path) && statSync(path).isFile() && readFileSync(path).subarray(0, 5).toString() === '%PDF-';
});
const primaryCV = cvs.find(cv => cv.primary) ?? cvs.find(cv => cv.file === 'kacper-glinka-game-developer.pdf');
const title = `${profile.name} | ${profile.role}`;
const description = 'Kacper Glinka is a game and software developer in Poland. Explore Unity and C# games, Unreal Engine prototypes, web applications and commercial Fiverr work.';
const homepageImage = { path: '/assets/media/social.jpg', width: 1200, height: 630, alt: `${title} with screenshots of Mini Wall Golf and Office Fools` };

function escape(value) {
  return String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function external(label, url, className = 'text-link') {
  if (new URL(url).protocol !== 'https:') throw new Error(`External link must use HTTPS: ${url}`);
  return `<a class="${className}" href="${escape(url)}">${escape(label)}</a>`;
}

function sitePath(path) {
  return `${basePath}${path}`;
}

function siteLink(path) {
  return new URL(path.slice(1), siteUrl).href;
}

function projectPath(project) {
  return `/projects/${project.slug}/`;
}

function cvLink(cv, label = cv.title) {
  return `<a class="button button-secondary" href="${sitePath(`/cv/${cv.file}`)}" download>${escape(label)}</a>`;
}

function assetVariants(id) {
  const variants = media[id];
  if (!variants?.length) throw new Error(`Missing image variants for ${id}`);
  for (const { file } of variants) {
    if (!/^[a-z0-9-]+\.(webp|png|jpg)$/.test(file)) throw new Error(`Invalid image filename: ${file}`);
    files.add(`assets/media/${file}`);
  }
  return variants;
}

function image({ id, alt }, sizes, { eager = false, priority = false } = {}) {
  const variants = assetVariants(id);
  const { file, width, height } = variants.at(-1);
  const srcset = variants.map(variant => `${sitePath(`/assets/media/${variant.file}`)} ${variant.width}w`).join(', ');
  return `<img src="${sitePath(`/assets/media/${file}`)}" srcset="${srcset}" sizes="${sizes}" width="${width}" height="${height}" alt="${escape(alt)}" ${eager ? '' : 'loading="lazy" decoding="async"'}${priority ? ' fetchpriority="high"' : ''}>`;
}

function mediaFigure(picture, sizes, options) {
  return `<figure class="media-figure">${image(picture, sizes, options)}${picture.caption ? `<figcaption>${escape(picture.caption)}</figcaption>` : ''}</figure>`;
}

function tags(items, className = 'tags') {
  return `<ul class="${className}">${items.map(item => `<li>${escape(item)}</li>`).join('')}</ul>`;
}

function header(route) {
  const nav = [['Projects', '/projects/'], ['Experience', '/#experience'], ['About', '/#about'], ['Contact', '/#contact']];
  return `<header class="site-header" data-menu>
    <div class="wrap header-inner">
      <a class="brand" href="${sitePath('/')}"${route === '/' ? ' aria-current="page"' : ''}><img src="${sitePath('/assets/media/avatar.webp')}" width="44" height="44" alt="">${escape(profile.name)}</a>
      <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" hidden>Menu</button>
      <nav class="site-nav" aria-label="Main navigation" id="site-nav">
        ${nav.map(([label, href]) => `<a href="${sitePath(href)}"${route === href ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
      </nav>
      ${external('GitHub', profile.links.github, 'header-social')}
    </div>
  </header>`;
}

function footer() {
  return `<footer class="site-footer"><div class="wrap footer-inner">
    <a class="brand" href="${sitePath('/')}">${escape(profile.name)}</a>
    <p>${escape(profile.role)}</p>
    <nav aria-label="Social links">${external('GitHub', profile.links.github)}${external('LinkedIn', profile.links.linkedin)}${external('Fiverr', profile.links.fiverr)}</nav>
  </div></footer>`;
}

function page({ route, pageTitle, summary, share = homepageImage, schema, main, noindex = false }) {
  const canonical = siteLink(route);
  const head = `<title>${escape(pageTitle)}</title>
    <meta name="description" content="${escape(summary)}">
    <meta name="theme-color" content="#100d13">
    ${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${canonical}">
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${escape(profile.name)}">
    <meta property="og:title" content="${escape(pageTitle)}">
    <meta property="og:description" content="${escape(summary)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${siteLink(share.path)}">
    <meta property="og:image:width" content="${share.width}">
    <meta property="og:image:height" content="${share.height}">
    <meta property="og:image:alt" content="${escape(share.alt)}">
    <meta name="twitter:card" content="summary_large_image">`}
    ${schema ? `<script type="application/ld+json">${JSON.stringify(schema).replaceAll('<', '\\u003c')}</script>` : ''}`;
  const slots = { head, header: header(route), main, footer: footer(), basePath };
  return template.replace(/\{\{(head|header|main|footer|basePath)\}\}/g, (_, slot) => slots[slot]).replace(/^[ \t]+$/gm, '');
}

function projectCategories(project) {
  return [project.category, project.commercial && 'commercial', project.status === 'In development' && 'in-development'].filter(Boolean);
}

function projectCard(project, { featured = false, eager = false, priority = false } = {}) {
  const sizes = featured ? '(min-width: 1300px) 564px, (min-width: 720px) 46vw, calc(100vw - 36px)' : '(min-width: 1300px) 365px, (min-width: 1050px) 29vw, (min-width: 640px) 46vw, calc(100vw - 36px)';
  return `<article class="project-card" data-categories="${projectCategories(project).join(' ')}">
    <a class="project-link" href="${sitePath(projectPath(project))}" aria-labelledby="${project.slug}-title ${project.slug}-action">
      <div class="project-cover">${image(project.images[0], sizes, { eager, priority })}</div>
      <div class="project-copy">
        <p class="eyebrow card-label">${escape(project.status === 'In development' ? project.status : project.label)}</p>
        <h3 id="${project.slug}-title">${escape(project.title)}</h3>
        <p>${escape(project.description)}</p>
        <span class="card-action" id="${project.slug}-action">Project details</span>
      </div>
    </a>
    ${tags(project.technologies)}
  </article>`;
}

function homePage() {
  const featured = published.filter(project => project.featured).sort((left, right) => left.featured - right.featured);
  const example = published.find(project => project.slug === freelance.example);
  const otherCVs = cvs.filter(cv => cv !== primaryCV);
  return page({ route: '/', pageTitle: title, summary: description,
    schema: { '@context': 'https://schema.org', '@type': 'ProfilePage', url: siteLink('/'), mainEntity: { '@type': 'Person', '@id': siteLink('/#kacper'), name: profile.name, alternateName: profile.alias, jobTitle: profile.role, url: siteLink('/'), image: siteLink('/assets/media/avatar.webp'), sameAs: Object.values(profile.links), address: { '@type': 'PostalAddress', addressLocality: profile.location.split(',')[0], addressCountry: 'PL' } } },
    main: `<section class="hero wrap" aria-labelledby="hero-title">
      <p class="eyebrow availability">${escape(profile.availability)}<span class="hero-location">${escape(profile.location)}</span></p>
      <h1 id="hero-title">${escape(profile.name)}</h1>
      <p class="hero-role">${escape(profile.role)}</p>
      <p class="hero-intro">${escape(profile.intro)}</p>
      <div class="actions hero-actions"><a class="button button-primary" href="#projects">View Projects</a>${primaryCV ? cvLink(primaryCV, 'Download CV') : ''}<a class="button button-secondary" href="#contact">Contact Me</a></div>
    </section>
    <section class="wrap section" id="projects" aria-labelledby="projects-title">
      <div class="section-heading"><h2 id="projects-title">Featured projects</h2><a class="text-link" href="${sitePath('/projects/')}">All projects</a></div>
      <div class="project-grid featured-grid">${featured.map((project, index) => projectCard(project, { featured: true, eager: index < 2, priority: index === 0 })).join('')}</div>
    </section>
    <section class="section band" id="experience" aria-labelledby="experience-title"><div class="wrap freelance-grid">
      <div><p class="eyebrow">Commercial experience · ${escape(freelance.platform)}</p>
        <h2 id="experience-title">${escape(freelance.role)}</h2>
        <p class="section-intro">${escape(freelance.summary)}</p>
      </div>
      <div>
        <ul class="list-lines">${freelance.responsibilities.map(item => `<li>${escape(item)}</li>`).join('')}</ul>
        <div class="actions">${example ? `<a class="button button-primary" href="${sitePath(projectPath(example))}">View ${escape(example.title)}</a>` : ''}${external('Fiverr profile', profile.links.fiverr, 'button button-secondary')}</div>
      </div>
    </div></section>
    <section class="wrap section" id="testimonials" aria-labelledby="testimonials-title">
      <div class="section-heading"><h2 id="testimonials-title">Client feedback</h2>${external('Fiverr profile', profile.links.fiverr)}</div>
      <div class="testimonial-grid">${testimonials.map(review => `<figure class="review">
        <div class="rating"><span aria-hidden="true">${'★'.repeat(review.rating)}</span><span>${review.rating}/5</span></div>
        <blockquote><p>${escape(review.quote)}</p></blockquote>
        <figcaption>
          ${review.avatar ? `<span class="review-avatar">${image({ id: review.avatar, alt: '' }, '40px')}</span>` : ''}
          <div class="review-person">
            <strong>${escape(review.name)}</strong>
            <span class="review-country">${review.flag ? image({ id: review.flag, alt: '' }, '18px') : ''}${escape(review.country)}</span>
          </div>
        </figcaption>
      </figure>`).join('')}</div>
    </section>
    <section class="section band" id="skills" aria-labelledby="skills-title"><div class="wrap skills-layout">
      <h2 id="skills-title">Technical skills</h2>
      <div class="skill-groups">${skills.map(group => `<section><h3>${escape(group.title)}</h3>${tags(group.items)}</section>`).join('')}</div>
    </div></section>
    <section class="wrap section about-grid" id="about" aria-labelledby="about-title">
      <div><h2 id="about-title">About me</h2>${profile.about.map((item, index) => `<p${index === 0 ? ' class="section-intro"' : ''}>${escape(item)}</p>`).join('')}</div>
      <div class="work-history"><h3>Additional experience</h3><ul class="list-lines">${experience.map(job => `<li><div class="job-title"><strong>${escape(job.employer)}</strong>${job.period ? `<span>${escape(job.period)}</span>` : ''}</div><p class="job-role">${escape(job.role)}</p><p>${escape(job.details)}</p></li>`).join('')}</ul></div>
    </section>
    <section class="section contact-section" id="contact" aria-labelledby="contact-title"><div class="wrap contact-grid">
      <div><h2 id="contact-title">Get in touch</h2><p class="section-intro">${escape(profile.contactIntro)}</p><a class="email-link" href="mailto:${escape(profile.email)}">${escape(profile.email)}</a></div>
      <div class="contact-links"><div class="actions">${external('LinkedIn', profile.links.linkedin, 'button button-secondary')}${external('GitHub', profile.links.github, 'button button-secondary')}${external('Fiverr', profile.links.fiverr, 'button button-secondary')}</div>
        ${cvs.length ? `<div id="cv" class="cv-links"><h3>CV downloads</h3>${primaryCV ? cvLink(primaryCV) : ''}${otherCVs.length > 1 ? `<details><summary>Other CVs</summary><div class="actions">${otherCVs.map(cv => cvLink(cv)).join('')}</div></details>` : otherCVs.map(cv => cvLink(cv)).join('')}</div>` : ''}
      </div>
    </div></section>`,
  });
}

function collectionPage() {
  const filters = [['game', 'Game Development'], ['web', 'Web Development'], ['commercial', 'Commercial'], ['in-development', 'In Development']].filter(([id]) => {
    const count = published.filter(project => projectCategories(project).includes(id)).length;
    return count > 0 && count < published.length;
  });
  const filterControls = filters.length ? `<fieldset class="filters" hidden><legend class="sr-only">Filter projects</legend><div class="filter-options">
    <label><input type="radio" name="project-filter" value="all" checked><span>All</span></label>
    ${filters.map(([id, label]) => `<label><input type="radio" name="project-filter" value="${id}"><span>${label}</span></label>`).join('')}
  </div></fieldset>` : '';
  return page({ route: '/projects/', pageTitle: `Projects | ${profile.name}`, summary: 'Explore Unity games, Unreal Engine prototypes, commercial game development and web applications by Kacper Glinka.', main: `<section class="wrap page-section" aria-labelledby="collection-title"${filters.length ? ' data-collection' : ''}>
    <h1 class="page-title" id="collection-title">Projects</h1>
    <p class="section-intro">Unity games, Unreal Engine prototypes and web applications, including paid client work.</p>
    ${filterControls}
    <p class="results-count" role="status">${published.length} projects</p>
    <div class="project-grid collection-grid">${published.map((project, index) => projectCard(project, { eager: index < 3, priority: index === 0 })).join('')}</div>
  </section>` });
}

function videoCard(video) {
  const watch = external('Watch on YouTube', `https://www.youtube.com/watch?v=${video.id}`);
  if (video.embed === false) return `<div class="video-card">${watch}</div>`;

  return `<div class="video-card" data-video-id="${video.id}" data-video-title="${escape(video.title)}">
    <div class="video-embed"></div>
    <div class="video-actions"><button type="button" class="button button-primary" data-play-video hidden>Play video</button>${watch}</div>
  </div>`;
}

function projectTabs(overview, comments) {
  return `<div data-project-tabs>
    <div class="project-tab-list">
      <a id="overview-tab" href="#overview">Overview</a>
      <a id="jam-comments-tab" href="#jam-comments">Jam comments (${comments.entries.length})</a>
    </div>
    <div id="overview">${overview}</div>
    <section id="jam-comments" class="jam-comments">
      <h2>Jam comments</h2>
      <p class="section-intro">Short quotes and summaries from players who commented on the April Fools’ Day Jam 3 submission.</p>
      ${external('Read the full discussion on itch.io', comments.url)}
      <ul class="list-lines jam-comment-list">${comments.entries.map(entry => `<li>
        ${external(entry.author, entry.url)}
        ${entry.quote ? `<blockquote cite="${escape(entry.url)}"><p>“${escape(entry.quote)}”</p></blockquote>` : `<p>${escape(entry.summary)}</p>`}
      </li>`).join('')}</ul>
    </section>
  </div>`;
}

function projectPage(project) {
  const cover = project.images[0];
  const { file, width, height } = assetVariants(cover.id).at(-1);
  const url = siteLink(projectPath(project));
  const videos = project.videos ?? [];
  for (const video of videos) {
    if (!/^[A-Za-z0-9_-]{11}$/.test(video.id)) throw new Error(`Invalid video ID for ${project.slug}`);
  }
  const overview = `${mediaFigure(cover, '(min-width: 1300px) 1180px, calc(100vw - 36px)', { eager: true, priority: true })}
      <div class="detail-grid">
        <section aria-labelledby="project-overview"><h2 id="project-overview">Project overview</h2>${project.details.map(detail => `<p>${escape(detail)}</p>`).join('')}${project.achievements ? `<ul class="achievement-list">${project.achievements.map(item => `<li>${escape(item)}</li>`).join('')}</ul>` : ''}</section>
        <aside class="detail-aside"><h2>My role</h2><p>${escape(project.role)}</p>${project.links?.length ? `<ul class="detail-links">${project.links.map(link => `<li>${external(link.label, link.url)}</li>`).join('')}</ul>` : ''}${project.commercial ? `<a class="text-link" href="${sitePath('/#experience')}">Freelance experience</a>` : ''}</aside>
      </div>
      ${project.images.length > 1 ? `<section class="detail-media" aria-labelledby="gallery-title"><h2 id="gallery-title">Gallery</h2>${project.images.slice(1).map(picture => mediaFigure(picture, '(min-width: 960px) 880px, calc(100vw - 36px)')).join('')}</section>` : ''}
      ${videos.length ? `<section class="detail-media" aria-labelledby="video-title"><h2 id="video-title">Development video</h2>${videos.map(videoCard).join('')}</section>` : ''}`;
  return page({ route: projectPath(project), pageTitle: `${project.title} | ${profile.name}`, summary: project.description,
    share: { path: `/assets/media/${file}`, width, height, alt: cover.alt },
    schema: { '@context': 'https://schema.org', '@type': 'CreativeWork', name: project.title, description: project.description, url, image: siteLink(`/assets/media/${file}`), creator: { '@type': 'Person', '@id': siteLink('/#kacper'), name: profile.name } },
    main: `<article class="wrap page-section project-detail">
      <nav class="breadcrumb" aria-label="Breadcrumb"><a class="text-link" href="${sitePath('/projects/')}">All projects</a><span aria-hidden="true">/</span><span aria-current="page">${escape(project.title)}</span></nav>
      <header class="detail-header">
        <p class="eyebrow">${escape([project.label, project.status].filter(Boolean).join(' · '))}</p>
        <h1 class="page-title">${escape(project.title)}</h1>
        <p class="section-intro">${escape(project.description)}</p>
        ${tags(project.technologies)}
      </header>
      ${project.jamComments ? projectTabs(overview, project.jamComments) : overview}
    </article>`,
  });
}

const slugs = new Set();
for (const project of published) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) || slugs.has(project.slug)) throw new Error(`Invalid or duplicate project slug: ${project.slug}`);
  if (!project.images?.length) throw new Error(`Public project needs media: ${project.slug}`);
  slugs.add(project.slug);
}

const pages = new Map([['index.html', homePage()], ['projects/index.html', collectionPage()]]);
for (const project of published) pages.set(`projects/${project.slug}/index.html`, projectPage(project));
pages.set('404.html', page({ route: '/404.html', pageTitle: `Page not found | ${profile.name}`, summary: 'This portfolio page could not be found.', noindex: true, main: `<section class="wrap page-section"><h1 class="page-title">Page not found</h1><div class="actions"><a class="button button-primary" href="${sitePath('/projects/')}">Browse projects</a><a class="button button-secondary" href="${sitePath('/')}">Home</a></div></section>` }));
const routes = ['/', '/projects/', ...published.map(projectPath)];
pages.set('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map(route => `  <url><loc>${siteLink(route)}</loc></url>`).join('\n')}\n</urlset>\n`);
pages.set('robots.txt', `User-agent: *\nAllow: ${sitePath('/')}\nSitemap: ${siteLink('/sitemap.xml')}\n`);
pages.set('.nojekyll', '');
for (const cv of cvs) files.add(`cv/${cv.file}`);

const stage = mkdtempSync(join(root, '.portfolio-build-'));
try {
  for (const [name, html] of pages) {
    const target = join(stage, name);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, html);
  }
  for (const name of files) {
    const target = join(stage, name);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(join(root, name), target);
  }
  if (resolve(output) !== join(root, 'dist') || dirname(stage) !== root) throw new Error('Unexpected build directory');
  rmSync(output, { recursive: true, force: true });
  renameSync(stage, output);
} finally {
  rmSync(stage, { recursive: true, force: true });
}
console.log(`Built ${routes.length} public routes, ${files.size} assets and ${cvs.length} CV downloads in dist/.`);

if (publish) {
  const projectsDirectory = join(root, 'projects');
  if (existsSync(projectsDirectory)) {
    for (const directory of readdirSync(projectsDirectory, { withFileTypes: true })) {
      const file = `projects/${directory.name}/index.html`;
      const target = join(root, file);
      if (directory.isDirectory() && !pages.has(file) && existsSync(target) && readFileSync(target, 'utf8').includes('<!-- Generated by build.mjs.')) {
        rmSync(target);
      }
    }
  }
  for (const [file, html] of pages) {
    const target = join(root, file);
    mkdirSync(dirname(target), { recursive: true });
    writeFileSync(target, html);
  }
  console.log('Updated the generated pages published from the main branch root.');
}
