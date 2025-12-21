---
sidebar_position: 3
---

# Using the @vercel/speed-insights Package

The `@vercel/speed-insights` package provides various options and configuration methods to customize Speed Insights for your specific needs.

## Installation

```bash
npm install @vercel/speed-insights
```

## Basic Usage

Once installed, import the component or function appropriate for your framework and add it to your application. The package automatically starts tracking Core Web Vitals and other performance metrics.

## Configuration Options

The Speed Insights component accepts several optional configuration parameters:

### `route` (string, optional)

The route name to associate with the metrics. This is useful when you want to track metrics for specific pages or sections of your application.

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

export function Analytics() {
  return <SpeedInsights route="/dashboard" />;
}
```

### `sampleRate` (number, optional)

Control the sampling rate for metrics collection. A value between 0 and 1 where 1 means all requests are tracked (default: 1).

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

export function Analytics() {
  // Only track 50% of requests
  return <SpeedInsights sampleRate={0.5} />;
}
```

### `beforeSend` (function, optional)

A callback function that runs before sending data to Vercel. This is useful for:
- Removing sensitive information from URLs
- Adding custom context
- Filtering data before transmission

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

export function Analytics() {
  return (
    <SpeedInsights
      beforeSend={(data) => {
        // Remove query parameters containing sensitive info
        if (data.url) {
          data.url = data.url.split('?')[0];
        }
        return data;
      }}
    />
  );
}
```

#### Example: Removing Sensitive URL Parameters

```tsx
function sanitizeUrl(url: string): string {
  const sensitiveParams = ['token', 'apiKey', 'secret', 'userId'];
  const urlObj = new URL(url);
  
  sensitiveParams.forEach(param => {
    urlObj.searchParams.delete(param);
  });
  
  return urlObj.toString();
}

export function Analytics() {
  return (
    <SpeedInsights
      beforeSend={(data) => {
        if (data.url) {
          data.url = sanitizeUrl(data.url);
        }
        return data;
      }}
    />
  );
}
```

## Tracked Metrics

Speed Insights automatically tracks the following performance metrics:

### Core Web Vitals

- **Largest Contentful Paint (LCP)**: Measures loading performance
- **First Input Delay (FID)**: Measures interactivity
- **Cumulative Layout Shift (CLS)**: Measures visual stability

### Additional Metrics

- **First Contentful Paint (FCP)**: Time until first content renders
- **Time to First Byte (TTFB)**: Server response time
- **Navigation Timing**: Page load timing information

## Framework-Specific Notes

### React

The React component automatically handles SSR (Server-Side Rendering) considerations:

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

// In your app component
function App() {
  return (
    <>
      <YourContent />
      <SpeedInsights />
    </>
  );
}
```

### Next.js

Next.js has a dedicated export for the best integration:

```tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

// Use in your layout or _app.tsx
export default function RootLayout({ children }) {
  return (
    <>
      {children}
      <SpeedInsights />
    </>
  );
}
```

### Astro

For Astro, use the dedicated Astro component:

```astro
---
import SpeedInsights from '@vercel/speed-insights/astro';
---
<SpeedInsights />
```

## Common Use Cases

### Tracking Specific Pages

In single-page applications, track different routes separately:

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';
import { useLocation } from 'react-router-dom';

export function Analytics() {
  const location = useLocation();
  return <SpeedInsights route={location.pathname} />;
}
```

### Development vs. Production

Optionally disable Speed Insights in development:

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

export function Analytics() {
  if (process.env.NODE_ENV === 'development') {
    return null;
  }
  return <SpeedInsights />;
}
```

### Privacy-First Implementation

Remove all query parameters before sending:

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

export function Analytics() {
  return (
    <SpeedInsights
      beforeSend={(data) => {
        if (data.url) {
          data.url = data.url.split('?')[0];
        }
        return data;
      }}
    />
  );
}
```

## API Reference

### Component Props

| Prop | Type | Description |
|------|------|-------------|
| `route` | `string` | The route name for this metrics collection |
| `sampleRate` | `number` | Sampling rate (0-1, default: 1) |
| `beforeSend` | `function` | Callback to modify data before sending |

### beforeSend Function Signature

```typescript
type beforeSend = (data: Record<string, any>) => Record<string, any> | undefined;
```

If the function returns `undefined`, the data will not be sent to Vercel.

## Troubleshooting

### Script Not Loading

If you don't see the `/_vercel/speed-insights/script.js` in your page's body:

1. Ensure Speed Insights is enabled in your Vercel project
2. Verify you've redeployed since enabling Speed Insights
3. Check that the component is properly imported and placed in your app

### No Data Appearing

- Ensure users are visiting your deployed application (metrics only collected in production)
- Wait a few minutes for data to appear in the dashboard
- Check that Speed Insights is enabled in your Vercel project settings

### Privacy Concerns

Use the `beforeSend` callback to remove sensitive information before transmission to Vercel's servers.

## More Information

- [Learn about Speed Insights Metrics](/docs/speed-insights/metrics)
- [Privacy and Compliance](/docs/speed-insights/privacy-policy)
- [Limits and Pricing](/docs/speed-insights/limits-and-pricing)
