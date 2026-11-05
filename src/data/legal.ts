export type LegalDoc = { title: string; intro: string; clauses: [string, string][] };

export const LEGAL: Record<string, LegalDoc> = {
  terms: {
    title: "Terms and Conditions",
    intro: "Last updated: [DD Month 2026]. Please read these terms carefully before using XPensari.",
    clauses: [
      ["About these terms", "These terms govern your use of the XPensari website and platform, operated by [XPensari legal entity name], [registered address]. By using XPensari, you agree to them."],
      ["Your account", "You are responsible for the accuracy of the information you give us, for keeping your login details secure, and for activity under your account. Tell us promptly if you suspect unauthorised access."],
      ["Using the platform", "Use XPensari only for lawful business purposes and in line with these terms. Do not try to access systems or data you are not authorised to use, interfere with the platform, or use it to break any law."],
      ["Plans, fees and billing", "Plans, fees and billing cycles are set out in your order or on the Pricing page. Fees are quoted in Naira unless agreed otherwise.\n[Payment terms, renewals and cancellation to be confirmed.]"],
      ["Tax and compliance features", "XPensari helps you prepare and submit tax and e-invoicing information. You remain responsible for the accuracy of your filings and for meeting your obligations under the Nigeria Tax Act 2025 and related regulations."],
      ["Your data", "You own the data you put into XPensari. We process it to provide the service, as described in our Privacy Policy."],
      ["Intellectual property", "The platform, brand and content belong to XPensari or its licensors. These terms do not transfer any of those rights to you."],
      ["Third-party services", "Some features rely on partners such as banks, payment providers, WorkMerate and the NRS gateway. Their services may be subject to their own terms."],
      ["Warranties and liability", "[Warranty disclaimers and limitation of liability to be drafted by counsel.]"],
      ["Changes and termination", "We may update these terms and will tell you about material changes. Either party may end the agreement as set out in your order."],
      ["Governing law", "These terms are governed by the laws of the Federal Republic of Nigeria.\n[Dispute resolution forum to be confirmed.]"],
      ["Contact", "Questions about these terms: support@xpensari.com."],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro: "Last updated: [DD Month 2026]. How XPensari collects, uses and protects personal data.",
    clauses: [
      ["Who we are", "[XPensari legal entity name] is the data controller for personal data collected through this website and platform. Contact us at support@xpensari.com.\n[Data Protection Officer details to be added.]"],
      ["What we collect", "Information you give us, such as your name, company, work email, phone number and messages sent through our forms; account and usage data on the platform; and technical data such as device, browser and IP address."],
      ["How we use it", "To respond to enquiries, provide and improve the platform, send the newsletter you sign up for, keep the service secure, and meet our legal and tax obligations."],
      ["Legal basis", "We process personal data in line with the Nigeria Data Protection Act 2023, relying on consent, contract, legal obligation or legitimate interests as applicable."],
      ["Who we share it with", "Service providers and partners that help us run XPensari, such as hosting, WorkMerate and payment partners, and authorities where the law requires it. We do not sell personal data."],
      ["Where data is stored", "[Data residency and any cross-border transfer safeguards to be confirmed.]"],
      ["How long we keep it", "Only as long as needed for the purposes above or as the law requires, including tax record-keeping periods."],
      ["Security", "We use access controls, encryption and monitoring to protect data.\n[Security posture details to be confirmed.]"],
      ["Your rights", "You can ask to access, correct, delete or port your data, object to or restrict processing, and withdraw consent at any time. Write to support@xpensari.com. You can also complain to the Nigeria Data Protection Commission."],
      ["Changes to this policy", "We will post updates on this page and change the \"last updated\" date above."],
    ],
  },
  cookies: {
    title: "Cookie Policy",
    intro: "Last updated: [DD Month 2026]. What cookies this site uses and how to control them.",
    clauses: [
      ["What cookies are", "Cookies are small files stored on your device when you visit a website. They help the site work and show us how it is used."],
      ["Strictly necessary cookies", "Needed for security and core features such as forms and the cookie banner itself. These cannot be switched off."],
      ["Preference cookies", "Remember choices you make, such as your cookie settings, so you do not have to set them again."],
      ["Analytics cookies", "Help us understand how visitors use the site so we can improve it. These are only set with your consent.\n[Analytics provider to be confirmed.]"],
      ["Marketing cookies", "[To be confirmed whether marketing cookies are used. If not, remove this section.]"],
      ["Managing your choices", "Change your choices at any time through the cookie settings link in the footer or in your browser settings. Blocking some cookies may affect how the site works."],
      ["Changes to this policy", "We will update this page if the cookies we use change."],
      ["Contact", "Questions about cookies: support@xpensari.com."],
    ],
  },
};
