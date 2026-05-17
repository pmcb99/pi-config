import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";

/**
 * Makes the terminal cursor blink while pi is running.
 *
 * Requires "Show hardware cursor" to be enabled in pi settings.
 * Toggle it via pi's settings panel (Ctrl+, or :settings).
 *
 * DECSCUSR escape sequences (change to pick your shape):
 *   \x1b[1 q  = blinking block
 *   \x1b[3 q  = blinking underline
 *   \x1b[5 q  = blinking bar (I-beam)   ← current default
 */
export default function blinkCursor(pi: ExtensionAPI) {
	pi.on("session_start", async () => {
		// Blinking bar cursor
		process.stdout.write("\x1b[5 q");
	});

	pi.on("session_shutdown", async () => {
		// Reset to terminal default
		process.stdout.write("\x1b[0 q");
	});
}
