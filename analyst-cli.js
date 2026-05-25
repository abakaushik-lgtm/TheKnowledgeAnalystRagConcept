#!/usr/bin/env node

/**
 * AI Legal Knowledge Analyst — Command-Line RAG Interface
 * 
 * Usage:
 *   node analyst-cli.js [document_id_or_path] [options]
 * 
 * Options:
 *   --analyze                   Outputs Step 1-5 analysis (Classification, Summary, Risks, Dates, Stakeholders) as JSON
 *   --query "your question"      Runs RAG question answering mode and returns strict citation results
 *   --interactive               Launches a fully interactive terminal prompt (default if no options given)
 *   --help                      Displays instructions
 */

const fs = require('fs');
const path = require('path');
const readline = require('readline');
const { PRELOADED_DOCUMENTS } = require('./documents.js');
const { RAGEngine } = require('./rag-engine.js');

const engine = new RAGEngine();

// Helper to print colored console logs
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  blue: "\x1b[34m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  magenta: "\x1b[35m"
};

function logBanner() {
  console.log(`
${colors.blue}${colors.bright}======================================================================
     🤖 AI LEGAL KNOWLEDGE ANALYST — TERMINAL RAG WORKFLOW ⚖️
======================================================================${colors.reset}`);
}

function logHelp() {
  console.log(`
${colors.bright}USAGES:${colors.reset}
  node analyst-cli.js [doc_id_or_path] [options]

${colors.bright}PRELOADED DOCUMENTS:${colors.reset}
  saas_msa            SaaS Master Services Agreement (CloudScale vs FinTech)
  mutual_nda          Mutual Non-Disclosure Agreement (Cyberdyne vs OCP)
  commercial_lease    Commercial Lease Agreement (Metro Properties vs Brewed Awakening)

${colors.bright}OPTIONS:${colors.reset}
  --analyze                  Run and export Step 1-5 pipeline analysis in structured JSON
  --query "question text"    Run citation-heavy Q&A mode on the specified document
  --interactive              Start an interactive chat session (Default behavior)
  --help                     Show this help sheet

${colors.bright}EXAMPLES:${colors.reset}
  node analyst-cli.js saas_msa --analyze
  node analyst-cli.js saas_msa --query "What is the liability limit for data breaches?"
  node analyst-cli.js ./my_contract.txt --query "When does this contract terminate?"
  node analyst-cli.js mutual_nda
`);
}

// Main execution controller
function main() {
  const args = process.argv.slice(2);

  if (args.includes('--help') || args.includes('-h')) {
    logBanner();
    logHelp();
    process.exit(0);
  }

  let docArg = args[0];
  let doc = null;

  // Determine active document
  if (docArg && !docArg.startsWith('--')) {
    // Check if it's a preloaded contract ID
    doc = PRELOADED_DOCUMENTS.find(d => d.id === docArg);

    if (!doc) {
      // Treat as a local file path
      const filePath = path.resolve(docArg);
      if (fs.existsSync(filePath)) {
        try {
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const title = path.basename(filePath, path.extname(filePath));
          
          console.log(`${colors.green}✔ Successfully loaded and chunked local document: ${colors.bright}${title}${colors.reset}`);
          doc = engine.analyzeCustomDocument(title, fileContent);
        } catch (e) {
          console.error(`${colors.red}❌ Error reading file at ${filePath}: ${e.message}${colors.reset}`);
          process.exit(1);
        }
      } else {
        console.error(`${colors.red}❌ Target not found. Specify saas_msa, mutual_nda, commercial_lease, or a valid path to a text file.${colors.reset}`);
        logHelp();
        process.exit(1);
      }
    }
  } else {
    // Default to SaaS MSA if no document specified
    doc = PRELOADED_DOCUMENTS[0];
    console.log(`${colors.dim}No document specified. Defaulting to preloaded: ${colors.bright}saas_msa (SaaS Master Services Agreement)${colors.reset}`);
  }

  engine.setActiveDocument(doc);

  const analyzeIndex = args.indexOf('--analyze');
  const queryIndex = args.indexOf('--query');

  if (analyzeIndex !== -1) {
    // Step 1-5 Pipeline Output in JSON format
    runJSONAnalysis(doc);
  } else if (queryIndex !== -1 && args[queryIndex + 1]) {
    // One-off RAG QA Query Mode
    const query = args[queryIndex + 1];
    runConsoleQuery(query);
  } else {
    // Start interactive session
    startInteractiveSession(doc);
  }
}

