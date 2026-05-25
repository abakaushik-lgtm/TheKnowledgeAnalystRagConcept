# ⚖️ AI Legal Knowledge Analyst — Retrieval-Augmented Generation (RAG) System

An elite, highly factual, double-pronged legal research and analysis system running entirely client-side. The application features both a visually stunning **Glassmorphic Web Interface (SPA)** and a high-performance **Node.js Command Line Interface (CLI)**. 

Both interfaces share a custom client-side **RAG (Retrieval-Augmented Generation) Search Core** designed to analyze long, complex legal documents (e.g., SaaS MSAs, NDAs, Leases, or uploaded contracts) with zero hallucination tolerance, strict citation controls, and automated compliance auditing.

---

## 🏗️ System Architecture & Workflow

The system takes raw document inputs, automatically tokenizes and indexes them using a TF-IDF keyword overlap vectorizer, and exposes them to two interactive clients. All queries are audited by strict RAG guardrails:

```text
                               +-----------------------------+
                               |     Input Document Text     |
                               | (SaaS MSA, NDA, Lease, TXT) |
                               +--------------+--------------+
                                              |
                                              v
                               +-----------------------------+
                               |  Parser & Paragraph Chunker |
                               | (Keeps Page & Section Meta) |
                               +--------------+--------------+
                                              |
                                              v
                               +-----------------------------+
                               |  TF-IDF Keyword Indexer     |
                               | (Local Client Inverted Index|
                               +--------------+--------------+
                                              |
                     +------------------------+------------------------+
                     |                                                 |
                     v                                                 v
       +----------------------------+                    +----------------------------+
       |   Interactive SPA Web UI   |                    |   Standalone Node.js CLI   |
       | (Glassmorphism card grid)  |                    | (Offline terminal analyst) |
       +-------------+--------------+                    +-------------+--------------+
                     |                                                 |
                     v                                                 v
+--------------------v-------------------------------------------------v--------------------+
|                                    STRICT RAG GUARDRAILS                                  |
|                                                                                           |
|  - RULE 1: NEVER HALLUCNATE (No facts found? => "Sufficient information not present")     |
|  - RULE 2: ALWAYS CITE SOURCES (Every answer attaches [Page X, Section Y])                |
|  - RULE 3: CONTEXT ONLY (External legal knowledge is completely disabled)                 |
+---------------------------------------------+---------------------------------------------+
                                              |
                                              v
                               +-----------------------------+
                               |    Audit & Output Engine    |
                               |  - Direct Answer            |
                               |  - Exact Quoted Evidence    |
                               |  - Page/Clause Citations    |
                               |  - Confidence Level Badge   |
                               |  - Conflict Alert Monitor   |
                               |  - Missing Info Log Warning |
                               +-----------------------------+
```

---

## 🛠️ Technology Stack

- **Core Search Core**: Vanilla JavaScript (`rag-engine.js`)
  - Clean keyword tokenization & stop-word filtering
  - Local TF-IDF search indexing & BM25-inspired ranking algorithms
  - RegEx heuristic metadata classifiers (Document Type, Jurisdiction, Dates, Parties)
  - Strict validator for RAG Rules (No Hallucination, Exact Quotes, Citations)
- **Web SPA (Front-end)**: HTML5, CSS3, JavaScript (`index.html`, `style.css`, `app.js`)
  - Translucent glassmorphism containers (`backdrop-filter: blur()`)
  - Interactive tabs, chronological deadlines timeline paths, and stakeholder cards
  - Visual Citations bridge: Clicking citation links automatically redirects the view to the "Document Viewer" tab, scrolls, and triggers a glowing flash highlight (`.chunk-highlight`) on the target passage
  - RAG Context Drawer: Live vector debugger displaying retrieved chunks and scores
- **Terminal CLI**: Node.js core modules (`analyst-cli.js`)
  - Built using standard `fs`, `path`, and `readline` libraries (no npm install required!)
  - Fully interactive terminal chat loops with ANSI colored console feeds
  - Automated structured pipeline analysis exports as formatted JSON files

---

## 🚀 Installation & Getting Started

Since the entire application is built natively without heavy external libraries or database requirements, it runs **completely offline** with zero prerequisites besides Node.js!

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your computer.

### Quick Launch Options:

#### Option A: Open the Interactive Web UI
Simply double-click the **`index.html`** file in your file explorer to open the portal in any modern web browser.
*Or run a local server:*
```bash
# Using python:
python -m http.server 8000

# Using npm live-server:
npx live-server
```
Navigate to `http://localhost:8000` to interact with the responsive, animated layout.

