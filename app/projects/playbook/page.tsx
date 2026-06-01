/**
 * Playbook interactive demo — connorburns.dev/projects/playbook.
 *
 * Server Component: renders all widget HTML via the pure string renderers so
 * widgets are present in the first paint with no empty-slot flash. The
 * PlaybookClient component hydrates those nodes on the client.
 */

import {
  renderConnectedLayoutHTML,
  renderPlayDisplayerHTML,
  renderPlaybookHTML,
  renderSandboxHTML,
} from "@connorburns/playbook";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/github-dark.css";
import "@connorburns/playbook/styles.css";
import "./playbook-demo.css";
import { PlaybookClient } from "./PlaybookClient";
import { DEMO_PAGES, SLOT_IDS } from "./playbook-data";

hljs.registerLanguage("typescript", typescript);

const hl = (code: string) =>
  hljs.highlight(code, { language: "typescript" }).value;

const SNIPPET_CONSTRUCT = hl(`import { PlayDisplayer } from '@connorburns/playbook';
import '@connorburns/playbook/styles.css';

new PlayDisplayer({
  size: 'large',          // 'large' | 'xx-large'
  parentId: 'field-slot', // id of a <div> in your HTML
});`);

const SNIPPET_SETMOVE = hl(`const field = new PlayDisplayer({ size: 'large', parentId: 'field-slot' });

// 11 positions: lte lt lg c rg rt rte qb lhb fb rhb
field.setMove('lte', 'straight-deep'); // left tight end runs deep
field.setMove('rte', 'mid-90-right');  // right tight end: mid then cuts right
field.setMove('qb',  'pass-qb');       // QB drops back
field.setMove('fb',  'hole-four-fb');  // fullback hits hole four

await field.play(); // Promise resolves when every animation finishes`);

const SNIPPET_SANDBOX = hl(`const field = new PlayDisplayer({ size: 'large', parentId: 'field-slot' });

field.spawnSandbox(
  false,           // allowSave — include a Save to Book button?
  'sandbox-slot',  // id of a <div> to mount the dropdowns into
);`);

const SNIPPET_BOOKFIELD = hl(`import { Playbook } from '@connorburns/playbook';

const field = new PlayDisplayer({ size: 'large', parentId: 'field-slot' });

const book = new Playbook({
  title: 'Playbook',
  field: field,                // wires Initialize Play buttons to this field
  pageOrientation: 'vertical', // 'horizontal' | 'vertical'
  parentId: 'book-slot',       // id of a <div> in your HTML
});

book.addPage(imageUrl, 'Hail Mary Out', videoUrl, {
  // partial move map — unlisted positions default to 'none'
  lte: 'straight-deep', qb: 'pass-qb', fb: 'hole-four-fb',
});`);

const SNIPPET_CONNECTED = hl(`import {
  PlayDisplayer,
  Playbook,
  createConnectedLayout,
} from '@connorburns/playbook';

// mounts a responsive shell into 'mount-point' and returns three slot IDs
const layout = createConnectedLayout('mount-point');

const field = new PlayDisplayer({ size: 'large', parentId: layout.fieldSlot });

const book = new Playbook({
  title: 'Example',
  field: field,
  allowSave: true,             // show Save to Book button
  pageOrientation: 'vertical',
  parentId: layout.bookSlot,
});

field.spawnSandbox(true, layout.sandboxSlot, book.createSaveButton());`);

// ---------------------------------------------------------------------------
// Pre-render widget HTML (runs on the server — no DOM access)
// ---------------------------------------------------------------------------

function buildConnectedHTML(suffix: string): string {
  // The renderer nests the widget HTML into each slot directly — no fragile
  // string-splicing of the layout scaffold.
  return renderConnectedLayoutHTML({
    idSuffix: suffix,
    fieldHTML: renderPlayDisplayerHTML({ size: "large", name: "Example" }),
    sandboxHTML: renderSandboxHTML({ size: "large", idPrefix: suffix, allowSave: true }),
    bookHTML: renderPlaybookHTML({
      title: "Example",
      pageOrientation: "vertical",
      pages: DEMO_PAGES,
    }),
  }).html;
}

