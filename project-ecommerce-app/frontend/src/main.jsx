import './index.css';

import { QueryClient, QueryClientProvider } from 'react-query';

import App from './App.jsx';
import { CartProvider } from './context/CartContext.jsx';
import KeycloakProviderWithNavigate from './auth/KeycloakProviderWithNavigate.jsx';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { SearchProvider } from './context/SearchContext.jsx';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

ReactDOM.createRoot(document.getElementById('root')).render(
	<Router>
		<QueryClientProvider client={queryClient}>
			<KeycloakProviderWithNavigate>
				<SearchProvider>
					<CartProvider>
						<App />
					</CartProvider>
				</SearchProvider>
			</KeycloakProviderWithNavigate>
		</QueryClientProvider>
	</Router>
);
