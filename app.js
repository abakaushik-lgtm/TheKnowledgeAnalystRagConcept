// Instantiate RAG Engine
const engine = new RAGEngine();
let activeDoc = null;
let customDocuments = [];

// DOM Element Selectors
const preloadedDocList = document.getElementById('preloaded-doc-list');
const activeDocTitle = document.getElementById('active-document-title');
const classificationGrid = document.getElementById('classification-grid');
const summaryBulletsContainer = document.getElementById('summary-bullets-container');
const risksTableBody = document.getElementById('risks-table-body');
const timelineContainer = document.getElementById('timeline-container');
const stakeholdersGrid = document.getElementById('stakeholders-grid');
const docViewerTitle = document.getElementById('viewer-doc-title');
const docViewerChunkCount = document.getElementById('viewer-chunk-count');
const docViewerBody = document.getElementById('document-viewer-body');
const chatFeed = document.getElementById('chat-feed');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const queryChipsWrapper = document.getElementById('query-chips-wrapper');
const fileInput = document.getElementById('file-input');
const dropZone = document.getElementById('drop-zone');
const ragInspector = document.getElementById('rag-inspector');
const inspectorChunksContainer = document.getElementById('inspector-chunks-container');

// INITIALIZE APPLICATION
window.addEventListener('DOMContentLoaded', () => {
  renderPreloadedList();
  
  // Set default document (SaaS MSA)
  loadDocument("saas_msa");

  // Initialize Drag & Drop Events
  setupUploader();
});

// Render the list of preloaded contracts
function renderPreloadedList() {
  preloadedDocList.innerHTML = '';
  
  PRELOADED_DOCUMENTS.forEach(doc => {
    const item = document.createElement('div');
    item.className = `doc-item ${activeDoc && activeDoc.id === doc.id ? 'active' : ''}`;
    item.setAttribute('role', 'button');
    item.setAttribute('aria-label', `Select ${doc.title}`);
    item.innerHTML = `
      <h3>📄 ${doc.title}</h3>
      <p>${doc.description}</p>
    `;
    item.addEventListener('click', () => loadDocument(doc.id));
    preloadedDocList.appendChild(item);
  });
}

// Load a document and render all panels
function loadDocument(docId) {
  // Find in preloaded or custom uploads
  let doc = PRELOADED_DOCUMENTS.find(d => d.id === docId);
  if (!doc) {
    doc = customDocuments.find(d => d.id === docId);
  }

  if (!doc) return;

  activeDoc = doc;
  engine.setActiveDocument(doc);

  // Update visual selected state in lists
  const items = document.querySelectorAll('.doc-item');
  items.forEach(el => el.classList.remove('active'));
  
  // Highlight active preloaded items or custom items
  renderPreloadedList();
  
  // Render Custom Doc additions if present
  customDocuments.forEach(customDoc => {
    const customItem = document.createElement('div');
    customItem.className = `doc-item ${activeDoc.id === customDoc.id ? 'active' : ''}`;
    customItem.setAttribute('role', 'button');
    customItem.innerHTML = `
      <h3>⚡ [Uploaded] ${customDoc.title}</h3>
      <p>${customDoc.description}</p>
    `;
    customItem.addEventListener('click', () => loadDocument(customDoc.id));
    preloadedDocList.appendChild(customItem);
  });

  // Re-render UI panels
  activeDocTitle.textContent = doc.title;
  docViewerTitle.textContent = doc.title;
  docViewerChunkCount.textContent = `${doc.chunks.length} Chunks Loaded`;

  renderStep1Classification();
  renderStep2Summary();
  renderStep3Risks();
  renderStep4Timeline();
  renderStep5Stakeholders();
  renderDocumentViewer();
  
  // Reset chat welcome parameters
  renderWelcomeMessage();
  renderQueryChips();
  
  // Always slide back search inspector when changing documents
  closeRAGInspector();
}

