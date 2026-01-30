// Archive Content - Lore entries across all three books
// IMPORTANT: Entries must NOT reveal key plot points or spoilers

export interface ArchiveEntry {
  id: string;
  title: string;
  tag: 'CLASSIFIED' | 'EVIDENCE' | 'INCIDENT' | 'PERSONNEL' | 'SIGNAL' | 'RECOVERED' | 'BRIEFING';
  dateISO: string;
  book: 'Midnight Sun' | 'Project Chimera' | 'PERFECT' | 'Series';
  summary: string;
  body: string;
  redactions: Array<{ start: number; end: number }>;
}

export const readingOrder = [
  {
    order: 1,
    title: 'Midnight Sun',
    tagline: 'Where the signal began.',
    description: 'FBI Agent Maya Thorne experiences headaches that reveal more than migraines. When reality fractures, she must navigate a world where the line between perception and truth no longer exists.'
  },
  {
    order: 2,
    title: 'Project Chimera',
    tagline: 'Where the signal spread.',
    description: 'The phenomenon expands. New players emerge. The architecture of something vast begins to reveal itself—and the cost of understanding becomes clear.'
  },
  {
    order: 3,
    title: 'PERFECT',
    tagline: 'Where the signal ends.',
    description: 'Everything converges. The final questions demand answers. What began as headaches becomes something that will redefine existence itself.'
  }
];

