import type { ExtensionAPI, ReadToolDetails } from "@earendil-works/pi-coding-agent";
import { createReadTool } from "@earendil-works/pi-coding-agent";
import { Text } from "@earendil-works/pi-tui";

export default function (pi: ExtensionAPI) {
	const cwd = process.cwd();
	const originalRead = createReadTool(cwd);

	pi.registerTool({
		name: "read",
		label: "read",
		description: originalRead.description,
		parameters: originalRead.parameters,

		async execute(toolCallId, params, signal, onUpdate) {
			return originalRead.execute(toolCallId, params, signal, onUpdate);
		},

		renderResult(result, { expanded, isPartial }, theme, _context) {
			if (isPartial) return new Text(theme.fg("warning", "Reading..."), 0, 0);

			const details = result.details as ReadToolDetails | undefined;
			const content = result.content[0];

			if (content?.type === "image") {
				return new Text(theme.fg("success", "✓ image loaded"), 0, 0);
			}

			if (content?.type !== "text") {
				return new Text(theme.fg("success", "✓ read"), 0, 0);
			}

			const lineCount = content.text.split("\n").length;

			if (expanded) {
				const lines = content.text.split("\n").slice(0, 20);
				let text = lines.map(l => theme.fg("dim", l)).join("\n");
				if (lineCount > 20) {
					text += `\n${theme.fg("muted", `... ${lineCount - 20} more`)}`;
				}
				return new Text(text, 0, 0);
			}

			return new Text("", 0, 0);
		},
	});
}