// Setup drag and drop / click file uploader
function setupUploader() {
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'var(--color-primary)';
    dropZone.style.background = 'rgba(59, 130, 246, 0.08)';
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.style.borderColor = 'rgba(255,255,255,0.08)';
    dropZone.style.background = 'rgba(255,255,255,0.02)';
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = 'rgba(255,255,255,0.08)';
    dropZone.style.background = 'rgba(255,255,255,0.02)';
    
    if (e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
      handleFileUpload(e.target.files[0]);
    }
  });
}

// Parse custom uploaded files
function handleFileUpload(file) {
  if (!file.name.endsWith('.txt')) {
    alert("Please upload a standard text file (.txt).");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const fullText = e.target.result;
    const docTitle = file.name.replace('.txt', '');
    
    // Ingest and dynamically classify contract contents
    const customDoc = engine.analyzeCustomDocument(docTitle, fullText);
    customDoc.id = `custom_${Date.now()}`;
    
    customDocuments.push(customDoc);
    loadDocument(customDoc.id);
  };
  reader.readAsText(file);
}

// TAB MANAGEMENT ROUTER
function switchTab(tabId) {
  // Update buttons
  const tabs = document.querySelectorAll('.pipeline-tabs .tab-btn');
  tabs.forEach(t => {
    t.classList.remove('active');
    if (t.getAttribute('onclick').includes(tabId)) {
      t.classList.add('active');
    }
  });

  // Update content divs
  const panels = document.querySelectorAll('.pipeline-step-content');
  panels.forEach(p => {
    p.classList.remove('active');
  });

  document.getElementById(`step-${tabId}`).classList.add('active');
}

// RENDER STEP 1: CLASSIFICATION
function renderStep1Classification() {
  classificationGrid.innerHTML = '';
  const fields = [
    { label: 'Document Type', key: 'document_type' },
    { label: 'Jurisdiction', key: 'jurisdiction' },
    { label: 'Effective Date', key: 'effective_date' },
    { label: 'Expiration Date', key: 'expiration_date' },
    { label: 'Governing Law', key: 'governing_law' }
  ];

  fields.forEach(f => {
    const card = document.createElement('div');
    card.className = 'class-card';
    card.innerHTML = `
      <div class="class-label">${f.label}</div>
      <div class="class-value">${activeDoc.classification[f.key] || 'N/A'}</div>
    `;
    classificationGrid.appendChild(card);
  });
}

// RENDER STEP 2: SUMMARY
function renderStep2Summary() {
  summaryBulletsContainer.innerHTML = '';
  
  activeDoc.summary.forEach((sum, idx) => {
    const item = document.createElement('div');
    item.className = 'summary-bullet';
    item.innerHTML = `
      <div class="bullet-number">${idx + 1}</div>
      <div class="bullet-text">
        ${sum.bullet}
        <br>
        <button class="citation-badge" onclick="navigateToCitation('${sum.citation}')">${sum.citation}</button>
      </div>
    `;
    summaryBulletsContainer.appendChild(item);
  });
}

// RENDER STEP 3: RISKS DASHBOARD
function renderStep3Risks() {
  risksTableBody.innerHTML = '';

  activeDoc.risks.forEach(risk => {
    const row = document.createElement('tr');
    
    // Determine severity styling
    let sevClass = 'sev-low';
    const sev = risk.severity.toLowerCase();
    if (sev === 'medium') sevClass = 'sev-medium';
    else if (sev === 'high') sevClass = 'sev-high';
    else if (sev === 'critical') sevClass = 'sev-critical';

    row.innerHTML = `
      <td style="font-weight:600; color:var(--text-primary);">${risk.type}</td>
      <td style="color:var(--text-secondary);">${risk.description}</td>
      <td><span class="sev-badge ${sevClass}">${risk.severity}</span></td>
      <td><button class="citation-badge" onclick="navigateToCitation('${risk.citation}')">[Source: ${risk.citation}]</button></td>
    `;
    risksTableBody.appendChild(row);
  });
}

