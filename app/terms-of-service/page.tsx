import { Heading } from '@/components/ui/heading';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
};

export default function TermsOfService() {
  return (
    <section className="flex flex-col items-start gap-10 px-4 py-8">
      <Heading>Terms of Service</Heading>
      <p className="leading-relaxed text-pretty text-foreground">
        <strong className="font-bold">Effective Date:</strong> August 13, 2026
      </p>

      <Heading size="sub">1. Introduction</Heading>
      <p className="leading-relaxed text-pretty text-foreground">
        These Terms of Service (&quot;Terms&quot;) govern your use of this
        website. By accessing or using this website, you agree to be bound by
        these Terms. If you do not agree with any part of these Terms, you must
        immediately discontinue use of this website.
      </p>

      <Heading size="sub">2. User Responsibilities</Heading>
      <p className="leading-relaxed text-pretty text-foreground">
        As a user of this website, you agree to use the website in compliance
        with all applicable laws and regulations. You agree to use the contact
        form and any communication features responsibly and truthfully. You are
        responsible for maintaining and mitigating any risks associated with
        your use of the website.
      </p>

      <Heading size="sub">3. Prohibited Activities</Heading>
      <p className="leading-relaxed text-pretty text-foreground">
        You agree not to engage in any activities that may harm the website or
        its users, including but not limited to:
      </p>
      <ul className="list-disc space-y-4 pl-6 leading-relaxed text-pretty text-foreground">
        <li>
          Hacking or attempting to gain unauthorized access to the website
        </li>
        <li>Distributing malware or other harmful software</li>
        <li>Spamming or engaging in any form of unsolicited advertising</li>
        <li>Violating any applicable laws or regulations</li>
      </ul>
      <p className="leading-relaxed text-pretty text-foreground">
        We reserve the right to block access to the website for any user who
        engages in these prohibited activities.
      </p>

      <Heading size="sub">4. Limitation of Liability</Heading>
      <p className="leading-relaxed text-pretty text-foreground">
        To the fullest extent permitted by law, we shall not be liable for any
        indirect, incidental, special, consequential, or punitive damages, or
        any loss of profits or revenues, whether incurred directly or
        indirectly, or any loss of data, use, goodwill, or other intangible
        losses, resulting from (i) your use or inability to use the website;
        (ii) any unauthorized access to or use of our servers and/or any
        personal information stored therein; or (iii) any other matter relating
        to the website.
      </p>

      <Heading size="sub">5. Governing Law</Heading>
      <p className="leading-relaxed text-pretty text-foreground">
        These Terms shall be governed by and construed in accordance with the
        laws of The State of Georgia, without regard to its conflict of law
        principles. You agree to submit to the exclusive jurisdiction of the
        courts located in The State of Georgia for the resolution of any
        disputes arising out of or relating to these Terms.
      </p>

      <Heading size="sub">6. Intellectual Property</Heading>
      <p className="leading-relaxed text-pretty text-foreground">
        All content on the website, including but not limited to text, graphics,
        logos, images, and software, is the property of the website owner or its
        licensors and is protected by applicable intellectual property laws. You
        may not use, reproduce, distribute, or create derivative works of any
        content without our prior written consent.
      </p>

      <Heading size="sub">7. Third-Party Links</Heading>
      <p className="leading-relaxed text-pretty text-foreground">
        Our website may contain links to third-party websites or services that
        are not owned or controlled by us (such as code repositories, social
        media, or live project demonstrations). We have no control over, and
        assume no responsibility for, the content, privacy policies, or
        practices of any third-party websites or services.
      </p>

      <Heading size="sub">8. Disclaimer of Warranties</Heading>
      <p className="leading-relaxed text-pretty text-foreground">
        All code, projects, and technical information provided on this site are
        for demonstration purposes and are provided on an &quot;as-is&quot; and
        &quot;as available&quot; basis, without any warranties of any kind. We
        do not warrant that the website or its contents will be error-free,
        secure, or uninterrupted.
      </p>

      <Heading size="sub">9. Entire Agreement</Heading>
      <p className="leading-relaxed text-pretty text-foreground">
        These Terms constitute the entire agreement between you and us regarding
        your use of the website and supersede any prior agreements or
        understandings, whether written or oral, relating to the subject matter
        herein.
      </p>

      <Heading size="sub">10. Contact Information</Heading>
      <p className="leading-relaxed text-pretty text-foreground">
        If you have any questions or concerns about these Terms, please contact
        us by visiting{' '}
        <Link
          href="https://colbyc.com/contact"
          className="text-primary hover:underline"
        >
          this page
        </Link>
        .
      </p>
    </section>
  );
}
