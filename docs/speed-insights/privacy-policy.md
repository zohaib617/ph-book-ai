---
sidebar_position: 5
---

# Privacy and Compliance Standards

Vercel Speed Insights is designed with privacy and compliance as core principles. This guide explains how Speed Insights respects user privacy and complies with major data protection regulations.

## Privacy-First Design

### Data Collection Philosophy

Speed Insights collects only performance metrics needed to understand user experience:
- No personal identifying information is collected
- No sensitive user data (passwords, tokens, credit cards) is tracked
- No analytics tracking IDs are stored by Vercel
- No third-party tracking or advertising pixels are used

### What Data Is Collected

Speed Insights collects:
- Performance timing metrics (LCP, FID, CLS, etc.)
- Device information (browser type, device type)
- Geographic location (country/region level, not precise location)
- Network connection type
- Page URL (which you can sanitize)

### What Data Is NOT Collected

- User identity or user IDs
- Personal information
- Authentication credentials
- Form input data
- Cookie contents
- Session information

## GDPR Compliance

### GDPR Requirements

Speed Insights complies with the General Data Protection Regulation (GDPR):

**Legal Basis:** Performance monitoring falls under your legitimate interest in understanding website performance, or explicit consent if you obtain it.

**User Rights:**
- Users can request data deletion
- Data can be deleted upon request
- Speed Insights data is retained for 90 days by default

**Data Processing Agreement:** Vercel has executed Data Processing Agreements (DPA) for GDPR compliance.

### Implementation for GDPR

If you operate in the EU, consider:

1. **Privacy Policy:** Include Speed Insights monitoring in your privacy policy
2. **Consent (if needed):** Depending on your legal position, you may need user consent
3. **Data Deletion:** Implement processes to honor user deletion requests

Example privacy policy snippet:

```
We use Vercel Speed Insights to monitor website performance. This service 
collects non-personal performance metrics including page load times and 
user interaction patterns. No personal information is collected. For more 
information, see Vercel's privacy policy.
```

## CCPA Compliance

### California Consumer Privacy Act (CCPA)

Speed Insights complies with CCPA requirements:

**Consumer Rights:**
- Right to know: Speed Insights discloses what data is collected
- Right to delete: Personal information can be deleted
- Right to opt-out: Consumers can disable Speed Insights

**Not Sale of Personal Information:** Speed Insights data collection does not qualify as "sale" under CCPA since it's not personal information.

### CCPA Implementation

Include Speed Insights in your privacy policy:

```
Performance monitoring: We use tools like Vercel Speed Insights to track 
website performance metrics. This data is not sold to third parties.
```

## Regional Regulations

### LGPD (Brazil)

Speed Insights complies with LGPD:
- Explicit legal basis required for data processing
- Users can request data deletion
- Transparent data processing

### PDPA (Singapore)

Speed Insights complies with PDPA:
- Personal data handling transparency
- Consent-based or legitimate interest processing
- Data deletion capabilities

## Data Retention

### Default Retention

Speed Insights data is retained for **90 days** by default. This allows:
- Trend analysis across a season
- Anomaly detection
- Performance improvement tracking

### Retention Customization

Contact Vercel support to customize retention periods based on your needs.

## Sensitive Data Handling

### Sanitizing URLs

URLs may contain sensitive information (API keys, user IDs, auth tokens). Use the `beforeSend` callback to remove sensitive data:

```tsx
import { SpeedInsights } from '@vercel/speed-insights/react';

export function Analytics() {
  return (
    <SpeedInsights
      beforeSend={(data) => {
        if (data.url) {
          // Remove all query parameters
          data.url = data.url.split('?')[0];
        }
        return data;
      }}
    />
  );
}
```

### Advanced Sanitization

```tsx
const SENSITIVE_PARAMS = [
  'token', 'apiKey', 'secret', 'sessionId',
  'userId', 'accountId', 'password'
];

function sanitizeUrl(url: string): string {
  try {
    const urlObj = new URL(url);
    
    // Remove sensitive query parameters
    SENSITIVE_PARAMS.forEach(param => {
      urlObj.searchParams.delete(param);
    });
    
    // Remove hash
    urlObj.hash = '';
    
    return urlObj.toString();
  } catch {
    // Return original if URL parsing fails
    return url;
  }
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

### Cookie Handling

Speed Insights does not:
- Set or read user cookies
- Use local storage for tracking
- Create persistent identifiers across sites

## Data Encryption

### In Transit

All data sent to Vercel is encrypted using HTTPS/TLS. The endpoints use:
- TLS 1.2 or higher
- Strong cipher suites
- Certificate pinning recommendations

### At Rest

Data stored by Vercel is encrypted at rest using industry-standard encryption.

## Third-Party Access

### Who Has Access

Only Vercel employees with legitimate business purposes can access Speed Insights data. Access is:
- Role-based and restricted
- Logged and audited
- Covered by confidentiality agreements

### Data Sharing

Speed Insights data is:
- **NOT shared** with third-party advertisers
- **NOT sold** to data brokers
- Only shared with Vercel team members for support/operations

## Data Subject Rights

### Your User Rights

Users have the right to:

1. **Access:** Request what data is collected
2. **Correction:** Request data corrections
3. **Deletion:** Request data deletion (30-day purge)
4. **Portability:** Request data in portable format
5. **Objection:** Opt-out of Speed Insights

### User Opt-Out

Users can disable Speed Insights by:
- Disabling JavaScript in their browser
- Using browser extensions that disable Speed Insights
- Contacting you to request deletion

### Your Responsibilities

As the site operator, you should:
- Include Speed Insights in your privacy policy
- Honor user deletion requests
- Ensure proper legal basis for data collection
- Keep records of consent (if required)

## Vercel's Commitments

Vercel commits to:

- **No Personal Data Sales:** Speed Insights data is never sold
- **Minimal Data Collection:** Only necessary performance data is collected
- **User Rights Respect:** All user rights are honored
- **Security Standards:** Data is protected with industry-standard security
- **Transparency:** Clear documentation of what data is collected
- **Regular Audits:** Security and compliance audits are conducted

## Compliance Certification

Speed Insights complies with:

- ✅ GDPR (EU General Data Protection Regulation)
- ✅ CCPA (California Consumer Privacy Act)
- ✅ LGPD (Brazilian Lei Geral de Proteção de Dados)
- ✅ PDPA (Singapore Personal Data Protection Act)
- ✅ SOC 2 Type II
- ✅ ISO 27001

## Implementation Checklist

To ensure compliance when using Speed Insights:

- [ ] Review Vercel's privacy policy
- [ ] Add Speed Insights to your privacy policy
- [ ] Implement URL sanitization for sensitive data
- [ ] Obtain necessary user consent if required
- [ ] Document your legal basis for data collection
- [ ] Establish a process for user deletion requests
- [ ] Review data retention settings
- [ ] Audit what data is being collected

## Additional Resources

- [Vercel Privacy Policy](https://vercel.com/legal/privacy-policy)
- [Vercel Trust Center](https://vercel.com/trust)
- [Data Processing Agreement](https://vercel.com/legal/data-processing-agreement)
- [Security Center](https://vercel.com/security)

## Questions?

If you have specific compliance questions, contact:
- Your legal team
- Vercel support
- A data protection officer (DPO)

---

Speed Insights is built with privacy as a first-class concern. By following the guidelines in this document, you can confidently monitor your website's performance while respecting user privacy and complying with global regulations.
