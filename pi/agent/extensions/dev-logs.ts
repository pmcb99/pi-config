import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
import { Type } from "typebox";
import { execSync } from "node:child_process";

export default function (pi: ExtensionAPI) {
  pi.registerTool({
    name: "dev_logs",
    label: "Dev Server Logs",
    description:
      "Capture the latest output from the dev server running in the other tmux pane. " +
      "Use this to check build errors, console logs, hot-reload status, or runtime output " +
      "without leaving the agent session. Returns the last N lines of the adjacent pane.",
    promptSnippet: "Check dev server logs, build errors, and console output from the other tmux pane",
    promptGuidelines: [
      "Use dev_logs to check the dev server state after making changes that could affect the build or runtime.",
      "Use dev_logs before reporting that a change is working — verify it against actual dev server output.",
    ],
    parameters: Type.Object({
      lines: Type.Optional(
        Type.Number({
          description: "Number of lines to capture from the end of the pane (default 80)",
          default: 80,
        })
      ),
    }),
    async execute(_toolCallId, params, _signal, _onUpdate, _ctx) {
      const lines = params.lines ?? 80;

      try {
        // Capture the pane before the current one in the same tmux window
        const output = execSync(
          `tmux capture-pane -t "{previous}" -p -S -${lines}`,
          { encoding: "utf8", timeout: 5000 }
        );

        if (!output.trim()) {
          return {
            content: [
              {
                type: "text",
                text: "Dev pane is empty (no output captured). Is `bun run dev` running?",
              },
            ],
            details: {},
          };
        }

        return {
          content: [
            {
              type: "text",
              text: `Last ${lines} lines from dev server pane:\n\`\`\`\n${output.trimEnd()}\n\`\`\``,
            },
          ],
          details: { lines, source: "tmux" },
        };
      } catch (err: any) {
        return {
          content: [
            {
              type: "text",
              text: `Failed to capture dev pane: ${err.message}. Make sure you're running inside tmux with a split pane.`,
            },
          ],
          details: { error: err.message },
        };
      }
    },
  });
}
