/** How-to steps and FAQs shown below key tools. */
export const CONTENT: Record<string, { steps?: string[]; faqs?: { q: string; a: string }[] }> = {
  "gst-invoice": {
    steps: ["Enter your business name, address and GSTIN (optional) — these are remembered for next time.", "Add the customer’s details and pick intra-state (CGST + SGST) or inter-state (IGST).", "List items with HSN/SAC, quantity, rate and GST slab. Toggle ‘inclusive’ if your rates already include tax.", "Add your UPI ID to embed a dynamic QR that carries the exact bill amount.", "Download the A4 PDF, print, or share a summary with the UPI link on WhatsApp."],
    faqs: [{ q: "Is the UPI QR compatible with all apps?", a: "Yes. It uses the standard upi://pay deep link with amount, so GPay, PhonePe, Paytm, BHIM and bank apps all read it." }, { q: "Do I need a GSTIN?", a: "No. Leave it blank to issue a regular bill of supply; the GST columns still work if you charge tax as a registered dealer." }, { q: "Where is my data stored?", a: "Only in your browser’s local storage (business details, logo, UPI ID). Invoices are generated on the fly and never uploaded." }, { q: "Can I number invoices sequentially?", a: "Yes — the number auto-increments per month (INV-2609-0001, 0002…). You can also type any number." }],
  },
  "upi-standee": {
    steps: ["Type your UPI ID (VPA) and the name customers should see.", "Choose A5 for counter stands or A4 for wall posters, and pick a colour theme.", "Optionally fix an amount for a single-price counter (e.g. ₹20 chai).", "Download as PDF for printing or PNG for WhatsApp sharing."],
    faqs: [{ q: "Static or dynamic QR?", a: "This is a static QR: customers enter the amount themselves. For bill-specific QRs with the amount baked in, use the GST Invoice or Payment Receipt tools." }, { q: "Will it work at a bank kiosk or with BharatQR?", a: "It follows the NPCI UPI specification, which every UPI app understands. BharatQR card scanners may not read UPI-only codes." }],
  },
  "gst-calculator": {
    steps: ["Pick ‘Add GST’ if you know the base price, or ‘Remove GST’ to back-calculate from an MRP.", "Tap a rate (0, 3, 5, 18, 40%) or type a custom one.", "Switch to IGST for inter-state supplies.", "Optionally compare with the composition scheme."],
    faqs: [{ q: "What changed in September 2025?", a: "The GST Council merged the 12% and 28% slabs into 5% and 18%, with a 40% rate for sin and luxury goods. Use custom rates for invoices dated earlier." }, { q: "How is inclusive tax computed?", a: "Base = MRP ÷ (1 + rate). For ₹1,180 at 18%, base is ₹1,000 and GST is ₹180." }],
  },
  "whatsapp-direct": {
    steps: ["Enter your WhatsApp Business number with country code.", "Choose a template or write your own pre-filled message.", "Copy the wa.me link for your website, Instagram bio or ads.", "Download the QR for packaging, visiting cards and standees."],
    faqs: [{ q: "Does the customer need to save my number?", a: "No — tapping the link or scanning the QR opens a chat window with you directly." }, { q: "Can I track clicks?", a: "Add UTM-style text in the message (e.g. ‘Ref: FB-Ad-1’) to see which channel customers came from." }],
  },
  "in-hand-salary": {
    steps: ["Enter annual or monthly CTC and how basic/HRA are structured.", "Tell us whether employer PF and gratuity are part of CTC.", "Choose your state for professional tax and the tax regime.", "Read the monthly take-home and the deduction breakdown."],
    faqs: [{ q: "Why is my in-hand lower than CTC ÷ 12?", a: "CTC includes employer PF, gratuity and bonuses that aren’t paid monthly. Employee PF, professional tax and TDS are then deducted from gross." }, { q: "Which regime should I pick?", a: "Use the Income Tax (Old vs New) tool to compare — the new regime wins for most people with deductions under ~₹4 lakh." }],
  },
  "emi-calculator": {
    steps: ["Enter the loan amount, interest rate and tenure (or pick a preset).", "Add the processing fee to see the true cost.", "Review the yearly or monthly amortization table and download it as CSV."],
    faqs: [{ q: "Is this the reducing-balance method?", a: "Yes — the standard method used by Indian banks and NBFCs, where interest is charged on the outstanding principal each month." }, { q: "How do prepayments affect EMI?", a: "Prepaying reduces principal; most lenders then shorten tenure while keeping the EMI. Re-run with the lower amount and remaining tenure to see the effect." }],
  },
  "income-tax": {
    steps: ["Enter gross salary or business income plus other income.", "Fill deductions you actually claim (they apply only under the old regime).", "Compare both regimes side by side and see the break-even deduction level."],
    faqs: [{ q: "Which slabs are used?", a: "New regime: nil to ₹4 lakh, then 5/10/15/20/25/30% bands up to ₹24 lakh, with a rebate making income up to ₹12 lakh tax-free and ₹75,000 standard deduction. Old regime: 5/20/30% above ₹2.5 lakh with ₹50,000 standard deduction." }, { q: "Is surcharge included?", a: "Yes, with marginal relief, for incomes above ₹50 lakh. Health & education cess of 4% is added in both regimes." }],
  },
  "wage-slip": {
    steps: ["Enter worker name, role and pay period.", "Choose daily wage × days or a monthly salary; add overtime and bonus.", "Enter advances or PF/ESI deductions.", "Print on an 80 mm thermal roll or as an A5 slip."],
    faqs: [{ q: "Is a wage slip mandatory?", a: "Under the Code on Wages, employers must issue wage slips. Keeping signed copies also helps in labour inspections and disputes." }],
  },
  "shipping-label": {
    steps: ["Pick the marketplace and courier, and paste the AWB number.", "Fill the delivery and return addresses.", "Mark COD amount if applicable and note the parcel weight.", "Download PDF for a 4×6 thermal printer, or PNG."],
    faqs: [{ q: "Will the barcode scan?", a: "The AWB is encoded as Code 128, the format courier scanners expect. Print at 100% scale without ‘fit to page’." }, { q: "Can I use this for marketplace orders?", a: "Amazon/Flipkart generate their own labels for platform-fulfilled orders; use this for self-ship, Meesho supplier orders, or your own website orders." }],
  },
  "gstin-validator": {
    steps: ["Type or paste the 15-character GST number — spaces and dashes are ignored.", "Read the verdict: format, state code and check digit are validated instantly.", "Check the decoded details — state, PAN, taxpayer type and how many registrations that PAN holds in the state.", "Open the GST portal link to confirm the registration is active and see the legal name."],
  },
  "hsn-finder": {
    faqs: [{ q: "How many digits do I need?", a: "Turnover up to ₹5 crore: 4-digit HSN on B2B invoices. Above ₹5 crore: 6 digits on all invoices. Exports need 8 digits." }, { q: "Are these rates current?", a: "They reflect the GST 2.0 structure effective 22 September 2025. Always cross-check the CBIC schedule for specific products." }],
  },
  "rent-receipt": {
    steps: ["Enter tenant, landlord and the rented address.", "Set the monthly rent, payment mode and months to generate (up to 12).", "Print all receipts on A4 and get the landlord’s signature and revenue stamp where needed."],
    faqs: [{ q: "When is the landlord’s PAN required?", a: "If annual rent exceeds ₹1,00,000, you must furnish the landlord’s PAN to your employer for HRA exemption." }, { q: "Is a revenue stamp needed?", a: "For cash payments above ₹5,000 a ₹1 revenue stamp is customary under the Indian Stamp Act; not needed for bank/UPI payments." }],
  },
  "tds-calculator": {
    faqs: [{ q: "When do I deposit TDS?", a: "By the 7th of the following month (30 April for March deductions). File Form 26Q quarterly and issue Form 16A." }, { q: "What if the payee has no PAN?", a: "Deduct at 20% under Section 206AA regardless of the section’s normal rate." }],
  },
  "menu-creator": {
    steps: ["Add sections (Starters, Mains…) and items with prices and veg/non-veg markers.", "Print the A4 menu — it carries a QR to the digital version.", "Customers scan to see a phone-friendly menu; test it with the built-in scanner."],
    faqs: [{ q: "Where is the digital menu hosted?", a: "The whole menu is encoded inside the link itself (no server). Any change requires re-printing the QR." }],
  },
  "barcode-generator": {
    faqs: [{ q: "Which format for retail?", a: "EAN-13 for products sold through modern trade (needs a GS1 India prefix starting 890). Code 128 is fine for internal SKUs." }, { q: "How do I get the check digit?", a: "Enter the first 12 digits and click ‘Compute EAN-13 check digit’." }],
  },
};
