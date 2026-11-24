export const profile = {
  name: 'Kacper Glinka',
  alias: 'Ponton',
  role: 'Game & Software Developer',
  domain: 'https://kacperglinka.com',
  location: 'Ostrołęka, Poland',
  availability: 'Available immediately',
  email: 'stifler.kacper@gmail.com',
  intro: 'I build games and interactive applications with C#, Unity, HTML and CSS. I’ve delivered paid game development work for international clients through Fiverr.',
  contactIntro: 'I’m open to relocation for game and software development roles. I’m also interested in software QA and IT support opportunities.',
  about: [
    'I’m Kacper Glinka, also known as Ponton. I graduated as a Technician Programmer in 2025. My projects span Unity gameplay, Unreal Engine prototypes, and web interfaces that use external APIs.',
    'Freelance work taught me to turn a client brief into a deliverable, communicate progress and agree on scope in English or Polish. My IT internships gave me practical experience diagnosing hardware and configuring Windows systems.',
  ],
  links: {
    github: 'https://github.com/pontonx',
    linkedin: 'https://www.linkedin.com/in/kacper-glinka-215a9123b/',
    fiverr: 'https://www.fiverr.com/glnn__?source=gig_page',
  },
};

export const freelance = {
  role: 'Freelance Game Developer',
  platform: 'Fiverr',
  summary: 'I took on paid game development projects and gameplay mechanics, from discussing the brief to delivering the work.',
  responsibilities: [
    'Discussed requirements, defined the scope and prepared individual quotes.',
    'Implemented the requested functionality and shared development updates.',
    'Communicated with clients in English and Polish and delivered the finished work.',
  ],
  example: '2d-shooter',
};

export const testimonials = [
  { name: 'pawielbeats', country: 'Denmark', flag: 'flag-denmark', avatar: 'fiverr-avatar-default', rating: 5, quote: "Very talented game dev. Great communication, great skills and fast delivery. If you care about quality, details of your game, definitely hire this guy! Works hard, listens to your ideas and most importantly he's passionate about what he's doing. 5/5" },
  { name: 'pauloskoutsonas', country: 'Greece', flag: 'flag-greece', avatar: 'fiverr-avatar-default', rating: 5, quote: 'Worked with him for a unity project. He did a great job and made all the assets used in the game. Very cooperable and nice guy. Would defenitely recommend to anyone!' },
  { name: 'a4productions', country: 'United States', flag: 'flag-united-states', avatar: 'fiverr-avatar-a4productions', rating: 5, quote: 'Great pixelated game art.' },
  { name: 'michalrosiak', country: 'Poland', flag: 'flag-poland', avatar: 'fiverr-avatar-michalrosiak', rating: 5, quote: 'All its Ok. Very satisfied.' },
];

export const skills = [
  { title: 'Core development', items: ['C#', 'Unity', 'HTML', 'CSS'] },
  { title: 'Additional development', items: ['JavaScript', 'Unreal Engine 5 / Blueprints', 'REST APIs / JSON', 'Git / GitHub'] },
  { title: 'Familiar with', items: ['Java', 'React', 'SQL / MySQL', 'PowerShell'] },
  { title: 'Tools', items: ['Visual Studio', 'Visual Studio Code', 'Blender', 'Adobe Photoshop', 'Adobe Premiere Pro'] },
  { title: 'Technical support', items: ['Windows installation and configuration', 'Hardware diagnostics', 'Computer assembly', 'BIOS/UEFI', 'Technical troubleshooting', 'Remote desktop tools'] },
];

export const experience = [
  { employer: 'Centrum Teleinformatyczne', role: 'IT Intern', details: 'Installed Windows, drivers and software, maintained and troubleshot PCs, and configured BIOS/UEFI.' },
  { employer: 'AXUS', role: 'IT Intern', details: 'Repaired PCs, replaced and tested components, installed operating systems and documented faults.' },
  { employer: 'Lacroix-Opakowania', role: 'Production Worker', period: '2025 · 3 months', details: 'Operated machinery, checked product quality, addressed technical issues and maintained production documentation.' },
];

export const cvVariants = [
  { file: 'kacper-glinka-game-developer.pdf', title: 'Game Developer CV' },
  { file: 'kacper-glinka-software-developer.pdf', title: 'Software Developer CV', primary: true },
  { file: 'kacper-glinka-it-support.pdf', title: 'IT Support CV' },
  { file: 'kacper-glinka-qa-tester.pdf', title: 'QA Tester CV' },
  { file: 'kacper-glinka-universal.pdf', title: 'Universal CV' },
];