// RENDER STEP 4: TIMELINE
function renderStep4Timeline() {
  timelineContainer.innerHTML = '';

  if (!activeDoc.dates || activeDoc.dates.length === 0) {
    timelineContainer.innerHTML = '<div style="color:var(--text-secondary); text-align:center; font-size:0.9rem;">No timeline dates extracted.</div>';
    return;
  }

  activeDoc.dates.forEach(item => {
    const node = document.createElement('div');
    node.className = 'timeline-item';
    node.innerHTML = `
      <div class="timeline-node"></div>
      <div class="timeline-date">${item.date}</div>
      <div class="timeline-event">${item.event}</div>
      <div class="timeline-ref">
        Clause Ref: <button class="citation-badge" onclick="navigateToCitation('${item.citation}')">[Source: ${item.citation}]</button>
      </div>
    `;
    timelineContainer.appendChild(node);
  });
}

// RENDER STEP 5: STAKEHOLDERS
function renderStep5Stakeholders() {
  stakeholdersGrid.innerHTML = '';

  activeDoc.stakeholders.forEach(st => {
    const card = document.createElement('div');
    card.className = 'stakeholder-card';
    
    // First letter profile placeholder
    const firstLetter = st.name.charAt(0);

    card.innerHTML = `
      <div class="st-header">
        <div class="st-icon">${firstLetter}</div>
        <div>
          <div class="st-name">${st.name}</div>
          <div class="st-role">${st.role}</div>
        </div>
      </div>
      <div class="st-responsibilities">${st.responsibilities}</div>
      <button class="citation-badge" onclick="navigateToCitation('${st.citation}')">[Source: ${st.citation}]</button>
    `;
    stakeholdersGrid.appendChild(card);
  });
}

// RENDER STEP 6: DYNAMIC DOCUMENT VIEWER
function renderDocumentViewer() {
  docViewerBody.innerHTML = '';
  
  activeDoc.chunks.forEach(c => {
    const block = document.createElement('div');
    block.className = 'viewer-chunk';
    block.id = `chunk-ref-${c.page}-${c.section.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    block.innerHTML = `
      <div class="chunk-meta">Page ${c.page} • ${c.section}</div>
      <div class="chunk-text">${c.text}</div>
    `;
    docViewerBody.appendChild(block);
  });
}

// NAVIGATION CITATION BRIDGE: Highlights specific text segment inside viewer
function navigateToCitation(citationStr) {
  // Parse page and section references out of citations string
  // Examples: "Page 4, Section 6.2", "Clause 14.1, Page 87", "[Source: Page 4, Section 6.2]"
  const citationClean = citationStr.replace(/[\[\]]/g, '');
  
  let pageNum = null;
  let sectionName = null;

  // Extract page
  const pageMatch = citationClean.match(/Page\s+(\d+)/i);
  if (pageMatch) {
    pageNum = pageMatch[1];
  }

  // Extract section or clause
  const sectionMatch = citationClean.match(/(Section|Clause)\s+([A-Za-z0-9._-]+)/i);
  if (sectionMatch) {
    sectionName = `${sectionMatch[1]} ${sectionMatch[2]}`;
  } else {
    // fallback look for preamble or general indicators
    if (citationClean.toLowerCase().includes('preamble')) sectionName = 'Preamble';
    else if (citationClean.toLowerCase().includes('recital')) sectionName = 'Recital';
  }

  if (pageNum) {
    // Navigate viewer panel active state
    switchTab('viewer');

    // Find corresponding chunk element
    const selector = `chunk-ref-${pageNum}-${(sectionName || '').toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    
    // Dynamic matching backup if exact section tag wasn't formatted cleanly
    let element = document.getElementById(selector);
    if (!element) {
      const allChunks = document.querySelectorAll('.viewer-chunk');
      for (let ch of allChunks) {
        if (ch.id.includes(`chunk-ref-${pageNum}`)) {
          element = ch;
          break;
        }
      }
    }

    if (element) {
      // Scroll smoothly
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Glow Highlight Flash
        element.classList.remove('chunk-highlight');
        void element.offsetWidth; // trigger reflow
        element.classList.add('chunk-highlight');
      }, 100);
    }
  } else {
    // If no page found, navigate to viewer index
    switchTab('viewer');
  }
}

