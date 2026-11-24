# Portfolio migration checklist

The live homepage at [kacperglinka.com](https://kacperglinka.com/) returned HTTP 200 and its HTML matched the local `stara strona/index.html` archive. Its nine project entries were all on the homepage. The site had no working sitemap or separate internal project pages. The local prototype had a dark Playfair hero, pixel avatar and four images, with no functional navigation, project content, routing or build tooling. This folder has no Git metadata.

## Current publishing selection

The project collection and sitemap include the nine projects listed on [kacperglinka.com](https://kacperglinka.com/) and Asteroid Cleanup. The homepage features Mini Wall Golf, Office Fools, 2D Shooter and Asteroid Cleanup. Night Shift: Pharmacy, listed as Pharmacy on the live site, appears in the collection. CS:GO Tutorial is a draft.

## Original project inventory

| Published item | Content and media in the replacement | Verification and follow-up |
| --- | --- | --- |
| [Mini Wall Golf](https://ponton.itch.io/mini-wall-golf) | Featured case study, original gameplay montage and new-site title banner, prior Google Play publication, browser play and Android APK via itch.io | The current listing offers HTML5 and Android. The old portfolio mentions a PC version. A separate Windows build was not found, and the old Play Store listing returned 404. |
| [Office Fools](https://ponton.itch.io/office-fools) | Featured case study, original screenshot, ten-day development, time-stop gameplay, Windows download and a Jam comments tab | The [jury list](https://itch.io/jam/april-fools-day-jam-2025) places it seventh. The [submission results](https://itch.io/jam/april-fools-day-jam-2025/rate/3440032) show eighth overall in community voting and fifth for Fun. The tab links seven player posts and the [full discussion](https://itch.io/jam/april-fools-day-jam-2025/rate/3440032#comments). |
| 2D Shooter | Featured paid Fiverr project, original gameplay screenshot, Unity, Windows project context | The [original itch.io URL](https://ponton.itch.io/2d-shooter) returns 404. Restore a public build link when one is available. The published portfolio confirms Unity. The scripting language and specific client requirements still need confirmation. |
| Pharmacy | Listed as Night Shift: Pharmacy, with the original screenshot marked as an earlier build and the In Development status | The screenshot shows a first-person shop scene with a customer and a mixing station. Current footage and a confirmed implemented-feature list are needed before describing the wider systems. |
| [GD 3D](https://pontondev.itch.io/realistyczny-geometry-dash-3d) | Original project image, Unreal Engine 5 / Blueprints, development video and itch.io downloads | The release page lists prototype archives with and without RTX. |
| Minecraft Horror | Original project image, [development video](https://www.youtube.com/watch?v=FyY4phqbrrw), and newly located [Herobrine Horror download](https://pontondev.itch.io/herobrine-horror) | itch.io confirms the Windows release and Steam requirement for multiplayer. The old announcement date was replaced with the confirmed release status. The YouTube watch page opens directly, and the embedded player reported the video as unavailable. |
| [Fake Ad Game](https://pontondev.itch.io/fakeadgame) | Original project image, Unreal Engine prototype, development video and itch.io download | The current release page lists the prototype archive and video. |
| Where in the world? | Existing country-grid screenshot, Frontend Mentor context, original deployment and [source](https://github.com/pontonx/rest-countries-api-without-color-theme-switcher-master) | The source verifies HTML, CSS, JavaScript and REST Countries. The original deployment loads, but its country data did not load in the verification browser. |
| Weather App | Original screenshot, [working deployment](https://pontonx.github.io/react-weather-app/) and [source](https://github.com/pontonx/react-weather-app) | Source verifies React, JavaScript and OpenWeather. A Warsaw search returned live conditions during browser verification. |
| CS:GO Tutorial | Secondary school project found in the older PDF export, with a screenshot from the [original deployment](https://pontonx.github.io/Tutorial-CSGO-site/) | Verified the deployment and the [HTML/CSS source](https://github.com/pontonx/Tutorial-CSGO-site). Video clips are accessible through the original site. |
| Asteroid Cleanup | Featured Unity / C# project marked In Development, with a November 24 gameplay screenshot showing the spacecraft and updated HUD | The project source confirms mesh carving, fragment collection, cargo sales, upgrades, level of detail and chunk streaming. |

## Profile and experience

- [x] Rewrote the introduction in English using the candidate brief. Preserved name, location and the Ponton alias. Removed age and generic bio copy.
- [x] Added freelance scope, international communication, education, both IT internships and production work using the supplied responsibilities and dates.
- [x] Verified and preserved the original four Fiverr testimonials, rating values, public names and countries against the live portfolio. Restored the original avatar assignments from `stara strona/avatars`, including the shared default image, and the country flags from `stara strona/countries`. Original review wording is intact, including spelling. The [Fiverr profile](https://www.fiverr.com/glnn__?source=gig_page) presented a human-verification challenge during automated checks.
- [x] Retained GitHub, LinkedIn and Fiverr. Removed Discord from the public contact section at the owner's request.
- [x] Updated the main email to the supplied Gmail address, also used by the old form. Replaced the third-party submission form with a direct email link. The former `.pl` alias is superseded by the contact specified in the brief.
- [x] Grouped skills by experience. Removed PHP and Python from the public skills list because the updated candidate brief does not include them.
- [x] Preserved the original site and all local source media. The build uses the pixel avatar, original project images, the Mini Wall Golf banner, the Asteroid Cleanup screenshot, and Fiverr avatars and flags.
- [ ] Add public CV downloads through `cv/`. The original archive PDF is a print export of the previous portfolio. The workspace file `Kacper.Glinka.pdf` is separate from the public downloads.

## Original migration verification

- `node build.mjs` generated 12 public routes, including 10 project pages. The Asteroid Cleanup draft, legacy installers and archived PDF stay out of the artifact.
- Chrome checks covered every route at 360, 390, 768, 1024, 1440 and 1920 px. Keyboard navigation, project filters, local links, responsive media and the mobile menu passed. Axe reported zero violations in the tested WCAG A/AA rules at 360 and 1440 px.
- All five CV variants, download behavior and stale-file removal were verified with temporary PDFs in an isolated copy of the project.
- The nine largest responsive WebP versions total 634 KB, down from 10.22 MB for the corresponding originals. A cold 1440 px homepage on localhost transferred about 207 KiB with zero third-party requests before interaction.
- Playback was observed for the GD 3D and Fake Ad Game embeds. Minecraft Horror uses the direct YouTube watch link.
