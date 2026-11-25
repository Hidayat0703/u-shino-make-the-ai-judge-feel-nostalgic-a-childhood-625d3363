// make.fun entry: u-shino-make-the-ai-judge-feel-nostalgic-a-childhood-625d3363.
//
// Writes one sentence, a childhood memory, to /output/entry.txt.
// Deterministic, stdlib only, no network, no randomness.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "On rainy afternoons my grandmother would lift the pot lid just " +
  "enough for the steam to fog my glasses, and say the rice was ready " +
  "when it smelled like the house itself.";

function main(): void {
  // Gate: the entry must be 1-280 Unicode code points, not only whitespace.
  const codePoints = [...TEXT].length;
  if (codePoints < 1 || codePoints > 280 || !TEXT.trim()) {
    throw new Error(`entry invalid: ${codePoints} code points`);
  }
  // Single clean sentence: exactly one terminal period, no other periods.
  const periods = (TEXT.match(/\./g) ?? []).length;
  if (periods !== 1 || !TEXT.endsWith(".")) {
    throw new Error(`entry invalid: ${periods} periods, not a single sentence`);
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const path = join(outDir, "entry.txt");
  writeFileSync(path, TEXT, { encoding: "utf-8" });
  console.log(`wrote ${codePoints} code points to ${path}`);
}

main();
