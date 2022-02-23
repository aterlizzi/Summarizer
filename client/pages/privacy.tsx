import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import BannerComp from "../components/privacy/bannerComp";
import MobileMenu from "../components/privacy/mobileMenuComp";
import styles from "../styles/Privacy.module.scss";

function Privacy() {
  const router = useRouter();
  const { policy } = router.query;

  const [isOpen, setOpen] = useState(false);
  const [page, setPage] = useState("privacy");

  useEffect(() => {
    if (policy) {
      if (policy === "cookie") {
        setPage("cookie");
      }
      if (policy === "gdpr") {
        setPage("gdpr");
      }
      if (policy === "privacy") {
        setPage("privacy");
      }
    }
  }, [policy]);

  return (
    <main className={styles.main}>
      <BannerComp isOpen={isOpen} setOpen={setOpen} />
      <MobileMenu isOpen={isOpen} />
      <div className={styles.links}>
        <p
          className={
            page === "privacy"
              ? `${styles.active} ${styles.link}`
              : `${styles.link}`
          }
          onClick={() => {
            setPage("privacy");
            router.replace("/privacy", undefined, { shallow: true });
          }}
        >
          Privacy Policy
        </p>
        <p
          className={
            page === "gdpr"
              ? `${styles.active} ${styles.link}`
              : `${styles.link}`
          }
          onClick={() => {
            setPage("gdpr");
            router.replace("/privacy", undefined, { shallow: true });
          }}
        >
          GDPR
        </p>
        <p
          className={
            page === "cookie"
              ? `${styles.active} ${styles.link}`
              : `${styles.link}`
          }
          onClick={() => {
            setPage("cookie");
            router.replace("/privacy", undefined, { shallow: true });
          }}
        >
          Cookie Policy
        </p>
      </div>
      {page === "privacy" ? (
        <div className={styles.privacy}>
          <h1 className={styles.title}>Privacy Policy</h1>
          <p className={styles.desc}>
            Untanglify (&quot;Untanglify&quot;, &quot;we&quot;, &quot;us&quot;,
            and &quot;our&quot;) provides a platform for our users to read,
            share, collaborate, and organize article summaries. Our Privacy
            Policy (&quot;Privacy Policy&quot;) is designed to help you
            understand how we collect, use and share your personal information
            and to assist you in exercising the privacy rights at your disposal.
          </p>
          <h3 className={styles.subtitle}>Scope</h3>
          <p className={styles.desc}>
            This Privacy Policy covers the personal information we collect about
            you when you use our products or services, or otherwise interact
            with us, including on our public website at www.untanglify.com (the
            &quot;Website&quot;), and Untanglify&apos;s online
            software-as-service platform including any related APIs provided by
            Untanglify, together with all related mobile, desktop, and browser
            applications (collectively, &quot;Services&quot;). This policy also
            explains your choices surrounding how we use your personal
            information, which include how you can object to certain uses of the
            information and how you can access and update certain information.
          </p>
          <h3 className={styles.subtitle}>
            1. Personal Information we collect
          </h3>
          <p className={styles.desc}>
            We collect personal information when you provide it to us, when you
            use our Website or Services, and when other sources provide it to
            us, as further described below. <br /> <br />
            <strong className={styles.strong}>
              A. Information You Provide to Us
            </strong>
            <br /> <br />
            <strong className={styles.strong}>Account Creation:</strong> When
            you create an account or otherwise use the Services, we collect
            information such as your name, email address, password, role within
            your team or enterprise, and an optional profile photo.
            <br /> <br />{" "}
            <strong className={styles.strong}>
              Your Communications with Us:
            </strong>{" "}
            We collect personal information from you such as email address,
            phone number, or mailing address when you request information about
            our Services, register for our newsletter, request customer or
            technical support, or otherwise communicate with us. We also collect
            the contents of messages or attachments that you may send to us, as
            well as other information you choose to provide, and that may be
            associated with your communications.
            <br /> <br />
            <strong className={styles.strong}>Payment Information:</strong> When
            you choose to subscribe for Student or Research plans on the
            Services, we will collect payment information allowing you to pay
            us. We use third-party payment providers to process payments on the
            Services. We may receive information associated with your payment
            information, such as billing address and transaction information,
            but we do not directly store payment information on the Services.
            <br /> <br />
            <strong className={styles.strong}>Surveys:</strong> We may contact
            you to participate in surveys. If you decide to participate, you may
            be asked to provide certain information which may include personal
            information.
            <br /> <br />
            <strong className={styles.strong}>Interactive Features:</strong> We
            may offer interactive features such as forums, blogs, chat and
            messaging services, and social media pages. We and others who use
            our Website or Services may collect the information you submit or
            make available through these interactive features. Any content you
            provide via the public sections of these features will be considered
            &quot;public&quot; and is not subject to the privacy protections
            referenced herein. By using these interactive features, you
            understand that the personal information provided by you may be
            viewed and used by third parties for their own purposes.
            <br /> <br />
            <strong className={styles.strong}>
              Registration for Sweepstakes or Contests:
            </strong>{" "}
            We may run sweepstakes and contests. Contact information you provide
            may be used to inform you about the sweepstakes or contest and for
            other promotional, marketing and business purposes.
            <br /> <br />
            <strong className={styles.strong}>
              Conferences, Trade Shows, and Other Events:
            </strong>{" "}
            We may attend conferences, trade shows, and other events where we
            collect personal information from individuals who interact with or
            express an interest in the Services.
            <br /> <br />
            <strong className={styles.strong}>Job Applications:</strong> We may
            post job openings and opportunities on the Website or Services. If
            you reply to one of these postings by submitting your application,
            CV and/or cover letter to us, we will collect and use your
            information to assess your qualifications.
            <br /> <br />
            <strong className={styles.strong}>
              B. Information Collected Automatically
            </strong>
            <br /> <br />
            <strong className={styles.strong}>
              Automatic Data Collection:
            </strong>{" "}
            We keep track of certain information about you when you visit and
            interact with our Website or Services. This information may include
            your Internet protocol (IP) address, user settings, MAC address,
            cookie identifiers, mobile carrier, mobile advertising and other
            unique identifiers, details about your browser, operating system or
            device, location information (including inferred location based off
            of your IP address), Internet service provider, pages that you visit
            before, during and after using the Website or Services, information
            about the links you click, information about how you interact with
            the Website or Services, including the frequency and duration of
            your activities, and other information about how you use the Website
            or Services. Information we collect may be associated with accounts
            and other devices.
            <br /> <br />
            <strong className={styles.strong}>
              Cookies, Pixel Tags/Web Beacons, and Analytics Information:
            </strong>{" "}
            We, as well as third parties that provide content, advertising, or
            other functionality on the Services, may use cookies, pixel tags,
            local storage, and other technologies (&quot;Technologies&quot;) to
            automatically collect information through the Website or Services.
            Technologies are essentially small data files placed on your devices
            that allow us and our partners to record certain pieces of
            information whenever you visit or interact with our Services. For
            more information regarding these Technologies, please see our{" "}
            <span
              className={styles.special}
              onClick={() => router.push("/privacy?policy=cookie")}
            >
              Cookie Notice.
            </span>
            <br /> <br />
            <strong className={styles.strong}>Analytics:</strong> We may also
            use third-party service providers to collect and process analytics
            and other information on our Website or Services. These third-party
            service providers may use cookies, pixel tags, web beacons or other
            storage technology to collect and store analytics and other
            information. They have their own privacy policies addressing how
            they use the analytics and other information and we do not have
            access to, nor control over, third parties&apos; use of cookies or
            other tracking technologies. For more information regarding
            third-party cookies, please see our{" "}
            <span
              className={styles.special}
              onClick={() => router.push("/privacy?policy=cookie")}
            >
              Cookie Notice.
            </span>
            <br /> <br />
            <strong className={styles.strong}>
              C. Information from Other Sources
            </strong>
            <br /> <br /> We may obtain information about you from other
            sources, including through third-party services and organizations.
            For example, if you access our Website or Services through a
            third-party application, such as a social networking site or a
            third-party login service, we may collect information about you from
            that third party that you have made available via your privacy
            settings. Should you choose to use the Google Contacts feature
            within our Services, we will have the ability to view your contacts
            via the Google People API. The sole use of this data is to populate
            the auto-completion of your contacts when sending invitation emails.
            Untanglify will not use this data for any other purpose.
          </p>
          <h3 className={styles.subtitle}>2. How we use your information</h3>
          <p className={styles.desc}>
            We use your personal information for a variety of business purposes,
            including to:
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>
              Provide the Services or Requested Information, such as:
            </strong>
          </p>
          <ul className={styles.list}>
            <li className={styles.item}>Fulfilling our contract with you</li>
            <li className={styles.item}>
              Identifying and communicating with you, including providing
              newsletters and marketing materials
            </li>
            <li className={styles.item}>Managing your information</li>
            <li className={styles.item}>Distributing our products to you</li>
            <li className={styles.item}>
              Responding to questions, comments, and other requests
            </li>
            <li className={styles.item}>
              Providing access to certain pages and features in our Services
            </li>
            <li className={styles.item}>Responding to the contact page</li>
          </ul>
          <p className={styles.desc}>
            <strong className={styles.strong}>
              Service Administrative and Communication Purposes, such as:
            </strong>
          </p>
          <ul className={styles.list}>
            <li className={styles.item}>
              Pursuing legitimate interests, such as direct marketing, research
              and development (including marketing research), network and
              information security, and fraud prevention
            </li>
            <li className={styles.item}>
              Sending communications about new product features, promotions,
              Untanglify&apos;s strategic partners, and other news about
              Untanglify
            </li>
            <li className={styles.item}>
              Measuring interest and engagement in our Services, including
              analyzing your usage of the Services
            </li>
            <li className={styles.item}>
              Developing new products and services and improving the Services
            </li>
            <li className={styles.item}>
              Ensuring internal quality control and safety
            </li>
            <li className={styles.item}>
              Authentication and verification of users
            </li>
            <li className={styles.item}>
              Communicating with you about your account, activities on our
              Services and Privacy Policy changes
            </li>
            <li className={styles.item}>
              Preventing and prosecuting potentially prohibited or illegal
              activities
            </li>
            <li className={styles.item}>Enforcing our agreements</li>
            <li className={styles.item}>
              Complying with our legal obligations
            </li>
          </ul>
          <p className={styles.desc}>
            <strong className={styles.strong}>
              Marketing of Products and Services:
            </strong>{" "}
            We may use personal information to tailor and provide you with
            content and advertisements. If you have any questions about our
            marketing practices or if you would like to opt out of the use of
            your personal information for marketing purposes, you may contact us
            as set forth below.
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>Consent:</strong> We may use
            personal information for other purposes that are clearly disclosed
            to you at the time you provide personal information or with your
            consent.
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>
              De-identified and Aggregated Information Use:
            </strong>{" "}
            We may use personal information and other data about you to create
            de-identified and/or aggregated information. De-identified and/or
            aggregated information is not personal information, and we may use
            and disclose such information in a number of ways, including
            research, internal analysis, analytics, and any other legally
            permissible purposes.
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>
              How We Use Automatic Collection Technologies:
            </strong>{" "}
            Our uses of Technologies fall into the following general categories:
          </p>
          <ul className={styles.list}>
            <li className={styles.item}>Operationally Necessary</li>
            <li className={styles.item}>Performance Related</li>
            <li className={styles.item}>Functionality Related</li>
            <li className={styles.item}>Advertising or Targeting Related</li>
          </ul>
          <p className={styles.desc}>
            For more information, please see our{" "}
            <span
              className={styles.special}
              onClick={() => router.push("/privacy?policy=cookie")}
            >
              Cookie Notice.
            </span>
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>Cross-Device Tracking:</strong>{" "}
            Your browsing activity may be tracked across different websites and
            different devices or apps. For example, we may attempt to match your
            browsing activity on your mobile device with your browsing activity
            on your laptop. To do this our technology partners may share data,
            such as your browsing patterns, geo-location and device identifiers,
            and will match the information of the browser and devices that
            appear to be used by the same person.
          </p>
          <h3 className={styles.subtitle}>
            3. Disclosing your information to third parties
          </h3>
          <p className={styles.desc}>
            We may share your personal information with the following categories
            of third parties:
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>Service Providers:</strong> We may
            share any personal information we collect about you with our
            third-party service providers. The categories of service providers
            to whom we entrust personal information include service providers
            for: (i) the provision of the Services; (ii) the provision of
            information, products, and other services you have requested; (iii)
            marketing and advertising; (iv) payment and transaction processing;
            (v) customer service activities; and (vi) the provision of IT and
            related services.
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>Affiliates:</strong> We may share
            personal information with our affiliated entities.
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>Advertising Partners:</strong> We
            do not share your information, including personal information, to
            advertise any third party&apos;s products or services via the
            Services. We may use and share your personal information with
            third-party advertising partners to market our own Services and grow
            our Services&apos; user base, such as to provide targeted marketing
            about our own Services via third-party services. If you prefer not
            to share your personal information with third-party advertising
            partners, you may follow the instructions below.
            <br /> <br /> We may share your personal information with other
            third parties, including other users, in the following
            circumstances:
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>Referral Program:</strong> When
            you participate in our tiered referral program your personal
            information may be displayed to the referred.
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>
              Disclosures to Protect Us or Others:
            </strong>{" "}
            We may access, preserve, and disclose any information we store in
            association with you to external parties if we, in good faith,
            believe doing so is required or appropriate to: (i) comply with law
            enforcement or national security requests and legal process, such as
            a court order or subpoena; (ii) protect your, our, or others&apos;
            rights, property, or safety; (iii) enforce our policies or
            contracts; (iv) collect amounts owed to us; or (v) assist with an
            investigation and prosecution of suspected or actual illegal
            activity.
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>
              Disclosure in the Event of Merger, Sale, or Other Asset Transfer:
            </strong>{" "}
            If we are involved in a merger, acquisition, financing due
            diligence, reorganization, bankruptcy, receivership, purchase or
            sale of assets, or transition of service to another provider, then
            your information may be sold or transferred as part of such a
            transaction, as permitted by law and/or contract.
          </p>
          <h3 className={styles.subtitle}>4. International Data Transfers</h3>
          <p className={styles.desc}>
            All information processed by us may be transferred, processed, and
            stored anywhere in the world, including but not limited to, the
            United States or other countries, which may have data protection
            laws that are different from the laws where you live. We endeavor to
            safeguard your information consistent with the requirements of
            applicable laws.
          </p>
          <h3 className={styles.subtitle}>5. Your Choices</h3>
          <p className={styles.desc}>
            <strong className={styles.strong}>General:</strong> You may have the
            right to object to or opt out of certain uses of your personal
            information. Where you have consented to the processing of your
            personal information, you may withdraw that consent at any time by
            contacting us as described below. Even if you opt out, we may still
            collect and use non-personal information regarding your activities
            on our Services and for other legal purposes as described above.
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>Email Communications:</strong> If
            you receive an unwanted email from us, you can use the unsubscribe
            link found at the bottom of the email to opt out of receiving future
            emails. Note that you will continue to receive transaction-related
            emails regarding products or services you have requested. We may
            also send you certain non-promotional communications regarding us
            and our Services, and you will not be able to opt out of those
            communications (e.g., communications regarding the Services or
            updates to this Privacy Policy).
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>Mobile Devices:</strong> We may
            send you push notifications through our Apps. You may at any time
            opt out from receiving these types of communications by changing the
            settings on your mobile device. With your consent, we may also
            collect precise location information if you use our Apps. You may
            opt out of this collection by changing the settings on your mobile
            device.
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>&quot;Do Not Track&quot;:</strong>{" "}
            Your browser may offer you a &quot;Do Not Track&quot; option, which
            allows you to signal to operators of websites and web applications
            and Service that you do not wish such operators to track certain of
            your online activities over time and/or across different websites.
            If your browser is set to &quot;Do Not Track&quot;, Untanglify will
            attempt to honor this functionality. However, our third party
            service providers may use their own cookies, pixel tags, web beacons
            or other storage technology to collect and store Log Data or
            information from elsewhere on the internet, and we do not have
            access to, nor control over, a third parties&apos; use of cookies or
            other tracking technologies.
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>Cookies:</strong> You may stop or
            restrict the placement of Technologies on your device. Untanglify
            provides settings for you to update your preferences in our
            Services. These settings can be found in the footer of our website.
            If you have a Untanglify account and are logged in to the Services,
            you can access your Cookie settings in the Personal Settings section
            of the user settings page. For more information, please see our{" "}
            <span
              className={styles.special}
              onClick={() => router.push("/privacy?policy=cookie")}
            >
              Cookie Notice.
            </span>
          </p>
          <h3 className={styles.subtitle}>6. Your Privacy Rights</h3>
          <p className={styles.desc}>
            Depending upon your location and in accordance with applicable laws,
            you may have the right to:
          </p>
          <ul className={styles.list}>
            <li className={styles.item}>
              <strong className={styles.strong}>Access</strong> personal
              information about you consistent with legal requirements. In
              addition, you may have the right in some cases to receive or have
              your electronic personal information transferred to another party.
            </li>
            <li className={styles.item}>
              <strong className={styles.strong}>Request Correction</strong> of
              your personal information where it is inaccurate or incomplete.
            </li>
            <li className={styles.item}>
              <strong className={styles.strong}>Request Deletion</strong> of
              your personal information, subject to certain exceptions
              prescribed by law.
            </li>
            <li className={styles.item}>
              <strong className={styles.strong}>
                Request Restriction or Object to Processing
              </strong>{" "}
              of your personal information, including the right to opt in or opt
              out of the sale of your personal information to third parties.
            </li>
            <li className={styles.item}>
              <strong className={styles.strong}>
                Not be Discriminated Against
              </strong>{" "}
              by us for exercising your privacy rights.
            </li>
          </ul>
          <p className={styles.desc}>
            If you would like to exercise any of these rights, please contact us
            as set forth below. We will process such requests in accordance with
            applicable laws. To protect your privacy, we will take steps to
            verify your identity before fulfilling your request, such as by
            requiring you to submit your request via your account.
          </p>
          <h3 className={styles.subtitle}>7. Data Retention</h3>
          <p className={styles.desc}>
            We store the personal information we receive as described in this
            Privacy Policy for as long as you use our Services or as necessary
            to fulfill the purpose(s) for which it was collected, provide our
            Services, resolve disputes, establish legal defenses, conduct
            audits, pursue legitimate business purposes, enforce our agreements,
            and comply with applicable laws.
          </p>
          <h3 className={styles.subtitle}>8. Security of your Information</h3>
          <p className={styles.desc}>
            We take steps to ensure that your information is treated securely
            and in accordance with this Privacy Policy. Unfortunately, no system
            is 100% secure, and we cannot ensure or warrant the security of any
            information you provide to us. To the fullest extent permitted by
            applicable law, we do not accept liability for unauthorized
            disclosure.
          </p>
          <p className={styles.desc}>
            By using the Services or providing personal information to us, you
            agree that we may communicate with you electronically regarding
            security, privacy, and administrative issues relating to your use of
            the Services. If we learn of a security system&apos;s breach, we may
            attempt to notify you electronically by posting a notice on the
            Services, by mail or by sending an email to you.
          </p>
          <h3 className={styles.subtitle}>
            9. Third-Party Websites/Applications
          </h3>
          <p className={styles.desc}>
            The Services may contain links to other websites/applications and
            other websites/applications may reference or link to our Services.
            These third-party services are not controlled by us. We encourage
            our users to read the privacy policies of each website and
            application with which they interact. We do not endorse, screen or
            approve, and are not responsible for, the privacy practices or
            content of such other websites or applications. Visiting these other
            websites or applications is at your own risk.
          </p>
          <h3 className={styles.subtitle}>10. Children&apos;s Information</h3>
          <p className={styles.desc}>
            The Services are not directed to children under 13 (or other age as
            required by local law), and we do not knowingly collect personal
            information from children. If you learn that your child has provided
            us with personal information without your consent, you may contact
            us as set forth below. If we learn that we have collected a
            child&apos;s personal information in violation of applicable law, we
            will promptly take steps to delete such information and terminate
            the child&apos;s account.
          </p>
          <h3 className={styles.subtitle}>11. Supervisory Authority</h3>
          <p className={styles.desc}>
            If you are located in the European Economic Area or the UK, you have
            the right to lodge a complaint with a supervisory authority if you
            believe our processing of your personal information violates
            applicable law.
          </p>
          <h3 className={styles.subtitle}>12. California Privacy Notice</h3>
          <p className={styles.desc}>
            This Privacy Notice applies to California consumers and supplements
            the Privacy Policy.
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>
              California Shine the Light Law:
            </strong>{" "}
            The California &quot;Shine the Light&quot; law permits users who are
            California residents to request and obtain from us once a year, free
            of charge, a list of the third parties to whom we have disclosed
            their personal information (if any) for their direct marketing
            purposes in the prior calendar year, as well as the type of personal
            information disclosed to those parties. To make such a request from
            us, if entitled, please use the contact information listed below.
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>
              California Consumer Privacy Act (CCPA):
            </strong>{" "}
            In the preceding 12 months, we have not disclosed your personal
            information to any third party in a manner that would be considered
            a sale under the CCPA.
          </p>
          <h3 className={styles.subtitle}>13. Changes to Our Privacy Policy</h3>
          <p className={styles.desc}>
            We may revise this Privacy Policy from time to time in our sole
            discretion. If there are any material changes to this Privacy
            Policy, we will notify you as required by applicable law. You
            understand and agree that you will be deemed to have accepted the
            updated Privacy Policy if you continue to use the Services after the
            new Privacy Policy takes effect.
          </p>

          <p className={styles.desc}>
            <strong className={styles.strong}>Contact us:</strong>
            <br /> <br /> If you have any questions about our privacy practices
            or this Privacy Policy, please contact us at:
            <br /> <br />
            team@untanglify.com
            <br /> <br />
            540-288-6609
          </p>
        </div>
      ) : page === "gdpr" ? (
        <div className={styles.privacy}>
          <h1 className={styles.title}>GDPR</h1>
          <p className={styles.desc}>
            At Untanglify, we&apos;re committed to complying with GDPR. To this
            end, we offer several data portability and management tools, and we
            ask for consent for data collection.
          </p>
          <h3 className={styles.subtitle}>
            Data Portability & Management Tools
          </h3>
          <p className={styles.desc}>
            <strong className={styles.strong}>Import: </strong>
            We current provide the ability to import text from webpages, text
            you highlight, manually inputted text, text extracted via OCR in
            pdfs, and text written in pdfs. This could be updated in the future
            based on user feedback.
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>Export: </strong>
            We allow the export of summaries to 3rd Parties only accessible
            through authentication in the settings page.
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>Summary Deletion: </strong>A
            user-generated summary can be deleted anytime by the user by sending
            an email to team@untanglify.com with the subject line &quot;Summary
            Deletion&quot;. Once this is handled, the summary will no longer be
            available on the site.
          </p>
          <h3 className={styles.subtitle}>Consent</h3>
          <p className={styles.desc}>
            For European customers, we show a consent dialog during signup that
            explains our data collection practices. Therefore, our lawful basis
            for collecting personal data is consent. We use cookies to securely
            identify your account and keep you signed in. We use analytics
            services to improve the product and troubleshoot customer issues.
            These include Google Analytics. A customer may withdraw their
            consent and delete their account at any time by deleting their
            account via our status options in user settings page.
          </p>
          <h3 className={styles.subtitle}>Data Transfers</h3>
          <p className={styles.desc}>
            We rely on standard contractual clauses (SCCs) to ensure appropriate
            safeguards for personal data transfers from the EU to countries
            outside of the EU.
          </p>
        </div>
      ) : page === "cookie" ? (
        <div className={styles.privacy}>
          <h1 className={styles.title}>Cookie Policy</h1>
          <p className={styles.desc}>
            This Cookie Notice explains how Untanglify (&quot;Untanglify,&quot;
            &quot;we,&quot; &quot;us,&quot; and &quot;our&quot;) uses cookies,
            pixel tags, local storage, and other similar technologies
            (collectively referred to as &quot;Cookies&quot;) to recognize you
            when you visit our public website at www.untanglify.com (the
            &quot;Website&quot;), and Untanglify&apos;s online
            software-as-a-service platform including any related APIs provided
            by Untanglify, together with all related mobile and desktop
            applications (collectively, &quot;Services&quot;). It explains what
            these technologies are and why we use them, as well as your rights
            to control our use of them. Please take a look at our{" "}
            <span
              className={styles.special}
              onClick={() => router.push("/privacy?policy=privacy")}
            >
              Privacy Policy
            </span>{" "}
            if you&apos;d like more information about how Untanglify collects,
            uses, and shares your personal information.
          </p>
          <h3 className={styles.subtitle}>What are Cookies?</h3>
          <p className={styles.desc}>
            Cookies are small text files that are placed on your computer or
            mobile device when you visit a website. Cookies contain information
            that can later be read by a web server in the domain that issued the
            Cookie. Owners of a website can use Cookies for a variety of reasons
            that can include enabling their websites to work (or work more
            efficiently), providing personalized content and advertising, and
            creating website analytics.
            <br />
            <br />
            Cookies are typically classified as either &quot;session
            cookies&quot; which are automatically deleted when you close your
            browser, or &quot;persistent cookies&quot; which will usually remain
            on your device until you delete them or they expire. Cookies set by
            the website owner (in this case, Untanglify) are called &quot;first
            party cookies&quot;. Only Untanglify can access the first party
            cookies we set. Cookies set by parties other than the website owner
            are called &quot;third party cookies&quot;. Third party cookies
            enable third party features or functionality to be provided on or
            through the website (e.g. like advertising, interactive content and
            social sharing). The parties that set these third party cookies can
            recognize your device both when it visits the website in question
            and also when it visits other websites that have partnered with
            them.
            <br />
            <br />
            In addition to cookies, we may use other similar technologies like
            web beacons (sometimes called &quot;tracking pixels&quot; or
            &quot;clear gifs&quot;) or local storage. Web beacons are tiny
            graphics files that contain a unique identifier that enable us to
            recognize when someone has visited our Services or opened an e-mail
            that we have sent them. This allows us, for example, to monitor the
            traffic patterns of users from one page within our Services to
            another, to deliver or communicate with cookies, to understand
            whether you have come to our Services from an online advertisement
            displayed on a third-party website, to improve site performance, and
            to measure the success of e-mail marketing campaigns. Local storage
            enables a website or application to store information locally on
            your device(s) in order to enable certain functionality in our
            Services. Local storage may be used to improve your experience with
            our Services, for example, by enabling features, remembering your
            preferences, and speeding up site functionality.
          </p>
          <h3 className={styles.subtitle}>Why does Untanglify use Cookies?</h3>
          <p className={styles.desc}>
            At the moment we only use cookies for one purpose. Our cookies are
            essential for our Services to operate and provide user-requested
            functionality. Because of their necessity for our application to
            run, we do not allow users to switch them off.
          </p>
          <h3 className={styles.subtitle}>
            How often will we update this Cookie Notice?
          </h3>
          <p className={styles.desc}>
            We may update this Cookie Notice from time to time in order to
            reflect, for example, changes to the Cookies we use or for other
            operational, legal or regulatory reasons. Please therefore re-visit
            this Cookie Notice regularly to stay informed about our use of
            cookies and related technologies. <br />
            The date at the bottom of this Cookie Notice indicates when it was
            last updated.
          </p>
          <h3 className={styles.subtitle}>
            Where can I get further information?
          </h3>
          <p className={styles.desc}>
            If you have any questions about our use of Cookies, please
            don&apos;t hesitate to reach out at team@untanglify.com.
          </p>
          <p className={styles.desc}>
            <strong className={styles.strong}>
              Last Updated: February 22, 2022
            </strong>
          </p>
        </div>
      ) : null}
    </main>
  );
}

Privacy.getLayout = (page) => {
  return (
    <Layout
      metaContent="Find out how Untanglify is using your data here."
      title="Privacy Policy - Untanglify"
    >
      {page}
    </Layout>
  );
};
export default Privacy;