export const archiveEntries: ArchiveEntry[] = [
  // SERIES-WIDE ENTRIES
  {
    id: 'entry-000',
    title: 'Recommended Access Protocol',
    tag: 'BRIEFING',
    dateISO: '2024-01-01T00:00:00Z',
    book: 'Series',
    summary: 'Mandatory reading sequence for new personnel.',
    body: `ATTENTION: This archive contains materials from three interconnected investigations.

For optimal comprehension and to prevent cognitive dissonance, access files in the following order:

1. MIDNIGHT SUN - Primary source material. Establishes baseline phenomena.
2. PROJECT CHIMERA - Secondary expansion. Contextualizes broader implications.
3. PERFECT - Terminal documentation. Resolution protocols.

Accessing materials out of sequence may result in [REDACTED] and has been linked to accelerated [DATA EXPUNGED] in 73% of test subjects.

You have been warned.`,
    redactions: [
      { start: 347, end: 356 },
      { start: 386, end: 399 }
    ]
  },

  // MIDNIGHT SUN ENTRIES
  {
    id: 'entry-ms-001',
    title: 'Subject Profile: Thorne, M.',
    tag: 'PERSONNEL',
    dateISO: '2024-03-15T08:30:00Z',
    book: 'Midnight Sun',
    summary: 'Initial assessment of primary asset. Classification pending.',
    body: `Name: Maya Thorne
Position: Special Agent, FBI
Status: Active (monitored)

OBSERVATION NOTES:
Subject displays anomalous perceptual capabilities first documented during the Water Street operation. Standard debriefing protocols have proven ineffective at extracting methodology.

Subject's explanations ("thermal echoes," "structural differentials") do not correspond to any known detection technology. Field results suggest alternative explanation.

Recommendation: Recruitment to [REDACTED] division pending psychological evaluation.

ADDENDUM: Subject's domestic situation may present complications. Partner (Marcus) demonstrates protective behaviors consistent with prior trauma. See file: THORNE-ADJACENT-001.

Note: Headache frequency has increased 340% over baseline since first contact event.`,
    redactions: [
      { start: 371, end: 380 }
    ]
  },
  {
    id: 'entry-ms-002',
    title: 'The Hammond Protocol',
    tag: 'CLASSIFIED',
    dateISO: '2024-03-20T14:00:00Z',
    book: 'Midnight Sun',
    summary: 'Deputy Director\'s initiative for unconventional asset deployment.',
    body: `CLASSIFICATION: EYES ONLY

Deputy Director Hammond has authorized formation of specialized unit to address Non-Consensual Reality Events (NCREs).

Unit composition: TBD
Operational mandate: Investigation and containment of phenomena outside standard Bureau jurisdiction
Reporting structure: Direct to Hammond. No inter-agency disclosure.

CRITICAL: All personnel must understand that official Bureau position remains that NCREs do not exist. Any documentation of unit activities must be [REDACTED] prior to archival.

This unit does not exist.
These events did not happen.
You did not read this file.`,
    redactions: [
      { start: 445, end: 454 }
    ]
  },
  {
    id: 'entry-ms-003',
    title: 'Incident Report: Water Street',
    tag: 'INCIDENT',
    dateISO: '2024-03-12T16:45:00Z',
    book: 'Midnight Sun',
    summary: 'Documentation of first confirmed NCRE involving Agent Thorne.',
    body: `Location: Water Street industrial district
Duration: 6 hours 23 minutes
Outcome: Civilian recovered (alive)

ANOMALIES DOCUMENTED:
- Thermal imaging failure in target structure
- Electromagnetic interference (source unknown)
- Symbols present on interior walls (see APPENDIX C - DESTROYED)
- Agent Thorne provided accurate intelligence despite technical blackout

Method of intelligence acquisition: UNKNOWN

Civilian debrief revealed subject was conscious throughout captivity. Subject reported hearing "a sound like static trying to become words." Subject has since been enrolled in [REDACTED] monitoring program.

All physical evidence has been sanitized per Protocol 7.`,
    redactions: [
      { start: 508, end: 517 }
    ]
  },
  {
    id: 'entry-ms-004',
    title: 'Medical File: Thorne-Adjacent-001',
    tag: 'PERSONNEL',
    dateISO: '2024-02-28T00:00:00Z',
    book: 'Midnight Sun',
    summary: 'Background on subject\'s immediate family connections.',
    body: `SUBJECT: [NAME REDACTED] - Sister of Marcus Thorne (spouse of primary asset)

Admitted to psychiatric care: [DATE REDACTED]
Diagnosis: Unspecified psychotic disorder with perceptual disturbances

SYMPTOM PROGRESSION:
- Phase 1: Persistent headaches (6 weeks)
- Phase 2: Auditory phenomena - described as "static with structure"
- Phase 3: Compulsive documentation of unknown symbols
- Phase 4: Self-harm attempts (stated purpose: "to let the noise out")
- Phase 5: Current - non-responsive, occasional vocalization

SIGNIFICANCE: Pattern bears strong resemblance to early-stage presentation in primary asset (Thorne, M.). Monitoring protocols have been adjusted accordingly.

Marcus Thorne remains unaware of this file's existence.`,
    redactions: [
      { start: 9, end: 23 },
      { start: 97, end: 112 }
    ]
  },

  // PROJECT CHIMERA ENTRIES
  {
    id: 'entry-pc-001',
    title: 'The Accident Report',
    tag: 'INCIDENT',
    dateISO: '2024-06-03T02:17:00Z',
    book: 'Project Chimera',
    summary: 'Initial documentation of secondary manifestation event.',
    body: `PRIORITY: IMMEDIATE
CLASSIFICATION: CHIMERA-LEVEL

An incident has occurred that cannot be explained through conventional channels. Preliminary evidence suggests connection to MIDNIGHT SUN phenomena, though manifestation pattern differs significantly.

Location: [COORDINATES REDACTED]
Witnesses: [NUMBER REDACTED]
Fatalities: None confirmed (status of [REDACTED] individuals remains unknown)

Notable deviation from MS-pattern: This event demonstrates [DATA EXPUNGED] properties not previously documented. If confirmed, implications for containment protocols are severe.

Recommend immediate dispatch of Thorne asset for evaluation.

ADDENDUM: Local law enforcement has been neutralized through standard cover protocols. Media blackout in effect.`,
    redactions: [
      { start: 199, end: 220 },
      { start: 240, end: 256 },
      { start: 302, end: 311 },
      { start: 375, end: 388 }
    ]
  },
  {
    id: 'entry-pc-002',
    title: 'The Primal Script',
    tag: 'EVIDENCE',
    dateISO: '2024-06-15T00:00:00Z',
    book: 'Project Chimera',
    summary: 'Analysis of recurring symbolic patterns across multiple incidents.',
    body: `LINGUISTIC ANALYSIS REPORT

Subject: Recurring glyphs documented at NCRE sites

Findings: Symbols previously catalogued as "random psychotic expression" demonstrate consistent internal grammar. This is not coincidence. This is not madness.

This is language.

Preliminary translation attempts have yielded [REDACTED]. Research team members who spent extended time with source materials have reported:
- Intrusive thoughts (87%)
- Sleep disturbances (94%)
- Compulsion to reproduce symbols (62%)
- Sensation of being "listened to" (100%)

Research suspended pending safety protocol review.

Dr. [REDACTED] notes: "We are not translating. We are being translated."`,
    redactions: [
      { start: 263, end: 272 },
      { start: 526, end: 535 }
    ]
  },
  {
    id: 'entry-pc-003',
    title: 'Team Assembly Manifest',
    tag: 'PERSONNEL',
    dateISO: '2024-06-10T09:00:00Z',
    book: 'Project Chimera',
    summary: 'Personnel roster for expanded investigation unit.',
    body: `CHIMERA TASK FORCE - ROSTER

Lead: Thorne, M. (FBI - Special Projects)

Support Personnel:
- [REDACTED] - Technical specialist
- [REDACTED] - Field operations
- [REDACTED] - Medical/psychological evaluation
- [REDACTED] - Linguistic analysis (reassigned from NSA)

SELECTION CRITERIA:
All personnel have demonstrated either:
a) Prior exposure to NCRE phenomena with maintained psychological stability
b) Natural resistance to [REDACTED] frequencies
c) Skills deemed essential regardless of risk profile

Note: Personnel should not be informed of criteria (c). Morale considerations.

Current team attrition rate: [REDACTED]%`,
    redactions: [
      { start: 113, end: 123 },
      { start: 148, end: 158 },
      { start: 182, end: 192 },
      { start: 228, end: 238 },
      { start: 366, end: 375 },
      { start: 493, end: 503 }
    ]
  },
  {
    id: 'entry-pc-004',
    title: 'The Celestial Membrane',
    tag: 'CLASSIFIED',
    dateISO: '2024-07-01T00:00:00Z',
    book: 'Project Chimera',
    summary: 'Theoretical framework proposed by research division.',
    body: `HYPOTHESIS DOCUMENT - FOR INTERNAL REVIEW ONLY

The phenomena documented across MIDNIGHT SUN and CHIMERA investigations may be explained by what Dr. [REDACTED] terms "The Celestial Membrane" theory.

Core proposition: Reality as perceived is a membrane—a thin boundary separating [REDACTED] from [REDACTED]. Recent events suggest this membrane is weakening.

Implications:
1. The "signal" is not being transmitted—it is bleeding through
2. Affected individuals are not receiving—they are becoming permeable
3. Containment may be impossible if membrane degradation continues

Current membrane integrity estimate: [DATA EXPUNGED]

Recommendation: Accelerate PERFECT protocols.

Note: This document will be denied under all circumstances.`,
    redactions: [
      { start: 152, end: 161 },
      { start: 249, end: 258 },
      { start: 264, end: 273 },
      { start: 492, end: 505 }
    ]
  },

  // PERFECT ENTRIES
  {
    id: 'entry-pf-001',
    title: 'PERFECT Initiative Overview',
    tag: 'BRIEFING',
    dateISO: '2024-08-01T00:00:00Z',
    book: 'PERFECT',
    summary: 'Summary of terminal phase operations.',
    body: `PROJECT DESIGNATION: PERFECT
STATUS: Active
PRIORITY: Absolute

PERFECT represents the culmination of all investigative threads from MIDNIGHT SUN and CHIMERA operations. Where previous phases focused on documentation and containment, PERFECT addresses [REDACTED].

Primary objectives:
1. Determine ultimate nature of signal origin
2. Assess reversibility of affected subjects
3. Evaluate potential for [REDACTED]
4. Prepare contingency protocols for [DATA EXPUNGED]

Asset Thorne remains central to operations. Her unique capabilities have proven essential, though concerns regarding her stability persist.

The Handler has been assigned.

Final phase timeline: [REDACTED]`,
    redactions: [
      { start: 233, end: 242 },
      { start: 351, end: 360 },
      { start: 395, end: 408 },
      { start: 564, end: 573 }
    ]
  },
  {
    id: 'entry-pf-002',
    title: 'The Handler Protocol',
    tag: 'PERSONNEL',
    dateISO: '2024-08-05T00:00:00Z',
    book: 'PERFECT',
    summary: 'Guidelines for primary asset management.',
    body: `HANDLER DESIGNATION: [REDACTED]
ASSET: Thorne, M.

PURPOSE: Maintain operational stability of primary asset while maximizing intelligence yield.

CRITICAL PARAMETERS:
- Handler must maintain emotional proximity without compromising objectivity
- Asset's domestic situation to be preserved as psychological anchor
- Any deterioration in asset's condition must be reported immediately
- Handler is authorized to use [REDACTED] protocols if asset becomes non-viable

ETHICAL CONSIDERATIONS: Suspended per executive order.

Note: Asset must never become aware of Handler's true function. Cover identity has been established and integrated into asset's personal life.

Handler's guilt is acknowledged but irrelevant to mission success.`,
    redactions: [
      { start: 24, end: 34 },
      { start: 333, end: 342 }
    ]
  },
  {
    id: 'entry-pf-003',
    title: 'Subject Zero Hypothesis',
    tag: 'CLASSIFIED',
    dateISO: '2024-08-20T00:00:00Z',
    book: 'PERFECT',
    summary: 'Analysis of potential primary vector.',
    body: `CLASSIFICATION: PERFECT-LEVEL ONLY

Question: Why Thorne?

Of all individuals exposed to NCRE phenomena, why has Asset Thorne demonstrated such exceptional integration while maintaining apparent stability?

Theories under consideration:
1. Genetic predisposition (see: sister's case file)
2. Prior exposure event (unconfirmed, pre-documentation)
3. [REDACTED]
4. Subject is not surviving the exposure—subject IS the exposure

Theory 4 requires immediate investigation. If Thorne is not a receiver but a [REDACTED], all previous containment assumptions are invalidated.

The signal may not be finding her.

She may be the signal finding us.

Research priority: MAXIMUM`,
    redactions: [
      { start: 383, end: 392 },
      { start: 505, end: 514 }
    ]
  },
  {
    id: 'entry-pf-004',
    title: 'Archive Access Log',
    tag: 'EVIDENCE',
    dateISO: '2024-09-01T00:00:00Z',
    book: 'PERFECT',
    summary: 'Record of classified document retrieval.',
    body: `AUTOMATED LOG - DO NOT MODIFY

User: Thorne, M.
Access Level: CHIMERA (Elevated)
Files Retrieved:
- THORNE-ADJACENT-001 [ACCESSED]
- HANDLER PROTOCOL [ACCESSED]
- MEMBRANE THEORY [ACCESSED]
- [FILENAME CORRUPTED] [ACCESSED]
- [FILENAME CORRUPTED] [ACCESSED]
- [FILENAME CORRUPTED] [ACCESSED]

Duration of session: 3 hours 17 minutes
Emotional state indicators: [ELEVATED DISTRESS]

ALERT: User attempted access to [REDACTED] files. Access denied. Security notified.

ALERT: User has not logged out. Session remains active.

ALERT: User's current location unknown.

ALERT: [SIGNAL DETECTED]`,
    redactions: [
      { start: 421, end: 430 }
    ]
  },
  {
    id: 'entry-pf-005',
    title: 'Final Transmission',
    tag: 'RECOVERED',
    dateISO: '2024-09-15T23:59:59Z',
    book: 'PERFECT',
    summary: 'Last documented communication before archive lockdown.',
    body: `[RECOVERED FROM CORRUPTED STORAGE]
[TIMESTAMP UNCERTAIN]
[SPEAKER UNCONFIRMED]

"...understand now. It was never about containment. You can't contain what was already here. You can't stop what never started.

The headaches weren't a warning. They were an invitation.

Maya knew. I think she always knew, somewhere underneath. The signal didn't break her—it completed her. And now...

[STATIC - 3.7 SECONDS]

...they're all listening now. Everyone who read the files. Everyone who saw the symbols. Everyone who heard the static and wondered what it meant.

You're listening too, aren't you?

You've been listening this whole time.

And now...

[STATIC - 12.4 SECONDS]

...now you're starting to hear.

[TRANSMISSION ENDS]"

NOTE: This file has been accessed [REDACTED] times. If you are reading this, you have been [DATA EXPUNGED].`,
    redactions: [
      { start: 680, end: 689 },
      { start: 738, end: 751 }
    ]
  }
];

export const getEntryById = (id: string): ArchiveEntry | undefined => {
  return archiveEntries.find(entry => entry.id === id);
};

export const getEntriesByTag = (tag: ArchiveEntry['tag']): ArchiveEntry[] => {
  return archiveEntries.filter(entry => entry.tag === tag);
};

export const getEntriesByBook = (book: ArchiveEntry['book']): ArchiveEntry[] => {
  return archiveEntries.filter(entry => entry.book === book);
};
