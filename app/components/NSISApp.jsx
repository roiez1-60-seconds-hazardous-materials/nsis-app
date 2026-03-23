"use client";
import { useState, useEffect, useRef } from "react";

// ─────────────────────── i18n Content ───────────────────────
const content = {
  he: {
    dir: "rtl",
    nav: { home: "ראשי", tech: "הטכנולוגיה", sim: "סימולציה", pros: "יתרונות ומגבלות", bib: "מקורות", contact: "יצירת קשר" },
    hero: {
      badge: "Milestone B אושר — פברואר 2025",
      title: "NSIS",
      subtitle: "מערכת זיהוי רצף גנומי בלתי ממוקד",
      fullName: "Non-Targeted Sequencing Identification System",
      desc: "מערכת זיהוי ביולוגי מהפכנית המבוססת על טכנולוגיית רצף ננונקבים (Nanopore Sequencing), שפותחה על ידי משרד הביטחון האמריקני. מאפשרת זיהוי של גורמים ביולוגיים ואיומים חדשים — גם ללא מידע מוקדם על הסוכן.",
      cta: "חקור את הטכנולוגיה",
      scroll: "גלול למטה"
    },
    tech: {
      sectionTitle: "מנגנון הזיהוי המולקולרי",
      sectionSub: "הבנת המנגנון הפיזיקלי-כימי מבוססת על מחקר מעמיק של הטכנולוגיה",
      nanopore: {
        title: "הננונקב הביולוגי",
        name: "אלפא-המוליזין (α-Hemolysin)",
        desc: "חלבון טבעי היוצר נקבובית דרך ממברנה דו-שכבתית. מולקולת ה-DNA עוברת דרך הנקב תוך שהמערכת מודדת שינויים בזרם החשמלי — כל נוקלאוטיד יוצר חתימת זרם ייחודית.",
        specs: [
          { label: "קוטר הנקב", value: "1.4", unit: "ננומטר" },
          { label: "אורך הנקב", value: "10", unit: "ננומטר" },
          { label: "אזור הזיהוי", value: "5", unit: "ננומטר" }
        ]
      },
      process: {
        title: "תהליך הריצוף",
        steps: [
          { icon: "🧪", title: "הכנת הדגימה", desc: "הדגימה הביולוגית מעובדת וה-DNA/RNA מופק ומוכן לריצוף" },
          { icon: "🔬", title: "כניסה לננונקב", desc: "מולקולת ה-DNA מונעת דרך הנקב על ידי מנוע מולקולרי (Motor Protein)" },
          { icon: "⚡", title: "מדידת זרם", desc: "כל בסיס (A, T, G, C) חוסם את הנקב באופן שונה ויוצר שינוי ייחודי בזרם" },
          { icon: "🧬", title: "פענוח הרצף", desc: "אלגוריתמים של למידת מכונה מתרגמים את אותות הזרם לרצף גנומי מזוהה" }
        ]
      },
      minion: {
        title: "MinION — מכשיר הריצוף הנייד",
        desc: "מכשיר ריצוף גנומי נייד מתוצרת Oxford Nanopore Technologies, בגודל כף יד, המאפשר ריצוף בשטח.",
        specs: [
          { label: "משקל", value: "~100 גרם" },
          { label: "חיבור", value: "USB-C" },
          { label: "תאי זרימה", value: "512 ננונקבים" },
          { label: "תפוקה", value: "עד 50 Gb" },
          { label: "אורך קריאה", value: "ללא הגבלה" },
          { label: "זמן ראשון לתוצאה", value: "דקות" }
        ]
      }
    },
    sim: {
      sectionTitle: "סימולציית תרחיש — זיהוי איום ביולוגי בשטח",
      sectionSub: "תרחיש תרגולי: אירוע חשד לחומר ביולוגי לא מזוהה",
      steps: [
        { phase: "שלב 1 — התראה", time: "T+0 דקות", title: "קבלת דיווח על אירוע", desc: "צוות כב\"ה מקבל דיווח על אבקה חשודה שנמצאה בחבילה בבניין ציבורי. הצוות מגיע לזירה עם ציוד CBRN מלא.", status: "alert" },
        { phase: "שלב 2 — דגימה", time: "T+15 דקות", title: "איסוף וקליטת דגימה", desc: "נלקחת דגימה מהחומר החשוד. הדגימה מוכנסת לערכת ריצוף מהירה ומוטענת למכשיר MinION שנמצא בניידת CBRN.", status: "sampling" },
        { phase: "שלב 3 — ריצוף", time: "T+20 דקות", title: "ריצוף בזמן אמת", desc: "מכשיר MinION מתחיל לרצף את ה-DNA. הנתונים נשלחים בזמן אמת למערכת הביואינפורמטיקה EDGE לניתוח.", status: "sequencing" },
        { phase: "שלב 4 — זיהוי", time: "T+35 דקות", title: "קבלת תוצאות זיהוי", desc: "המערכת מזהה את הסוכן הביולוגי — אפילו אם מדובר בזן חדש או מהונדס שלא קיים בשום מאגר ידוע. ההתראה מועברת לגורמי פיקוד.", status: "identified" },
        { phase: "שלב 5 — תגובה", time: "T+40 דקות", title: "הפעלת פרוטוקול תגובה", desc: "בהתבסס על הזיהוי, מופעל פרוטוקול הטיפול המתאים. ה-DNA המלא של הסוכן זמין לניתוח פורנזי מעמיק.", status: "response" }
      ],
      startBtn: "הפעל סימולציה",
      resetBtn: "אפס",
      running: "סימולציה פעילה..."
    },
    pros: {
      sectionTitle: "יתרונות מול מגבלות תפעוליות",
      advantages: {
        title: "יתרונות",
        items: [
          { icon: "🔍", title: "זיהוי ללא ידע מוקדם", desc: "יכולת מהפכנית לזהות איומים ביולוגיים חדשים ובלתי מוכרים ללא צורך במידע קודם על הסוכן" },
          { icon: "🎒", title: "ניידות שטח", desc: "חומרת MinION מאפשרת ניידות גבוהה, פריסה מהירה באירועי CBRN בשטח" },
          { icon: "⏱️", title: "זמן תגובה מהיר", desc: "תוצאות ריצוף ראשוניות תוך דקות, ניתוח מלא תוך פחות משעה" },
          { icon: "🧬", title: "קריאות ארוכות", desc: "ריצוף ללא הגבלת אורך קריאה — יתרון קריטי לזיהוי מלא של גנומים" },
          { icon: "🏅", title: "אישור Milestone B", desc: "המערכת עברה בהצלחה שלב פיתוח קריטי של משרד הביטחון האמריקני, פברואר 2025" }
        ]
      },
      limitations: {
        title: "מגבלות",
        items: [
          { icon: "🔒", title: "סיווג ביטחוני", desc: "פרטי המערכת המלאים מוגבלים עקב סיווג ביטחוני — מגביל את שיתוף הידע" },
          { icon: "📊", title: "מבוסס מחקר אקדמי", desc: "הטכנולוגיה נשענת על מעל 20 מקורות מאומתים ופרסומים של Oxford Nanopore" },
          { icon: "💰", title: "דינמיות טכנולוגית", desc: "הנתונים הטכניים והמחירים משתנים בהתאם לגרסאות החומרה והתוכנה החדשות" },
          { icon: "🧪", title: "מורכבות הכנה", desc: "הכנת דגימה לריצוף דורשת הכשרה מקצועית והבנה בסיסית במיקרוביולוגיה" }
        ]
      }
    },
    bib: {
      sectionTitle: "ביבליוגרפיה ומקורות מידע",
      sectionSub: "המחקר מבוסס על 23 מקורות מאומתים",
    },
    contact: {
      sectionTitle: "יצירת קשר",
      name: "רועי צוקרמן",
      role: "מומחה לחומ\"ס וטב\"ק",
      email: "roiez1@gmail.com",
      whatsapp: "הצטרפו לקבוצת 60 שניות של חומ\"ס",
      note: "מסמך זה מיועד למטרות מחקר ומידע בלבד. © 2026"
    },
    langSwitch: "English"
  },
  en: {
    dir: "ltr",
    nav: { home: "Home", tech: "Technology", sim: "Simulation", pros: "Pros & Cons", bib: "Sources", contact: "Contact" },
    hero: {
      badge: "Milestone B Approved — February 2025",
      title: "NSIS",
      subtitle: "Non-Targeted Sequencing Identification System",
      fullName: "מערכת זיהוי רצף גנומי בלתי ממוקד",
      desc: "A revolutionary biological identification system based on Nanopore Sequencing technology, developed by the U.S. Department of Defense. Enables identification of novel biological agents and emerging threats — even without prior knowledge of the pathogen.",
      cta: "Explore the Technology",
      scroll: "Scroll down"
    },
    tech: {
      sectionTitle: "Molecular Detection Mechanism",
      sectionSub: "Understanding the physicochemical mechanism based on in-depth research",
      nanopore: {
        title: "The Biological Nanopore",
        name: "Alpha-Hemolysin (α-Hemolysin)",
        desc: "A natural protein that forms a pore through a lipid bilayer membrane. The DNA molecule threads through the pore while the system measures changes in electrical current — each nucleotide creates a unique current signature.",
        specs: [
          { label: "Pore Diameter", value: "1.4", unit: "nm" },
          { label: "Pore Length", value: "10", unit: "nm" },
          { label: "Sensing Zone", value: "5", unit: "nm" }
        ]
      },
      process: {
        title: "Sequencing Process",
        steps: [
          { icon: "🧪", title: "Sample Preparation", desc: "The biological sample is processed and DNA/RNA is extracted and prepared for sequencing" },
          { icon: "🔬", title: "Nanopore Entry", desc: "The DNA molecule is driven through the pore by a molecular motor protein" },
          { icon: "⚡", title: "Current Measurement", desc: "Each base (A, T, G, C) blocks the pore differently, creating a unique current change" },
          { icon: "🧬", title: "Sequence Decoding", desc: "Machine learning algorithms translate current signals into an identified genomic sequence" }
        ]
      },
      minion: {
        title: "MinION — Portable Sequencer",
        desc: "A handheld genomic sequencing device by Oxford Nanopore Technologies, enabling field-based sequencing operations.",
        specs: [
          { label: "Weight", value: "~100 g" },
          { label: "Connection", value: "USB-C" },
          { label: "Flow Cells", value: "512 nanopores" },
          { label: "Output", value: "Up to 50 Gb" },
          { label: "Read Length", value: "Unlimited" },
          { label: "Time to First Result", value: "Minutes" }
        ]
      }
    },
    sim: {
      sectionTitle: "Scenario Simulation — Field Biological Threat ID",
      sectionSub: "Training scenario: Suspected unidentified biological agent event",
      steps: [
        { phase: "Phase 1 — Alert", time: "T+0 min", title: "Incident Report Received", desc: "Fire & Rescue CBRN team receives a report of suspicious powder found in a package at a public building. Team deploys with full CBRN equipment.", status: "alert" },
        { phase: "Phase 2 — Sampling", time: "T+15 min", title: "Sample Collection", desc: "A sample is collected from the suspected substance, prepared with a rapid sequencing kit, and loaded into the MinION device in the CBRN response vehicle.", status: "sampling" },
        { phase: "Phase 3 — Sequencing", time: "T+20 min", title: "Real-Time Sequencing", desc: "The MinION begins sequencing the DNA. Data is streamed in real-time to the EDGE bioinformatics analysis platform.", status: "sequencing" },
        { phase: "Phase 4 — Identification", time: "T+35 min", title: "Threat Identification", desc: "The system identifies the biological agent — even if it's a novel or engineered strain not in any known database. Alert is forwarded to command.", status: "identified" },
        { phase: "Phase 5 — Response", time: "T+40 min", title: "Response Protocol Activation", desc: "Based on the identification, the appropriate treatment protocol is activated. Full pathogen DNA is available for deep forensic analysis.", status: "response" }
      ],
      startBtn: "Run Simulation",
      resetBtn: "Reset",
      running: "Simulation active..."
    },
    pros: {
      sectionTitle: "Advantages vs. Operational Limitations",
      advantages: {
        title: "Advantages",
        items: [
          { icon: "🔍", title: "No Prior Knowledge Needed", desc: "Revolutionary ability to identify novel and unknown biological threats without any prior information about the agent" },
          { icon: "🎒", title: "Field Mobility", desc: "MinION hardware enables high mobility and rapid deployment in CBRN field incidents" },
          { icon: "⏱️", title: "Rapid Response Time", desc: "Initial sequencing results within minutes, full analysis in under an hour" },
          { icon: "🧬", title: "Long Reads", desc: "Unlimited read length sequencing — critical advantage for complete genome identification" },
          { icon: "🏅", title: "Milestone B Approval", desc: "Successfully passed critical U.S. DoD development milestone, February 2025" }
        ]
      },
      limitations: {
        title: "Limitations",
        items: [
          { icon: "🔒", title: "Security Classification", desc: "Full system details are restricted due to security classification — limits knowledge sharing" },
          { icon: "📊", title: "Academic Research Based", desc: "Technology relies on 20+ verified sources and Oxford Nanopore publications" },
          { icon: "💰", title: "Technology Dynamics", desc: "Technical data and pricing change with new hardware and software releases" },
          { icon: "🧪", title: "Preparation Complexity", desc: "Sample preparation for sequencing requires professional training and basic microbiology expertise" }
        ]
      }
    },
    bib: {
      sectionTitle: "Bibliography & References",
      sectionSub: "Research based on 23 verified sources",
    },
    contact: {
      sectionTitle: "Contact",
      name: "Roie Zukerman",
      role: "HazMat & CBRN Expert",
      email: "roiez1@gmail.com",
      whatsapp: "Join the '60 Seconds of HazMat' Group",
      note: "This document is for research and informational purposes only. © 2026"
    },
    langSwitch: "עברית"
  }
};