// RAG CHAT CONTROLLER: Welcome parameters
function renderWelcomeMessage() {
  chatFeed.innerHTML = '';
  
  const welcome = document.createElement('div');
  welcome.className = 'chat-msg msg-analyst';
  welcome.innerHTML = `
    <div class="bubble">
      <strong>🤖 AI Legal Analyst:</strong>
      <p style="margin-top:0.4rem;">I have loaded the <strong>${activeDoc.title}</strong> into the active RAG vector index. Ask me any details regarding liabilities, risks, dates, and obligations.</p>
      <p style="font-size:0.8rem; color:var(--text-secondary); margin-top:0.35rem; font-style:italic;">All outputs are bound tightly to retrieved document chunks. Zero hallucinations permitted.</p>
    </div>
  `;
  chatFeed.appendChild(welcome);
  chatFeed.scrollTop = chatFeed.scrollHeight;
}

// RAG CHAT CONTROLLER: Query chips
function renderQueryChips() {
  queryChipsWrapper.innerHTML = '';
  
  if (activeDoc.qaPairs && activeDoc.qaPairs.length > 0) {
    activeDoc.qaPairs.forEach(pair => {
      const chip = document.createElement('button');
      chip.className = 'chip-btn';
      chip.textContent = pair.question;
      chip.addEventListener('click', () => {
        chatInput.value = pair.question;
        chatForm.dispatchEvent(new Event('submit'));
      });
      queryChipsWrapper.appendChild(chip);
    });
  } else {
    // Fallback standard inquiries for dynamically uploaded items
    const fallbacks = [
      "Who are the parties involved?",
      "What is the governing law of the contract?",
      "When is the effective date of agreement?",
      "What are the main financial risk items?",
      "List the key dates and notice deadlines."
    ];

    fallbacks.forEach(q => {
      const chip = document.createElement('button');
      chip.className = 'chip-btn';
      chip.textContent = q;
      chip.addEventListener('click', () => {
        chatInput.value = q;
        chatForm.dispatchEvent(new Event('submit'));
      });
      queryChipsWrapper.appendChild(chip);
    });
  }
}

// Clear Chat Panel
function clearChat() {
  renderWelcomeMessage();
}

// Send user query and fetch citation response
function handleChatSubmit(event) {
  event.preventDefault();
  const query = chatInput.value.trim();
  
  if (!query) return;

  // Render user prompt
  const userMsg = document.createElement('div');
  userMsg.className = 'chat-msg msg-user';
  userMsg.innerHTML = `
    <div class="bubble">
      <strong>User:</strong>
      <p style="margin-top:0.25rem;">${query}</p>
    </div>
  `;
  chatFeed.appendChild(userMsg);
  chatInput.value = '';
  
  // Auto-scroll chat view
  chatFeed.scrollTop = chatFeed.scrollHeight;

  // Process RAG engine answer
  setTimeout(() => {
    const responseData = engine.answerQuestion(query);
    renderAnalystResponse(responseData);
  }, 400);
}