#### Option B: Launch the Terminal CLI Tool
Open a command prompt in the workspace directory and execute the tool:

1. **Launch Interactive Chat Shell**:
   ```bash
   node analyst-cli.js saas_msa
   ```
   *(You can type custom questions or `exit` to close).*

2. **Run a Single RAG Search Query**:
   ```bash
   node analyst-cli.js saas_msa --query "What is the liability cap for data breaches?"
   ```

3. **Ingest and Query a Custom Local File**:
   ```bash
   node analyst-cli.js ./custom_sample.txt --query "What is the liability cap?"
   ```

4. **Export Automated Pipeline Steps 1-5 as JSON**:
   ```bash
   node analyst-cli.js saas_msa --analyze
   ```

---

## ⚖️ RAG Core Tasks & Workflow Steps

The RAG analyst processes every loaded contract through a 6-step pipeline:

### 1. Document Classification
Extracts critical boilerplate classifications (Document Type, Jurisdiction, Effective/Expiration Dates, Governing Law) into a structured card grid.

### 2. Executive Summary
Generates a highly factual 5-10 bullet summary (Obligations, Finance, Termination, Liability) with exact click-to-highlight citation badges.

### 3. Risk Extraction Dashboard
Identifies potential legal vulnerabilities categorized by risk type with color-coded severity levels:
- 🟢 **Low**
- 🟡 **Medium**
- 🟠 **High**
- 🔴 **Critical** (Features animated pulse glowing warnings)

### 4. Important Dates Timeline
Arranges key renewal deadlines, notice periods, payment milestones, and expiration dates chronologically along a high-fidelity visual timeline path.

### 5. Stakeholder Directory
Identifies companies, vendors, clients, and regulators involved, listing their specific roles, responsibilities, and citation anchors.

### 6. Question Answering Chat (Strict Mode)
An interactive chat feed supporting recommended prompt chips, retrieved block inspect drawers, and strict answer formats.

---

## 📝 Example Queries & Output Formats

### 1. In-Scope RAG Query Example
**Input Query:**
```bash
node analyst-cli.js saas_msa --query "What is the liability limit for data breaches?"
```

**Formatted Output:**
```text
🔍 RAG QUERY: "What is the liability limit for data breaches?"

Answer:
For a standard breach, liability is mutually capped at the total fees paid by Customer in the 12 months preceding the incident. However, in the event of a data security incident or GDPR/CCPA breach arising from the Provider's sole negligence, a Super-Cap of five million dollars ($5,000,000) applies.

Supporting Evidence:
  “EXCEPT FOR CLAIMS ARISING UNDER SECTION 10 (IP INDEMNIFICATION) OR A PARTY'S WILFUL MISCONDUCT, EACH PARTY'S TOTAL AGGREGATE LIABILITY UNDER THIS AGREEMENT SHALL BE STRICTLY LIMITED TO THE TOTAL FEES PAID BY CUSTOMER TO PROVIDER IN THE TWELVE (12) MONTHS PRECEDING THE INCIDENT.”
  “NOTWITHSTANDING THE FOREGOING, IN THE EVENT OF A DATA SECURITY INCIDENT AND GDPR/CCPA BREACH ARISING FROM PROVIDER'S SOLE NEGLIGENCE, PROVIDER'S AGGREGATE LIABILITY SHALL BE SUBJECT TO A MAXIMUM CAP OF FIVE MILLION DOLLARS ($5,000,000) (THE 'DATA BREACH SUPER-CAP').”

Citations:
  [Source: Page 6, Section 9.2]

Confidence Score: High
```

---

### 2. Out-of-Scope RAG Query Example (No Hallucination)
**Input Query:**
```bash
node analyst-cli.js saas_msa --query "What is the pet policy for the office premises?"
```

**Formatted Output:**
```text
🔍 RAG QUERY: "What is the pet policy for the office premises?"

Answer:
“The document does not contain sufficient information to answer this question.”

Confidence Score: Low

⚠ Missing Information
The document does not explicitly specify:
  - Pet policy for the offices
  - Rules regarding bringing animals to the provider or customer work facilities
```

---

### 3. Potential Conflict Detection Example
When a query checks system downtime remedies, the conflict auditor flags overlap clauses:
```text
⚠ Potential Conflict Detected
Conflicting Clauses: Section 6.2 vs Section 9.2 on Pages: 4, 6
Contradiction Summary: The agreement defines Service Credits as the 'sole and exclusive remedy' for SLA failures (Section 6.2). However, Section 9.2 outlines a $5,000,000 Super-Cap for Data Breaches, creating ambiguity on whether outages caused by a data breach are restricted to uptime credits or covered under the larger liability cap.
```
