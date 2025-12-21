---
sidebar_position: 6
---

# Troubleshooting Speed Insights

This guide helps you resolve common issues with Vercel Speed Insights.

## Speed Insights Script Not Loading

### Symptoms

- The `/_vercel/speed-insights/script.js` file is not found in network requests
- No metrics appear in the Speed Insights dashboard
- Browser console shows 404 errors

### Solutions

1. **Verify Speed Insights is Enabled**
   - Go to your Vercel project dashboard
   - Navigate to the Settings tab
   - Check that Speed Insights is enabled
   - If not enabled, click the Enable button

2. **Redeploy Your Application**
   - Speed Insights routes are added during deployment
   - After enabling Speed Insights, you must redeploy
   - Run: `vercel deploy`
   - Or push to your connected git repository

3. **Check Deployment Status**
   - Ensure your deployment completed successfully
   - Check for any build errors in the deployment logs
   - Verify the deployment shows a "Ready" status

4. **Clear Browser Cache**
   - Clear your browser cache
   - Perform a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Try in an incognito/private window

### Verification

Once resolved, you should see:
- `/_vercel/speed-insights/script.js` in network requests (Status: 200)
- No console errors
- The script tag in your page's HTML

## No Data Appearing in Dashboard

### Symptoms

- Speed Insights is enabled and script is loading
- No metrics appear in the dashboard after several hours
- The dashboard shows "No data available"

### Solutions

1. **Wait for Data Collection**
   - Real user data takes time to collect
   - Ensure actual users are visiting your site
   - Wait at least 2-4 hours for initial data
   - Wait 24+ hours for a statistically significant sample

2. **Verify Production Deployment**
   - Speed Insights only works on production deployments
   - Confirm you're visiting your production domain
   - Check that analytics are enabled for this project (not staging)

3. **Check for Script Errors**
   - Open browser DevTools (F12)
   - Go to the Console tab
   - Look for any JavaScript errors
   - Check the Network tab for failed requests

4. **Verify User Traffic**
   - Ensure real users are visiting your site
   - Test with different browsers
   - Check from different geographic locations
   - Verify the site is accessible

5. **Check JavaScript is Enabled**
   - Speed Insights requires JavaScript to be enabled
   - Verify JavaScript is enabled in your browser
   - Check that you're not using a browser with JS disabled

### Advanced Debugging

Check if the script is executing:

```javascript
// In browser console
window.si
// Should return a function if Speed Insights is loaded
```

## High Sampling Rate Performance Impact

### Symptoms

- Website performance decreases after enabling Speed Insights
- Increased network requests
- Higher CPU usage

### Solutions

1. **Reduce Sample Rate**
   - Lower the sampling rate to reduce overhead
   - Only track a percentage of users

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

export function Analytics() {
  // Track only 10% of requests
  return <SpeedInsights sampleRate={0.1} />;
}
```

2. **Disable in Development**
   - Don't track analytics in development environments
   - Only enable in production

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

export function Analytics() {
  if (process.env.NODE_ENV !== 'production') {
    return null;
  }
  return <SpeedInsights />;
}
```

## Component Not Appearing

### Symptoms

- Speed Insights component is imported but not visible
- Type errors or import errors in console

### Solutions

1. **Verify Package Installation**
   ```bash
   npm list @vercel/speed-insights
   ```
   Ensure the package is installed and version is correct

2. **Check Import Path**
   Verify you're using the correct import for your framework:

   ```tsx
   // Next.js
   import { SpeedInsights } from '@vercel/speed-insights/next';

   // React
   import { SpeedInsights } from '@vercel/speed-insights/react';

   // Vue
   import { SpeedInsights } from '@vercel/speed-insights/vue';

   // Other frameworks - use correct path
   ```

3. **Verify Component Placement**
   - Component should be in the app component
   - Should be rendered unconditionally
   - Should not be inside conditional blocks that prevent rendering

## Metrics Not Updating

### Symptoms

- Dashboard shows old data
- New metrics not appearing after changes
- Data appears stale

### Solutions

1. **Check Data Retention Period**
   - Data is retained for 90 days by default
   - Very old data may have been purged
   - Contact Vercel support to extend retention if needed

2. **Verify Site Traffic**
   - No new users = no new data
   - Ensure users are still visiting the site
   - Check traffic with Google Analytics or similar

