# Eunice Adegbesan — COS 106 Student Portfolio

A responsive, multi-page academic portfolio built with plain HTML5, external CSS3 and vanilla JavaScript.

## Pages
- `index.html` — homepage, profile photo, biography, selected work and audio player
- `about.html` — educational background, career direction, skills, interests and academic table
- `projects.html` — three clearly labelled sample concept projects with original CSS artwork and case-study descriptions
- `planner.html` — add, complete, filter and delete academic tasks; tasks persist in browser `localStorage`
- `contact.html` — required-field, email-format and digits-only phone validation

## Run locally
1. Extract the ZIP.
2. Open the folder in VS Code.
3. Recommended: install/use the **Live Server** extension and open `index.html` with Live Server.
4. You can also open `index.html` directly in a browser. The planner works locally; the contact form uses a `mailto:` hand-off.

## Important personalisation before submission
1. Confirm that the displayed name is correct.
2. In `contact.html`, replace “Replace with your email address” with your real email address.
3. In `script.js`, replace `your-email@example.com` in the `mailto:` URL with the same real email address.
4. In `about.html`, update your programme, level, career goal, hobbies and skill levels so they accurately describe you.
5. Replace or expand the three sample concepts with your own work if you develop real versions. They are intentionally labelled as sample/concept projects.
6. Add your real GitHub, LinkedIn or other profile links if required.

## Publish free with GitHub Pages
1. Create a GitHub repository (for example `cos106-student-portfolio`).
2. Upload the contents of this folder — keep the five HTML pages, `styles.css`, `script.js`, and the `assets` folder together.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
5. Wait for GitHub Pages to publish and copy the generated website URL for submission.

## Technical notes
- Semantic HTML landmarks, headings, lists, a table, hyperlinks, image and audio multimedia are included.
- CSS uses Flexbox and Grid, responsive breakpoints, transitions and a consistent burgundy/blush palette.
- JavaScript handles the mobile menu, dynamic year, task CRUD/filtering, local persistence and contact form validation.
- The contact form does not have a server-side mail service. It validates in the browser then opens the visitor's email app; for production delivery, connect a form backend or email service.
- Google Fonts are loaded online; system fallbacks are provided.
