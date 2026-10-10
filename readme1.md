# Secure Application Integration — HTML/CSS/JavaScript Demo

This is a static front-end version of Task 4, designed to open directly in a browser without installing Node.js, Express, or a database.

## Files
- `index.html` — page structure and labelled forms
- `style.css` — responsive styling
- `script.js` — sample internship data, search, domain filtering, pagination, and browser-side form validation

## Run it
Open `index.html` in your browser, or open this folder in VS Code and use Live Server if already installed.

## Features
- Search and domain filters
- Pagination
- Loading/empty/error UI areas
- Responsive cards and keyboard focus styles
- Application form with browser-side validation
- No frameworks and no package installation

## Important limitation for Task 4
This static version is front-end only. It does **not** provide a real REST API, server-side validation, server-side rate limiting, secure server headers, or permanent application storage. Those requirements need a backend or a hosted API. The form deliberately tells the user it has not sent or saved an application rather than pretending it did.

## Security checklist
- [x] Accessible labels and keyboard focus
- [x] Browser-side validation
- [x] Input length limits
- [x] Uses `textContent` when rendering text
- [ ] Server-side validation (requires backend)
- [ ] API rate limiting and secure response headers (requires backend)
- [ ] Persistent application storage (requires backend)
