/** Format validators for Indian business identifiers. Return an error message or undefined. */
export const isGSTIN = (v: string) => /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z][1-9A-Z]Z[0-9A-Z]$/.test(v.trim().toUpperCase());
export const isPAN = (v: string) => /^[A-Z]{5}[0-9]{4}[A-Z]$/.test(v.trim().toUpperCase());
export const isIFSC = (v: string) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(v.trim().toUpperCase());
export const isVPA = (v: string) => /^[a-zA-Z0-9._-]{2,}@[a-zA-Z]{2,}$/.test(v.trim());
export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
export const isPhoneIN = (v: string) => /^(\+91[\s-]?)?[6-9]\d{4}[\s-]?\d{5}$/.test(v.trim());
export const isPincode = (v: string) => /^[1-9][0-9]{5}$/.test(v.trim());

export const vGSTIN = (v: string) => (!v || isGSTIN(v) ? undefined : "GSTIN should be 15 characters, e.g. 07AAAAA0000A1Z5");
export const vPAN = (v: string) => (!v || isPAN(v) ? undefined : "PAN should look like ABCDE1234F");
export const vIFSC = (v: string) => (!v || isIFSC(v) ? undefined : "IFSC should look like HDFC0001234");
export const vVPA = (v: string) => (!v || isVPA(v) ? undefined : "UPI ID should look like name@bank");
export const vEmail = (v: string) => (!v || isEmail(v) ? undefined : "Enter a valid email address");
export const vPhone = (v: string) => (!v || isPhoneIN(v) ? undefined : "Enter a 10-digit Indian mobile number");
