import type { CategoryId } from "./categories";
import { CONTENT } from "./content";

export type Badge = "popular" | "new" | "updated" | "ai" | "live";

export interface ToolMeta {
  slug: string;
  name: string;
  description: string;
  category: CategoryId;
  tag: string; // small uppercase label, e.g. "COMPLIANCE"
  sub: string; // e.g. "PDF & QR"
  badge?: Badge;
  keywords?: string[];
  steps?: string[];
  faqs?: { q: string; a: string }[];
}

const t = (
  slug: string,
  name: string,
  description: string,
  category: CategoryId,
  tag: string,
  sub: string,
  extra: Partial<ToolMeta> = {},
): ToolMeta => ({ slug, name, description, category, tag, sub, ...extra });

const RAW: ToolMeta[] = [
  // ───────────── Billing & Invoicing ─────────────
  t("gst-invoice", "GST Invoice Generator", "Generate professional GST bills with embedded payment QR codes for instant counter collection.", "billing", "POPULAR", "PDF & QR", { badge: "popular", keywords: ["bill", "tax invoice", "upi"] }),
  t("upi-standee", "UPI QR Payment Standee", "Print physical store counter QR standees with custom business name and static UPI details.", "shop", "STORE PRINT", "PRINT STANDEE", { keywords: ["qr", "counter", "gpay", "phonepe"] }),
  t("proforma-invoice", "Proforma Invoice Generator", "Create professional proforma invoices for advance payment requests and order confirmations.", "billing", "NEW", "PDF", { badge: "new" }),
  t("credit-note", "Credit Note Generator", "Generate GST compliant credit notes for sales returns and post-sale discounts.", "billing", "NEW", "PDF", { badge: "new" }),
  t("debit-note", "Debit Note Generator", "Create GST compliant debit notes for purchase returns and price corrections.", "billing", "NEW", "PDF", { badge: "new" }),
  t("gst-calculator", "GST Tax Calculator", "Real-time CGST, SGST, and IGST tax calculator with Composition scheme options and inclusive modes.", "tax", "COMPLIANCE", "TAX CALCULATOR", { keywords: ["cgst", "sgst", "igst", "inclusive", "exclusive"] }),
  t("whatsapp-direct", "WhatsApp Direct Chat & Link", "Create direct messaging links and QR codes with pre-filled order text without saving phone numbers.", "marketing", "MARKETING", "DIRECT CHAT", { keywords: ["wa.me", "click to chat"] }),
  t("barcode-generator", "Product Barcode Generator", "Generate high-resolution printable product barcode labels for retail inventory.", "marketing", "PACKAGING", "PRODUCT BARCODES", { keywords: ["ean", "code128", "sku", "label"] }),
  t("price-tag-generator", "Retail Price Tag Generator", "Print grid price stickers with MRP, offer price, discount percentage, and batch numbers.", "logistics", "RETAIL PRINT", "PRICE TAGS", { keywords: ["sticker", "mrp", "shelf"] }),
  t("delivery-challan", "Delivery Challan & Waybill", "Draft official transport delivery dispatch challans with vehicle numbers and item details.", "logistics", "TRANSPORT", "DISPATCH WAYBILL", { keywords: ["e-way", "dispatch"] }),
  t("fuel-expense", "Fuel Expense & Mileage Calculator", "Calculate delivery trip fuel costs with petrol/diesel rates and customer markup.", "logistics", "FLEET COST", "DELIVERY COST", { keywords: ["petrol", "diesel", "km"] }),
  t("wage-slip", "Daily Wage & Payroll Slip Generator", "Generate thermal payroll wage slips for daily store workers, packers, and staff.", "hr", "PAYROLL", "WAGE SLIPS", { keywords: ["salary slip", "thermal"] }),
  t("photo-resizer", "Product Photo Resizer & Compressor", "Compress catalog images for fast sharing on WhatsApp and social media.", "media", "E-COMMERCE", "IMAGE COMPRESSOR", { keywords: ["jpeg", "webp", "resize"] }),
  t("payment-receipt", "Payment Receipt Generator", "Generate itemized payment receipts for UPI, Cash, & Bank Transfer with A4/Thermal printing.", "billing", "RECEIPT", "THERMAL & A4", { keywords: ["cash receipt", "acknowledgement"] }),
  t("menu-creator", "Menu Creator & QR Scanner", "Create digital food menus with instant QR code generator and built-in camera QR scanner.", "shop", "RESTAURANT", "MENU & QR", { keywords: ["cafe", "food", "digital menu"] }),
  t("profit-margin", "Profit Margin & Break-even Calculator", "Calculate net profit margins, markups, packaging, digital gateway fees, and break-even units.", "finance", "PROFIT CALC", "NET MARGIN", { keywords: ["markup", "breakeven"] }),
  t("google-review", "Google Review Request Builder", "Generate polite customer review requests with direct Google Business Profile links and WhatsApp share.", "marketing", "GOOGLE REVIEWS", "WHATSAPP SHARE", { keywords: ["gmb", "rating"] }),
  t("letterhead", "Corporate Letterhead Generator", "Design professional company letterheads with custom logo, metadata, and instant PDF/A4 export.", "freelancer", "CORPORATE", "A4 PRINT", { keywords: ["stationery"] }),
  t("service-quote", "Service Quote & Estimate Builder", "Generate formal project quotations with material costs, labor estimates, and scope of work.", "freelancer", "CONTRACTORS", "PDF QUOTE", { keywords: ["quotation", "estimate"] }),
  t("vcard-qr", "vCard Contact QR Code Generator", "Convert business contact details into standard vCard QR codes for instant smartphone scan-to-save.", "marketing", "VCARD QR", "CONTACT QR", { keywords: ["business card", "contact"] }),
  t("url-qr", "URL & Link QR Code Generator", "Generate high-resolution URL QR codes with custom colors, sizing, and instant PNG/SVG downloads.", "marketing", "URL QR", "PNG & SVG", { keywords: ["link", "website"] }),
  t("social-post", "AI Social Media Post Generator", "Generate high-converting social posts with customer call-to-actions, hashtags, and clean formatting.", "marketing", "AI POWERED", "SOCIAL MARKETING", { badge: "ai", keywords: ["instagram", "caption", "hashtags"] }),
  t("shipping-label", "Amazon & Flipkart Shipping Label Generator", "Create scannable 4x6 inch thermal shipping labels for Amazon, Flipkart, Meesho, Speed Post and couriers.", "logistics", "4X6 LABEL", "4X6 THERMAL PRINT", { keywords: ["courier", "awb", "meesho"] }),
  t("in-hand-salary", "In-Hand Salary Calculator", "Calculate monthly take-home salary after PF, Professional Tax, and TDS deductions for Indian employees.", "hr", "SALARY", "PAYROLL TOOL", { keywords: ["ctc", "take home", "net salary"] }),
  t("rent-receipt", "Rent Receipt Generator", "Generate formal rent receipts for HRA tax exemption claims for residential or commercial property.", "billing", "HRA PROOF", "TAX SAVING", { keywords: ["hra", "landlord"] }),
  t("wifi-qr", "Store WiFi QR Code", "Allow customers to join your store or office WiFi instantly by scanning a QR code without typing passwords.", "shop", "CUSTOMER UX", "INSTANT CONNECT", { keywords: ["wifi", "password"] }),
  t("land-unit-converter", "Land & Area Unit Converter", "Convert between Bigha, Katha, Gaj, Acre, and Hectares for real estate and agricultural land deals.", "finance", "REAL ESTATE", "LAND UNITS", { keywords: ["sqft", "bigha", "acre"] }),
  t("word-counter", "Business Content Word Counter", "Check character and word limits for product descriptions, ad copy, and social media captions.", "media", "COPYWRITING", "CONTENT TOOL", { keywords: ["characters", "limit"] }),
  t("todo-list", "To-Do List Generator", "Organize task lists with custom prioritizations and checklist completion ratios.", "freelancer", "TASKS", "PRODUCTIVITY", { keywords: ["checklist", "tasks"] }),
  t("email-signature", "Email Signature Maker", "Design high-converting HTML email signatures with brand banners and social links.", "freelancer", "ONBOARDING", "BUSINESS EMAIL", { keywords: ["gmail", "outlook"] }),
  t("digital-signature", "Digital Signature Maker", "Draw or type official secure signatures to print or download as premium transparent PNGs.", "freelancer", "LEGAL", "E-SIGN", { keywords: ["sign", "png", "transparent"] }),
  t("discount-calculator", "Discount & Percentage Calculator", "Calculate sale markdowns, flat off percentages, and double-discount promotions.", "shop", "OFFERS", "STORE MATH", { keywords: ["sale", "off"] }),
  t("password-generator", "Password Generator", "Create secure, random, high-entropy cryptographic passcodes for server and admin accounts.", "media", "SECURITY", "ADMIN UTILITY", { keywords: ["random", "secure"] }),
  t("password-strength", "Password Strength Checker", "Analyze real-time brute force cracking estimations and character entropy scoring.", "media", "SECURITY", "SEC ANALYSIS", { keywords: ["entropy", "crack time"] }),
  t("favicon-generator", "Favicon & App Icon Generator", "Create structured browser web app favicons and icon bundles from simple design fields.", "media", "BRANDING", "ASSET BUILDER", { keywords: ["icon", "pwa", "apple touch"] }),
  t("experience-letter", "Experience Letter Generator", "Draft corporate experience and relieving certificates with dynamic designations and dates.", "hr", "HR & STAFF", "HR LETTER", { keywords: ["relieving", "certificate"] }),
  t("award-certificate", "Award Certificate Designer", "Design customized corporate excellence awards and merit certificates for download.", "hr", "MILESTONES", "CREDENTIALS", { keywords: ["certificate", "appreciation"] }),
  t("internship-certificate", "Internship Certificate Maker", "Format high-quality training and internship completion credentials with project titles.", "hr", "HR & STAFF", "INTERNSHIP", { keywords: ["intern", "training"] }),
  t("staff-id-card", "Staff ID Card Creator", "Design printable security access employee badges with blood group markers and photo.", "hr", "SECURITY", "CORPORATE BADGE", { keywords: ["badge", "employee card"] }),
  t("website-pdf-mockup", "Websites to PDF Generator Mockup", "Layout and format website screenshots and meta description mockups to print-ready PDF presentations.", "media", "MARKETING", "PRESENTATION", { keywords: ["browser frame", "mockup"] }),
  t("electricity-bill", "Electricity Bill Creator", "Simulate monthly energy consumer rates, energy tax meters, and due dates.", "shop", "BOOKKEEPING", "UTILITIES", { keywords: ["power", "units", "kwh"] }),
  t("telecom-bill", "Mobile Telecom Bill Maker", "Generate high-fidelity cellular bills and mobile network subscription charges.", "shop", "BOOKKEEPING", "TELECOM", { keywords: ["postpaid", "mobile"] }),
  t("broadband-bill", "Broadband Bill Planner", "Format fast broadband, network connection, and fiber subscription invoices.", "shop", "BOOKKEEPING", "INTERNET BILL", { keywords: ["fiber", "isp"] }),
  t("society-maintenance", "Society Maintenance Invoice", "Create housing or commercial block monthly maintenance charges receipts.", "shop", "BOOKKEEPING", "HOUSING", { keywords: ["apartment", "rwa"] }),
  t("medical-prescription", "Medical Prescription Builder", "Draft professional doctor prescription layouts with patient details and dosage fields.", "shop", "CLINICAL", "HEALTHCARE", { keywords: ["doctor", "rx", "clinic"] }),
  t("hotel-voucher", "Hotel Stay Booking Voucher", "Simulate customized hotel stay receipts and reservation vouchers for record keeping.", "shop", "TRAVEL", "HOSPITALITY", { keywords: ["reservation", "check-in"] }),
  t("boarding-pass", "Flight Boarding Pass Slip", "Design mock flight boarding ticket layouts with seat and flight details.", "shop", "TRAVEL", "AIRLINE PASS", { keywords: ["flight", "ticket"] }),
  t("movie-ticket", "Movie Cinema Ticket Slip", "Simulate customized cinema movie tickets with theater screen metrics.", "shop", "LEISURE", "ENTERTAINMENT", { keywords: ["cinema", "seat"] }),
  t("gym-membership", "Gym Membership Creator", "Format high-contrast fitness center subscriptions and gym registration vouchers.", "shop", "FITNESS", "GYM CARDS", { keywords: ["fitness", "membership card"] }),
  t("emi-calculator", "Business Loan & EMI Calculator", "Calculate monthly payouts, interest liabilities, and detailed amortization sheets for Indian business loans.", "finance", "MSME FINANCE", "EMI & AMORTIZATION", { keywords: ["loan", "interest", "amortization"] }),
  t("epf-gratuity", "EPF & Gratuity Calculator", "Calculate Employee Provident Fund retirement corpus and statutory Gratuity payouts under Indian law.", "hr", "HR & PAYROLL", "PF & GRATUITY", { keywords: ["provident fund", "retirement"] }),
  t("sip-calculator", "SIP & Mutual Fund Calculator", "Simulate Systematic Investment Plans (SIP) and lumpsum mutual fund yields with step-up options.", "finance", "WEALTH", "WEALTH BUILDER", { keywords: ["mutual fund", "investment"] }),
  t("upi-mdr-calculator", "UPI MDR Calculator 2026", "Calculate UPI MDR from 15 October 2026 — 0.4% above ₹2,000, ₹300 cap, flat ₹5 for fuel/railways/telecom, P2PM small-merchant exemption and 18% GST with ITC.", "finance", "BUSINESS FINANCE", "NPCI 2026", { badge: "updated", keywords: ["mdr", "merchant fee"] }),
  t("json-base64", "JSON Dev Tool & Base64 Suite", "Syntactical JSON pretty-printer, linter, minifier, and direct Base64 encoder/decoder for API work.", "media", "DEVELOPER", "API UTILITIES", { keywords: ["format", "minify", "encode"] }),
  t("percentage-calculator", "Percentage Calculator", "Easily calculate general percentages, ratios, margins, and proportional growth in real-time.", "finance", "CALCULATORS", "PROPORTIONS", { keywords: ["percent", "ratio"] }),
  t("depreciation-calculator", "Depreciation Calculator (Income Tax & Companies Act)", "Calculate asset depreciation under Income Tax Act Block of Assets and Companies Act 2013 useful-life methods.", "tax", "TAX & ACCOUNTING", "TAX & ASSETS", { keywords: ["wdv", "slm", "asset"] }),
  t("tds-calculator", "TDS Calculator (194C, 194J, 194I, 194A, 194H, 194Q)", "Compute Tax Deducted at Source for contractor payments, professional fees, rent, interest, commission and purchases.", "tax", "INCOME TAX", "TDS CALCULATOR", { keywords: ["tds", "section 194"] }),
  t("late-payment-interest", "Late Payment Interest Calculator (MSME Samadhaan)", "Calculate exact overdue interest charges and total payable amounts under MSMED Act commercial terms.", "finance", "CREDIT PROTECTION", "OVERDUE INTEREST", { keywords: ["msmed", "overdue", "samadhaan"] }),
  t("professional-tax", "Professional Tax Calculator (MH, KA, WB, GJ, AP, TS)", "Compute state-wise Professional Tax (PT) monthly salary deductions for Maharashtra, Karnataka, West Bengal, Gujarat, AP and Telangana.", "tax", "PAYROLL TAX", "STATE PT SLABS", { keywords: ["pt", "state tax"] }),
  t("volumetric-weight", "Volumetric Weight Calculator (Delhivery, BlueDart, DTDC)", "Calculate parcel volumetric (dimensional) weight and courier chargeable weight using carrier divisors.", "logistics", "E-COMMERCE", "PARCEL FREIGHT", { keywords: ["dimensional", "courier"] }),
  t("notice-period", "Notice Period & Last Working Day Calculator", "Calculate your official Last Working Day (LWD), notice countdown, and release timeline for HR exits.", "hr", "HR & EXIT", "HR EXIT LWD", { keywords: ["resignation", "lwd"] }),
  t("leave-balance", "Employee Leave Balance Calculator (Pro-Rata Quota)", "Calculate available leave balances, pro-rated entitlements for new joiners, and utilized paid leave.", "hr", "HR OPERATIONS", "LEAVE TRACKER", { keywords: ["pl", "cl", "sl"] }),
  t("purchase-order", "Purchase Order (PO) Generator & PDF Template", "Create professional B2B Purchase Orders with GSTIN details, line item pricing, payment and delivery terms.", "billing", "PROCUREMENT", "PDF PO GENERATOR", { keywords: ["po", "vendor"] }),
  t("gst-calendar", "GST Filing Due Date Calendar FY 2026-27", "Track statutory filing deadlines for GSTR-1, GSTR-3B, CMP-08, IFF, GSTR-4, and GSTR-9 across the financial year.", "tax", "COMPLIANCE", "GST CALENDAR", { keywords: ["due date", "gstr"] }),
  t("ebitda-calculator", "EBITDA Calculator", "Calculate Earnings Before Interest, Taxes, Depreciation, and Amortization to measure operating profitability.", "finance", "FINANCE", "OPERATIONAL PROFIT" ),
  t("cagr-calculator", "CAGR Calculator", "Calculate Compound Annual Growth Rate to measure investment growth over a specific period.", "finance", "FINANCE", "COMPOUND GROWTH"),
  t("roi-calculator", "ROI Calculator", "Calculate Return on Investment percentage to evaluate the efficiency of business projects or campaigns.", "finance", "FINANCE", "INVESTMENT EFFICIENCY"),
  t("barcode-scanner", "Universal Barcode & QR Camera Scanner", "Scan product barcodes and UPI payment QR codes directly from your mobile camera or an uploaded image.", "marketing", "NEW", "CAMERA SCANNER", { badge: "new", keywords: ["scan", "camera"] }),
  t("hsn-finder", "HSN/SAC Code Suggester & Finder", "Find GST tax rates and HSN/SAC codes for goods and services in India with instant search.", "tax", "NEW", "GST COMPLIANCE", { badge: "new", keywords: ["hsn", "sac", "gst rate"] }),
  t("business-days", "Business Days & Holiday Calculator", "Calculate exact working days between dates excluding Sundays and Indian national holidays.", "hr", "NEW", "PRODUCTIVITY", { badge: "new", keywords: ["working days", "holidays"] }),
  t("pdf-merge-split", "PDF Merge & Split Tool", "Combine multiple PDF files or extract pages into separate documents 100% in your browser.", "media", "NEW", "PRIVACY-FIRST", { badge: "new", keywords: ["combine", "extract pages"] }),
  t("currency-converter", "Import-Export Currency Converter", "Live exchange rates for INR, USD, EUR, and Gulf currencies for Indian exporters and importers.", "finance", "UPDATED", "LIVE RATES", { badge: "live", keywords: ["forex", "usd", "aed"] }),
  t("background-remover", "AI Background Remover", "Free AI tool to remove image backgrounds directly in your browser. No signup, privacy-first.", "media", "AI", "AI WASM", { badge: "ai", keywords: ["transparent", "cutout"] }),
  t("image-ocr", "AI Image Text Extractor (OCR)", "Free AI tool to extract editable text from images, receipts, and business cards using on-device OCR.", "media", "AI", "AI OCR", { badge: "ai", keywords: ["ocr", "text from image"] }),
  t("cac-calculator", "CAC Calculator", "Calculate your Customer Acquisition Cost by dividing total marketing/sales spend by new customers won.", "marketing", "GROWTH", "PERFORMANCE"),
  t("retention-rate", "Customer Retention Rate (CRR)", "Measure how many customers stayed loyal over a period to find your business churn rate.", "marketing", "LOYALTY", "LOYALTY"),
  t("referral-rate", "Referral Rate Calculator", "Calculate the percentage of new customers coming from word-of-mouth and referrals.", "marketing", "ORGANIC", "VIRALITY"),
  t("roas-calculator", "ROAS Calculator", "Calculate Return on Ad Spend for Facebook, Instagram, and Google ads to measure ad efficiency.", "marketing", "ADS", "AD EFFICIENCY"),
  t("lead-conversion", "Lead Conversion Rate", "Calculate what percentage of your total inquiries and leads convert into paying customers.", "marketing", "SALES", "SALES RATE"),
  t("marketing-funnel", "Marketing Funnel Calculator", "Map your sales journey to identify drop-off points and optimize your total conversion rate.", "marketing", "ANALYTICS", "FUNNEL ANALYSIS"),
  t("win-rate", "Opportunity Win Rate", "Calculate what percentage of your sales opportunities actually turn into won deals.", "marketing", "SALES", "SALES EFFICIENCY"),
  t("sales-cycle", "Sales Cycle Length", "Calculate the average time it takes for a lead to become a paying customer.", "marketing", "VELOCITY", "SALES VELOCITY"),
  t("forecast-accuracy", "Sales Forecast Accuracy", "Measure how close your actual sales performance is to your predictions.", "finance", "PLANNING", "PLANNING ACCURACY"),
  t("revenue-growth", "Revenue Growth Rate", "Calculate how much your income has grown over time to track business momentum.", "finance", "GROWTH", "GROWTH METRIC"),
  t("gross-margin", "Gross Margin Calculator", "Calculate profit after direct costs to determine your product pricing efficiency.", "finance", "MARGIN", "UNIT PROFIT"),
  t("income-tax", "Income Tax Calculator (Old vs New)", "Compare Old and New Tax Regimes for FY 2026-27 with side-by-side tax liability breakdowns.", "tax", "TAX PLANNING", "FY 2026-27", { keywords: ["itr", "regime", "87a"] }),
  t("hra-exemption", "HRA Exemption Calculator", "Calculate House Rent Allowance (HRA) tax exemption under Section 10(13A) for the Old Tax Regime.", "tax", "HRA SAVING", "SECTION 10(13A)", { keywords: ["rent", "hra"] }),
  t("advance-tax", "Advance Tax Calculator", "Estimate your quarterly advance tax installments and payment schedule for the financial year.", "tax", "TAX SCHEDULE", "INSTALLMENT PLAN", { keywords: ["quarterly", "234c"] }),
  t("net-profit-margin", "Net Profit Margin", "Measure exactly what percentage of sales you keep as profit after all expenses.", "finance", "PROFIT", "BOTTOM LINE"),
  t("contribution-margin", "Contribution Margin", "Track how much each sale contributes to covering your fixed costs like rent.", "finance", "ECONOMICS", "UNIT ECONOMICS"),
  t("budget-variance", "Budget Variance Calculator", "Compare your actual spending and revenue against your planned budget targets.", "finance", "PLANNING", "PLANNING CONTROL"),
  t("csat-calculator", "CSAT Calculator", "Calculate Customer Satisfaction Score percentage from satisfied survey ratings.", "marketing", "SERVICE", "CSAT SCORE"),
  t("fcr-rate", "First Contact Resolution Rate", "Calculate what percentage of support issues are resolved on the first interaction.", "marketing", "SUPPORT", "SUPPORT EFFICIENCY"),
  t("first-response-time", "Average First Response Time", "Average your support response delays across calls, emails, and WhatsApp messages.", "marketing", "SLA", "RESPONSE SPEED"),
  t("nps-calculator", "NPS Calculator", "Calculate Net Promoter Score index (-100 to +100) from Promoters, Passives, and Detractors.", "marketing", "LOYALTY", "BRAND ADVOCACY"),
  t("order-accuracy", "Order Fulfillment Accuracy", "Calculate the percentage of orders picked, packed, and delivered without errors.", "logistics", "PACKING", "WAREHOUSE QC"),
  t("on-time-delivery", "On-Time Delivery Rate", "Calculate the percentage of shipments delivered on or before the promised date.", "logistics", "LOGISTICS", "SHIPPING SLA"),
  t("inventory-turnover", "Inventory Turnover Ratio", "Calculate stock turnover velocity and Days Sales of Inventory (DSI).", "logistics", "INVENTORY", "STOCK VELOCITY"),
  t("capacity-utilization", "Capacity Utilization Rate", "Calculate active production output relative to maximum theoretical capacity.", "logistics", "FACTORY", "PRODUCTION LOAD"),
  t("defect-rate", "Defect / Error Rate Calculator", "Analyze batch quality control by calculating defective item percentages and yield.", "logistics", "QUALITY", "QUALITY AUDIT"),
  t("freelance-rate", "Freelance Rate Calculator", "Calculate your required hourly and daily billing rates based on income targets and business costs.", "freelancer", "FREELANCE", "BILLING TARGET", { keywords: ["hourly rate"] }),
  t("privacy-policy-generator", "Privacy Policy Generator", "Generate baseline website privacy terms compliant with general data rules and India's DPDP Act.", "legal", "LEGAL", "LEGAL DRAFT", { keywords: ["dpdp", "gdpr"] }),
  t("faq-schema", "FAQ Schema Generator", "Generate JSON-LD FAQPage structured data to trigger Google search accordion rich results.", "legal", "SEO", "JSON-LD SCHEMA"),
  t("robots-txt", "Robots.txt Generator", "Create a valid robots.txt file to direct search crawlers and manage indexing rules.", "legal", "SEO", "CRAWL DIRECTIVES"),
  t("schema-markup", "Schema Markup Generator", "Generate Schema.org structured data for Local Business, Product, Article, FAQ, and HowTo pages.", "legal", "SEO", "SCHEMA.ORG CODE"),
  t("meta-tags", "Meta Tag Generator", "Generate HTML Title, Meta Description, Canonical, and Open Graph social tags with live preview.", "legal", "SEO", "META TAGS & OG"),
  t("gstin-validator", "GSTIN Validator & Format Checker", "Verify a GST number's 15-character format and check digit, and decode the state, PAN and taxpayer type.", "tax", "GST COMPLIANCE", "GSTIN CHECK", { keywords: ["gst number check", "verify gstin", "gstin format", "gst number validator", "sample gstin"] }),
  t("serp-preview", "SERP Snippet Preview", "Simulate how your title tag and meta description look in Google Search on desktop and mobile.", "legal", "SEO", "GOOGLE SERP"),
  t("employee-cost", "Employee Cost Calculator (Fully-Loaded CTC)", "Calculate total annual employee cost including PF, ESI, Gratuity, and Bonus provisions.", "hr", "OPERATIONS", "CTC ANALYSIS"),
  t("statutory-bonus", "Statutory Bonus Calculator", "Estimate employee bonus under the Payment of Bonus Act, 1965 based on wage ceilings.", "hr", "PAYROLL", "COMPLIANCE"),
  t("team-payroll", "Small Team Payroll & Variable Pay Calculator", "Calculate monthly salary payouts for small teams under 10 people in one click, with variable pay and deductions.", "hr", "STAFF PAY", "BATCH PAYROLL"),
  t("terms-generator", "Terms & Conditions Generator", "Generate a professional Terms and Conditions document for your website, app, or e-commerce store.", "legal", "LEGAL", "LEGAL TEMPLATE"),
  t("refund-policy", "Refund / Return Policy Generator", "Generate a clear and compliant Refund & Return Policy for your shop, agency, or digital product.", "legal", "LEGAL", "STORE POLICY"),
  t("engagement-rate", "Social Media Engagement Rate Calculator", "Calculate engagement rate using followers or reach for Instagram, Facebook, and LinkedIn.", "marketing", "MARKETING", "ANALYTICS"),
  t("seller-pricing", "Seller Pricing Workflow", "Chain product costs, packaging, volumetric weights, and platform commissions to find your final listing price.", "finance", "FINANCE", "WORKSPACE", { keywords: ["amazon fees", "marketplace"] }),
  t("upi-mdr-guide", "UPI MDR 2026 Complete Guide", "Complete guide to the 2026 UPI MDR framework, 0.4% rates, ₹300 caps, P2PM exemptions and merchant categories.", "finance", "GUIDE", "2026 NPCI RULES"),
];

export const TOOLS: ToolMeta[] = RAW.map((t) => ({ ...t, ...(CONTENT[t.slug] ?? {}) }));

export const toolBySlug = (slug: string) => TOOLS.find((x) => x.slug === slug);
export const toolsByCategory = (id: CategoryId) => TOOLS.filter((x) => x.category === id);
export const POPULAR_SLUGS = ["gst-invoice", "upi-standee", "gst-calculator", "whatsapp-direct", "barcode-generator", "in-hand-salary", "emi-calculator", "income-tax"];
