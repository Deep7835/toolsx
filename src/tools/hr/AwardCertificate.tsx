"use client";
import Certificate from "./Certificate";
export default function AwardCertificate() {
  return <Certificate config={{ kind: "award", defaultTitle: "Certificate of Excellence", defaultSubtitle: "Employee of the quarter", defaultBody: "In recognition of outstanding performance, dedication and consistent contribution to the success of {company}. Your commitment sets the standard for the entire team." }} />;
}