export const projects = [
  {
    slug: 'mini-wall-golf', title: 'Mini Wall Golf', category: 'game', label: 'Published game', featured: 1,
    technologies: ['Unity', 'C#'],
    description: 'A 2D puzzle minigolf game I built in Unity and published on Google Play.',
    role: 'Game development and publication',
    achievements: ['Previously published on Google Play'],
    details: ['I implemented the minigolf gameplay for mouse and touch input. The game includes short puzzle courses, a level selection screen and unlockable ball skins.', 'The current itch.io listing hosts a browser build and an Android APK.'],
    images: [
      { id: 'mini-wall-golf', alt: 'Three Mini Wall Golf screens showing the skins menu and two puzzle courses' },
      { id: 'mini-wall-golf-banner', alt: 'Mini Wall Golf title banner with a pixel-art golf icon' },
    ],
    links: [{ label: 'Play in browser on itch.io', url: 'https://ponton.itch.io/mini-wall-golf' }, { label: 'Android download on itch.io', url: 'https://ponton.itch.io/mini-wall-golf#download' }],
  },
  {
    slug: 'office-fools', title: 'Office Fools', category: 'game', label: 'Game jam', featured: 2, status: 'Released',
    technologies: ['Unity', 'C#'],
    description: 'A time-stop puzzle game built in 10 days for April Fools’ Day Jam 3, where it placed seventh on the judges’ list.',
    role: 'Game development',
    achievements: ['7th on the April Fools’ Day Jam 3 judges’ list', '8th overall and 5th for Fun in community voting'],
    details: ['I built a first-person interaction loop for talking to coworkers, picking up and throwing objects, and pulling pranks while time is frozen. The watch and its dialogue tie those interactions together.'],
    images: [{ id: 'office-fools', alt: 'First-person view of a coworker in an Office Fools cubicle with a talk prompt' }],
    links: [{ label: 'Windows download on itch.io', url: 'https://ponton.itch.io/office-fools' }, { label: 'Judges’ list', url: 'https://itch.io/jam/april-fools-day-jam-2025' }, { label: 'Community results', url: 'https://itch.io/jam/april-fools-day-jam-2025/rate/3440032' }],
    jamComments: {
      url: 'https://itch.io/jam/april-fools-day-jam-2025/rate/3440032#comments',
      entries: [
        { author: 'Peatfire Games', url: 'https://itch.io/post/12585232', quote: 'Good entry! tricks were pretty good, funny ending' },
        { author: 'psyphy3', url: 'https://itch.io/post/12556495', summary: 'Compared the game to The Stanley Parable and highlighted how the mouse in the main menu responds to the player’s cursor.' },
        { author: 'Anomaly Keepers', url: 'https://itch.io/post/12549571', quote: 'Really nice game, loved the ending!' },
        { author: 'BeskarGames', url: 'https://itch.io/post/12547157', quote: 'woooow!! Really nice game!!' },
        { author: 'Fruit Kobold', url: 'https://itch.io/post/12546996', summary: 'Enjoyed the short dialogues and reported restarting after drinking all the coffee before the related quest.' },
        { author: 'Hyrdratedmoon Games', url: 'https://itch.io/post/12545778', summary: 'Praised how well the game was put together.' },
        { author: 'KartTheDev', url: 'https://itch.io/post/12541498', summary: 'Praised the visual style and how the game felt to play.' },
      ],
    },
  },
  {
    slug: '2d-shooter', title: '2D Shooter', category: 'game', label: 'Commercial project', featured: 3, status: 'Delivered', commercial: true,
    technologies: ['Unity'],
    description: 'A short 2D Windows game built to a paying Fiverr client’s requirements.',
    role: 'Freelance game development',
    details: ['I discussed the brief with the client, agreed on the scope, implemented the requested game in Unity and delivered the commissioned Windows project.'],
    images: [{ id: '2d-shooter', alt: '2D Shooter gameplay in a dark pixel-art scene, with keyboard prompts and a health display' }],
  },
  {
    slug: 'asteroid-cleanup', title: 'Asteroid Cleanup', category: 'game', label: 'Personal project', featured: 4, status: 'In development',
    technologies: ['Unity', 'C#', 'URP'],
    description: 'A first-person space mining game with destructible asteroids, resource collection and equipment upgrades.',
    role: 'Gameplay and systems development',
    details: [
      'Fly through an asteroid field, carve away rock with mining tools, and collect loose fragments with a vacuum. Sell cargo at the base and use the credits to upgrade your equipment.',
      'The mining system rebuilds asteroid meshes as material is removed. Distance-based level of detail and chunk streaming manage which parts of the field are active.',
    ],
    images: [{ id: 'asteroid-cleanup', alt: 'First-person view of a mining pickaxe, a spacecraft and asteroids, with the in-game HUD visible', caption: 'Gameplay screenshot from a development build.' }],
  },
  {
    slug: 'night-shift-pharmacy', title: 'Night Shift: Pharmacy', category: 'game', label: 'Personal project', status: 'In development',
    technologies: ['Unity'],
    description: 'A first-person horror project set in a pharmacy, currently in development.',
    role: 'Game development',
    details: ['Previously shown as Pharmacy, the project explores first-person interactions in a pharmacy setting. The archived build shown here captures a customer at the counter and a mixing station.'],
    images: [{ id: 'night-shift-pharmacy', alt: 'An earlier Pharmacy build with a customer at the counter and a mixing station', caption: 'Earlier build shown on the original portfolio.' }],
  },
  {
    slug: 'gd-3d', title: 'GD 3D', category: 'game', label: 'Personal project', status: 'Prototype',
    technologies: ['Unreal Engine 5', 'Blueprints'],
    description: 'A short Unreal Engine prototype that reinterprets Geometry Dash as a 3D game.',
    role: 'Gameplay prototyping',
    details: ['I used Blueprints to prototype the gameplay in a realistic 3D setting. The development video shows the process, and itch.io has downloadable builds with and without RTX.'],
    images: [{ id: 'gd-3d', alt: 'GD 3D project art showing a block character in a rocky 3D environment' }],
    videos: [{ id: 'XFEbFDOPkUQ', title: 'GD 3D development video' }],
    links: [{ label: 'Download on itch.io', url: 'https://pontondev.itch.io/realistyczny-geometry-dash-3d' }],
  },
  {
    slug: 'minecraft-horror', title: 'Minecraft Horror', category: 'game', label: 'Personal project', status: 'Released',
    technologies: ['Unreal Engine'],
    description: 'A Windows horror game based on the Herobrine urban legend, released as Herobrine Horror.',
    role: 'Game development',
    details: ['I built the game for a development video. The released build supports up to four players and uses Steam for multiplayer. The download page includes third-party asset credits.'],
    images: [{ id: 'minecraft-horror', alt: 'Project art showing Herobrine with glowing eyes in a torch-lit Minecraft-inspired scene' }],
    videos: [{ id: 'FyY4phqbrrw', title: 'Minecraft Horror development video', embed: false }],
    links: [{ label: 'Windows download on itch.io', url: 'https://pontondev.itch.io/herobrine-horror' }],
  },
  {
    slug: 'fake-ad-game', title: 'Fake Ad Game', category: 'game', label: 'Personal project', status: 'Prototype',
    technologies: ['Unreal Engine'],
    description: 'An Unreal Engine prototype based on the obstacle-and-crowd gameplay shown in mobile game ads.',
    role: 'Gameplay prototyping',
    details: ['I built a playable version of the ad concept. The development video follows the prototype from a single character to a crowd moving through numbered gates.'],
    images: [{ id: 'fake-ad-game', alt: 'Early and later versions of the Fake Ad Game prototype, with numbered gates and a crowd of characters' }],
    videos: [{ id: 'N9FiCA9I6ro', title: 'Fake Ad Game development video' }],
    links: [{ label: 'Download on itch.io', url: 'https://pontondev.itch.io/fakeadgame' }],
  },
  {
    slug: 'where-in-the-world', title: 'Where in the world?', category: 'web', label: 'Web application',
    technologies: ['HTML', 'CSS', 'JavaScript', 'REST Countries'],
    description: 'A country browser with name search, region filters and individual country pages.',
    role: 'Frontend development',
    details: ['I built this for a Frontend Mentor challenge. The interface fetches country data from REST Countries and presents flags, populations, regions and capitals in a searchable grid.', 'The original deployment remains available. Country results depend on the external API and may fail to load.'],
    images: [{ id: 'where-in-the-world', alt: 'Country browser showing search, a region filter and a grid of country flags' }],
    links: [{ label: 'Original deployment', url: 'https://pontonx.github.io/rest-countries-api-without-color-theme-switcher-master/' }, { label: 'Source code on GitHub', url: 'https://github.com/pontonx/rest-countries-api-without-color-theme-switcher-master' }, { label: 'Frontend Mentor', url: 'https://www.frontendmentor.io/' }],
  },
  {
    slug: 'weather-app', title: 'Weather App', category: 'web', label: 'Web application',
    technologies: ['React', 'JavaScript', 'HTML', 'CSS', 'OpenWeather API'],
    description: 'A React app that displays current weather conditions for a city using OpenWeather data.',
    role: 'Frontend development and API integration',
    details: ['I connected the city search to OpenWeather and used React state to update the location, temperature, conditions and weather icon. The interface includes a dedicated city-not-found state.'],
    images: [{ id: 'weather-app', alt: 'Weather App with a city search field, temperature and cloud conditions over a forest background' }],
    links: [{ label: 'Open live app', url: 'https://pontonx.github.io/react-weather-app/' }, { label: 'Source code on GitHub', url: 'https://github.com/pontonx/react-weather-app' }],
  },
];