// ─────────────── Bibliography data with full titles and URLs ───────────────
const bibCategories = {
  he: [
    {
      title: "מקורות טכניים ראשוניים — Oxford Nanopore Technologies",
      refs: [
        { num: 1, text: "Oxford Nanopore Technologies. (2025). MinION Mk1C Technical Specification.", url: "https://nanoporetech.com/document/requirements/minion-mk1c-spec" },
        { num: 2, text: "Oxford Nanopore Technologies. (2024). MinION Mk1D Technical Specification.", url: "https://nanoporetech.com/document/requirements/minion-mk1d-spec" },
        { num: 3, text: "Oxford Nanopore Technologies. (2025). How Oxford Nanopore Sequencing Works.", url: "https://nanoporetech.com/blog/how-oxford-nanopore-sequencing-works" },
        { num: 4, text: "Oxford Nanopore Technologies. (2025). MinION and Flow Cells Hardware Documentation.", url: "https://nanoporetech.com/document/hardware" },
        { num: 5, text: "Oxford Nanopore Technologies. (2025). MinION Mk1C IT Requirements.", url: "https://nanoporetech.com/document/requirements/minion-Mk1C-it-reqs" },
        { num: 6, text: "Oxford Nanopore Technologies. (2025). Platform Technology Overview.", url: "https://nanoporetech.com/platform/technology" },
        { num: 7, text: "Oxford Nanopore Technologies. (2025). Product Specifications.", url: "https://nanoporetech.com/products/specifications" }
      ]
    },
    {
      title: "מאמרים אקדמיים ומחקר עמיתים",
      refs: [
        { num: 8, text: "Jain, M., Olsen, H. E., Paten, B., & Akeson, M. (2016). The Oxford Nanopore MinION: Delivery of Nanopore Sequencing to the Genomics Community. Genome Biology, 17, 239.", url: "https://doi.org/10.1186/s13059-016-1103-0" },
        { num: 9, text: "Deamer, D., Akeson, M., & Branton, D. (2016). Three Decades of Nanopore Sequencing. Nature Biotechnology, 34(5), 518-524.", url: "https://doi.org/10.1038/nbt.3423" },
        { num: 10, text: "Kasianowicz, J. J., Brandin, E., Branton, D., & Deamer, D. W. (1996). Characterization of Individual Polynucleotide Molecules Using a Membrane Channel. PNAS, 93(24), 13770-13773.", url: "https://doi.org/10.1073/pnas.93.24.13770" },
        { num: 11, text: "Au, K. F., Underwood, J. G., Lee, L., & Wong, W. H. (2012). Improving PacBio Long Read Accuracy by Short Read Alignment. PLoS One, 7(10), e46679.", url: "https://doi.org/10.1371/journal.pone.0046679" },
        { num: 12, text: "Wang, Y., Zhao, Y., Bollas, A., Wang, Y., & Au, K. F. (2021). Nanopore Sequencing Technology, Bioinformatics and Applications. Nature Biotechnology, 39(11), 1348-1365.", url: "https://doi.org/10.1038/s41587-021-01108-x" }
      ]
    },
    {
      title: "מקורות ביואינפורמטיקה ורצף גנומי",
      refs: [
        { num: 13, text: "Branton, D. et al. (2023). An Introduction to Nanopore Sequencing: Past, Present, and Future Considerations. PMC.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9966803/" },
        { num: 14, text: "ScienceDirect Topics. (2025). Nanopore Sequencing — An Overview.", url: "https://www.sciencedirect.com/topics/neuroscience/nanopore-sequencing" },
        { num: 15, text: "Hu, T. et al. (2023). Nanopore Sequencing Technology and Its Applications. PMC.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10333861/" },
        { num: 16, text: "Feng, Y. et al. (2021). Nanopore Technology and Its Applications in Gene Sequencing. PMC.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8301755/" },
        { num: 17, text: "ACS Nano. (2024). Advancing DNA and RNA Modification Detection via Nanopore Sequencing.", url: "https://pubs.acs.org/doi/10.1021/acsnano.5c11784" },
        { num: 18, text: "What is Biotechnology. (2023). Nanopore Sequencing Makes It Possible to Decode the Sequence of DNA and RNA.", url: "https://www.whatisbiotechnology.org/index.php/science/summary/nanopore/nanopore-sequencing-makes-it-possible-to-decode-the" }
      ]
    },
    {
      title: "מקורות חינוכיים ומדריכים טכניים",
      refs: [
        { num: 19, text: "Otago Bioinformatics Spring School. (2023). Nanopore-Based Sequencing: Introduction.", url: "https://otagobioinformaticsspringschool.github.io/nanopore/01-introduction/index.html" },
        { num: 20, text: "Nanopore Sequencing Hardware Guide. (2024). Oxford Nanopore Sequencing Hardware.", url: "https://nanopore4edu.org/equipment_and_lab/sequencing_hardware/" }
      ]
    },
    {
      title: "מקורות צבא וביטחון אמריקני",
      refs: [
        { num: 21, text: "U.S. Department of Defense. (2025). JPEO-CBRND Program Updates and Milestone B Approvals. (מידע מוגבל — נגיש באמצעות בקשות FOIA)", url: null },
        { num: 22, text: "Johns Hopkins Applied Physics Laboratory. (2024). CBRN Defense Research and Development. (מידע ציבורי מוגבל)", url: null },
        { num: 23, text: "DTRA — Defense Threat Reduction Agency. (2024). EDGE Bioinformatics Platform Development. (מידע ציבורי מוגבל)", url: null }
      ]
    }
  ],
  en: [
    {
      title: "Primary Technical Sources — Oxford Nanopore Technologies",
      refs: [
        { num: 1, text: "Oxford Nanopore Technologies. (2025). MinION Mk1C Technical Specification.", url: "https://nanoporetech.com/document/requirements/minion-mk1c-spec" },
        { num: 2, text: "Oxford Nanopore Technologies. (2024). MinION Mk1D Technical Specification.", url: "https://nanoporetech.com/document/requirements/minion-mk1d-spec" },
        { num: 3, text: "Oxford Nanopore Technologies. (2025). How Oxford Nanopore Sequencing Works.", url: "https://nanoporetech.com/blog/how-oxford-nanopore-sequencing-works" },
        { num: 4, text: "Oxford Nanopore Technologies. (2025). MinION and Flow Cells Hardware Documentation.", url: "https://nanoporetech.com/document/hardware" },
        { num: 5, text: "Oxford Nanopore Technologies. (2025). MinION Mk1C IT Requirements.", url: "https://nanoporetech.com/document/requirements/minion-Mk1C-it-reqs" },
        { num: 6, text: "Oxford Nanopore Technologies. (2025). Platform Technology Overview.", url: "https://nanoporetech.com/platform/technology" },
        { num: 7, text: "Oxford Nanopore Technologies. (2025). Product Specifications.", url: "https://nanoporetech.com/products/specifications" }
      ]
    },
    {
      title: "Academic Publications & Peer-Reviewed Research",
      refs: [
        { num: 8, text: "Jain, M., Olsen, H. E., Paten, B., & Akeson, M. (2016). The Oxford Nanopore MinION: Delivery of Nanopore Sequencing to the Genomics Community. Genome Biology, 17, 239.", url: "https://doi.org/10.1186/s13059-016-1103-0" },
        { num: 9, text: "Deamer, D., Akeson, M., & Branton, D. (2016). Three Decades of Nanopore Sequencing. Nature Biotechnology, 34(5), 518-524.", url: "https://doi.org/10.1038/nbt.3423" },
        { num: 10, text: "Kasianowicz, J. J., Brandin, E., Branton, D., & Deamer, D. W. (1996). Characterization of Individual Polynucleotide Molecules Using a Membrane Channel. PNAS, 93(24), 13770-13773.", url: "https://doi.org/10.1073/pnas.93.24.13770" },
        { num: 11, text: "Au, K. F., Underwood, J. G., Lee, L., & Wong, W. H. (2012). Improving PacBio Long Read Accuracy by Short Read Alignment. PLoS One, 7(10), e46679.", url: "https://doi.org/10.1371/journal.pone.0046679" },
        { num: 12, text: "Wang, Y., Zhao, Y., Bollas, A., Wang, Y., & Au, K. F. (2021). Nanopore Sequencing Technology, Bioinformatics and Applications. Nature Biotechnology, 39(11), 1348-1365.", url: "https://doi.org/10.1038/s41587-021-01108-x" }
      ]
    },
    {
      title: "Bioinformatics & Genomic Sequencing",
      refs: [
        { num: 13, text: "Branton, D. et al. (2023). An Introduction to Nanopore Sequencing: Past, Present, and Future Considerations. PMC.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC9966803/" },
        { num: 14, text: "ScienceDirect Topics. (2025). Nanopore Sequencing — An Overview.", url: "https://www.sciencedirect.com/topics/neuroscience/nanopore-sequencing" },
        { num: 15, text: "Hu, T. et al. (2023). Nanopore Sequencing Technology and Its Applications. PMC.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10333861/" },
        { num: 16, text: "Feng, Y. et al. (2021). Nanopore Technology and Its Applications in Gene Sequencing. PMC.", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8301755/" },
        { num: 17, text: "ACS Nano. (2024). Advancing DNA and RNA Modification Detection via Nanopore Sequencing.", url: "https://pubs.acs.org/doi/10.1021/acsnano.5c11784" },
        { num: 18, text: "What is Biotechnology. (2023). Nanopore Sequencing Makes It Possible to Decode the Sequence of DNA and RNA.", url: "https://www.whatisbiotechnology.org/index.php/science/summary/nanopore/nanopore-sequencing-makes-it-possible-to-decode-the" }
      ]
    },
    {
      title: "Educational & Technical Guides",
      refs: [
        { num: 19, text: "Otago Bioinformatics Spring School. (2023). Nanopore-Based Sequencing: Introduction.", url: "https://otagobioinformaticsspringschool.github.io/nanopore/01-introduction/index.html" },
        { num: 20, text: "Nanopore Sequencing Hardware Guide. (2024). Oxford Nanopore Sequencing Hardware.", url: "https://nanopore4edu.org/equipment_and_lab/sequencing_hardware/" }
      ]
    },
    {
      title: "U.S. Military & Defense Sources",
      refs: [
        { num: 21, text: "U.S. Department of Defense. (2025). JPEO-CBRND Program Updates and Milestone B Approvals. (Restricted — accessible via FOIA requests)", url: null },
        { num: 22, text: "Johns Hopkins Applied Physics Laboratory. (2024). CBRN Defense Research and Development. (Limited public information)", url: null },
        { num: 23, text: "DTRA — Defense Threat Reduction Agency. (2024). EDGE Bioinformatics Platform Development. (Limited public information)", url: null }
      ]
    }
  ]
};

// ─────────────────────── DNA Animation Component ───────────────────────
function DNAHelix() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let frame = 0;
    let animId;
    const W = 280, H = 420;
    canvas.width = W * 2; canvas.height = H * 2;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.scale(2, 2);
    function draw() {
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const pairs = 22;
      const spacing = H / (pairs + 1);
      for (let i = 0; i < pairs; i++) {
        const y = spacing * (i + 1);
        const phase = (i * 0.35) + frame * 0.025;
        const x1 = cx + Math.sin(phase) * 55;
        const x2 = cx - Math.sin(phase) * 55;
        const depth = Math.cos(phase);
        ctx.beginPath();
        ctx.moveTo(x1, y); ctx.lineTo(x2, y);
        ctx.strokeStyle = `rgba(100,200,255,${0.15 + Math.abs(depth) * 0.15})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
        const colors = [["#00d4ff", "#ff6b9d"], ["#7c3aed", "#10b981"], ["#f59e0b", "#06b6d4"], ["#ef4444", "#3b82f6"]];
        const c = colors[i % 4];
        const backX = depth > 0 ? x2 : x1;
        const frontX = depth > 0 ? x1 : x2;
        const backC = depth > 0 ? c[1] : c[0];
        const frontC = depth > 0 ? c[0] : c[1];
        const backR = 4 + (1 - Math.abs(depth)) * 2;
        const frontR = 4 + Math.abs(depth) * 2;
        ctx.beginPath();
        ctx.arc(backX, y, backR, 0, Math.PI * 2);
        ctx.fillStyle = backC + "88";
        ctx.fill();
        ctx.beginPath();
        ctx.arc(frontX, y, frontR, 0, Math.PI * 2);
        const grad = ctx.createRadialGradient(frontX - 2, y - 2, 0, frontX, y, frontR);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.4, frontC);
        grad.addColorStop(1, frontC + "66");
        ctx.fillStyle = grad;
        ctx.fill();
      }
      frame++;
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <canvas ref={canvasRef} style={{ display: "block" }} />;
}

// ─────────────────────── Current Signal Animation ───────────────────────
function CurrentSignal() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const W = 600, H = 120;
    canvas.width = W * 2; canvas.height = H * 2;
    canvas.style.width = "100%"; canvas.style.maxWidth = W + "px"; canvas.style.height = H + "px";
    ctx.scale(2, 2);
    let offset = 0;
    let animId;
    const bases = "ATGCGTACAATGCGTAACGT";
    const levels = { A: 0.7, T: 0.45, G: 0.25, C: 0.55 };
    const baseColors = { A: "#00d4ff", T: "#ff6b9d", G: "#10b981", C: "#f59e0b" };
    function draw() {
      ctx.clearRect(0, 0, W, H);
      ctx.beginPath();
      ctx.moveTo(0, H / 2);
      for (let x = 0; x < W; x++) {
        const idx = Math.floor(((x + offset) % (bases.length * 30)) / 30);
        const base = bases[idx];
        const level = levels[base] || 0.5;
        const noise = Math.sin(x * 0.3 + offset * 0.05) * 3 + Math.random() * 2;
        const y = H * 0.1 + (H * 0.8) * (1 - level) + noise;
        ctx.lineTo(x, y);
      }
      ctx.strokeStyle = "#00d4ff";
      ctx.lineWidth = 1.5;
      ctx.shadowColor = "#00d4ff";
      ctx.shadowBlur = 6;
      ctx.stroke();
      ctx.shadowBlur = 0;
      for (let i = 0; i < 20; i++) {
        const bx = (i * 30 - (offset % 30) + W) % W;
        const idx = Math.floor(((bx + offset) % (bases.length * 30)) / 30);
        const base = bases[idx];
        if (bx > 10 && bx < W - 10) {
          ctx.fillStyle = baseColors[base] || "#fff";
          ctx.font = "bold 11px monospace";
          ctx.textAlign = "center";
          ctx.fillText(base, bx, H - 6);
        }
      }
      offset += 0.8;
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);
  return <canvas ref={canvasRef} />;
}

// ─────────────────────── Simulation Timeline ───────────────────────
function SimTimeline({ steps, startBtn, resetBtn, runningLabel }) {
  const [active, setActive] = useState(-1);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);
  const start = () => {
    setRunning(true); setActive(0);
    let step = 0;
    intervalRef.current = setInterval(() => {
      step++;
      if (step >= steps.length) { clearInterval(intervalRef.current); setRunning(false); }
      else { setActive(step); }
    }, 2500);
  };
  const reset = () => { clearInterval(intervalRef.current); setRunning(false); setActive(-1); };
  useEffect(() => () => clearInterval(intervalRef.current), []);
  const statusColors = {
    alert: { bg: "rgba(239,68,68,0.15)", border: "#ef4444", glow: "0 0 20px rgba(239,68,68,0.3)" },
    sampling: { bg: "rgba(245,158,11,0.15)", border: "#f59e0b", glow: "0 0 20px rgba(245,158,11,0.3)" },
    sequencing: { bg: "rgba(0,212,255,0.15)", border: "#00d4ff", glow: "0 0 20px rgba(0,212,255,0.3)" },
    identified: { bg: "rgba(16,185,129,0.15)", border: "#10b981", glow: "0 0 20px rgba(16,185,129,0.3)" },
    response: { bg: "rgba(124,58,237,0.15)", border: "#7c3aed", glow: "0 0 20px rgba(124,58,237,0.3)" }
  };
  return (
    <div>
      <div style={{ display: "flex", gap: 12, marginBottom: 32, justifyContent: "center" }}>
        <button onClick={start} disabled={running} style={{
          padding: "12px 32px", borderRadius: 12, border: "none", cursor: running ? "default" : "pointer",
          background: running ? "rgba(255,255,255,0.1)" : "linear-gradient(135deg, #00d4ff, #7c3aed)",
          color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "inherit", transition: "all 0.3s", opacity: running ? 0.5 : 1
        }}>{running ? runningLabel : startBtn}</button>
        <button onClick={reset} style={{
          padding: "12px 32px", borderRadius: 12, border: "1px solid rgba(255,255,255,0.2)",
          background: "rgba(255,255,255,0.05)", color: "#fff", fontWeight: 600, fontSize: 16,
          cursor: "pointer", fontFamily: "inherit", transition: "all 0.3s"
        }}>{resetBtn}</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {steps.map((step, i) => {
          const isActive = i === active;
          const isDone = i < active;
          const sc = statusColors[step.status];
          return (
            <div key={i} style={{
              display: "flex", gap: 16, alignItems: "flex-start", padding: 20, borderRadius: 16,
              background: isActive ? sc.bg : isDone ? "rgba(16,185,129,0.08)" : "rgba(255,255,255,0.03)",
              border: `1px solid ${isActive ? sc.border : isDone ? "rgba(16,185,129,0.3)" : "rgba(255,255,255,0.06)"}`,
              boxShadow: isActive ? sc.glow : "none", transition: "all 0.5s ease",
              opacity: active === -1 ? 0.7 : (isDone || isActive) ? 1 : 0.35,
              transform: isActive ? "scale(1.01)" : "scale(1)"
            }}>
              <div style={{
                minWidth: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                background: isActive ? sc.border : isDone ? "#10b981" : "rgba(255,255,255,0.1)",
                color: "#fff", fontWeight: 800, fontSize: 18, transition: "all 0.5s",
                boxShadow: isActive ? `0 0 16px ${sc.border}66` : "none"
              }}>{isDone ? "✓" : i + 1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4, flexWrap: "wrap", gap: 8 }}>
                  <span style={{ color: isActive ? sc.border : "#94a3b8", fontSize: 13, fontWeight: 600, letterSpacing: 0.5 }}>{step.phase}</span>
                  <span style={{ color: "#64748b", fontSize: 12, fontFamily: "monospace", background: "rgba(255,255,255,0.05)", padding: "2px 8px", borderRadius: 6 }}>{step.time}</span>
                </div>
                <h4 style={{ color: "#e2e8f0", margin: "4px 0", fontSize: 17, fontWeight: 700 }}>{step.title}</h4>
                <p style={{ color: "#94a3b8", margin: 0, fontSize: 14, lineHeight: 1.6 }}>{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────── Main App ───────────────────────
export default function NSISApp() {
  const [lang, setLang] = useState("he");
  const [showInfographic, setShowInfographic] = useState(false);
  const t = content[lang];
  const isRTL = lang === "he";
  const bib = bibCategories[lang];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const pageStyle = {
    direction: t.dir,
    fontFamily: isRTL ? "'Heebo', 'Segoe UI', sans-serif" : "'DM Sans', 'Segoe UI', sans-serif",
    background: "linear-gradient(180deg, #0a0e1a 0%, #0d1526 30%, #0a1628 60%, #080c18 100%)",
    color: "#e2e8f0", minHeight: "100vh", overflowX: "hidden"
  };

  const sectionStyle = { maxWidth: 1100, margin: "0 auto", padding: "80px 24px" };

  const sectionTitle = (text, sub) => (
    <div style={{ textAlign: "center", marginBottom: 48 }}>
      <h2 style={{
        fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 800, margin: 0,
        background: "linear-gradient(135deg, #00d4ff, #7c3aed, #ff6b9d)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent"
      }}>{text}</h2>
      {sub && <p style={{ color: "#64748b", marginTop: 12, fontSize: 15 }}>{sub}</p>}
    </div>
  );

  const divider = (color) => (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg, transparent, ${color}, transparent)` }} />
  );

  return (
    <div style={pageStyle}>
      <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&family=DM+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet" />

      {/* Background particles */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0 }}>
        {[...Array(6)].map((_, i) => (
          <div key={i} style={{
            position: "absolute", width: 300 + i * 80, height: 300 + i * 80, borderRadius: "50%",
            background: `radial-gradient(circle, ${["rgba(0,212,255,0.04)", "rgba(124,58,237,0.04)", "rgba(255,107,157,0.03)"][i % 3]} 0%, transparent 70%)`,
            top: `${10 + i * 15}%`, left: `${(i * 17 + 5) % 80}%`,
            animation: `float${i} ${20 + i * 5}s ease-in-out infinite`
          }} />
        ))}
      </div>

      <style>{`
        @keyframes float0{0%,100%{transform:translate(0,0)}50%{transform:translate(30px,-40px)}}
        @keyframes float1{0%,100%{transform:translate(0,0)}50%{transform:translate(-40px,30px)}}
        @keyframes float2{0%,100%{transform:translate(0,0)}50%{transform:translate(20px,40px)}}
        @keyframes float3{0%,100%{transform:translate(0,0)}50%{transform:translate(-30px,-20px)}}
        @keyframes float4{0%,100%{transform:translate(0,0)}50%{transform:translate(40px,20px)}}
        @keyframes float5{0%,100%{transform:translate(0,0)}50%{transform:translate(-20px,30px)}}
        @keyframes pulseGlow{0%,100%{box-shadow:0 0 20px rgba(0,212,255,0.2)}50%{box-shadow:0 0 40px rgba(0,212,255,0.4)}}
        @keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        *{box-sizing:border-box}html{scroll-behavior:smooth}
        details summary::-webkit-details-marker,details summary::marker{display:none;content:''}
        details summary{list-style:none}
        details[open] summary{border-bottom:1px solid rgba(255,255,255,0.04)}
      `}</style>

      {/* ═══ Navigation ═══ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(10,14,26,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)", padding: "0 24px"
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => scrollTo("hero")}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: 14, color: "#fff", fontFamily: "'JetBrains Mono', monospace"
            }}>NS</div>
            <span style={{ fontWeight: 700, fontSize: 18, color: "#e2e8f0" }}>NSIS</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
            {Object.entries(t.nav).map(([key, label]) => (
              <button key={key} onClick={() => scrollTo(key === "home" ? "hero" : key)}
                style={{
                  background: "none", border: "none", color: "#94a3b8", fontSize: 13, fontWeight: 500,
                  padding: "8px 12px", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s"
                }}
                onMouseOver={e => { e.target.style.color = "#00d4ff"; e.target.style.background = "rgba(0,212,255,0.08)"; }}
                onMouseOut={e => { e.target.style.color = "#94a3b8"; e.target.style.background = "none"; }}
              >{label}</button>
            ))}

            {/* ═══ Language Toggle ═══ */}
            <div style={{
              display: "flex", alignItems: "center", marginInlineStart: 8,
              background: "rgba(255,255,255,0.06)", borderRadius: 10, padding: 3,
              border: "1px solid rgba(255,255,255,0.08)"
            }}>
              <button onClick={() => setLang("he")} style={{
                padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                background: lang === "he" ? "linear-gradient(135deg, #00d4ff, #7c3aed)" : "transparent",
                color: lang === "he" ? "#fff" : "#64748b",
                fontWeight: 700, fontSize: 13, fontFamily: "'Heebo', sans-serif", transition: "all 0.3s"
              }}>עברית</button>
              <button onClick={() => setLang("en")} style={{
                padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                background: lang === "en" ? "linear-gradient(135deg, #00d4ff, #7c3aed)" : "transparent",
                color: lang === "en" ? "#fff" : "#64748b",
                fontWeight: 700, fontSize: 13, fontFamily: "'DM Sans', sans-serif", transition: "all 0.3s"
              }}>English</button>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══ HERO ═══ */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", paddingTop: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px", display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ flex: "1 1 500px", animation: "slideUp 1s ease" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)",
              padding: "6px 16px", borderRadius: 100, marginBottom: 24
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", animation: "pulseGlow 2s infinite" }} />
              <span style={{ color: "#10b981", fontSize: 13, fontWeight: 600 }}>{t.hero.badge}</span>
            </div>
            <h1 style={{
              fontSize: "clamp(48px, 8vw, 80px)", fontWeight: 900, margin: "0 0 8px",
              background: "linear-gradient(135deg, #00d4ff 0%, #7c3aed 50%, #ff6b9d 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", lineHeight: 1.1, letterSpacing: -2
            }}>{t.hero.title}</h1>
            <h2 style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 600, color: "#cbd5e1", margin: "0 0 8px" }}>{t.hero.subtitle}</h2>
            <p style={{ color: "#64748b", fontSize: 14, fontFamily: "'JetBrains Mono', monospace", margin: "0 0 24px" }}>{t.hero.fullName}</p>
            <p style={{ color: "#94a3b8", fontSize: 16, lineHeight: 1.8, margin: "0 0 32px", maxWidth: 600 }}>{t.hero.desc}</p>
            <button onClick={() => scrollTo("tech")} style={{
              padding: "14px 36px", borderRadius: 14, border: "none", cursor: "pointer",
              background: "linear-gradient(135deg, #00d4ff, #7c3aed)",
              color: "#fff", fontWeight: 700, fontSize: 16, fontFamily: "inherit",
              boxShadow: "0 4px 24px rgba(0,212,255,0.25)", transition: "all 0.3s"
            }}
              onMouseOver={e => e.target.style.transform = "translateY(-2px)"}
              onMouseOut={e => e.target.style.transform = "translateY(0)"}
            >{t.hero.cta}</button>
          </div>
          <div style={{ flex: "0 1 280px", animation: "fadeIn 1.5s ease", display: "flex", justifyContent: "center" }}>
            <div style={{
              background: "rgba(0,212,255,0.03)", borderRadius: 24,
              border: "1px solid rgba(0,212,255,0.1)", padding: 20,
              boxShadow: "0 0 60px rgba(0,212,255,0.08)"
            }}><DNAHelix /></div>
          </div>
        </div>
      </section>

      {/* ═══ TECHNOLOGY ═══ */}
      <section id="tech" style={{ position: "relative" }}>
        {divider("rgba(0,212,255,0.3)")}
        <div style={sectionStyle}>
          {sectionTitle(t.tech.sectionTitle, t.tech.sectionSub)}

          {/* Nanopore card */}
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 24, border: "1px solid rgba(0,212,255,0.12)", padding: 32, marginBottom: 40, backdropFilter: "blur(10px)" }}>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ flex: "1 1 350px" }}>
                <h3 style={{ color: "#00d4ff", fontSize: 22, fontWeight: 700, margin: "0 0 4px" }}>{t.tech.nanopore.title}</h3>
                <p style={{ color: "#7c3aed", fontSize: 15, fontWeight: 600, margin: "0 0 16px", fontStyle: "italic" }}>{t.tech.nanopore.name}</p>
                <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{t.tech.nanopore.desc}</p>
              </div>
              <div style={{ flex: "0 1 300px", display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
                {t.tech.nanopore.specs.map((s, i) => (
                  <div key={i} style={{ background: "rgba(0,212,255,0.08)", borderRadius: 16, padding: "16px 20px", border: "1px solid rgba(0,212,255,0.15)", textAlign: "center", minWidth: 120, flex: "1 1 120px" }}>
                    <div style={{ fontSize: 28, fontWeight: 800, color: "#00d4ff", fontFamily: "'JetBrains Mono', monospace" }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>{s.unit}</div>
                    <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 4 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Current signal */}
          <div style={{ background: "rgba(255,255,255,0.02)", borderRadius: 20, padding: "24px 24px 16px", border: "1px solid rgba(255,255,255,0.06)", marginBottom: 40, textAlign: "center" }}>
            <p style={{ color: "#64748b", fontSize: 13, marginBottom: 12, fontWeight: 600 }}>
              {isRTL ? "חתימת זרם חשמלי — מדידה בזמן אמת" : "Electrical Current Signature — Real-Time Measurement"}
            </p>
            <CurrentSignal />
            <div style={{ display: "flex", justifyContent: "center", gap: 16, marginTop: 8, flexWrap: "wrap" }}>
              {[{ base: "A", color: "#00d4ff", name: "Adenine" }, { base: "T", color: "#ff6b9d", name: "Thymine" }, { base: "G", color: "#10b981", name: "Guanine" }, { base: "C", color: "#f59e0b", name: "Cytosine" }].map(b => (
                <span key={b.base} style={{ fontSize: 12, color: b.color, fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}>{b.base} — {b.name}</span>
              ))}
            </div>
          </div>

          {/* Process steps */}
          <h3 style={{ color: "#e2e8f0", fontSize: 22, fontWeight: 700, marginBottom: 24, textAlign: "center" }}>{t.tech.process.title}</h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 48 }}>
            {t.tech.process.steps.map((step, i) => (
              <div key={i} style={{
                background: "rgba(255,255,255,0.03)", borderRadius: 20, padding: 24,
                border: "1px solid rgba(255,255,255,0.06)", transition: "all 0.3s", position: "relative", overflow: "hidden"
              }}
                onMouseOver={e => { e.currentTarget.style.borderColor = "rgba(0,212,255,0.3)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                onMouseOut={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ position: "absolute", top: 12, [isRTL ? "left" : "right"]: 12, width: 28, height: 28, borderRadius: "50%", background: "rgba(0,212,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#00d4ff", fontSize: 12, fontWeight: 800, fontFamily: "'JetBrains Mono', monospace" }}>{i + 1}</div>
                <div style={{ fontSize: 32, marginBottom: 12 }}>{step.icon}</div>
                <h4 style={{ color: "#e2e8f0", fontSize: 16, fontWeight: 700, margin: "0 0 8px" }}>{step.title}</h4>
                <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
              </div>
            ))}
          </div>

          {/* MinION */}
          <div style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.08), rgba(0,212,255,0.08))", borderRadius: 24, padding: 32, border: "1px solid rgba(124,58,237,0.15)" }}>
            <h3 style={{ color: "#e2e8f0", fontSize: 22, fontWeight: 700, margin: "0 0 8px" }}>{t.tech.minion.title}</h3>
            <p style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.6, margin: "0 0 24px" }}>{t.tech.minion.desc}</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
              {t.tech.minion.specs.map((s, i) => (
                <div key={i} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 14, padding: "14px 16px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: 11, color: "#64748b", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: 0.5 }}>{s.label}</div>
                  <div style={{ fontSize: 16, color: "#e2e8f0", fontWeight: 700 }}>{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SIMULATION ═══ */}
      <section id="sim" style={{ position: "relative" }}>
        {divider("rgba(124,58,237,0.3)")}
        <div style={sectionStyle}>
          {sectionTitle(t.sim.sectionTitle, t.sim.sectionSub)}
          <SimTimeline steps={t.sim.steps} startBtn={t.sim.startBtn} resetBtn={t.sim.resetBtn} runningLabel={t.sim.running} />
        </div>
      </section>

      {/* ═══ PROS & CONS ═══ */}
      <section id="pros" style={{ position: "relative" }}>
        {divider("rgba(16,185,129,0.3)")}
        <div style={sectionStyle}>
          {sectionTitle(t.pros.sectionTitle)}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 24 }}>
            <div style={{ background: "rgba(16,185,129,0.04)", borderRadius: 24, padding: 28, border: "1px solid rgba(16,185,129,0.15)" }}>
              <h3 style={{ color: "#10b981", fontSize: 20, fontWeight: 700, margin: "0 0 20px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 24 }}>✅</span> {t.pros.advantages.title}
              </h3>
              {t.pros.advantages.items.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                  <div>
                    <h4 style={{ color: "#e2e8f0", fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>{item.title}</h4>
                    <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ background: "rgba(245,158,11,0.04)", borderRadius: 24, padding: 28, border: "1px solid rgba(245,158,11,0.15)" }}>
              <h3 style={{ color: "#f59e0b", fontSize: 20, fontWeight: 700, margin: "0 0 20px", display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 24 }}>⚠️</span> {t.pros.limitations.title}
              </h3>
              {t.pros.limitations.items.map((item, i) => (
                <div key={i} style={{ display: "flex", gap: 14, marginBottom: 16, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                  <div>
                    <h4 style={{ color: "#e2e8f0", fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>{item.title}</h4>
                    <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ BIBLIOGRAPHY ═══ */}
      <section id="bib" style={{ position: "relative" }}>
        {divider("rgba(255,107,157,0.3)")}
        <div style={sectionStyle}>
          {sectionTitle(t.bib.sectionTitle, t.bib.sectionSub)}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {bib.map((cat, i) => (
              <details key={i} style={{ background: "rgba(255,255,255,0.03)", borderRadius: 16, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
                <summary style={{ padding: "16px 24px", cursor: "pointer", color: "#e2e8f0", fontSize: 16, fontWeight: 600, display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ width: 28, height: 28, borderRadius: 8, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, background: "rgba(0,212,255,0.1)", color: "#00d4ff", flexShrink: 0, fontFamily: "'JetBrains Mono', monospace" }}>{i + 1}</span>
                  {cat.title}
                  <span style={{ marginInlineStart: "auto", color: "#64748b", fontSize: 12 }}>({cat.refs.length})</span>
                </summary>
                <div style={{ padding: "0 24px 16px" }}>
                  {cat.refs.map((ref, j) => (
                    <div key={j} style={{ padding: "10px 0", borderTop: j > 0 ? "1px solid rgba(255,255,255,0.04)" : "none", fontSize: 13, lineHeight: 1.6 }}>
                      <span style={{ color: "#00d4ff", fontWeight: 700, fontFamily: "'JetBrains Mono', monospace", marginInlineEnd: 8 }}>[{ref.num}]</span>
                      <span style={{ color: "#cbd5e1" }}>{ref.text}</span>
                      {ref.url && (
                        <a href={ref.url} target="_blank" rel="noopener noreferrer" style={{
                          display: "inline-block", marginInlineStart: 8,
                          color: "#7c3aed", fontSize: 12, textDecoration: "none",
                          background: "rgba(124,58,237,0.1)", padding: "2px 10px", borderRadius: 6,
                          border: "1px solid rgba(124,58,237,0.2)", transition: "all 0.2s"
                        }}
                          onMouseOver={e => { e.target.style.background = "rgba(124,58,237,0.2)"; }}
                          onMouseOut={e => { e.target.style.background = "rgba(124,58,237,0.1)"; }}
                        >🔗 {isRTL ? "קישור" : "Link"}</a>
                      )}
                      {!ref.url && (
                        <span style={{ display: "inline-block", marginInlineStart: 8, color: "#64748b", fontSize: 11, fontStyle: "italic" }}>
                          🔒 {isRTL ? "מוגבל" : "Restricted"}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ INFOGRAPHIC ═══ */}
      <section style={{ position: "relative" }}>
        {divider("rgba(245,158,11,0.3)")}
        <div style={{ ...sectionStyle, textAlign: "center", paddingBottom: 40 }}>
          {sectionTitle(
            isRTL ? "אינפוגרפיקה — מערכת NSIS" : "NSIS System Infographic",
            isRTL ? "תרשים מסכם של הטכנולוגיה, היתרונות והמגבלות" : "Summary diagram of the technology, advantages and limitations"
          )}
          <button
            onClick={() => setShowInfographic(true)}
            style={{
              padding: "16px 40px", borderRadius: 16, border: "1px solid rgba(245,158,11,0.3)",
              background: "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(0,212,255,0.08))",
              color: "#f59e0b", fontWeight: 700, fontSize: 17, fontFamily: "inherit",
              cursor: "pointer", transition: "all 0.3s",
              display: "inline-flex", alignItems: "center", gap: 10,
              boxShadow: "0 4px 20px rgba(245,158,11,0.1)"
            }}
            onMouseOver={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(245,158,11,0.2), rgba(0,212,255,0.15))"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseOut={e => { e.currentTarget.style.background = "linear-gradient(135deg, rgba(245,158,11,0.12), rgba(0,212,255,0.08))"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            <span style={{ fontSize: 22 }}>🖼️</span>
            {isRTL ? "הצג אינפוגרפיקה מלאה" : "View Full Infographic"}
          </button>
        </div>
      </section>

      {/* Infographic Modal Overlay */}
      {showInfographic && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#000",
            display: "flex", flexDirection: "column",
            overflow: "auto", WebkitOverflowScrolling: "touch"
          }}
        >
          <div style={{
            position: "sticky", top: 0, zIndex: 10,
            display: "flex", justifyContent: "flex-end", padding: "12px 16px",
            background: "linear-gradient(180deg, rgba(0,0,0,0.8) 0%, transparent 100%)"
          }}>
            <button
              onClick={() => setShowInfographic(false)}
              style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(239,68,68,0.9)", border: "2px solid rgba(255,255,255,0.3)",
                color: "#fff", fontSize: 22, fontWeight: 700, cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 16px rgba(0,0,0,0.5)", flexShrink: 0
              }}
            >✕</button>
          </div>
          <div style={{
            flex: 1, display: "flex", alignItems: "center", justifyContent: "center",
            padding: "0 0 20px"
          }}>
            <img
              src="/infographic.webp"
              alt="NSIS Infographic"
              style={{
                width: "100%", maxWidth: "100vw",
                objectFit: "contain", cursor: "default"
              }}
            />
          </div>
        </div>
      )}

      {/* ═══ CONTACT ═══ */}
      <section id="contact" style={{ position: "relative" }}>
        {divider("rgba(0,212,255,0.3)")}
        <div style={{ ...sectionStyle, textAlign: "center" }}>
          {sectionTitle(t.contact.sectionTitle)}
          <div style={{ background: "rgba(255,255,255,0.03)", borderRadius: 24, padding: 40, border: "1px solid rgba(255,255,255,0.08)", maxWidth: 600, margin: "0 auto 24px", backdropFilter: "blur(10px)" }}>
            <a href="https://chat.whatsapp.com/K4NzcZucmimKYFOXE3VVtD?mode=gi_t" target="_blank" rel="noopener noreferrer"
              style={{ display: "block", margin: "0 auto 20px", width: 100, height: 100, borderRadius: "50%", overflow: "hidden", border: "3px solid rgba(0,212,255,0.3)", boxShadow: "0 0 30px rgba(0,212,255,0.15)", transition: "all 0.3s", cursor: "pointer" }}
              onMouseOver={e => { e.currentTarget.style.transform = "scale(1.08)"; e.currentTarget.style.boxShadow = "0 0 40px rgba(0,212,255,0.3)"; }}
              onMouseOut={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 0 30px rgba(0,212,255,0.15)"; }}
            >
              <img src="/logo-60sec.jpg" alt="60 שניות של חומ״ס" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </a>
            <h3 style={{ color: "#e2e8f0", fontSize: 24, fontWeight: 700, margin: "0 0 4px" }}>{t.contact.name}</h3>
            <p style={{ color: "#7c3aed", fontSize: 15, fontWeight: 600, margin: "0 0 24px" }}>{t.contact.role}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center" }}>
              <a href="mailto:roiez1@gmail.com" style={{ color: "#00d4ff", textDecoration: "none", fontSize: 15, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>✉️</span> {t.contact.email}
              </a>
            </div>
          </div>
          <p style={{ color: "#475569", fontSize: 13, marginTop: 24 }}>{t.contact.note}</p>
        </div>
      </section>
    </div>
  );
}
