---
sidebar_position: 2
---

# Framework-Specific Implementation

This guide provides detailed instructions for integrating Vercel Speed Insights with various frameworks.

## Next.js

### Pages Router (Next.js < 13.5)

For the Pages Router in Next.js versions older than 13.5, import the `SpeedInsights` component from `@vercel/speed-insights/react`. You'll need to pass the pathname of the route:

```tsx title="pages/_app.tsx"
import type { AppProps } from 'next/app';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights route={router.pathname} />
    </>
  );
}

export default MyApp;
```

```jsx title="pages/_app.jsx"
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights route={router.pathname} />
    </>
  );
}

export default MyApp;
```

### Pages Router (Next.js >= 13.5)

For newer versions, use the wrapper component in `_app`:

```tsx title="pages/_app.tsx"
import type { AppProps } from 'next/app';
import { SpeedInsights } from '@vercel/speed-insights/next';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <SpeedInsights />
    </>
  );
}

export default MyApp;
```

### App Router (Next.js 13.5+)

For the App Router, add the component to your root layout:

```tsx title="app/layout.tsx"
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

```jsx title="app/layout.jsx"
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### App Router with Older Next.js (< 13.5)

For older versions, create a dedicated client component:

```tsx title="app/insights.tsx"
"use client";

import { SpeedInsights } from '@vercel/speed-insights/react';
import { usePathname } from 'next/navigation';

export function Insights() {
  const pathname = usePathname();

  return <SpeedInsights route={pathname} />;
}
```

```jsx title="app/insights.jsx"
"use client";

import { SpeedInsights } from '@vercel/speed-insights/react';
import { usePathname } from 'next/navigation';

export function Insights() {
  const pathname = usePathname();

  return <SpeedInsights route={pathname} />;
}
```

Then import in your layout:

```tsx title="app/layout.tsx"
import { Insights } from './insights';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Next.js</title>
      </head>
      <body>
        {children}
        <Insights />
      </body>
    </html>
  );
}
```

## Create React App

```tsx title="App.tsx"
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  return (
    <div>
      {/* ... */}
      <SpeedInsights />
    </div>
  );
}
```

```jsx title="App.jsx"
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  return (
    <div>
      {/* ... */}
      <SpeedInsights />
    </div>
  );
}
```

## Remix

```tsx title="app/root.tsx"
import { SpeedInsights } from '@vercel/speed-insights/remix';

export default function App() {
  return (
    <html lang="en">
      <body>
        {/* ... */}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

```jsx title="app/root.jsx"
import { SpeedInsights } from '@vercel/speed-insights/remix';

export default function App() {
  return (
    <html lang="en">
      <body>
        {/* ... */}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

## SvelteKit

```ts title="src/routes/+layout.ts"
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

injectSpeedInsights();
```

```js title="src/routes/+layout.js"
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

injectSpeedInsights();
```

## Vue

```vue title="src/App.vue"
<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  <SpeedInsights />
</template>
```

```vue title="src/App.vue"
<script setup>
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  <SpeedInsights />
</template>
```

## Nuxt

```vue title="layouts/default.vue"
<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  <SpeedInsights />
</template>
```

```vue title="layouts/default.vue"
<script setup>
import { SpeedInsights } from '@vercel/speed-insights/vue';
</script>

<template>
  <SpeedInsights />
</template>
```

## Astro

Speed Insights is available for both static and SSR Astro apps. Add the component near the bottom of one of your layout components:

```astro title="BaseHead.astro"
---
import SpeedInsights from '@vercel/speed-insights/astro';
const { title, description } = Astro.props;
---
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<SpeedInsights />
```

### With Before Send Hook

You can optionally remove sensitive information from the URL by adding a `speedInsightsBeforeSend` function to the global `window` object:

```astro title="BaseHead.astro"
---
import SpeedInsights from '@vercel/speed-insights/astro';
const { title, description } = Astro.props;
---
<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />

<script is:inline>
  function speedInsightsBeforeSend(data) {
    console.log("Speed Insights before send", data);
    return data;
  }
</script>

<SpeedInsights />
```

Learn more about `beforeSend` in the [Package Documentation](/docs/speed-insights/package).

## HTML (No Framework)

When using the HTML implementation, there is no need to install the `@vercel/speed-insights` package. Simply add the script tags before the closing `</body>` tag:

```html title="index.html"
<script>
  window.si = window.si || function () { (window.siq = window.siq || []).push(arguments); };
</script>
<script defer src="/_vercel/speed-insights/script.js"></script>
```

## Generic JavaScript Framework

For other JavaScript frameworks, import the `injectSpeedInsights` function, which will add the tracking script to your app. **This should only be called once in your app, and must run on the client**:

```ts title="main.ts"
import { injectSpeedInsights } from '@vercel/speed-insights';

injectSpeedInsights();
```

```js title="main.js"
import { injectSpeedInsights } from '@vercel/speed-insights';

injectSpeedInsights();
```

## Docusaurus

For Docusaurus projects, add the component to your theme's root wrapper or a custom theme component. Create a wrapper component that imports SpeedInsights:

```tsx title="src/components/SpeedInsightsWrapper.tsx"
import { SpeedInsights } from '@vercel/speed-insights/react';

export function SpeedInsightsWrapper() {
  return <SpeedInsights />;
}
```

Then import and use this component in your custom theme layout or docusaurus config file.