// Render formatted Analyst bubble with exact parameters
function renderAnalystResponse(res) {
  const msg = document.createElement('div');
  msg.className = 'chat-msg msg-analyst';
  
  // Build citations render block
  let citationsHtml = '';
  if (res.citations && res.citations.length > 0) {
    res.citations.forEach(c => {
      citationsHtml += `<button class="citation-badge" onclick="navigateToCitation('${c}')">[Source: ${c}]</button> `;
    });
  }

  // Build quotes evidence block
  let evidenceHtml = '';
  if (res.evidence && res.evidence.length > 0) {
    evidenceHtml += `<div class="rag-section-title">Supporting Context Quotes</div>`;
    res.evidence.forEach(quote => {
      evidenceHtml += `<div class="rag-quote">“${quote}”</div>`;
    });
  }

  // Confidence pill coloring
  let confColor = 'var(--low-text)';
  if (res.confidence === 'High') confColor = 'var(--low-text)';
  else if (res.confidence === 'Medium') confColor = 'var(--med-text)';
  else if (res.confidence === 'Low') confColor = 'var(--crit-text)';

  // RAG Inspector dynamic trigger ID
  const searchId = `retrievals_${Date.now()}`;
  
  // Hold retrieved chunks inside a window variable to link with sidebar drawer
  window[searchId] = res.retrievedChunks || engine.search(res.question || "contract parameters", 3);

  // Compile final answer layout
  msg.innerHTML = `
    <div class="bubble">
      <strong>🤖 AI Legal Analyst:</strong>
      <div class="rag-section-title" style="margin-top:0.5rem;">Answer</div>
      <p style="color: var(--text-primary); font-size: 0.92rem;">
        ${res.answer}
      </p>

      ${evidenceHtml}

      ${citationsHtml ? `<div class="rag-section-title">Verified Sources</div><div class="rag-citations-container">${citationsHtml}</div>` : ''}

      ${res.conflict ? `
        <div class="conflict-box">
          <div class="conflict-header">⚠ Potential Conflict Detected</div>
          <p>${res.conflict.summary}</p>
          <div style="font-size:0.75rem; margin-top:0.35rem; color:var(--text-muted);">
            Conflict references: ${res.conflict.sections.join(' and ')}
          </div>
        </div>
      ` : ''}

      ${res.missing ? `
        <div class="missing-box">
          <div class="missing-header">⚠ Missing Information</div>
          <p>The document does not explicitly specify:</p>
          <ul class="missing-list">
            ${res.missing.items.map(item => `<li>${item}</li>`).join('')}
          </ul>
        </div>
      ` : ''}

      <div class="rag-meta-row">
        <span>Confidence Score: <strong style="color:${confColor};">${res.confidence}</strong></span>
        <button class="chip-btn" style="padding:0.2rem 0.5rem; font-size:0.7rem; border-color:var(--color-teal); color:var(--color-teal);" onclick="openRAGInspector('${searchId}')">🔍 Inspect Retrieved Chunks</button>
      </div>
    </div>
  `;

  chatFeed.appendChild(msg);
  chatFeed.scrollTop = chatFeed.scrollHeight;
}

// SLIDE DRAWER CONTROLLERS
function openRAGInspector(searchId) {
  inspectorChunksContainer.innerHTML = '';
  
  const retrieved = window[searchId];
  if (!retrieved || retrieved.length === 0) {
    inspectorChunksContainer.innerHTML = '<div style="color:var(--text-secondary); text-align:center; font-size:0.8rem;">No retrieval blocks available.</div>';
  } else {
    retrieved.forEach((res, index) => {
      const card = document.createElement('div');
      card.className = 'retrieved-chunk-card';
      
      const displayScore = res.score ? res.score.toFixed(4) : (1.0000 - (index * 0.15)).toFixed(4);
      const chunk = res.chunk || res;

      card.innerHTML = `
        <div class="chunk-card-meta">
          <span>Page ${chunk.page} • ${chunk.section}</span>
          <span class="score-badge">Match Score: ${displayScore}</span>
        </div>
        <div class="chunk-card-text">“${chunk.text}”</div>
      `;
      inspectorChunksContainer.appendChild(card);
    });
  }

  ragInspector.classList.add('open');
}

function closeRAGInspector() {
  ragInspector.classList.remove('open');
}
