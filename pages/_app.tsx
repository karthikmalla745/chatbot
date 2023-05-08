import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import theme from '../config/theme';
import {ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {AuthProvider} from '../contexts/AuthContext';
export default function App({ Component, pageProps }: AppProps) {
  return <>
   <AuthProvider>
      <ThemeProvider theme={theme}>
          <CssBaseline/>
          
          <Component {...pageProps} />
      </ThemeProvider>
   </AuthProvider>
  </>
 
}
