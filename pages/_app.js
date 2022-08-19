
import "../styles/globals.css";
import AuthProvider from "../contexts/AuthContext"
import NftsProvider  from "../contexts/NftsContext"

function MyApp({ Component, pageProps }) {
return (
    <AuthProvider>
      <NftsProvider>
        <Component {...pageProps} />
      </NftsProvider>
    </AuthProvider>
)
}

export default MyApp;