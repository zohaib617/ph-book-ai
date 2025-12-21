---
sidebar_position: 8
---

# Performance Optimization Guide

This guide provides actionable strategies to improve your metrics based on Speed Insights data.

## Quick Wins

### LCP Optimization (Largest Contentful Paint)

LCP measures loading speed. Target: ≤ 2.5 seconds

#### Identify LCP Issues

1. In Speed Insights dashboard, find pages with high LCP
2. Look for common patterns:
   - Large images or videos
   - Render-blocking resources
   - Client-side rendering delays

#### Optimization Strategies

**1. Image Optimization**

```html
<!-- Use modern image formats -->
<picture>
  <source srcset="/image.webp" type="image/webp">
  <img src="/image.jpg" alt="Description">
</picture>

<!-- Set explicit dimensions -->
<img 
  src="/image.jpg" 
  alt="Description"
  width="800"
  height="600"
  loading="lazy"
>
```

**2. Minimize Render-Blocking Resources**

```html
<!-- Make stylesheets non-blocking -->
<link rel="stylesheet" href="styles.css" media="print" onload="this.media='all'">

<!-- Defer non-critical JavaScript -->
<script defer src="non-critical.js"></script>

<!-- Use async for independent scripts -->
<script async src="analytics.js"></script>
```

**3. Enable Compression and Caching**

```javascript
// In vercel.json or Next.js config
module.exports = {
  headers: async () => [
    {
      source: '/images/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, immutable'
        }
      ]
    }
  ]
}
```

**4. Use a Content Delivery Network (CDN)**

Vercel provides a global CDN automatically. For additional optimization:
- Serve images through CDN
- Use image optimization services
- Consider responsive images

**5. Reduce Server Response Time**

```javascript
// Optimize database queries
// Use query caching
// Implement data pagination
// Monitor query performance

// Example: Caching strategy
const cache = new Map();
const CACHE_TTL = 300000; // 5 minutes

function getCachedData(key, fetchFn) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.time < CACHE_TTL) {
    return cached.data;
  }
  
  const data = fetchFn();
  cache.set(key, { data, time: Date.now() });
  return data;
}
```

### FID/INP Optimization (Interactivity)

Target FID: ≤ 100ms | Target INP: ≤ 200ms

#### Identify Interactivity Issues

1. Check which interactions have high delays
2. Look for JavaScript-heavy pages
3. Monitor event handlers

#### Optimization Strategies

**1. Break Up Long Tasks**

```javascript
// Bad: One long task blocks interaction
function processLargeDataset() {
  for (let i = 0; i < 1000000; i++) {
    // Heavy computation
  }
}

// Good: Split into chunks with scheduler
async function processLargeDatasetOptimized() {
  for (let i = 0; i < 1000000; i += 10000) {
    await scheduler.yield(); // Allow browser to handle interactions
    // Process 10k items
  }
}
```

**2. Use Web Workers for Heavy Computation**

```javascript
// main.js
const worker = new Worker('heavy-computation.worker.js');

function handleButtonClick() {
  // UI remains responsive
  button.disabled = true;
  worker.postMessage({ data: largeDataset });
}

worker.onmessage = (event) => {
  const result = event.data;
  updateUI(result);
  button.disabled = false;
};
```

```javascript
// heavy-computation.worker.js
self.onmessage = (event) => {
  const result = heavyComputation(event.data);
  self.postMessage(result);
};

function heavyComputation(data) {
  // Computationally expensive work
  return processedResult;
}
```

**3. Defer Non-Critical JavaScript**

```javascript
// React example: Code splitting
import { lazy, Suspense } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

export function App() {
  return (
    <Suspense fallback={<Loading />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

**4. Remove Render-Blocking JavaScript**

```javascript
// Next.js example
export function MyComponent() {
  return (
    <>
      <MainContent />
      {/* Load analytics after main content */}
      <script src="analytics.js" strategy="lazyOnload" />
    </>
  );
}
```

### CLS Optimization (Cumulative Layout Shift)

Target: ≤ 0.1

#### Identify CLS Issues

1. Find pages with high CLS in dashboard
2. Look for:
   - Ads with unresolved dimensions
   - Images without dimensions
   - Dynamic content injection

#### Optimization Strategies

**1. Set Image and Video Dimensions**

```html
<!-- Always include width and height -->
<img 
  src="/photo.jpg" 
  width="800" 
  height="600" 
  alt="Photo"
/>

<video width="640" height="480">
  <source src="movie.mp4" type="video/mp4">
</video>
```

**2. Reserve Space for Dynamic Content**

```css
/* Bad: No space reserved */
.comment-form {
  /* Form elements dynamically inserted */
}

/* Good: Space reserved */
.comment-form {
  min-height: 200px; /* Reserve space for form */
}
```

```jsx
// React example
export function CommentSection() {
  const [showForm, setShowForm] = useState(false);
  
  return (
    <div style={{ minHeight: '200px' }}>
      {showForm ? <CommentForm /> : <button onClick={() => setShowForm(true)}>Add comment</button>}
    </div>
  );
}
```

**3. Avoid Inserting Content Above Existing Content**

```jsx
// Bad: New content shifts everything down
export function Notification() {
  return (
    <>
      {notification && <Alert>{notification}</Alert>}
      <MainContent />
    </>
  );
}

