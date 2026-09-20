"use client";
import Certificate from "./Certificate";
export default function InternshipCertificate() {
  return <Certificate config={{ kind: "internship", defaultTitle: "Certificate of Internship", defaultSubtitle: "Completion of training", defaultBody: "has successfully completed an internship at {company} from {from} to {to}, working on “{project}”. During this period the intern demonstrated strong learning ability, professionalism and a commendable work ethic." }} />;
}
