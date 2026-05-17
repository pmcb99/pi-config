import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

const TRIGGERS = ["mm1", "mm2"] as const;

const SHORTCUTS: Record<string, { provider: string; model: string; label: string; thinking: string }> = {
	mm1: { provider: "openai-codex", model: "gpt-5.5", label: "GPT 5.5", thinking: "low" },
	mm2: { provider: "zai", model: "glm-5.1", label: "GLM 5.1", thinking: "medium" },
};

export default function modelSwitcher(pi: ExtensionAPI) {
	let ctx: ExtensionContext | undefined;
	let pending: ReturnType<typeof setTimeout> | undefined;

	function clearPending() {
		if (pending) {
			clearTimeout(pending);
			pending = undefined;
		}
	}

	function isCtxActive(): boolean {
		return ctx != null && ctx.isActive;
	}

	pi.on("session_shutdown", () => {
		clearPending();
		ctx = undefined;
	});

	pi.on("session_start", async (_event, _ctx) => {
		clearPending();
		ctx = _ctx;

		ctx.ui.onTerminalInput(() => {
			clearPending();
			pending = setTimeout(() => {
				pending = undefined;
				if (!isCtxActive()) return;
				const text = ctx.ui.getEditorText() ?? "";
				for (const trig of TRIGGERS) {
					if (!text.endsWith(trig)) continue;
					const before = text.slice(0, -trig.length);
					if (before.length > 0 && /\w/.test(before.slice(-1))) continue;
					ctx.ui.setEditorText(before);
					switchModel(SHORTCUTS[trig]);
					return;
				}
			}, 0);
		});
	});

	async function switchModel(target: { provider: string; model: string; label: string }) {
		if (!isCtxActive()) return;
		const model = ctx.modelRegistry.find(target.provider, target.model);
		if (model) {
			const ok = await pi.setModel(model);
			if (!isCtxActive()) return;
			if (ok) pi.setThinkingLevel(target.thinking as any);
			ctx.ui.notify(ok ? `→ ${target.label}` : `No API key for ${target.label}`, ok ? "info" : "error");
		} else {
			ctx.ui.notify(`${target.label} not found`, "error");
		}
	}
}
