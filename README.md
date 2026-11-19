# Chhun Yanndara — IT Infrastructure Portfolio

A frontend-only Next.js App Router portfolio using React, TypeScript, Tailwind CSS, React Three Fiber, Drei, Framer Motion and lucide-react. It is configured for static export and Vercel deployment.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Personalize before publishing

1. Update `src/data/portfolioData.ts` with your final dates, role details, email address and preferred summary.
2. Put your PDF CV at `public/cv.pdf` (the hero Download CV button links to `/cv.pdf`).
3. Add or edit YouTube links in `src/data/videos.ts`. Supported formats include `youtube.com/watch?v=...`, `youtu.be/...`, and `youtube.com/shorts/...`.
4. The Quick Add Video modal stores draft entries in browser localStorage and copies a TypeScript array snippet. Paste that snippet into `src/data/videos.ts` and commit it to GitHub to publish the videos.

## Deploy to Vercel

1. Push this project to a GitHub repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Next.js**. Build command: `npm run build`. Output directory: `out` (Next static export creates it automatically).
4. Deploy. No environment variables or backend are required.

## Notes

- The three sample YouTube IDs are intentionally placeholders (`EXAMPLE1`, etc.). Replace them with real video URLs before launch.
- Update the sample contact email before publishing.
- The portfolio is static; the quick-add modal does not write to GitHub or modify source files. It generates a snippet for you to paste into the data file and commit.
- `output: 'export'` in `next.config.mjs` produces the static `out/` folder. No server-side API routes are used.

## Personalize your profile photo and contact details

### Profile photo
1. Prepare a square or portrait photo (JPG, PNG, or WebP).
2. Copy it into the `public` folder, for example `public/profile.jpg`.
3. In `src/data/portfolioData.ts`, change `profileImage` to `/profile.jpg`.
4. Keep the image reasonably optimized (ideally under 1 MB) for faster loading.

The project includes `public/profile-placeholder.svg` until you add your own photo.

### Contact links
Edit the `profile` object in `src/data/portfolioData.ts`:
- `email`: your public email address
- `phone`: your public phone number, including country code
- `linkedin`: full LinkedIn profile URL
- `linkedinLabel`: text shown on the contact card
- `telegram`: full Telegram URL, such as `https://t.me/yourusername`
- `telegramLabel`: your Telegram username

Replace all example values before publishing. These links are visible to website visitors.

### CV
Put your PDF CV at `public/cv.pdf` so the Download CV button works.

### 3D animation
The hero uses React Three Fiber and Drei to render a rotating 3D network of glowing nodes, connecting lines, a pulsing center mesh, a torus ring and background stars. It is dynamically loaded on the client to avoid server-side WebGL rendering.
