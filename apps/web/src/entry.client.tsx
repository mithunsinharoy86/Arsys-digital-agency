// Guard against browser extensions (e.g. Grammarly, password managers) and Chrome's
// automatic translation modifying DOM nodes outside React's virtual DOM tree.
// Without this defensive guard, React crashes during page navigation with:
// "NotFoundError: Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node."
if (typeof window !== 'undefined') {
	const originalRemoveChild = Node.prototype.removeChild;
	Node.prototype.removeChild = function <T extends Node>(child: T): T {
		if (child.parentNode !== this) {
			if (typeof console !== 'undefined' && console.warn) {
				console.warn('DOM child mismatch detected; preventing React crash on removeChild:', child, this);
			}
			return child;
		}
		return originalRemoveChild.call(this, child) as T;
	};

	const originalInsertBefore = Node.prototype.insertBefore;
	Node.prototype.insertBefore = function <T extends Node>(newNode: T, referenceNode: Node | null): T {
		if (referenceNode && referenceNode.parentNode !== this) {
			if (typeof console !== 'undefined' && console.warn) {
				console.warn('DOM referenceNode mismatch detected; preventing React crash on insertBefore:', referenceNode, this);
			}
			return newNode;
		}
		return originalInsertBefore.call(this, newNode, referenceNode) as T;
	};
}

import { startTransition, StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { HydratedRouter } from 'react-router/dom';
import { isHydrationError, reportHydrationError } from 'virtual:horizons-runtime';

function onRecoverableError(error: unknown, errorInfo: { componentStack?: string }) {
	try {
		if (isHydrationError(error)) {
			reportHydrationError({ error, componentStack: errorInfo?.componentStack });

			return;
		}
	} catch {
		reportError(error);

		return;
	}

	reportError(error);
}

startTransition(() => {
	hydrateRoot(
		document,
		<StrictMode>
			<HydratedRouter />
		</StrictMode>,
		{ onRecoverableError },
	);
});
