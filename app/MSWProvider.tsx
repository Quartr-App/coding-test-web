"use client";

import {
	useEffect,
	useState,
	FunctionComponent as FC,
	PropsWithChildren as Props,
} from "react";

export const MSWInjection: FC<Props<{}>> = ({ children }) => {
	const [mswReady, setMswReady] = useState(
		process.env.NODE_ENV !== "development",
	);

	useEffect(() => {
		async function initMSW() {
			if (process.env.NODE_ENV === "development") {
				const { worker } = await import("../mocks/browser");

				await worker.start({
					onUnhandledRequest: "bypass",
				});

				setMswReady(true);
			}
		}

		initMSW();
	}, []);

	if (!mswReady) return null;

	return <>{children}</>;
};
