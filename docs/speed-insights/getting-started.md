---
sidebar_position: 1
---

# Getting Started with Speed Insights

This guide will help you get started with using Vercel Speed Insights on your project, showing you how to enable it, add the package to your project, deploy your app to Vercel, and view your data in the dashboard.

To view instructions on using the Vercel Speed Insights in your project for your framework, use the **Choose a framework** dropdown on the right (at the bottom in mobile view).

## Prerequisites

- A Vercel account. If you don't have one, you can [sign up for free](https://vercel.com/signup).
- A Vercel project. If you don't have one, you can [create a new project](https://vercel.com/new).
- The Vercel CLI installed. If you don't have it, you can install it using the following command:

```bash
npm i vercel
```

Or with your preferred package manager:

```bash
# Using pnpm
pnpm i vercel

# Using yarn
yarn add vercel

# Using bun
bun add vercel
```

## Step 1: Enable Speed Insights in Vercel

On the [Vercel dashboard](/dashboard), select your Project followed by the **Speed Insights** tab. You can also select the button below to be taken there. Then, select **Enable** from the dialog.

> **💡 Note:** Enabling Speed Insights will add new routes (scoped at `/_vercel/speed-insights/*`) after your next deployment.

## Step 2: Add `@vercel/speed-insights` to your project

Using the package manager of your choice, add the `@vercel/speed-insights` package to your project:

```bash
# Using npm
npm i @vercel/speed-insights

# Using pnpm
pnpm i @vercel/speed-insights

# Using yarn
yarn add @vercel/speed-insights

# Using bun
bun add @vercel/speed-insights
```

## Step 3: Add the `SpeedInsights` component to your app

For Docusaurus projects, add the `SpeedInsights` component to your app wrapper. Since Docusaurus is built with React, you can add it to your root layout or a custom theme component.

### For Docusaurus 3.x (React-based)

Add the `SpeedInsights` component to your theme's root wrapper or create a custom wrapper component:

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  return (
    <>
      <YourAppContent />
      <SpeedInsights />
    </>
  );
}
```

If you're using a custom theme component, you can create a new component file:

```tsx
// src/components/SpeedInsights.tsx
import { SpeedInsights as VercelSpeedInsights } from '@vercel/speed-insights/react';

export function SpeedInsightsComponent() {
  return <VercelSpeedInsights />;
}
```

Then import and use it in your theme's root file or docusaurus config.

## Step 4: Deploy your app to Vercel

You can deploy your app to Vercel's global CDN by running the following command from your terminal:

```bash
vercel deploy
```

Alternatively, you can connect your project's git repository, which will enable Vercel to deploy your latest pushes and merges to main.

Once your app is deployed, it's ready to begin tracking performance metrics.

> **💡 Note:** If everything is set up correctly, you should be able to find the `/_vercel/speed-insights/script.js` script inside the body tag of your page.

## Step 5: View your data in the dashboard

Once your app is deployed, and users have visited your site, you can view the data in the dashboard.

To do so, go to your Vercel dashboard, select your project, and click the **Speed Insights** tab.

After a few days of visitors, you'll be able to start exploring your metrics. For more information on how to use Speed Insights, see the [Metrics Guide](/docs/speed-insights/metrics).

Learn more about how Vercel supports privacy and data compliance standards in our [Privacy and Compliance](/docs/speed-insights/privacy-policy) guide.

## Next Steps

Now that you have Vercel Speed Insights set up, you can explore the following topics to learn more:

- [Learn how to use the `@vercel/speed-insights` package](/docs/speed-insights/package)
- [Learn about metrics](/docs/speed-insights/metrics)
- [Read about privacy and compliance](/docs/speed-insights/privacy-policy)
- [Explore pricing](/docs/speed-insights/limits-and-pricing)
- [Troubleshooting](/docs/speed-insights/troubleshooting)

---

For more detailed framework-specific instructions and advanced configuration options, please refer to the sections below based on your specific use case.
