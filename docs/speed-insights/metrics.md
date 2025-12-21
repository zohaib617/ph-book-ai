---
sidebar_position: 4
---

# Understanding Speed Insights Metrics

Speed Insights tracks a comprehensive set of performance metrics that help you understand how your application performs for real users.

## Core Web Vitals

Core Web Vitals are metrics designated by Google as essential for a healthy web experience. They focus on three key aspects: loading, interactivity, and visual stability.

### Largest Contentful Paint (LCP)

**Measures:** Loading performance

**Definition:** The time at which the largest content element in the viewport becomes visible.

**Good Threshold:** ≤ 2.5 seconds

**Why It Matters:** LCP indicates how quickly meaningful content appears to users. A fast LCP suggests the page is useful quickly.

**Factors Affecting LCP:**
- Large images and videos
- DOM elements of significant size
- Server response time (TTFB)
- Client-side JavaScript execution

**How to Improve:**
- Optimize images and use modern formats (WebP)
- Lazy load below-the-fold images
- Minimize JavaScript that blocks rendering
- Use a CDN to reduce server response times
- Implement proper caching strategies

### First Input Delay (FID)

**Measures:** Interactivity

**Definition:** The delay between a user's first interaction (click, tap, keyboard input) and the browser's response to that interaction.

**Good Threshold:** ≤ 100 milliseconds

**Why It Matters:** FID reflects how quickly the page responds to user interactions. Low FID ensures the page feels responsive.

**Factors Affecting FID:**
- Long JavaScript execution tasks
- Heavy third-party scripts
- Inefficient code

**How to Improve:**
- Break up long JavaScript tasks
- Use web workers for heavy computations
- Defer non-critical JavaScript
- Review and optimize third-party scripts
- Use code splitting to reduce initial load

### Cumulative Layout Shift (CLS)

**Measures:** Visual stability

**Definition:** The sum of all individual layout shift scores that occur during the entire lifespan of the page.

**Good Threshold:** ≤ 0.1

**Why It Matters:** CLS measures visual stability. Unexpected layout shifts are frustrating to users and can cause misclicks.

**Factors Affecting CLS:**
- Images without specified dimensions
- Dynamically injected content
- Web fonts causing FOUT (Flash of Unstyled Text)
- Ads, embeds, and iframes without reserved space

**How to Improve:**
- Include `width` and `height` attributes on images and videos
- Reserve space for dynamic content
- Use `font-display: swap` for web fonts
- Include size attributes on iframes and embeds
- Avoid inserting new content above existing content (except in response to user interaction)

## Other Important Metrics

### First Contentful Paint (FCP)

**Measures:** How quickly any content is rendered

**Definition:** The point when the first DOM content is rendered.

**Good Threshold:** ≤ 1.8 seconds

**Why It Matters:** FCP provides early feedback on perceived load performance. It measures when the user first sees something on the screen.

### Time to First Byte (TTFB)

**Measures:** Server response time

**Definition:** The time it takes for the user's browser to receive the first byte of page content from the server.

**Good Threshold:** ≤ 600 milliseconds

**Why It Matters:** TTFB indicates server performance and network latency. It's the baseline for all other metrics.

**How to Improve:**
- Optimize server-side code and databases
- Use a CDN to serve content from locations closer to users
- Implement proper caching
- Use edge functions for dynamic content

### First Paint (FP)

**Measures:** When the browser first renders any pixels to the screen

**Definition:** The moment when the browser paints the first pixel of content.

### Interaction to Next Paint (INP)

**Measures:** Overall responsiveness

**Definition:** The longest time between a user's interaction and the browser's response.

**Good Threshold:** ≤ 200 milliseconds

**Why It Matters:** INP provides a holistic view of interactivity throughout the page's lifespan.

## Navigation Timing Metrics

Speed Insights also tracks detailed navigation timing information:

- **DNS Lookup Time:** Time spent resolving DNS
- **TCP Connection Time:** Time to establish connection
- **SSL/TLS Time:** Time for secure connection handshake
- **Time to First Byte (TTFB):** Server response time
- **Download Time:** Time to download the full page

## Real User Monitoring (RUM)

All metrics collected by Speed Insights are from real user data (RUM), not synthetic tests. This means:

- **Realistic Conditions:** Metrics reflect actual user experiences
- **Real Browsers:** Data includes various browsers and devices
- **Real Networks:** Includes different connection speeds
- **Real Geographic Locations:** Shows performance across regions

## Percentiles and Distributions

Speed Insights provides metric percentiles:

- **75th Percentile:** The metric value that 75% of users experience as good or better
- **90th Percentile:** The metric value that 90% of users experience as good or better

The 75th percentile is typically used for Core Web Vitals assessment.

## Interpreting Your Metrics

### Traffic Sources

Compare metrics across different traffic sources:
- Organic search
- Direct traffic
- Referrals
- Campaign traffic

### Device Types

See how performance varies by device:
- Mobile devices
- Desktop/Laptop
- Tablet

### Geographic Performance

Understand how location affects your metrics:
- Identify regions with slower performance
- Plan CDN improvements
- Optimize for major user locations

### Browser Performance

Track performance across different browsers:
- Chrome
- Firefox
- Safari
- Edge

## Setting Performance Goals

Based on your metrics, you should:

1. **Identify Problem Areas:** Find metrics that fall below good thresholds
2. **Set Improvement Goals:** Target metrics for optimization
3. **Prioritize Changes:** Focus on high-impact improvements
4. **Monitor Progress:** Track improvements over time

## Performance Benchmarks

Industry benchmarks show that:
- LCP ≤ 2.5s achieves good performance
- FID ≤ 100ms ensures good responsiveness
- CLS ≤ 0.1 provides visual stability

Pages meeting all three thresholds at the 75th percentile are considered to have "good" Core Web Vitals performance.

## Using Metrics for Optimization

1. **Identify Bottlenecks:** Use percentile data to identify consistent issues
2. **Test Improvements:** Use performance testing tools locally
3. **Monitor Impact:** Track metrics after implementing changes
4. **Iterate:** Continuously improve based on real user data

## Common Metric Issues and Solutions

| Issue | Likely Cause | Solution |
|-------|--------------|----------|
| High LCP | Large images, slow server | Optimize images, add CDN, improve server |
| High FID | Heavy JavaScript | Split code, defer non-critical JS |
| High CLS | Dynamic content, ads | Reserve space, lazy load properly |
| High TTFB | Server issues | Optimize server, use CDN, check database |

## Next Steps

Now that you understand Speed Insights metrics, you can:

- [Learn how to improve specific metrics](/docs/speed-insights/optimization)
- [Read about privacy and compliance](/docs/speed-insights/privacy-policy)
- [Explore troubleshooting guides](/docs/speed-insights/troubleshooting)