// Good: Fixed position or reserved space
export function Notification() {
  return (
    <>
      <div style={{ position: 'fixed', top: 0, width: '100%' }}>
        {notification && <Alert>{notification}</Alert>}
      </div>
      <MainContent style={{ paddingTop: '60px' }} />
    </>
  );
}
```

**4. Optimize Web Font Loading**

```css
/* Use font-display: swap to prevent FOUT */
@font-face {
  font-family: 'CustomFont';
  src: url('font.woff2') format('woff2');
  font-display: swap; /* Show fallback immediately */
}
```

```javascript
// Or use Web Font Loader
WebFontConfig = {
  google: { families: ['Droid+Sans', 'Droid+Serif'] },
  fontloading: function() {
    console.log('font loading');
  },
  active: function() {
    console.log('fonts loaded');
  }
};
```

## Framework-Specific Optimizations

### Next.js

```javascript
// next.config.js
module.exports = {
  // Enable Image Optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
  
  // Optimize fonts
  experimental: {
    optimizePackageImports: ['@vercel/speed-insights']
  }
}
```

```jsx
// Use Next.js Image component
import Image from 'next/image';

export function OptimizedImage() {
  return (
    <Image
      src="/photo.jpg"
      width={800}
      height={600}
      alt="Photo"
      priority // For LCP images
    />
  );
}
```

### React

```jsx
// Use React.lazy for code splitting
const HeavyComponent = React.lazy(() => import('./HeavyComponent'));

// Use Suspense for fallback
export function App() {
  return (
    <Suspense fallback={<Spinner />}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Vue

```vue
<script setup>
// Lazy load components
import { defineAsyncComponent } from 'vue';

const HeavyComponent = defineAsyncComponent(() =>
  import('./HeavyComponent.vue')
);
</script>

<template>
  <Suspense>
    <template #default>
      <HeavyComponent />
    </template>
    <template #fallback>
      <Spinner />
    </template>
  </Suspense>
</template>
```

## Monitoring Improvements

### Tracking Progress

1. **Establish Baselines**
   - Record current metrics for each page
   - Note the 75th percentile values

2. **Set Goals**
   - Target LCP: ≤ 2.5s
   - Target FID: ≤ 100ms
   - Target CLS: ≤ 0.1

3. **Implement Changes**
   - Make one optimization at a time
   - Monitor impact for 1-2 days

4. **Measure Impact**
   - Use Speed Insights dashboard
   - Compare before/after metrics
   - Look for improvements in percentiles

### Using Custom Events

Track performance of specific optimizations:

```javascript
// Track custom interaction timing
if (window.si) {
  performance.mark('optimization-start');
  
  // Do optimization work
  performanceOptimization();
  
  performance.mark('optimization-end');
  performance.measure('optimization', 'optimization-start', 'optimization-end');
  
  const measure = performance.getEntriesByName('optimization')[0];
  window.si('sendMetrics', {
    'custom_optimization_time': measure.duration
  });
}
```

## Common Optimization Patterns

### Pattern 1: Progressive Enhancement

```jsx
export function ProgressiveComponent() {
  const [isHydrated, setIsHydrated] = useState(false);
  
  useEffect(() => {
    setIsHydrated(true);
  }, []);
  
  return isHydrated ? <FullComponent /> : <BasicComponent />;
}
```

### Pattern 2: Intersection Observer for Lazy Loading

```javascript
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

images.forEach(img => imageObserver.observe(img));
```

### Pattern 3: Resource Hints

```html
<!-- Preload critical resources -->
<link rel="preload" href="critical.js" as="script">

<!-- Prefetch resources needed soon -->
<link rel="prefetch" href="next-page.js">

<!-- DNS prefetch for third parties -->
<link rel="dns-prefetch" href="//api.example.com">

<!-- Preconnect to critical origins -->
<link rel="preconnect" href="https://fonts.googleapis.com">
```

## Advanced Optimization

### Performance Budget

Define acceptable performance limits:

```javascript
// performance-budget.json
{
  "bundles": [
    {
      "name": "main",
      "maxSize": "500kb"
    },
    {
      "name": "vendor",
      "maxSize": "300kb"
    }
  ],
  "metrics": [
    {
      "name": "LCP",
      "limit": "2500ms"
    },
    {
      "name": "FID",
      "limit": "100ms"
    }
  ]
}
```

### Continuous Monitoring

Set up automated performance monitoring:

```javascript
// In your CI/CD pipeline
import { analyzeMetrics } from '@vercel/speed-insights/api';

async function checkPerformanceBudget() {
  const metrics = await analyzeMetrics({
    projectId: process.env.VERCEL_PROJECT_ID,
    timeRange: '24h'
  });
  
  if (metrics.lcp > 2500) {
    console.error('LCP exceeds budget!');
    process.exit(1);
  }
}

checkPerformanceBudget();
```

## Summary of Key Metrics

| Metric | Target | Optimization Focus |
|--------|--------|-------------------|
| LCP | ≤ 2.5s | Image optimization, Server response |
| FID | ≤ 100ms | JavaScript execution, Task chunking |
| CLS | ≤ 0.1 | Layout stability, Reserved space |
| FCP | ≤ 1.8s | Critical resources, Server response |
| TTFB | ≤ 600ms | Server optimization, CDN usage |

## Next Steps

1. Review your Speed Insights dashboard
2. Identify your slowest metrics
3. Choose one optimization from this guide
4. Implement and measure results
5. Iterate based on data

---

For more information:
- [Speed Insights Metrics Guide](/docs/speed-insights/metrics)
- [Web Vitals Documentation](https://web.dev/vitals/)
- [Performance Best Practices](https://web.dev/performance/)
