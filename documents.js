// PRELOADED_DOCUMENTS acts as the core database of legal contracts.
// Each document contains the full text, pre-split chunks with page/clause metadata, 
// and pre-extracted RAG pipeline results (Step 1-5) and preset Q&A responses.

const PRELOADED_DOCUMENTS = [
  {
    id: "saas_msa",
    title: "SaaS Master Services Agreement (MSA)",
    description: "Enterprise cloud infrastructure agreement containing strict SLA tiers, IP indemnification, data protection addendums, liability limits, and potential SLA-indemnification conflicts.",
    metadata: {
      document_type: "Master Services Agreement (SaaS)",
      jurisdiction: "State of Delaware, USA",
      effective_date: "January 15, 2026",
      expiration_date: "January 14, 2029",
      governing_law: "Delaware Law"
    },
    classification: {
      "document_type": "Master Services Agreement (SaaS)",
      "jurisdiction": "State of Delaware, USA",
      "effective_date": "January 15, 2026",
      "expiration_date": "January 14, 2029",
      "governing_law": "Delaware Law"
    },
    summary: [
      {
        bullet: "Establishes a three-year enterprise SaaS relationship between CloudScale Systems Inc. (Provider) and FinTech Global Solutions Ltd. (Customer) for cloud database and infrastructure management services.",
        citation: "[Source: Page 1, Preamble & Recitals]"
      },
      {
        bullet: "Customer receives a non-exclusive, non-transferable right to access the cloud platform, while Provider retains sole ownership of the platform, including any modifications, feedback, and updates.",
        citation: "[Source: Page 2, Section 3.1]"
      },
      {
        bullet: "Imposes a standard 99.9% monthly service uptime commitment (SLA), providing tiered service credits for downtime, which are designated as the Customer's sole and exclusive financial remedy.",
        citation: "[Source: Page 4, Section 6.2]"
      },
      {
        bullet: "Standard financial liability is mutually capped at the total amount paid by Customer in the 12 months preceding the incident, except for a Super-Cap of $5,000,000 for data security breaches.",
        citation: "[Source: Page 6, Section 9.2]"
      },
      {
        bullet: "Requires immediate notification of data breaches to the Customer within 72 hours, with full remediation support and compliance obligations aligning with CCPA and GDPR regulations.",
        citation: "[Source: Page 5, Section 8.4]"
      },
      {
        bullet: "Termination for convenience is permitted by either party upon providing 90 days prior written notice, whereas termination for uncured breach requires a 30-day notice period.",
        citation: "[Source: Page 7, Section 11.2]"
      }
    ],
    risks: [
      {
        type: "Financial Risk",
        description: "Uptime credits are designated as the sole and exclusive financial remedy for SLA failures, preventing the Customer from claiming additional damages for severe system outages.",
        severity: "Medium",
        citation: "Page 4, Section 6.2"
      },
      {
        type: "IP Ownership Risk",
        description: "Provider retains sole ownership of any custom modifications and integrations requested and funded by the Customer, unless mutually agreed otherwise in a separate SOW.",
        severity: "High",
        citation: "Page 2, Section 3.3"
      },
      {
        type: "Data Privacy Risk",
        description: "Breach notification window of 72 hours could expose Customer to regulatory penalties if downstream reporting timelines are tighter (e.g. some banking standards require 24-48 hours).",
        severity: "Medium",
        citation: "Page 5, Section 8.4"
      },
      {
        type: "Indemnification Risk",
        description: "IP Indemnification is void if the Customer combines Provider's services with any unapproved third-party software, leaving the Customer exposed in multi-vendor enterprise systems.",
        severity: "High",
        citation: "Page 6, Section 10.3"
      },
      {
        type: "Termination Risk",
        description: "A 90-day notice period for termination for convenience allows either party to break the contract, which could disrupt the Customer's core technical operations on short notice.",
        severity: "Medium",
        citation: "Page 7, Section 11.2"
      },
      {
        type: "SLA Violations / Litigation Exposure",
        description: "If an outage is caused by a third-party hosting partner (e.g., AWS, GCP), Provider is fully exempted from SLA penalty credits, placing the hosting liability squarely on the Customer.",
        severity: "Critical",
        citation: "Page 4, Section 6.4"
      }
    ],
    dates: [
      {
        date: "January 15, 2026",
        event: "Effective Date of Agreement",
        clause: "Preamble",
        citation: "Page 1, Preamble"
      },
      {
        date: "Monthly (10th day)",
        event: "Invoice Payment Deadline (Net 30 terms)",
        clause: "Section 5.2",
        citation: "Page 3, Section 5.2"
      },
      {
        date: "72 Hours",
        event: "Data Security Incident Notification Deadline",
        clause: "Section 8.4",
        citation: "Page 5, Section 8.4"
      },
      {
        date: "30 Days prior",
        event: "Written notice required to terminate for cause / uncured breach",
        clause: "Section 11.3",
        citation: "Page 7, Section 11.3"
      },
      {
        date: "90 Days prior",
        event: "Written notice required for termination for convenience",
        clause: "Section 11.2",
        citation: "Page 7, Section 11.2"
      },
      {
        date: "January 14, 2029",
        event: "Expiration Date of Initial Three-Year Term",
        clause: "Section 11.1",
        citation: "Page 7, Section 11.1"
      }
    ],
    stakeholders: [
      {
        name: "CloudScale Systems Inc.",
        role: "Provider (Vendor)",
        responsibilities: "Maintain SaaS platform availability, achieve 99.9% uptime SLA, secure customer data, provide regular software updates, and indemnify Customer against third-party IP claims.",
        citation: "Page 1, Preamble; Page 4, Section 6.1"
      },
      {
        name: "FinTech Global Solutions Ltd.",
        role: "Customer (Client)",
        responsibilities: "Pay recurring subscription invoices within 30 days, comply with system usage policies, secure local API credentials, and refrain from reverse-engineering the platform.",
        citation: "Page 1, Preamble; Page 3, Section 5.1; Page 2, Section 3.2"
      },
      {
        name: "Subcontractors / Cloud Hosts",
        role: "Third-Party Service Providers",
        responsibilities: "Provide core bare-metal and data center hosting infrastructure. Outages here exempt CloudScale from standard SLA downtime calculations.",
        citation: "Page 4, Section 6.4"
      },
      {
        name: "Data Protection Authority (DPA)",
        role: "Regulator",
        responsibilities: "Oversee regulatory compliance of both parties with respect to GDPR, CCPA, and general cross-border financial data storage rules.",
        citation: "Page 5, Section 8.1"
      }
    ],
    chunks: [
      {
        id: 1,
        page: 1,
        section: "Preamble & Parties",
        text: "This Master Services Agreement ('Agreement') is entered into as of January 15, 2026 ('Effective Date'), by and between CloudScale Systems Inc., a Delaware corporation with its principal place of business at 100 Enterprise Way, Suite 400, Wilmington, DE 19801 ('Provider'), and FinTech Global Solutions Ltd., a UK limited company with its principal place of business at 45 Canary Wharf, Floor 22, London, E14 5HD ('Customer'). Provider and Customer may each be referred to herein individually as a 'Party' and collectively as the 'Parties'."
      },
      {
        id: 2,
        page: 1,
        section: "Recitals",
        text: "WHEREAS, Provider operates an enterprise cloud-native database management platform and related software-as-a-service applications ('SaaS Platform'); and WHEREAS, Customer desires to access the SaaS Platform to support its digital financial transactions, subject to the terms and conditions set forth in this Agreement. NOW, THEREFORE, the Parties agree that this Agreement governs Customer's access to and use of all Provider services."
      },
      {
        id: 3,
        page: 2,
        section: "Section 3.1 - SaaS Platform Access Grant",
        text: "Subject to Customer's compliance with the terms of this Agreement and payment of all subscription fees, Provider hereby grants Customer a non-exclusive, non-transferable, revocable, worldwide right and license to access and use the SaaS Platform during the Term. The platform shall be accessed solely by Authorized Users in accordance with the user limits specified in each applicable Statement of Work (SOW)."
      },
      {
        id: 4,
        page: 2,
        section: "Section 3.2 - Usage Restrictions",
        text: "Customer shall not, and shall not permit any third party to: (a) modify, reverse engineer, decompile, or attempt to extract the source code of the SaaS Platform; (b) bypass, disable, or circumvent any security parameters, license keys, or usage throttling components; or (c) use the SaaS Platform to store, transmit, or distribute malicious code, spyware, or unlawful material."
      },
      {
        id: 5,
        page: 2,
        section: "Section 3.3 - Proprietary Rights & Custom Modifications",
        text: "Provider retains all right, title, and interest in and to the SaaS Platform, including all copyrights, patents, trademarks, and trade secrets. Customer shall own all data, database records, and transactional assets uploaded by Customer ('Customer Data'). If Customer requests custom modules, API integrations, or bespoke visual dashboards, Provider shall perform such work under a separate SOW. Provider shall own all proprietary rights to such custom modifications, feedback, and deliverables, granting Customer a royalty-free license to use them during the Term."
      },
      {
        id: 6,
        page: 3,
        section: "Section 5.1 - Subscription Fees",
        text: "Customer agrees to pay the recurring subscription fees set forth in the SOW. All pricing is fixed for the duration of the initial Term. Provider reserves the right to increase pricing for any Renewal Term by giving Customer written notice at least sixty (60) days prior to the expiration of the current Term, such increase not to exceed 5% of the prior rate."
      },
      {
        id: 7,
        page: 3,
        section: "Section 5.2 - Invoicing, Late Payments & Interest",
        text: "Provider will issue invoices monthly in advance. Customer shall pay all invoices within thirty (30) days of receipt ('Net 30'). Any payments not received within forty-five (45) days of the invoice date shall accrue interest at a rate of 1.5% per month, or the maximum amount permitted by governing law, whichever is lower, calculated daily from the due date until paid in full."
      },
      {
        id: 8,
        page: 4,
        section: "Section 6.1 - Service Level Agreement (SLA)",
        text: "Provider warrants that the SaaS Platform will maintain a Monthly Uptime Percentage of at least 99.9% during each calendar month of the Term. 'Monthly Uptime Percentage' is calculated as the total number of minutes in a month minus the total minutes of Downtime, divided by the total number of minutes in the month."
      },
      {
        id: 9,
        page: 4,
        section: "Section 6.2 - SLA Uptime Credits",
        text: "If the Monthly Uptime Percentage falls below 99.9%, Customer shall be eligible for Service Credits calculated as follows: (a) Uptime < 99.9% but >= 99.5%: Credit of 10% of the monthly fee; (b) Uptime < 99.5% but >= 99.0%: Credit of 25% of the monthly fee; (c) Uptime < 99.0%: Credit of 50% of the monthly fee. THE SERVICE CREDITS OUTLINED IN THIS SECTION SHALL BE THE CUSTOMER'S SOLE AND EXCLUSIVE REMEDY, AND PROVIDER'S SOLE FINANCIAL LIABILITY, FOR ANY OUTAGES, LOSS OF DATA ACCESS, OR DOWNTIME EVENTS."
      },
      {
        id: 10,
        page: 4,
        section: "Section 6.4 - SLA Exclusions",
        text: "Downtime does not include outages resulting from: (a) scheduled maintenance periods conducted between 2:00 AM and 4:00 AM EST; (b) Customer's local internet connectivity issues; (c) actions of third-party malicious actors (e.g., DDOS attacks); or (d) outages caused by AWS, Google Cloud Platform, or other public bare-metal infrastructure hosts. Outages originating from public cloud providers are fully excluded from standard uptime metrics."
      },
      {
        id: 11,
        page: 5,
        section: "Section 8.1 - Data Privacy Compliance",
        text: "Both parties agree to comply with all applicable data protection laws, including the California Consumer Privacy Act (CCPA) and the General Data Protection Regulation (GDPR). The parties shall execute the Data Protection Addendum (DPA) appended hereto as Exhibit B, which details the technical safeguards and storage rules for personally identifiable information."
      },
      {
        id: 12,
        page: 5,
        section: "Section 8.4 - Security Incident Notification (Breaches)",
        text: "In the event of a confirmed unauthorized access, disclosure, or acquisition of Customer Data ('Security Incident'), Provider shall notify Customer's Chief Information Security Officer (CISO) in writing within seventy-two (72) hours of confirming the breach. Provider shall, at its own expense, take immediate remedial actions to mitigate the effects of the Security Incident and cooperate with regulatory investigators."
      },
      {
        id: 13,
        page: 6,
        section: "Section 9.1 - Standard Mutual Indemnification",
        text: "Each party shall indemnify, defend, and hold harmless the other party, its officers, and employees against any direct liabilities, damages, and costs resulting from third-party lawsuits arising out of a party's gross negligence, willful misconduct, or violation of applicable laws."
      },
      {
        id: 14,
        page: 6,
        section: "Section 9.2 - Limitation of Liability Cap",
        text: "EXCEPT FOR CLAIMS ARISING UNDER SECTION 10 (IP INDEMNIFICATION) OR A PARTY'S WILFUL MISCONDUCT, EACH PARTY'S TOTAL AGGREGATE LIABILITY UNDER THIS AGREEMENT SHALL BE STRICTLY LIMITED TO THE TOTAL FEES PAID BY CUSTOMER TO PROVIDER IN THE TWELVE (12) MONTHS PRECEDING THE INCIDENT. NOTWITHSTANDING THE FOREGOING, IN THE EVENT OF A DATA SECURITY INCIDENT AND GDPR/CCPA BREACH ARISING FROM PROVIDER'S SOLE NEGLIGENCE, PROVIDER'S AGGREGATE LIABILITY SHALL BE SUBJECT TO A MAXIMUM CAP OF FIVE MILLION DOLLARS ($5,000,000) (THE 'DATA BREACH SUPER-CAP')."
      },
      {
        id: 15,
        page: 6,
        section: "Section 10.1 - IP Infringement Indemnity",
        text: "Provider shall defend, indemnify, and hold harmless Customer from any claims, suits, or demands by a third party alleging that the SaaS Platform infringes upon any copyright, trademark, or US patent. Provider will pay all court-ordered damages and reasonable attorney fees associated with such claim."
      },
      {
        id: 16,
        page: 6,
        section: "Section 10.3 - IP Indemnity Exclusions",
        text: "Provider's intellectual property indemnification obligations under Section 10.1 shall be completely nullified and void if the alleged patent or copyright infringement arises from: (a) Customer's modification of the SaaS Platform without written permission; (b) combination of the SaaS Platform with any third-party software, databases, or API integrations not explicitly authorized in writing by Provider; or (c) Customer's failure to install patches or updates issued by Provider."
      },
      {
        id: 17,
        page: 7,
        section: "Section 11.1 - Agreement Term & Renewals",
        text: "This Agreement shall commence on the Effective Date and remain in effect for an initial term of three (3) years ('Initial Term') expiring on January 14, 2029. Upon expiration of the Initial Term, the Agreement shall automatically renew for consecutive twelve (12) month periods ('Renewal Terms') unless either party provides written notice of non-renewal at least ninety (90) days prior to the end of the then-current term."
      },
      {
        id: 18,
        page: 7,
        section: "Section 11.2 - Termination for Convenience",
        text: "Either Party may terminate this Agreement and all related Statement of Works (SOWs) for convenience, at any time, by providing the other Party with at least ninety (90) days prior written notice of such intent. Upon termination for convenience, Customer shall immediately pay all unpaid, accrued charges up to the effective termination date."
      },
      {
        id: 19,
        page: 7,
        section: "Section 11.3 - Termination for Cause (Breach)",
        text: "Either Party may terminate this Agreement immediately upon written notice if the other Party: (a) materially breaches any provision of this Agreement and fails to cure such breach within thirty (30) days of receiving written notice specifying the breach; (b) files for bankruptcy, is declared insolvent, or undergoes liquidation proceedings."
      },
      {
        id: 20,
        page: 8,
        section: "Section 14.1 - Governing Law & Venue",
        text: "This Agreement, including all SOWs and disputes arising thereunder, shall be governed by, and construed in accordance with, the laws of the State of Delaware, without regard to its conflict of law principles. The Parties agree that all legal proceedings arising out of this Agreement shall be brought exclusively in the state or federal courts located in Wilmington, Delaware."
      }
    ],
    // These pre-mapped Q&A pairs will be served by the client-side RAG engine 
    // to match exactly what is in the document with 100% accuracy.
    qaPairs: [
      {
        keywords: ["terminate", "termination", "convenience", "notice period", "leave"],
        question: "What are the notice requirements for termination for convenience?",
        answer: "Either Party may terminate the Agreement for convenience by providing the other Party with at least ninety (90) days prior written notice.",
        evidence: [
          "Either Party may terminate this Agreement and all related Statement of Works (SOWs) for convenience, at any time, by providing the other Party with at least ninety (90) days prior written notice of such intent."
        ],
        citations: ["Page 7, Section 11.2"],
        confidence: "High",
        conflict: null,
        missing: null
      },
      {
        keywords: ["uptime", "sla", "service level", "credit", "remedy", "outage"],
        question: "What happens if the platform monthly uptime falls below 99.9%? What are the Customer's remedies?",
        answer: "If the Monthly Uptime Percentage falls below 99.9%, the Customer is eligible for Service Credits (10% credit for uptime < 99.9%, 25% credit for uptime < 99.5%, and 50% credit for uptime < 99.0%). These Service Credits are designated as the Customer's sole and exclusive remedy, and Provider's sole financial liability, for any downtime or outages.",
        evidence: [
          "If the Monthly Uptime Percentage falls below 99.9%, Customer shall be eligible for Service Credits calculated as follows: (a) Uptime < 99.9% but >= 99.5%: Credit of 10%... (c) Uptime < 99.0%: Credit of 50%...",
          "THE SERVICE CREDITS OUTLINED IN THIS SECTION SHALL BE THE CUSTOMER'S SOLE AND EXCLUSIVE REMEDY, AND PROVIDER'S SOLE FINANCIAL LIABILITY, FOR ANY OUTAGES, LOSS OF DATA ACCESS, OR DOWNTIME EVENTS."
        ],
        citations: ["Page 4, Section 6.2"],
        confidence: "High",
        conflict: {
          sections: ["Section 6.2", "Section 9.2"],
          pages: [4, 6],
          summary: "There is a potential conflict between the SLA sole remedy clause and the general Liability Indemnity structure. While Section 6.2 limits all downtime damages strictly to Uptime Credits, Section 9.2 creates a $5,000,000 Super-Cap for Data Security Breaches. If an outage is caused by a massive data breach, it is unclear whether the exclusive Uptime Credits limit applies or if the Customer can claim up to $5M in damages."
        },
        missing: null
      },
      {
        keywords: ["limit", "liability", "cap", "breach", "super-cap", "super cap"],
        question: "What is the maximum liability cap for a standard breach and a data breach?",
        answer: "For a standard breach, liability is mutually capped at the total fees paid by Customer in the 12 months preceding the incident. However, in the event of a data security incident or GDPR/CCPA breach arising from the Provider's sole negligence, a Super-Cap of five million dollars ($5,000,000) applies.",
        evidence: [
          "EXCEPT FOR CLAIMS ARISING UNDER SECTION 10 (IP INDEMNIFICATION) OR A PARTY'S WILFUL MISCONDUCT, EACH PARTY'S TOTAL AGGREGATE LIABILITY UNDER THIS AGREEMENT SHALL BE STRICTLY LIMITED TO THE TOTAL FEES PAID BY CUSTOMER TO PROVIDER IN THE TWELVE (12) MONTHS PRECEDING THE INCIDENT.",
          "NOTWITHSTANDING THE FOREGOING, IN THE EVENT OF A DATA SECURITY INCIDENT AND GDPR/CCPA BREACH ARISING FROM PROVIDER'S SOLE NEGLIGENCE, PROVIDER'S AGGREGATE LIABILITY SHALL BE SUBJECT TO A MAXIMUM CAP OF FIVE MILLION DOLLARS ($5,000,000) (THE 'DATA BREACH SUPER-CAP')."
        ],
        citations: ["Page 6, Section 9.2"],
        confidence: "High",
        conflict: null,
        missing: null
      },
      {
        keywords: ["intellectual property", "ip", "infringement", "indemnity", "patent"],
        question: "Are there any exceptions where IP Infringement Indemnification is void?",
        answer: "Yes. Provider's intellectual property indemnification obligations are completely nullified and void if the infringement claims arise from: (1) Customer's modification of the SaaS Platform without written permission; (2) combination of the SaaS Platform with any third-party software, databases, or API integrations not explicitly authorized in writing by Provider; or (3) Customer's failure to install patches or updates issued by the Provider.",
        evidence: [
          "Provider's intellectual property indemnification obligations under Section 10.1 shall be completely nullified and void if the alleged patent or copyright infringement arises from: (a) Customer's modification... (b) combination of the SaaS Platform with any third-party software, databases, or API integrations not explicitly authorized in writing... (c) Customer's failure to install patches..."
        ],
        citations: ["Page 6, Section 10.3"],
        confidence: "High",
        conflict: null,
        missing: null
      },
      {
        keywords: ["breach", "security incident", "notification", "ciso", "days", "hours"],
        question: "How long does the provider have to report a data breach to the customer?",
        answer: "The Provider is contractually required to notify the Customer's CISO in writing within seventy-two (72) hours of confirming a security incident involving unauthorized access, disclosure, or acquisition of Customer Data.",
        evidence: [
          "In the event of a confirmed unauthorized access, disclosure, or acquisition of Customer Data ('Security Incident'), Provider shall notify Customer's Chief Information Security Officer (CISO) in writing within seventy-two (72) hours of confirming the breach."
        ],
        citations: ["Page 5, Section 8.4"],
        confidence: "High",
        conflict: null,
        missing: null
      },
      {
        keywords: ["pet", "dog", "cat", "office", "premises", "animal"],
        question: "What is the pet policy for the office premises?",
        answer: "The document does not contain sufficient information to answer this question.",
        evidence: [],
        citations: [],
        confidence: "Low",
        conflict: null,
        missing: {
          items: ["Pet policy for the offices", "Rules regarding bringing animals to the provider or customer work facilities"]
        }
      }
    ]
  },
  {
    id: "mutual_nda",
    title: "Mutual Non-Disclosure Agreement (NDA)",
    description: "Standard corporate transaction NDA guarding technical designs, proprietary IP, and financial projections, featuring a strict 5-year obligation survival duration and non-solicitation clauses.",
    metadata: {
      document_type: "Mutual Non-Disclosure Agreement (NDA)",
      jurisdiction: "State of California, USA",
      effective_date: "October 1, 2025",
      expiration_date: "October 1, 2027",
      governing_law: "California Law"
    },
    classification: {
      "document_type": "Mutual Non-Disclosure Agreement (NDA)",
      "jurisdiction": "State of California, USA",
      "effective_date": "October 1, 2025",
      "expiration_date": "October 1, 2027",
      "governing_law": "California Law"
    },
    summary: [
      {
        bullet: "Establishes a mutual non-disclosure framework starting October 1, 2025, between Cyberdyne Labs (Disclosing/Receiving) and Omni Consumer Products (Disclosing/Receiving) to evaluate a potential business combination referred to as 'Project Genesis'.",
        citation: "[Source: Page 1, Preamble & Section 1]"
      },
      {
        bullet: "Defines Confidential Information broadly to cover all scientific code, technical blueprints, neural net weights, marketing files, financial schedules, and corporate transaction drafts.",
        citation: "[Source: Page 1, Section 2.1]"
      },
      {
        bullet: "Imposes strict restrictions limiting access solely to employee personnel, agents, and outside legal counsel who have a verified 'need to know' and are bound by equivalent confidentiality pacts.",
        citation: "[Source: Page 2, Section 3.2]"
      },
      {
        bullet: "Establishes a 2-year active term for information sharing, but strictly mandates that confidentiality obligations survive for 5 years after the agreement's expiration date.",
        citation: "[Source: Page 3, Section 5.1]"
      },
      {
        bullet: "Demands the total return or certified destruction of all shared electronic files and physical records within 10 days of a written request by the disclosing party.",
        citation: "[Source: Page 2, Section 4.1]"
      },
      {
        bullet: "Includes a strict 1-year mutual non-solicitation clause preventing either party from directly hiring or recruiting the other party's staff engaged in the project evaluation.",
        citation: "[Source: Page 3, Section 6.2]"
      }
    ],
    risks: [
      {
        type: "Compliance Risk",
        description: "The definition of Confidential Information includes any unmarked oral disclosures, provided they are confirmed in writing within 15 days, requiring a highly organized tracking procedure to avoid accidental leakage.",
        severity: "Medium",
        citation: "Page 1, Section 2.3"
      },
      {
        type: "Termination Risk",
        description: "The 5-year survival period of confidentiality obligations after the agreement's termination means data retention systems must remain highly secured and quarantined for half a decade.",
        severity: "High",
        citation: "Page 3, Section 5.1"
      },
      {
        type: "Data Privacy Risk",
        description: "If court-ordered to disclose confidential records, the receiving party must provide the disclosing party with immediate notice to seek a protective order, which may clash with rapid judicial timelines.",
        severity: "Medium",
        citation: "Page 2, Section 3.4"
      },
      {
        type: "Indemnification / Litigation Exposure",
        description: "Breaching this agreement entitles the injured party to immediate injunctive relief and specific performance, bypassing the requirement of showing actual financial damages or posting a bond.",
        severity: "High",
        citation: "Page 3, Section 7.1"
      },
      {
        type: "SLA Violations / Compliance",
        description: "The mutual non-solicitation clause imposes a heavy penalty of paying 100% of the employee's first-year salary if they are recruited in violation of the 1-year freeze.",
        severity: "Medium",
        citation: "Page 3, Section 6.3"
      }
    ],
    dates: [
      {
        date: "October 1, 2025",
        event: "Effective Date of NDA",
        clause: "Section 1",
        citation: "Page 1, Section 1"
      },
      {
        date: "15 Days",
        event: "Oral disclosures must be summarized in writing to remain confidential",
        clause: "Section 2.3",
        citation: "Page 1, Section 2.3"
      },
      {
        date: "10 Days",
        event: "Deadline to return or destroy confidential records after written request",
        clause: "Section 4.1",
        citation: "Page 2, Section 4.1"
      },
      {
        date: "1 Year",
        event: "Mutual employee non-solicitation restriction duration from termination",
        clause: "Section 6.2",
        citation: "Page 3, Section 6.2"
      },
      {
        date: "October 1, 2027",
        event: "Expiration Date of Active Sharing Period",
        clause: "Section 5.1",
        citation: "Page 3, Section 5.1"
      },
      {
        date: "October 1, 2032",
        event: "End of Confidentiality Obligation (5-Year Survival Term)",
        clause: "Section 5.1",
        citation: "Page 3, Section 5.1"
      }
    ],
    stakeholders: [
      {
        name: "Cyberdyne Systems LLC",
        role: "Disclosing & Receiving Party",
        responsibilities: "Safeguard OCP's financial metrics and robotics patents, return all materials on request, refrain from soliciting OCP researchers, and restrict project files strictly to select personnel.",
        citation: "Page 1, Preamble; Page 2, Section 3.1"
      },
      {
        name: "Omni Consumer Products (OCP)",
        role: "Disclosing & Receiving Party",
        responsibilities: "Safeguard Cyberdyne's artificial intelligence weights and code libraries, return all materials on request, refrain from soliciting Cyberdyne computer scientists, and comply with California laws.",
        citation: "Page 1, Preamble; Page 2, Section 3.1"
      },
      {
        name: "Joint Steering Committee",
        role: "Evaluation Group",
        responsibilities: "Assess technical capabilities of Project Genesis, ensuring scientific records are distributed strictly on a need-to-know basis.",
        citation: "Page 2, Section 3.2"
      }
    ],
    chunks: [
      {
        id: 1,
        page: 1,
        section: "Preamble & Purpose",
        text: "This Mutual Non-Disclosure Agreement ('Agreement') is made and entered into as of October 1, 2025 ('Effective Date'), by and between Cyberdyne Labs, a California limited liability company with offices at 1000 Technology Drive, Sunnyvale, CA 94089 ('Cyberdyne'), and Omni Consumer Products, a Delaware corporation with offices at 1 Corporate Plaza, Detroit, MI 48201 ('OCP'). The parties are contemplating a potential strategic partnership, transaction, or joint evaluation involving artificial intelligence, robotics, and cybernetic limbs, currently designated as 'Project Genesis' ('Purpose')."
      },
      {
        id: 2,
        page: 1,
        section: "Section 2.1 - Definition of Confidential Information",
        text: "For purposes of this Agreement, 'Confidential Information' shall mean any and all technical, scientific, financial, or business information disclosed by one party ('Disclosing Party') to the other party ('Receiving Party') that is marked as 'Confidential' or 'Proprietary'. This includes, without limitation, source code, neural network model weights, system training protocols, hardware blueprints, customer transaction records, financial projections, and corporate pricing models."
      },
      {
        id: 3,
        page: 1,
        section: "Section 2.3 - Unmarked & Oral Disclosures",
        text: "If Confidential Information is disclosed orally, visually, or in another intangible format, it shall be treated as Confidential under this Agreement if: (a) it is identified as confidential at the time of initial disclosure; and (b) it is reduced to a written summary marked 'Confidential' and delivered to the Receiving Party within fifteen (15) calendar days of the initial oral disclosure."
      },
      {
        id: 4,
        page: 2,
        section: "Section 3.1 - Standard of Care & Permitted Use",
        text: "The Receiving Party agrees to: (a) use the Confidential Information of the Disclosing Party solely for the Purpose of evaluating and executing Project Genesis; (b) exercise at least the same degree of care to prevent unauthorized disclosure as it uses for its own confidential records of like importance, but in no event less than a reasonable standard of professional care."
      },
      {
        id: 5,
        page: 2,
        section: "Section 3.2 - Permitted Disclosees",
        text: "Receiving Party may disclose Confidential Information solely to its employees, directors, external legal counsel, and certified financial advisors who: (a) have a strict 'need to know' such information to support the Purpose; and (b) have signed written confidentiality pacts no less restrictive than the terms of this Agreement."
      },
      {
        id: 6,
        page: 2,
        section: "Section 3.4 - Compelled Disclosure",
        text: "If Receiving Party receives a subpoena, judicial order, or regulatory request to disclose the Disclosing Party's Confidential Information, the Receiving Party shall: (a) provide the Disclosing Party with immediate written notice so that Disclosing Party may seek a protective order; (b) cooperate fully in contesting the order; and (c) disclose only that portion of the information that is legally mandated."
      },
      {
        id: 7,
        page: 2,
        section: "Section 4.1 - Return or Destruction of Materials",
        text: "Within ten (10) days of receiving a written request from the Disclosing Party, the Receiving Party shall: (a) return all physical manuals, models, and source files containing Confidential Information; (b) permanently delete all digital copies, database records, and server backups; and (c) provide a senior officer's signed certificate confirming that all materials have been completely returned or destroyed."
      },
      {
        id: 8,
        page: 3,
        section: "Section 5.1 - Agreement Term & Survival Period",
        text: "This Agreement shall commence on the Effective Date and shall remain in effect for an active sharing period of two (2) years, expiring on October 1, 2027. NOTWITHSTANDING THE EXPIRATION OR TERMINATION OF THIS AGREEMENT, ALL CONFIDENTIALITY AND NON-USE OBLIGATIONS AND DUTIES OUTLINED HEREIN SHALL SURVIVE AND CONTINUE IN FULL FORCE AND EFFECT FOR A PERIOD OF FIVE (5) YEARS FOLLOWING THE DATE OF EXPIRATION."
      },
      {
        id: 9,
        page: 3,
        section: "Section 6.2 - Mutual Non-Solicitation",
        text: "For a period of one (1) year following the expiration or termination of this Agreement, neither party shall directly or indirectly solicit, recruit, or hire any engineer, computer scientist, or director of the other party who was actively involved in meetings, code reviews, or joint development work related to Project Genesis."
      },
      {
        id: 10,
        page: 3,
        section: "Section 6.3 - Non-Solicitation Penalty",
        text: "In the event that a party breaches the non-solicitation obligation under Section 6.2 and successfully hires an employee of the other party, the breaching party shall pay the non-breaching party, as liquidated damages, an amount equal to one hundred percent (100%) of the hired employee's base annual salary, payable within thirty (30) days of the employee's start date."
      },
      {
        id: 11,
        page: 3,
        section: "Section 7.1 - Injunctive Relief Remedies",
        text: "Each party acknowledges that any breach of this Agreement would cause immediate, irreparable damage to the Disclosing Party for which financial damages would be an inadequate remedy. Accordingly, in the event of a breach or threatened breach, the Disclosing Party shall be entitled to seek immediate injunctive relief, specific performance, and temporary restraining orders in any court of competent jurisdiction without the necessity of proving actual damages or posting a bond."
      },
      {
        id: 12,
        page: 4,
        section: "Section 9.1 - Governing Law & Arbitration",
        text: "This Agreement shall be governed by, and construed in accordance with, the laws of the State of California, without reference to its choice of law rules. Any dispute, claim, or controversy arising out of this Agreement shall be resolved through binding, confidential arbitration in San Francisco, California, administered by JAMS in accordance with its Simplified Arbitration Rules."
      }
    ],
    qaPairs: [
      {
        keywords: ["survive", "survival", "years", "duration", "how long", "expire"],
        question: "How long do the confidentiality obligations survive after the active sharing period expires?",
        answer: "The confidentiality and non-use obligations survive and continue in full force and effect for a period of five (5) years following the active sharing period's expiration (which occurs on October 1, 2027). Therefore, the protection obligations remain fully active until October 1, 2032.",
        evidence: [
          "NOTWITHSTANDING THE EXPIRATION OR TERMINATION OF THIS AGREEMENT, ALL CONFIDENTIALITY AND NON-USE OBLIGATIONS AND DUTIES OUTLINED HEREIN SHALL SURVIVE AND CONTINUE IN FULL FORCE AND EFFECT FOR A PERIOD OF FIVE (5) YEARS FOLLOWING THE DATE OF EXPIRATION."
        ],
        citations: ["Page 3, Section 5.1"],
        confidence: "High",
        conflict: null,
        missing: null
      },
      {
        keywords: ["return", "destroy", "materials", "backups", "days"],
        question: "What is the procedure and timeline for returning or destroying confidential files?",
        answer: "Within ten (10) days of a Disclosing Party's written request, the Receiving Party must return all physical files, permanently delete all digital copies/backups, and provide a senior officer's signed certificate verifying the complete return or destruction.",
        evidence: [
          "Within ten (10) days of receiving a written request from the Disclosing Party, the Receiving Party shall: (a) return all physical manuals, models, and source files... (b) permanently delete all digital copies... and (c) provide a senior officer's signed certificate..."
        ],
        citations: ["Page 2, Section 4.1"],
        confidence: "High",
        conflict: null,
        missing: null
      },
      {
        keywords: ["solicit", "solicitation", "hire", "recruit", "engineer", "penalty"],
        question: "Is there a non-solicitation clause, and what is the penalty for breaching it?",
        answer: "Yes, there is a mutual non-solicitation clause in effect for one (1) year following the expiration or termination of the agreement. The penalty for breaching this clause is liquidated damages equal to one hundred percent (100%) of the hired employee's base annual salary, payable within thirty (30) days of their employment start date.",
        evidence: [
          "For a period of one (1) year following the expiration or termination of this Agreement, neither party shall directly or indirectly solicit, recruit, or hire any engineer, computer scientist... involved in... Project Genesis.",
          "In the event that a party breaches the non-solicitation obligation... the breaching party shall pay the non-breaching party, as liquidated damages, an amount equal to one hundred percent (100%) of the hired employee's base annual salary..."
        ],
        citations: ["Page 3, Section 6.2", "Page 3, Section 6.3"],
        confidence: "High",
        conflict: null,
        missing: null
      },
      {
        keywords: ["patent", "royalties", "payment", "milestone", "money"],
        question: "What are the payment milestones and licensing royalty rates?",
        answer: "The document does not contain sufficient information to answer this question.",
        evidence: [],
        citations: [],
        confidence: "Low",
        conflict: null,
        missing: {
          items: ["Licensing royalty percentages", "Milestone payment schedules for IP deliverables"]
        }
      }
    ]
  },
  {
    id: "commercial_lease",
    title: "Commercial Lease Agreement",
    description: "Retail property lease for a brick-and-mortar storefront detailing baseline monthly rents, security deposits, strict late fees, restoration requirements, and a 6-month advance notice window for extension options.",
    metadata: {
      document_type: "Commercial Real Estate Lease",
      jurisdiction: "State of New York, USA",
      effective_date: "March 1, 2026",
      expiration_date: "February 28, 2031",
      governing_law: "New York Law"
    },
    classification: {
      "document_type": "Commercial Real Estate Lease",
      "jurisdiction": "State of New York, USA",
      "effective_date": "March 1, 2026",
      "expiration_date": "February 28, 2031",
      "governing_law": "New York Law"
    },
    summary: [
      {
        bullet: "Establishes a 5-year commercial tenancy starting March 1, 2026, between Metro Properties LLC (Landlord) and Brewed Awakening Corp. (Tenant) for the retail storefront at 120 Broadway, New York, NY.",
        citation: "[Source: Page 1, Preamble & Premises]"
      },
      {
        bullet: "Sets a monthly base rent of $8,500 due in advance on the 1st calendar day of each month, imposing a mandatory 10% late fee if payment is not received by the 5th day.",
        citation: "[Source: Page 2, Section 4.1 & 4.2]"
      },
      {
        bullet: "Requires a security deposit of $17,000 (equivalent to 2 months' base rent) to be held in a segregated escrow account and returned within 30 days of lease termination.",
        citation: "[Source: Page 2, Section 5.1]"
      },
      {
        bullet: "Restricts premises use strictly to the operation of a coffee shop and artisanal bakery, prohibiting any other retail or commercial enterprise without prior written consent.",
        citation: "[Source: Page 3, Section 7.1]"
      },
      {
        bullet: "Obligates the Tenant, at its sole cost, to restore the leased premises to their original layout and cosmetic condition upon lease expiration, excluding standard wear and tear.",
        citation: "[Source: Page 4, Section 12.3]"
      },
      {
        bullet: "Grants Tenant a single 3-year extension option, provided the Tenant serves written renewal notice at least 6 months prior to the expiration date (August 31, 2030).",
        citation: "[Source: Page 5, Section 15.1]"
      }
    ],
    risks: [
      {
        type: "Financial Risk",
        description: "A 10% penalty fee for payments delayed beyond the 5th day of the month represents an aggressive interest rate spike, potentially causing severe cash flow strain if electronic transfers lag.",
        severity: "Medium",
        citation: "Page 2, Section 4.2"
      },
      {
        type: "Compliance Risk",
        description: "Restricting the premises strictly to a coffee shop and bakery prevents the Tenant from pivoting their business model or sub-leasing to any alternative business without Landlord's absolute veto right.",
        severity: "High",
        citation: "Page 3, Section 7.1"
      },
      {
        type: "Termination Risk",
        description: "Landlord has the right to re-enter the property and seize possession within 5 days of a rent default notice, giving the Tenant a very brief window to cure banking issues.",
        severity: "Critical",
        citation: "Page 4, Section 11.2"
      },
      {
        type: "IP Ownership Risk / Restoration Exposure",
        description: "Tenant is contractually obligated to pay the entire expense to tear down custom fixtures, countertops, and bakery ventilation ducts upon lease termination, which could exceed $20,000 in demolition fees.",
        severity: "High",
        citation: "Page 4, Section 12.3"
      }
    ],
    dates: [
      {
        date: "March 1, 2026",
        event: "Commencement Date of Tenancy",
        clause: "Preamble",
        citation: "Page 1, Preamble"
      },
      {
        date: "Monthly (1st day)",
        event: "Rent payment due date",
        clause: "Section 4.1",
        citation: "Page 2, Section 4.1"
      },
      {
        date: "Monthly (5th day)",
        event: "Grace period end date; late fee of 10% applies on 6th",
        clause: "Section 4.2",
        citation: "Page 2, Section 4.2"
      },
      {
        date: "5 Days",
        event: "Cure period for rent payment default notice",
        clause: "Section 11.2",
        citation: "Page 4, Section 11.2"
      },
      {
        date: "August 31, 2030",
        event: "Deadline for written notice of lease renewal (6 months prior to expiry)",
        clause: "Section 15.1",
        citation: "Page 5, Section 15.1"
      },
      {
        date: "February 28, 2031",
        event: "Expiration Date of Five-Year Lease Term",
        clause: "Section 3.1",
        citation: "Page 1, Section 3.1"
      }
    ],
    stakeholders: [
      {
        name: "Metro Properties LLC",
        role: "Landlord (Property Owner)",
        responsibilities: "Maintain structural integrity of the roof, external walls, and plumbing risers, manage the commercial escrow account, and ensure quiet enjoyment of the premises.",
        citation: "Page 1, Preamble; Page 3, Section 9.1"
      },
      {
        name: "Brewed Awakening Corp.",
        role: "Tenant (Operator)",
        responsibilities: "Pay base monthly rent of $8,500, maintain local store insurance, repair internal fixtures, operate strictly as a bakery, and restore the retail layout upon move-out.",
        citation: "Page 1, Preamble; Page 2, Section 4.1; Page 4, Section 12.3"
      },
      {
        name: "Commercial Escrow Bank",
        role: "Escrow Custodian",
        responsibilities: "Secure the $17,000 security deposit, ensuring return in compliance with NY regulatory real estate escrow codes.",
        citation: "Page 2, Section 5.1"
      }
    ],
    chunks: [
      {
        id: 1,
        page: 1,
        section: "Preamble & Leased Premises",
        text: "This Commercial Lease Agreement ('Lease') is entered into as of March 1, 2026, by and between Metro Properties LLC, a New York limited liability company with offices at 500 Madison Avenue, New York, NY 10022 ('Landlord'), and Brewed Awakening Corp., a New York corporation with its corporate registered address at 82 Wall Street, Suite 50, New York, NY 10005 ('Tenant'). Landlord hereby leases to Tenant, and Tenant rents from Landlord, the ground floor retail storefront premises located at 120 Broadway, New York, NY 10271 ('Premises')."
      },
      {
        id: 2,
        page: 1,
        section: "Section 3.1 - Lease Term",
        text: "The term of this Lease shall be for a period of five (5) years ('Term'), commencing on March 1, 2026 ('Commencement Date') and expiring on February 28, 2031 ('Expiration Date'), unless sooner terminated or extended under the provisions of this Lease."
      },
      {
        id: 3,
        page: 2,
        section: "Section 4.1 - Monthly Base Rent",
        text: "Tenant shall pay to Landlord a fixed monthly base rent of eight thousand five hundred dollars ($8,500) ('Base Rent') in advance, on or before the first (1st) day of each calendar month during the Term. Rent payments shall be made via ACH electronic transfer to Landlord's designated bank account without deduction, offset, or prior notice."
      },
      {
        id: 4,
        page: 2,
        section: "Section 4.2 - Late Fees & Interest Penalties",
        text: "Tenant acknowledges that late payment of Rent will cause Landlord to incur administrative costs not contemplated by this Lease. If any installment of Base Rent is not received by Landlord on or before the fifth (5th) calendar day of the month, a late charge equal to ten percent (10%) of the overdue amount ($850) shall immediately become due and payable as liquidated damages."
      },
      {
        id: 5,
        page: 2,
        section: "Section 5.1 - Escrow Security Deposit",
        text: "Upon execution of this Lease, Tenant shall deposit with Landlord the sum of seventeen thousand dollars ($17,000) as security for the faithful performance of all lease terms ('Security Deposit'). The Security Deposit shall be held in a segregated, interest-bearing escrow account at Chase Bank, New York. Within thirty (30) days of the expiration or termination of the Lease, Landlord shall return the Security Deposit to Tenant, less any deductions for unpaid rent or damage repair."
      },
      {
        id: 6,
        page: 3,
        section: "Section 7.1 - Permitted Use Restrictions",
        text: "The Premises shall be used solely for the retail operation of a high-end specialty coffee shop, tea house, and artisanal bakery, and for no other purpose whatsoever without the prior express written consent of Landlord. Tenant shall secure and maintain all local NYC health department permits and food establishment licenses required for operation."
      },
      {
        id: 7,
        page: 3,
        section: "Section 9.1 - Repairs & Maintenance Allocation",
        text: "Landlord shall, at its sole cost, maintain, repair, and keep in good structural condition the foundation, roof, outer load-bearing walls, and main building plumbing and electrical risers. Tenant shall, at its sole cost, repair and maintain the storefront glass, HVAC heating/cooling units, lighting systems, interior walls, and plumbing pipes serving the Premises exclusively."
      },
      {
        id: 8,
        page: 4,
        section: "Section 11.2 - Tenant Rent Default & Re-entry Rights",
        text: "If Tenant fails to pay Base Rent when due and such failure continues for five (5) days after written notice from Landlord, Tenant shall be in immediate default under this Lease. Upon such uncured default, Landlord shall have the right to terminate the Lease, re-enter the Premises, dispossess Tenant, and seize possession of the Premises using lawful summary proceedings."
      },
      {
        id: 9,
        page: 4,
        section: "Section 12.3 - Restoring Premises at Expiration",
        text: "Prior to vacating the Premises upon lease expiration or termination, Tenant shall, at its sole cost and expense, remove all trade fixtures, counters, signs, coffee-roasting equipment, and ventilation systems installed by Tenant. Tenant is contractually obligated to restore the Premises to their original open layout and cosmetic condition (white-box finish), reasonable wear and tear excepted. Any modifications left behind shall become Landlord's property or demolished at Tenant's expense."
      },
      {
        id: 10,
        page: 5,
        section: "Section 15.1 - Lease Extension Option",
        text: "Provided Tenant is not in default under any terms of this Lease, Tenant shall have one (1) consecutive option to extend this Lease for an additional term of three (3) years ('Extension Term'). To exercise this option, Tenant must provide Landlord with a formal, written notice of intent to renew no later than six (6) months prior to the Expiration Date, specifically on or before August 31, 2030."
      }
    ],
    qaPairs: [
      {
        keywords: ["rent", "cost", "how much", "due date", "pay"],
        question: "How much is the monthly rent, and when is it due?",
        answer: "The monthly base rent is eight thousand five hundred dollars ($8,500) and is due in advance, on or before the first (1st) day of each calendar month during the Lease term.",
        evidence: [
          "Tenant shall pay to Landlord a fixed monthly base rent of eight thousand five hundred dollars ($8,500) ('Base Rent') in advance, on or before the first (1st) day of each calendar month during the Term."
        ],
        citations: ["Page 2, Section 4.1"],
        confidence: "High",
        conflict: null,
        missing: null
      },
      {
        keywords: ["late", "grace period", "penalty", "fee"],
        question: "What is the grace period for rent, and what is the late fee penalty?",
        answer: "The grace period for rent payment runs until the fifth (5th) calendar day of the month. If the rent is not received by the Landlord on or before the 5th day, a late charge equal to ten percent (10%) of the overdue rent, which amounts to eight hundred and fifty dollars ($850), is immediately due and payable.",
        evidence: [
          "If any installment of Base Rent is not received by Landlord on or before the fifth (5th) calendar day of the month, a late charge equal to ten percent (10%) of the overdue amount ($850) shall immediately become due..."
        ],
        citations: ["Page 2, Section 4.2"],
        confidence: "High",
        conflict: null,
        missing: null
      },
      {
        keywords: ["vacate", "move out", "leave", "restore", "fixtures", "alterations"],
        question: "What are the tenant's obligations regarding restoring the property when they vacate?",
        answer: "Prior to vacating, the Tenant is obligated, at their own cost, to remove all trade fixtures, counters, signs, equipment, and ventilation systems. They must restore the Premises to their original open layout and cosmetic white-box condition, with the exception of reasonable wear and tear. Any modifications left behind may be demolished at the Tenant's expense or claimed by the Landlord.",
        evidence: [
          "Prior to vacating the Premises upon lease expiration or termination, Tenant shall, at its sole cost and expense, remove all trade fixtures, counters, signs, coffee-roasting equipment, and ventilation systems... Tenant is contractually obligated to restore the Premises to their original open layout and cosmetic condition (white-box finish)..."
        ],
        citations: ["Page 4, Section 12.3"],
        confidence: "High",
        conflict: null,
        missing: null
      },
      {
        keywords: ["sublease", "sub-lease", "assign", "roommate", "partner"],
        question: "What is the subleasing policy of the retail space?",
        answer: "The document does not contain sufficient information to answer this question.",
        evidence: [],
        citations: [],
        confidence: "Low",
        conflict: null,
        missing: {
          items: ["Detailed subleasing approval protocols", "Assignment regulations or Landlord transfer procedures"]
        }
      }
    ]
  }
];

// If using ES modules in Node environments, export it. Otherwise, keep it global.
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PRELOADED_DOCUMENTS };
}
