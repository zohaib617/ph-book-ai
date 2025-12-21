---
sidebar_position: 7
---

# Limits and Pricing

Speed Insights is Vercel's real user monitoring (RUM) solution for understanding application performance. Here's what you need to know about limits, pricing, and how to optimize your usage.

## Pricing Overview

Speed Insights is available on all Vercel plans with different levels of access and features.

### Free Plan

- **Cost:** Included at no additional charge
- **Data Retention:** 7 days
- **Features:**
  - Basic metrics collection
  - Dashboard access
  - Core Web Vitals tracking
  - Geographic performance view
  - Browser and device breakdown

### Pro Plan

- **Cost:** Included with Pro plan ($20/month)
- **Data Retention:** 30 days
- **Features:**
  - All Free features
  - Extended data retention
  - API access
  - Custom events (coming soon)
  - Advanced filtering

### Enterprise Plan

- **Cost:** Custom pricing
- **Data Retention:** Up to 1 year (customizable)
- **Features:**
  - All Pro features
  - Extended retention periods
  - Priority support
  - Custom data processing
  - Dedicated account management
  - SLA guarantees

## Data Limits

### Collection Limits

| Metric | Limit | Notes |
|--------|-------|-------|
| Events per day | Unlimited | Real user events |
| URL length | 2,048 characters | Longer URLs are truncated |
| Custom dimensions | 10 | Optional custom data |
| Dimension values | 500 characters each | Custom dimension value limit |
| Historical data | 7-365 days | Depends on plan |

### Sample Size Considerations

- **Minimum Data:** Requires at least 100 events in a time period to display meaningful metrics
- **Percentile Accuracy:** Larger samples provide more accurate percentile calculations
- **Outliers:** Very large or very small values may be filtered (>99th percentile)

### Rate Limits

Speed Insights API has the following rate limits:

| Endpoint | Limit |
|----------|-------|
| Metrics API | 100 requests/minute per project |
| Custom Events API | 1,000 requests/minute per project |
| Webhook Events | 1,000 events/minute per project |

## Feature Limits

### Dashboard

- **Charts:** Up to 30 days of historical data (Free), 90 days (Pro), 1 year (Enterprise)
- **Filters:** Can filter by location, browser, device, and custom dimensions
- **Export:** Limited export options on Free plan

### API Access

- **Free Plan:** No API access
- **Pro Plan:** Full API access to metrics data
- **Enterprise:** Custom API usage limits available

### Webhooks

- **Free Plan:** Not available
- **Pro Plan:** Up to 10 webhook endpoints
- **Enterprise:** Unlimited webhook endpoints

## Optimization Tips

### Reducing Data Collection

If you're approaching limits, consider:

#### 1. Adjust Sampling Rate

Reduce the percentage of requests tracked:

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

export function Analytics() {
  // Track 50% of requests instead of 100%
  return <SpeedInsights sampleRate={0.5} />;
}
```

#### 2. Regional Sampling

Track only specific regions:

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

export function Analytics() {
  const isHighTrafficRegion = detectHighTrafficRegion();
  const sampleRate = isHighTrafficRegion ? 0.1 : 1; // 10% in high traffic, 100% elsewhere
  return <SpeedInsights sampleRate={sampleRate} />;
}
```

#### 3. Time-Based Sampling

Sample more during low-traffic periods:

```tsx
function calculateDynamicSampleRate() {
  const hour = new Date().getHours();
  
  // Higher sampling during off-peak hours (12am-6am)
  if (hour >= 0 && hour < 6) {
    return 1; // Track 100%
  }
  
  // Lower sampling during peak hours
  return 0.2; // Track 20%
}

import { SpeedInsights } from '@vercel/speed-insights/react';

export function Analytics() {
  return <SpeedInsights sampleRate={calculateDynamicSampleRate()} />;
}
```

### Cost Optimization Strategies

#### 1. Upgrade as Needed

- Start with Free plan
- Track usage for a month
- Upgrade to Pro if you need extended retention and API access

#### 2. Implement Filtering

Use filters to focus on important metrics:
- Filter by geography to see specific region performance
- Filter by device type to understand mobile vs desktop differences
- Use custom dimensions to track feature-specific performance

#### 3. Archive Old Data

