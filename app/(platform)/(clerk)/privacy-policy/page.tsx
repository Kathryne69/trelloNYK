import React from 'react';
import { Logo } from "@/components/logo";

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '2rem' }}>
        <Logo />
        <h1 style={{ fontSize: '2.5rem', textAlign: 'center', fontFamily: 'Montserrat, Arial, sans-serif' }}>NYK Privacy Policy</h1>
      </div>
      <div style={{ maxWidth: '800px', width: '100%', fontSize: '1.1rem', overflowY: 'auto', maxHeight: '80vh', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px', fontFamily: 'Montserrat, Arial, sans-serif', lineHeight: '1.6' }}> 
        <p style={{ marginBottom: '1.5rem' }}>
          NYK (“NYK”, “we”, “us”, or “our”), recognizes the importance of your personal information and privacy. In this privacy policy (the "Privacy Policy") we describe to our staff, job applicants, customers and third-party service providers how we collect and use your personal information in accordance with applicable privacy laws.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          <strong>1. Background</strong><br />
          As an employer and business entity, we maintain certain information about you (“Personal Data”) which we need to process to be compliant with our relevant legal obligations (e.g. employment laws), our contractual obligations with you or in fulfilment of legitimate interests. We are required by law to provide you with certain information about the data we maintain about you, how we use the said data, and what safeguards are in place to ensure its security. This Privacy Policy is designed to provide you with essential information.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          <strong>2. Purposes and legal basis of our processing of your Personal Data</strong><br />
          NYK is a data controller in relation to your Personal Data we process for the following purposes (“Purposes”):
          <ul>
            <li>Business negotiations with us, execution and performance of contracts, and management of other transactions;</li>
            <li>Provision of information related to our operations and services and those of our group companies, and procedures related thereto;</li>
            <li>Operation of vessels owned or chartered by us;</li>
            <li>And so on...</li>
          </ul>
          The legal basis for our use of your Personal Data will generally fall into one or more of the following:
          <ul>
            <li>As a data subject, you have given consent to the processing of your Personal Data for one or more specific Purposes;</li>
            <li>Processing is necessary for the performance of a contract to which you are a party or in order to take steps at your request prior to entering into a contract;</li>
            <li>And so on...</li>
          </ul>
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          <strong>3. Types of Personal Data we process</strong><br />
          The types of Personal Data we maintain and process about you as an employee or as our customer or business partner are listed in the Annex attached.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          <strong>4. Categories of potential recipients of your Personal Data</strong><br />
          From time to time, as an employer and a business partner, we will share your Personal Data with the NYK group affiliates, advisers, and service providers so that they can help us properly discharge our obligations and exercise our rights.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          <strong>5. Data storage</strong><br />
          We exercise reasonable care in our collection and use of your Personal Data and have implemented internal security procedures to protect your Personal Data.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          <strong>6. Your rights</strong><br />
          You have a right to access to, and obtain a copy of, your Personal Data that we process and to ask us to correct your Personal Data if there are any errors or if it is outdated.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          <strong>7. Updates</strong><br />
          We may update this Privacy Policy periodically, with notice to you of the update and effective date thereof.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          <strong>8. Contacting us</strong><br />
          Please address any questions, comments and requests regarding our data processing practices to our Personal Information Helpdesk.
          <br />
          <span style={{ fontWeight: 'bold' }}>Personal Information Helpdesk</span><br />
          NYK line Legal & Fair Trade Promotion Group - Compliance Team
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicyPage;
