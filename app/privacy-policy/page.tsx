import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <section className="flex flex-col items-start gap-8 px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        Privacy Policy
      </h1>
      <p className="leading-relaxed text-pretty text-foreground">
        <strong className="font-bold">Effective Date:</strong>{' '}
        {new Date().toDateString()}
      </p>

      <h2 className="text-2xl font-bold tracking-tight underline decoration-primary decoration-2 md:text-3xl">
        1. Introduction
      </h2>
      <p className="leading-relaxed text-pretty text-foreground">
        Welcome to{' '}
        <code className="rounded-sm bg-muted/50 p-0.5 font-mono">
          colbyc.com
        </code>{' '}
        (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We respect your
        privacy and are committed to protecting your personal information. This
        Privacy Policy explains how we collect, use, disclose, and safeguard
        your information when you visit our website.
      </p>

      <h2 className="text-2xl font-bold tracking-tight underline decoration-primary decoration-2 md:text-3xl">
        2. Information We Collect
      </h2>
      <p className="leading-relaxed text-pretty text-foreground">
        We collect information that you voluntarily provide to us, as well as
        information that is automatically collected when you interact with the
        site.
      </p>

      <h3 className="text-xl font-bold tracking-tight md:text-2xl">
        Information You Provide to Us
      </h3>
      <p className="leading-relaxed text-pretty text-foreground">
        When you fill out the contact form on our website to get in touch, we
        collect the following personal information:
      </p>
      <ul className="list-disc space-y-4 pl-6">
        <li className="leading-relaxed text-pretty text-foreground">
          <strong className="font-bold">Name</strong>
        </li>
        <li className="leading-relaxed text-pretty text-foreground">
          <strong className="font-bold">Company Name</strong> (if applicable)
        </li>
        <li className="leading-relaxed text-pretty text-foreground">
          <strong className="font-bold">Email Address</strong>
        </li>
        <li className="leading-relaxed text-pretty text-foreground">
          <strong className="font-bold">Phone Number</strong>
        </li>
        <li className="leading-relaxed text-pretty text-foreground">
          <strong className="font-bold">Message Content</strong>
        </li>
      </ul>

      <h3 className="text-xl font-bold tracking-tight md:text-2xl">
        Information Automatically Collected
      </h3>
      <p className="leading-relaxed text-pretty text-foreground">
        When you access our website, certain data is automatically collected to
        ensure the site runs securely and efficiently:
      </p>
      <ul className="list-disc space-y-4 pl-6">
        <li className="leading-relaxed text-pretty text-foreground">
          <strong className="font-bold">Analytics Data:</strong> We use Google
          Analytics to understand how visitors interact with the site. This may
          include your device type, browser type, geographic location (at a high
          level), pages visited, and time spent on the site.
        </li>
        <li className="leading-relaxed text-pretty text-foreground">
          <strong className="font-bold">
            Security and Infrastructure Logs:
          </strong>{' '}
          Our website is routed through Cloudflare to ensure security and
          performance. Cloudflare may log IP addresses, browser information, and
          network routing data to prevent malicious activity.
        </li>
        <li className="leading-relaxed text-pretty text-foreground">
          <strong className="font-bold">Admin Gateway Data:</strong> Our system
          features a private administrative login not intended for public use.
          If accessed, the system logs the user&rsquo;s IP address and browser
          information strictly for security and access-control purposes.
        </li>
      </ul>

      <h2 className="text-2xl font-bold tracking-tight underline decoration-primary decoration-2 md:text-3xl">
        3. How We Use Your Information
      </h2>
      <p className="leading-relaxed text-pretty text-foreground">
        We use the information we collect for the following purposes:
      </p>
      <ul className="list-disc space-y-4 pl-6">
        <li className="leading-relaxed text-pretty text-foreground">
          <strong className="font-bold">To Respond to Inquiries:</strong> To
          read, understand, and reply to the messages you send via the contact
          form.
        </li>
        <li className="leading-relaxed text-pretty text-foreground">
          <strong className="font-bold">AI Processing:</strong> Messages
          submitted through our contact form may be processed using Large
          Language Models (LLMs) or artificial intelligence tools to assist in
          parsing, summarizing, or drafting responses to your inquiries.
        </li>
        <li className="leading-relaxed text-pretty text-foreground">
          <strong className="font-bold">To Improve Our Website:</strong> Google
          Analytics data helps us understand visitor trends and improve the
          content and user experience of our portfolio.
        </li>
        <li className="leading-relaxed text-pretty text-foreground">
          <strong className="font-bold">To Protect Our Website:</strong>{' '}
          Automatically collected network data is used to detect, prevent, and
          mitigate security threats, fraud, or technical issues.
        </li>
      </ul>

      <h2 className="text-2xl font-bold tracking-tight underline decoration-primary decoration-2 md:text-3xl">
        4. How We Share Your Information
      </h2>
      <p className="leading-relaxed text-pretty text-foreground">
        We do not sell, rent, or trade your personal information. However, we do
        share data with trusted third-party service providers who help us
        operate the website:
      </p>
      <ul className="list-disc space-y-4 pl-6">
        <li className="leading-relaxed text-pretty text-foreground">
          <strong className="font-bold">Hosting and Infrastructure:</strong> Our
          website is hosted on Google Cloud Platform (GCP) and proxied through
          Cloudflare. These providers handle the data securely as part of our
          core infrastructure.
        </li>
        <li className="leading-relaxed text-pretty text-foreground">
          <strong className="font-bold">Analytics Providers:</strong> We share
          anonymized visitor data with Google Analytics.
        </li>
        <li className="leading-relaxed text-pretty text-foreground">
          <strong className="font-bold">AI Service Providers:</strong> The
          contents of your contact form messages may be securely transmitted to
          third-party LLM APIs (such as OpenAI, Anthropic, or Google) strictly
          for the purpose of processing and responding to your inquiry.
        </li>
      </ul>

      <h2 className="text-2xl font-bold tracking-tight underline decoration-primary decoration-2 md:text-3xl">
        5. Cookies and Tracking Technologies
      </h2>
      <p className="leading-relaxed text-pretty text-foreground">
        We use cookies and similar tracking technologies, primarily through
        Google Analytics and Cloudflare, to track activity on our website and
        hold certain information. You can instruct your browser to refuse all
        cookies or to indicate when a cookie is being sent. However, if you do
        not accept cookies, some performance aspects of the site may be
        impacted.
      </p>

      <h2 className="text-2xl font-bold tracking-tight underline decoration-primary decoration-2 md:text-3xl">
        6. Data Security
      </h2>
      <p className="leading-relaxed text-pretty text-foreground">
        We implement reasonable administrative, technical, and physical security
        measures to protect your personal information. While our infrastructure
        relies on industry-standard providers (GCP and Cloudflare) to ensure a
        secure environment, please be aware that no method of transmission over
        the internet or method of electronic storage is 100% secure.
      </p>

      <h2 className="text-2xl font-bold tracking-tight underline decoration-primary decoration-2 md:text-3xl">
        7. Your Privacy Rights
      </h2>
      <p className="leading-relaxed text-pretty text-foreground">
        Depending on your location, you may have certain rights regarding your
        personal information, including the right to:
      </p>
      <ul className="list-disc space-y-4 pl-6">
        <li className="leading-relaxed text-pretty text-foreground">
          Request access to the personal data we hold about you.
        </li>
        <li className="leading-relaxed text-pretty text-foreground">
          Request that we correct or update your personal data.
        </li>
        <li className="leading-relaxed text-pretty text-foreground">
          Request the deletion of your personal data.
        </li>
        <li className="leading-relaxed text-pretty text-foreground">
          Opt-out of future communications.
        </li>
      </ul>
      <p className="leading-relaxed text-pretty text-foreground">
        To exercise any of these rights, please contact us using the information
        provided below.
      </p>

      <h2 className="text-2xl font-bold tracking-tight underline decoration-primary decoration-2 md:text-3xl">
        8. Changes to This Privacy Policy
      </h2>
      <p className="leading-relaxed text-pretty text-foreground">
        We may update this Privacy Policy from time to time to reflect changes
        in our practices or for other operational, legal, or regulatory reasons.
        We will notify you of any changes by posting the new Privacy Policy on
        this page and updating the &quot;Effective Date.&quot;
      </p>

      <h2 className="text-2xl font-bold tracking-tight underline decoration-primary decoration-2 md:text-3xl">
        9. Contact Us
      </h2>
      <p className="leading-relaxed text-pretty text-foreground">
        If you have any questions or concerns about this Privacy Policy or our
        data practices, please contact us at:
      </p>
      <ul className="list-disc space-y-4 pl-6">
        <li className="leading-relaxed text-pretty text-foreground">
          <strong className="font-bold">Email:</strong>{' '}
          <Link
            href="mailto:contact@colbyc.com"
            className="text-primary hover:underline"
          >
            contact@colbyc.com
          </Link>
        </li>
        <li className="leading-relaxed text-pretty text-foreground">
          <strong className="font-bold">Website:</strong>{' '}
          <Link
            href="https://colbyc.com/contact"
            className="text-primary hover:underline"
          >
            https://colbyc.com/contact
          </Link>
        </li>
      </ul>
    </section>
  );
}
