"use client";

/**
 * Playbook interactive demo — connorburns.dev/projects/playbook.
 *
 * Ported from the V2 prototype (demo/portfolio/ in the Playbook.js-V2 repo).
 * The library mounts imperatively by element id, so this is a client
 * component: every widget is created in a useEffect and torn down in its
 * cleanup. That cleanup is load-bearing — React StrictMode runs effects
 * mount → unmount → remount in dev, so without destroy() calls the widgets
 * double up. See PortfolioPreparation.md (Task 3) for the full rationale.
 */

import { useEffect, useId } from "react";
import {
  PlayDisplayer,
  Playbook,
  createConnectedLayout,
} from "@connorburns/playbook";
import type { PageMoves } from "@connorburns/playbook";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/github-dark.css";
import "@connorburns/playbook/styles.css";
import "./playbook-demo.css";

hljs.registerLanguage("typescript", typescript);

// hljs.highlight is a pure string → string transform. Running it at module
// scope (not in an effect) means SSR and the client produce identical markup,
// so the dangerouslySetInnerHTML output hydrates without mismatch and React
// never owns — or clobbers — the highlighted spans. This sidesteps the
// prototype's hljs.highlightAll()-on-DOMContentLoaded approach, which never
// fires under React and fights reconciliation.
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

// The two demo plays reused across mount points. Typed as PageMoves so the
// move-name string literals are checked against the catalog rather than
// widening to string (which inline-literal call sites get for free via
// contextual typing, but extracted consts don't).
const HAIL_MARY: PageMoves = {
  lte: "straight-deep",
  lt: "mid-90-left",
  rt: "mid-90-right",
  rte: "straight-deep",
  qb: "pass-qb",
  fb: "hole-four-fb",
};

const LEFT_HANDOFF: PageMoves = {
  qb: "hand-off-left-qb",
  lhb: "hole-one-lhb",
  fb: "hole-two-fb",
  rhb: "hole-five-rhb",
};

