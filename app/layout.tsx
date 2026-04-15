import { createGlobalStyle } from 'styled-components';
import { MSWInjection } from './MSWProvider';

import StyledComponentsRegistry from "./styledComponentsRegistry";

const GlobalStyle = createGlobalStyle`
* {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
}
html, body {
	max-width: 100vw;
	overflow-x: hidden;
	padding: 1rem;
}
body {
	color: #333;
	background: #f1f1f1;
}
a {
	color: inherit;
	text-decoration: none;
}
`;

export default function RootLayout({ children, }: { children: React.ReactNode; }) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="color-scheme" content="light" />
			</head>
			<body>
				<StyledComponentsRegistry>
					<GlobalStyle />
					<MSWInjection>
						{children}
					</MSWInjection>
				</StyledComponentsRegistry>
			</body>
		</html>
	);
}
