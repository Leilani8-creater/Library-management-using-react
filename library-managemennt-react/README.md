# Library Management System

A React library management app built with Vite. The app stores books, users,
transactions, and the current login in the browser's local storage.

## Run locally

```sh
npm install
npm run dev
```

Use the first-time librarian account:

- Name: `Admin`
- Membership ID: `ADMIN01`

## Deploy to GitHub Pages

The GitHub Actions workflow at `../.github/workflows/static.yml` builds and
deploys the app whenever changes are pushed to `main`. It publishes the built
site using the repository's GitHub Pages deployment environment.

After the first successful workflow run, the app is available at:

https://leilani8-creater.github.io/Library-management-using-react/

If GitHub Pages is not enabled automatically, open the repository's **Settings >
Pages** and set **Build and deployment > Source** to **GitHub Actions**. Each
visitor's data is saved only in that visitor's own browser.
