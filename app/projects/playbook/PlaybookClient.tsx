"use client";

import { useEffect } from "react";
import {
  PlayDisplayer,
  Playbook,
  hydrateConnectedLayout,
} from "@connorburns/playbook";
import { DEMO_PAGES, SLOT_IDS } from "./playbook-data";

export function PlaybookClient() {
  useEffect(() => {
    function firstChild(id: string): HTMLElement {
      return document.getElementById(id)!.firstElementChild as HTMLElement;
    }

    /* -------------------- Hero: full connected layout -------------------- */
    const heroWrapEl = document.getElementById(SLOT_IDS.heroWrap)!;
    const heroLayout = hydrateConnectedLayout(
      heroWrapEl.firstElementChild as HTMLElement,
      { idSuffix: SLOT_IDS.heroSuffix },
    );
    const heroField = PlayDisplayer.hydrate(firstChild(heroLayout.fieldSlot), {
      size: "large",
      name: "Example",
    });
    const heroBook = Playbook.hydrate(firstChild(heroLayout.bookSlot), {
      title: "Example",
      field: heroField,
      allowSave: true,
      pageOrientation: "vertical",
      pages: DEMO_PAGES,
    });
    const heroSandboxEl = firstChild(heroLayout.sandboxSlot);
    heroField.spawnSandbox(true, null, heroBook.createSaveButton(), SLOT_IDS.heroSuffix, heroSandboxEl);

    /* ---- Snippet 1: bare field ---- */
    const demoField = PlayDisplayer.hydrate(firstChild(SLOT_IDS.demoField), {
      size: "large",
      name: "Bare field",
    });

    /* ---- Snippet 2: field with preset moves ---- */
    const demoSetmove = PlayDisplayer.hydrate(firstChild(SLOT_IDS.demoSetmove), {
      size: "large",
      name: "Preset play",
    });
    demoSetmove.setMove("lte", "straight-deep");
    demoSetmove.setMove("rte", "mid-90-right");
    demoSetmove.setMove("qb", "pass-qb");
    demoSetmove.setMove("fb", "hole-four-fb");

    /* ---- Snippet 3: field + sandbox ---- */
    const demoSandboxField = PlayDisplayer.hydrate(firstChild(SLOT_IDS.demoSbField), {
      size: "large",
      name: "Sandbox field",
    });
    const sbControlsEl = firstChild(SLOT_IDS.demoSbControls);
    demoSandboxField.spawnSandbox(false, null, null, "demo-sb", sbControlsEl);

    /* ---- Snippet 4: book + field ---- */
    const demoBfField = PlayDisplayer.hydrate(firstChild(SLOT_IDS.demoBfField), {
      size: "large",
      name: "Book and field",
    });
    const demoBfBook = Playbook.hydrate(firstChild(SLOT_IDS.demoBfBook), {
      title: "Playbook",
      field: demoBfField,
      allowSave: false,
      pageOrientation: "vertical",
      pages: DEMO_PAGES,
    });

    /* ---- Clone connected layout (bottom of page) ---- */
    const cloneWrapEl = document.getElementById(SLOT_IDS.cloneWrap)!;
    const cloneLayout = hydrateConnectedLayout(
      cloneWrapEl.firstElementChild as HTMLElement,
      { idSuffix: SLOT_IDS.cloneSuffix },
    );
    const cloneField = PlayDisplayer.hydrate(firstChild(cloneLayout.fieldSlot), {
      size: "large",
      name: "Example",
    });
    const cloneBook = Playbook.hydrate(firstChild(cloneLayout.bookSlot), {
      title: "Example",
      field: cloneField,
      allowSave: true,
      pageOrientation: "vertical",
      pages: DEMO_PAGES,
    });
    const cloneSandboxEl = firstChild(cloneLayout.sandboxSlot);
    cloneField.spawnSandbox(true, null, cloneBook.createSaveButton(), SLOT_IDS.cloneSuffix, cloneSandboxEl);

    return () => {
      heroField.destroy();
      heroBook.destroy();
      heroLayout.destroy();

      demoField.destroy();
      demoSetmove.destroy();

      demoSandboxField.destroy();

      demoBfField.destroy();
      demoBfBook.destroy();

      cloneField.destroy();
      cloneBook.destroy();
      cloneLayout.destroy();
    };
  }, []);

  return null;
}
