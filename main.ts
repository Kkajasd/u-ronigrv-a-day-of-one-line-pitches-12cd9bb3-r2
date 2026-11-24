import { mkdirSync, writeFileSync } from "node:fs";

// One sentence pitching a friend who has never coded to let an AI agent
// build their first app idea on make.fun.
// Deterministic: the same text on every run. No network, no file reads.
// Never deletes /output: the dir is created if missing and entry.txt is
// written in place (the sandbox bind-mounts /output).
// Why this line: it opens by taking away the friend's three assumed
// barriers in one breath — no coder, no budget, no code — then names the
// only ask (describe it in plain words) and ends on a concrete payoff
// they can picture today: a working first version they can try. Truthful
// (make.fun agents build a first version from a plain-words description),
// clear on first pass, and short (under the 240 cap).
const LINE =
  "Your app idea doesn't need a coder, a budget, or a single line of code — just describe it in plain words and an AI agent on make.fun will build you a working first version you can try today.";

// The bounty caps the sentence at 240 characters, counted as Unicode code
// points: fail loudly here rather than ship an over-long or multi-line
// entry that the gate would refuse.
if ([...LINE].length > 240 || LINE.includes("\n")) {
  throw new Error("entry line must be one sentence of at most 240 characters");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