export default function PlaybookDemoPage() {
  // One SSR-safe unique id per mount point. The library resolves each via
  // document.getElementById, and useId's colons are fine for getElementById.
  const heroId = useId();
  const demoFieldId = useId();
  const demoSetmoveId = useId();
  const demoSandboxFieldId = useId();
  const demoSandboxControlsId = useId();
  const demoBookfieldFieldId = useId();
  const demoBookfieldBookId = useId();
  const demoConnectedId = useId();

  useEffect(() => {
    /* -------------------- Hero: full connected layout -------------------- */
    const heroLayout = createConnectedLayout(heroId);
    const heroField = new PlayDisplayer({
      size: "large",
      name: "Example",
      parentId: heroLayout.fieldSlot,
    });
    const heroBook = new Playbook({
      title: "Example",
      field: heroField,
      allowSave: true,
      pageOrientation: "vertical",
      parentId: heroLayout.bookSlot,
    });
    heroField.spawnSandbox(true, heroLayout.sandboxSlot, heroBook.createSaveButton());
    heroBook.addPage(
      "/images/hailmaryout.png",
      "Hail Mary Out",
      "https://youtu.be/qyqCTMirNWg?t=289",
      HAIL_MARY,
    );
    heroBook.addPage("/images/lbhandoff.png", "Left Handoff FB", null, LEFT_HANDOFF);

    /* ---- Snippet 1: bare field — no moves, Play Animation auto-disables ---- */
    const demoField = new PlayDisplayer({ size: "large", parentId: demoFieldId });

    /* ---- Snippet 2: field with moves preset — Play Animation is live ---- */
    const demoSetmove = new PlayDisplayer({ size: "large", parentId: demoSetmoveId });
    demoSetmove.setMove("lte", "straight-deep");
    demoSetmove.setMove("rte", "mid-90-right");
    demoSetmove.setMove("qb", "pass-qb");
    demoSetmove.setMove("fb", "hole-four-fb");

    /* ---- Snippet 3: field + sandbox (no book) ---- */
    const demoSandboxField = new PlayDisplayer({
      size: "large",
      parentId: demoSandboxFieldId,
    });
    demoSandboxField.spawnSandbox(false, demoSandboxControlsId);

    /* ---- Snippet 4: book + field bound (no sandbox) ---- */
    const demoBookField = new PlayDisplayer({
      size: "large",
      parentId: demoBookfieldFieldId,
    });
    const demoBook = new Playbook({
      title: "Playbook",
      field: demoBookField,
      allowSave: false,
      pageOrientation: "vertical",
      parentId: demoBookfieldBookId,
    });
    demoBook.addPage("/images/hailmaryout.png", "Hail Mary Out", null, HAIL_MARY);
    demoBook.addPage("/images/lbhandoff.png", "Left Handoff FB", null, LEFT_HANDOFF);

    /* -------------------- Snippet 5 clone (bottom of page) -------------------- */
    const cloneLayout = createConnectedLayout(demoConnectedId);
    const cloneField = new PlayDisplayer({ size: "large", parentId: cloneLayout.fieldSlot });
    const cloneBook = new Playbook({
      title: "Example",
      field: cloneField,
      allowSave: true,
      pageOrientation: "vertical",
      parentId: cloneLayout.bookSlot,
    });
    cloneField.spawnSandbox(true, cloneLayout.sandboxSlot, cloneBook.createSaveButton());
    cloneBook.addPage(
      "/images/hailmaryout.png",
      "Hail Mary Out",
      "https://youtu.be/qyqCTMirNWg?t=289",
      HAIL_MARY,
    );
    cloneBook.addPage("/images/lbhandoff.png", "Left Handoff FB", null, LEFT_HANDOFF);

    // Tear down every instance on unmount (and on StrictMode's dev remount).
    // Layouts last — they only own the scaffold, not the widgets in their slots.
    return () => {
      heroField.destroy();
      heroBook.destroy();
      heroLayout.destroy();

      demoField.destroy();
      demoSetmove.destroy();

      demoSandboxField.destroy();

      demoBookField.destroy();
      demoBook.destroy();

      cloneField.destroy();
      cloneBook.destroy();
      cloneLayout.destroy();
    };
  }, [
    heroId,
    demoFieldId,
    demoSetmoveId,
    demoSandboxFieldId,
    demoSandboxControlsId,
    demoBookfieldFieldId,
    demoBookfieldBookId,
    demoConnectedId,
  ]);

  return (
    <div data-pb-theme="dark" className="portfolio-page">
      <main className="portfolio-shell">
        <header className="portfolio-header">
          <h1 className="portfolio-title">Playbook</h1>
          <p className="portfolio-tagline">
            A tiny TypeScript library for creating, saving, and animating American Football
            play diagrams. Built on the Web Animations API with no runtime dependencies.
          </p>
        </header>

        <section aria-label="Live demo">
          <h2 className="portfolio-section-label">Try it</h2>
          <div className="showcase" id={heroId}></div>
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
              <div className="portfolio-snippet__demo" id={demoFieldId}></div>
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
              <div className="portfolio-snippet__demo" id={demoSetmoveId}></div>
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
              <div className="portfolio-snippet__demo">
                <div id={demoSandboxFieldId}></div>
                <div id={demoSandboxControlsId}></div>
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
              <div className="portfolio-snippet__demo">
                <div id={demoBookfieldFieldId}></div>
                <div id={demoBookfieldBookId}></div>
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

        <div className="showcase" id={demoConnectedId}></div>

        <footer className="portfolio-footer">
          <ul className="portfolio-footer__links">
            <li>
              <a
                href="https://github.com/connorburns19/Playbook.js-V2"
                target="_blank"
                rel="noopener"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://github.com/connorburns19/Playbook.js-V2/blob/main/PLAN.md"
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
    </div>
  );
}