3. **Review Filtering**
   - Check if date filters are limiting results
   - Verify you're looking at the correct time period
   - Ensure geographic or browser filters aren't hiding data

## Content Security Policy (CSP) Issues

### Symptoms

- Script fails to load with CSP error
- Browser console shows CSP violation
- Network request shows CSP error

### Solutions

Add Speed Insights endpoints to your CSP policy:

```html
<meta http-equiv="Content-Security-Policy" content="
  script-src 'self' 'unsafe-inline' /_vercel/speed-insights/script.js;
  connect-src 'self' /_vercel/speed-insights/;
">
```

Or in your headers configuration (Next.js example):

```javascript
// next.config.js
module.exports = {
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: "script-src 'self' '/_vercel/speed-insights/script.js'; connect-src '/_vercel/speed-insights/'"
        }
      ]
    }
  ]
}
```

## Framework-Specific Issues

### Next.js App Router Issues

**Problem:** Component not rendering in layout

**Solution:** Ensure component is placed correctly in layout.tsx:

```tsx
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### React/CRA Issues

**Problem:** Multiple instances of Speed Insights tracking

**Solution:** Only include component once in app root:

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
      <SpeedInsights /> {/* Only here, not in subcomponents */}
    </>
  );
}
```

### SvelteKit Issues

**Problem:** Function called multiple times

**Solution:** Ensure `injectSpeedInsights()` is called only once:

```ts
// src/routes/+layout.ts (not in components)
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

injectSpeedInsights(); // Called once at load
```

## Performance Issues After Implementation

### Symptoms

- Page load time increased
- JavaScript execution time increased
- Layout shift detected

### Solutions

1. **Check Component Placement**
   - Ensure component doesn't render in critical path
   - Place at end of body/layout
   - Use lazy loading if needed

2. **Optimize beforeSend Hook**
   - Keep beforeSend function lightweight
   - Avoid heavy computations
   - Use simple string operations

3. **Adjust Sampling**
   - Reduce sampleRate for high-traffic sites
   - Consider time-based sampling (track only certain users)

## API Integration Issues

### Symptoms

- Metrics data not accessible via API
- API calls return errors
- Webhook notifications not working

### Solutions

1. **Verify API Access**
   - Check Vercel project settings
   - Ensure API tokens are valid
   - Confirm proper authentication setup

2. **Check Rate Limits**
   - Speed Insights API has rate limits
   - Verify you're not exceeding limits
   - Implement proper retry logic

3. **Validate Webhook Configuration**
   - Check webhook endpoints are accessible
   - Verify endpoint returns 2xx status
   - Check webhook payload format

## Contacting Vercel Support

If you can't resolve the issue:

1. **Gather Information**
   - Note the exact symptoms
   - Record your Vercel project ID
   - Screenshot any error messages
   - Provide affected URLs/pages

2. **Contact Support**
   - Visit [Vercel Support](https://vercel.com/support)
   - Select your plan type
   - Describe the issue with details
   - Attach relevant logs/screenshots

3. **Check Status Page**
   - Visit [Vercel Status](https://www.vercelstatus.com)
   - Check for any ongoing incidents
   - Look for Speed Insights-specific issues

## Common Error Messages

### "Speed Insights is not enabled for this project"
- Enable Speed Insights in project settings
- Redeploy after enabling

### "Failed to collect metrics"
- Check network connectivity
- Verify CDN isn't blocking requests
- Check browser console for errors

### "Invalid configuration"
- Verify all component props are correct types
- Check beforeSend function returns valid data
- Ensure sampleRate is between 0-1

## Performance Optimization Tips

While troubleshooting, also consider:

1. **Monitor Other Metrics**
   - Check TTFB and FCP
   - Monitor JavaScript execution time
   - Track Core Web Vitals independently

2. **Use Performance Tools**
   - Chrome DevTools Performance tab
   - Lighthouse reports
   - WebPageTest for detailed analysis

3. **Implement Progressive Enhancement**
   - Speed Insights is non-critical
   - Ensure it doesn't block main content
   - Load after critical content

---

For additional help, visit:
- [Vercel Documentation](https://vercel.com/docs)
- [Speed Insights Docs](https://vercel.com/docs/speed-insights)
- [Community Forum](https://github.com/vercel/next.js/discussions)