// Print Step 1-5 Analysis as structured JSON
function runJSONAnalysis(doc) {
  const analysisOutput = {
    document_title: doc.title,
    step_1_classification: doc.classification,
    step_2_executive_summary: doc.summary,
    step_3_risk_extraction_dashboard: doc.risks,
    step_4_important_dates_extraction: doc.dates,
    step_5_stakeholder_extraction: doc.stakeholders
  };

  console.log(JSON.stringify(analysisOutput, null, 2));
}

// Print formatted Q&A response strictly adhering to requested formats
function runConsoleQuery(query) {
  const res = engine.answerQuestion(query);

  console.log(`\n${colors.cyan}${colors.bright}🔍 RAG QUERY: "${query}"${colors.reset}\n`);

  console.log(`${colors.bright}Answer:${colors.reset}`);
  if (res.confidence === 'Low' && (!res.evidence || res.evidence.length === 0)) {
    console.log(`${colors.yellow}“The document does not contain sufficient information to answer this question.”${colors.reset}\n`);
  } else {
    console.log(`${res.answer}\n`);
  }

  if (res.evidence && res.evidence.length > 0) {
    console.log(`${colors.bright}Supporting Evidence:${colors.reset}`);
    res.evidence.forEach(ev => {
      console.log(`  ${colors.green}“${ev}”${colors.reset}`);
    });
    console.log();
  }

  if (res.citations && res.citations.length > 0) {
    console.log(`${colors.bright}Citations:${colors.reset}`);
    res.citations.forEach(cit => {
      console.log(`  [Source: ${cit}]`);
    });
    console.log();
  }

  // Display Confidence Score
  const confColor = res.confidence === 'High' ? colors.green : (res.confidence === 'Medium' ? colors.yellow : colors.red);
  console.log(`${colors.bright}Confidence Score: ${confColor}${res.confidence}${colors.reset}\n`);

  // Detect and flag potential conflicts
  if (res.conflict) {
    console.log(`${colors.red}${colors.bright}⚠ Potential Conflict Detected${colors.reset}`);
    console.log(`${colors.dim}Conflicting Clauses: ${res.conflict.sections.join(' vs ')} on Pages: ${res.conflict.pages.join(', ')}${colors.reset}`);
    console.log(`${colors.bright}Contradiction Summary:${colors.reset} ${res.conflict.summary}\n`);
  }

  // Handle missing information warnings
  if (res.missing) {
    console.log(`${colors.yellow}${colors.bright}⚠ Missing Information${colors.reset}`);
    console.log(`The document does not explicitly specify:`);
    res.missing.items.forEach(item => {
      console.log(`  - ${item}`);
    });
    console.log();
  }

  console.log(`${colors.dim}----------------------------------------------------------------------${colors.reset}`);
}

// Start an interactive terminal prompt loop
function startInteractiveSession(doc) {
  logBanner();
  console.log(`\nLoaded Document: ${colors.cyan}${colors.bright}${doc.title}${colors.reset}`);
  console.log(`Governing Law:   ${colors.yellow}${doc.classification.governing_law}${colors.reset}`);
  console.log(`Effective Date:  ${colors.yellow}${doc.classification.effective_date}${colors.reset}`);
  console.log(`Active Chunks:   ${colors.yellow}${doc.chunks.length} passages${colors.reset}`);
  console.log(`\nType ${colors.red}${colors.bright}'exit'${colors.reset} or ${colors.red}${colors.bright}'quit'${colors.reset} to leave the session.`);
  console.log(`Ask any questions below. RAG strict controls are fully enabled!`);
  console.log(`${colors.dim}----------------------------------------------------------------------${colors.reset}`);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const promptUser = () => {
    rl.question(`\n${colors.bright}Analyst Prompt > ${colors.reset}`, (input) => {
      const cleanInput = input.trim();

      if (cleanInput.toLowerCase() === 'exit' || cleanInput.toLowerCase() === 'quit') {
        console.log(`\n${colors.green}Thank you for collaborating. Closing analysis session.${colors.reset}\n`);
        rl.close();
        process.exit(0);
      }

      if (cleanInput.length === 0) {
        promptUser();
        return;
      }

      try {
        runConsoleQuery(cleanInput);
      } catch (err) {
        console.error(`${colors.red}❌ Error executing RAG search: ${err.message}${colors.reset}`);
      }

      promptUser();
    });
  };

  promptUser();
}

// Run script
main();