For very large amounts of data, consider:
- Using the API to export data before retention period ends
- Storing historical data in your own data warehouse
- Using webhooks to stream data to external analytics

## Scale Considerations

### High-Traffic Applications

For sites with millions of daily visitors:

1. **Reduce Sample Rate**
   - Even 1% sampling provides significant data
   - Maintain accuracy with large sample sizes

2. **Use Custom Dimensions Strategically**
   - Only track dimensions needed for analysis
   - Use beforeSend to filter events

3. **Implement API Consumption Limits**
   - Use rate limiting on API requests
   - Cache results when possible

4. **Consider Data Export**
   - Export data regularly to manage retention
   - Build custom dashboards with exported data

### Example: Large-Scale Implementation

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

function getOptimalSampleRate() {
  const isBot = navigator.userAgent.includes('bot');
  if (isBot) return 0; // Don't track bots
  
  const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isPeakHour = new Date().getHours() >= 9 && new Date().getHours() <= 17;
  
  // Reduce tracking during peak hours if in dark mode
  if (isPeakHour && isDarkMode) return 0.05;
  if (isPeakHour) return 0.1;
  
  return 1; // Track all off-peak traffic
}

export function Analytics() {
  return (
    <SpeedInsights 
      sampleRate={getOptimalSampleRate()}
      beforeSend={(data) => {
        // Filter out internal/test traffic
        if (data.url?.includes('staging')) return;
        
        // Remove sensitive query parameters
        if (data.url) {
          data.url = data.url.split('?')[0];
        }
        
        return data;
      }}
    />
  );
}
```

## Billing Examples

### Free Plan Billing

```
Base Cost: $0/month
Speed Insights: Included
Data Retention: 7 days
Total: $0/month
```

### Pro Plan Billing

```
Base Cost: $20/month
Speed Insights: Included
Data Retention: 30 days
Total: $20/month
```

### Enterprise Custom Pricing

```
Contact Vercel sales for:
- Custom data retention (up to 1 year)
- Higher rate limits
- Priority support
- Custom SLAs
```

## Monitoring Your Usage

### Dashboard Indicators

The Speed Insights dashboard shows:
- Current data retention period
- Plan type and limits
- Approximate events collected this month
- Available API calls (Pro/Enterprise)

### API Usage

Check your usage programmatically:

```javascript
// Get project analytics usage
fetch(`https://api.vercel.com/v9/projects/{projectId}/analytics`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
})
.then(res => res.json())
.then(data => console.log(data.usage));
```

## Future Pricing Considerations

### Planned Features

Vercel may introduce:
- Custom metrics pricing
- Higher-tier plans with additional features
- Pay-as-you-go models for high-volume usage

### Legacy Pricing

If you're on legacy plans:
- Existing plans remain grandfathered
- Speed Insights availability may vary
- Contact Vercel support to learn about your specific plan

## Frequently Asked Questions

### Can I upgrade or downgrade my plan?

Yes, you can change your plan at any time. Changes take effect at the next billing cycle.

### What happens to my data if I downgrade?

Data retention is reduced to match your new plan tier. Data older than the retention period is deleted.

### How is usage calculated?

Each event (page view or custom event) counts as one unit of usage. Events are counted toward your daily or monthly limits based on your plan.

### Can I get a volume discount?

Enterprise customers can negotiate volume discounts. Contact Vercel sales.

### Is Speed Insights included in the Free plan?

Yes, Speed Insights is included in the Free plan with 7-day retention and basic features.

### What if I exceed my limits?

Your project will continue to work, but:
- Data retention is reduced (removed older data first)
- API calls may be rate-limited
- You may be prompted to upgrade

## Getting Started

Ready to optimize your Speed Insights usage?

1. **Review your current plan** on the Vercel dashboard
2. **Monitor your usage** for 1-2 weeks
3. **Calculate optimal sample rates** for your traffic volume
4. **Implement sampling** if approaching limits
5. **Upgrade your plan** if you need more features

## Support

For pricing questions:
- Contact [Vercel Sales](https://vercel.com/contact/sales)
- Check your [Vercel Dashboard](https://vercel.com/dashboard)
- Review [Vercel Pricing](https://vercel.com/pricing)

---

Speed Insights is designed to scale with your business. Start with the Free plan and upgrade as your needs grow.