const heroHTML = buildConnectedHTML(SLOT_IDS.heroSuffix);
const cloneHTML = buildConnectedHTML(SLOT_IDS.cloneSuffix);
// Distinct names so each demo field is a uniquely-labelled landmark region
// for screen readers. Names must match the PlayDisplayer.hydrate calls in
// PlaybookClient.tsx so the server markup and client adoption stay in parity.
const demoFieldHTML = renderPlayDisplayerHTML({ size: "large", name: "Bare field" });
const demoSetmoveHTML = renderPlayDisplayerHTML({ size: "large", name: "Preset play" });
const demoSbFieldHTML = renderPlayDisplayerHTML({ size: "large", name: "Sandbox field" });
const demoSbControlsHTML = renderSandboxHTML({ size: "large", idPrefix: "demo-sb", allowSave: false });
const demoBfFieldHTML = renderPlayDisplayerHTML({ size: "large", name: "Book and field" });
const demoBfBookHTML = renderPlaybookHTML({
  title: "Playbook",
  pageOrientation: "vertical",
  pages: DEMO_PAGES,
});

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PlaybookDemoPage() {
  return (
    <div data-pb-theme="dark" className="portfolio-page">
      <main className="portfolio-shell">
        <header className="portfolio-header">
          <h1 className="portfolio-title">Playbook.ts</h1>
          <p className="portfolio-tagline">
            A tiny TypeScript library for creating, saving, and animating American Football
            play diagrams. Built on the Web Animations API with no runtime dependencies.
          </p>
        </header>

        <section aria-label="Live demo">
          <h2 className="portfolio-section-label">Try it</h2>
          <div
            className="showcase"
            id={SLOT_IDS.heroWrap}
            dangerouslySetInnerHTML={{ __html: heroHTML }}
            suppressHydrationWarning
          />
        </section>

        <section aria-labelledby="built-heading">
          <h2 id="built-heading" className="portfolio-section-label">
            How it&apos;s built
          </h2>

          <article className="portfolio-snippet">
            <h3 className="portfolio-snippet__heading">1. Construct a field</h3>
            <p className="portfolio-snippet__caption">
              <code>PlayDisplayer</code> mounts an 11-player offensive formation into the slot
              you name. With no moves assigned, the <em>Play Animation</em> button is disabled —
              the library knows there&apos;s nothing to animate.
            </p>
            <div className="portfolio-snippet__body">
              <pre>
                <code
                  className="hljs language-typescript"
                  dangerouslySetInnerHTML={{ __html: SNIPPET_CONSTRUCT }}
                />
              </pre>
              <div
                className="portfolio-snippet__demo"
                id={SLOT_IDS.demoField}
                dangerouslySetInnerHTML={{ __html: demoFieldHTML }}
                suppressHydrationWarning
              />
            </div>
          </article>

          <article className="portfolio-snippet">
            <h3 className="portfolio-snippet__heading">2. Assign moves and play</h3>
            <p className="portfolio-snippet__caption">
              <code>setMove</code> binds a named route from the move catalog to one of the
              eleven positions. <code>play()</code> returns a Promise that resolves when every
              per-player animation chain finishes.
            </p>
            <div className="portfolio-snippet__body">
              <pre>
                <code
                  className="hljs language-typescript"
                  dangerouslySetInnerHTML={{ __html: SNIPPET_SETMOVE }}
                />
              </pre>
              <div
                className="portfolio-snippet__demo"
                id={SLOT_IDS.demoSetmove}
                dangerouslySetInnerHTML={{ __html: demoSetmoveHTML }}
                suppressHydrationWarning
              />
            </div>
          </article>

          <article className="portfolio-snippet">
            <h3 className="portfolio-snippet__heading">3. Spawn a sandbox UI</h3>
            <p className="portfolio-snippet__caption">
              <code>spawnSandbox</code> renders eleven dropdowns wired to <code>setMove</code> —
              an end-user UI for composing plays without writing code. Each pick is applied
              immediately; no Confirm step.
            </p>
            <div className="portfolio-snippet__body">
              <pre>
                <code
                  className="hljs language-typescript"
                  dangerouslySetInnerHTML={{ __html: SNIPPET_SANDBOX }}
                />
              </pre>
              <div className="portfolio-snippet__demo" id={SLOT_IDS.demoSbDemo}>
                <div
                  id={SLOT_IDS.demoSbField}
                  dangerouslySetInnerHTML={{ __html: demoSbFieldHTML }}
                  suppressHydrationWarning
                />
                <div
                  id={SLOT_IDS.demoSbControls}
                  dangerouslySetInnerHTML={{ __html: demoSbControlsHTML }}
                  suppressHydrationWarning
                />
              </div>
            </div>
          </article>

          <article className="portfolio-snippet">
            <h3 className="portfolio-snippet__heading">4. Bind a playbook to a field</h3>
            <p className="portfolio-snippet__caption">
              Passing a <code>field</code> to <code>Playbook</code> wires each page&apos;s{" "}
              <em>Initialize Play</em> button to load that page&apos;s saved move list back into
              the displayer. Flip the book, hit Initialize Play, then Play Animation.
            </p>
            <div className="portfolio-snippet__body">
              <pre>
                <code
                  className="hljs language-typescript"
                  dangerouslySetInnerHTML={{ __html: SNIPPET_BOOKFIELD }}
                />
              </pre>
              <div className="portfolio-snippet__demo" id={SLOT_IDS.demoBfDemo}>
                <div
                  id={SLOT_IDS.demoBfField}
                  dangerouslySetInnerHTML={{ __html: demoBfFieldHTML }}
                  suppressHydrationWarning
                />
                <div
                  id={SLOT_IDS.demoBfBook}
                  dangerouslySetInnerHTML={{ __html: demoBfBookHTML }}
                  suppressHydrationWarning
                />
              </div>
            </div>
          </article>

          <article className="portfolio-snippet">
            <h3 className="portfolio-snippet__heading">
              5. Compose with <code>createConnectedLayout</code>
            </h3>
            <p className="portfolio-snippet__caption">
              The helper mounts a responsive shell and returns three slot IDs. Above 1400&nbsp;px
              the book sits on the left with field + sandbox stacked on the right; below that,
              everything stacks vertically.
            </p>
            <div className="portfolio-snippet__body">
              <pre>
                <code
                  className="hljs language-typescript"
                  dangerouslySetInnerHTML={{ __html: SNIPPET_CONNECTED }}
                />
              </pre>
            </div>
          </article>
        </section>

        <div
          className="showcase"
          id={SLOT_IDS.cloneWrap}
          dangerouslySetInnerHTML={{ __html: cloneHTML }}
          suppressHydrationWarning
        />

        <footer className="portfolio-footer">
          <ul className="portfolio-footer__links">
            <li>
              <a
                href="https://github.com/connorburns19/Playbook.ts"
                target="_blank"
                rel="noopener"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://github.com/connorburns19/Playbook.ts/blob/main/PLAN.md"
                target="_blank"
                rel="noopener"
              >
                Roadmap
              </a>
            </li>
          </ul>
          <p className="portfolio-footer__meta">MIT</p>
        </footer>
      </main>

      <PlaybookClient />
    </div>
  );
}
