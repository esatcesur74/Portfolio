import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const page = await readFile(new URL("../src/app/page.tsx", import.meta.url), "utf8");
const styles = await readFile(new URL("../src/app/globals.css", import.meta.url), "utf8");
const layout = await readFile(new URL("../src/app/layout.tsx", import.meta.url), "utf8");

test("independent work is placed before the academic section", () => {
  const independent = page.indexOf('id="independent-work"');
  const academic = page.indexOf('id="academic-lab"');

  assert.ok(independent >= 0, "independent work section is missing");
  assert.ok(independent < academic, "independent work should precede academic work");
});

test("all three independent projects expose the correct destinations", () => {
  assert.match(page, /https:\/\/esatcesur74\.github\.io\/Concept-Restaurant\//);
  assert.match(page, /https:\/\/esatcesur74\.github\.io\/gsap_training\//);
  assert.match(page, /https:\/\/github\.com\/esatcesur74\/scout/);
});

test("external project links have contextual cursor labels", () => {
  assert.match(page, /data-cursor-label="Visit concept"/);
  assert.match(page, /data-cursor-label="Open gallery"/);
  assert.match(page, /data-cursor-label="View on GitHub"/);
});

test("Liva Concept uses the supplied restaurant artwork", () => {
  assert.match(
    page,
    /<img src="\/images\/conceptrestaurant\.png" alt="Liva Concept restaurant website preview" \/>/,
  );
});

test("eScout is identified as work in progress with verified scope figures", () => {
  assert.match(page, /Work in progress/);
  assert.match(page, /230/);
  assert.match(page, /462/);
});

test("eScout status is part of its own header instead of overlapping absolute labels", () => {
  assert.match(
    page,
    /<div className="scout-preview-head"><span>03 · eScout \/ system fit<\/span><span>Work in progress<\/span><\/div>/,
  );
  assert.doesNotMatch(page, /<span className="independent-state">Work in progress<\/span>/);
});

test("the portrait metadata icon is not overridden by a conventional favicon", async () => {
  assert.match(layout, /icons:\s*\{\s*icon:\s*"\/images\/realisticsiyah3\.png"\s*\}/);
  await assert.rejects(access(new URL("../src/app/favicon.ico", import.meta.url)));
});

test("section numbering remains sequential", () => {
  assert.match(page, /04 · Independent work/);
  assert.match(page, /05 · Academic lab/);
  assert.match(page, /06 · Brand &amp; creative direction/);
});

test("independent work collapses to one column on phones", () => {
  assert.match(styles, /@media \(max-width: 640px\)[\s\S]*\.independent-grid\s*\{[\s\S]*grid-template-columns:\s*1fr/);
});
