const header = document.querySelector('[data-menu]');
const menuToggle = header.querySelector('.menu-toggle');
const menu = header.querySelector('.site-nav');
const desktopMenu = window.matchMedia('(min-width: 720px)');

function setMenu(open) {
    menuToggle.setAttribute('aria-expanded', String(open));
}

header.setAttribute('data-menu-ready', '');
menuToggle.hidden = false;
menuToggle.addEventListener('click', () => {
    setMenu(menuToggle.getAttribute('aria-expanded') === 'false');
});
menu.addEventListener('click', event => {
    const link = event.target.closest('a');
    if (link && !desktopMenu.matches && link.pathname === location.pathname) {
        setMenu(false);
        const section = link.hash && document.getElementById(link.hash.slice(1));
        if (section) {
            section.tabIndex = -1;
            section.focus({ preventScroll: true });
        } else {
            menuToggle.focus();
        }
    }
});
header.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenu(false);
        menuToggle.focus();
    }
});
desktopMenu.addEventListener('change', () => {
    setMenu(false);
    if (!desktopMenu.matches && menu.contains(document.activeElement)) menuToggle.focus();
});

const collection = document.querySelector('[data-collection]');
if (collection) {
    const filters = collection.querySelector('.filters');
    const cards = [...collection.querySelectorAll('.project-card')];
    const status = collection.querySelector('.results-count');

    function filterProjects() {
        const selected = filters.querySelector(':checked').value;
        let visible = 0;
        for (const card of cards) {
            card.hidden = selected !== 'all' && !card.dataset.categories.split(' ').includes(selected);
            if (!card.hidden) visible += 1;
        }
        status.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'}`;
    }

    filters.hidden = false;
    filters.addEventListener('change', filterProjects);
    window.addEventListener('pageshow', filterProjects);
    filterProjects();
}

const projectTabs = document.querySelector('[data-project-tabs]');
if (projectTabs) {
    const tabList = projectTabs.querySelector('.project-tab-list');
    const tabs = [...tabList.querySelectorAll('a')];
    const panels = tabs.map(tab => document.getElementById(tab.hash.slice(1)));

    function showTab(index) {
        tabs.forEach((tab, position) => {
            const selected = position === index;
            tab.setAttribute('aria-selected', String(selected));
            tab.tabIndex = selected ? 0 : -1;
            panels[position].hidden = !selected;
        });
    }

    function openTab(index) {
        const tab = tabs[index];
        if (tab.hash !== location.hash) history.pushState(null, '', tab.hash);
        showTab(index);
        tab.focus();
    }

    function syncTabs() {
        const index = tabs.findIndex(tab => tab.hash === location.hash);
        if (index >= 0 || !location.hash) showTab(Math.max(index, 0));
    }

    tabList.setAttribute('role', 'tablist');
    tabList.setAttribute('aria-label', 'Project sections');
    tabs.forEach((tab, index) => {
        tab.setAttribute('role', 'tab');
        tab.setAttribute('aria-controls', panels[index].id);
        panels[index].setAttribute('role', 'tabpanel');
        panels[index].setAttribute('aria-labelledby', tab.id);
        panels[index].tabIndex = 0;
        tab.addEventListener('click', event => {
            if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            openTab(index);
        });
        tab.addEventListener('keydown', event => {
            const targets = {
                ArrowLeft: (index - 1 + tabs.length) % tabs.length,
                ArrowRight: (index + 1) % tabs.length,
                Home: 0,
                End: tabs.length - 1,
            };
            const target = targets[event.key];
            if (!Number.isInteger(target)) return;
            event.preventDefault();
            openTab(target);
        });
    });
    showTab(0);
    syncTabs();
    window.addEventListener('hashchange', syncTabs);
}

for (const card of document.querySelectorAll('[data-video-id]')) {
    const play = card.querySelector('[data-play-video]');
    play.hidden = false;
    play.addEventListener('click', () => {
        const player = document.createElement('iframe');
        player.title = card.dataset.videoTitle;
        player.src = `https://www.youtube-nocookie.com/embed/${card.dataset.videoId}?autoplay=1`;
        player.referrerPolicy = 'strict-origin-when-cross-origin';
        player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        player.allowFullscreen = true;
        card.querySelector('.video-embed').append(player);
        player.focus();
        play.remove();
    });
}
