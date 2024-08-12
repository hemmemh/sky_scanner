'use client'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { ErrorBoundary } from 'react-error-boundary'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { Fallback } from '@/components/shared/ui/fallback'
import { Provider } from 'react-redux'
import { store } from '../store'
import '@/components/app/i18n';
export function Providers({children}: { children: React.ReactNode }) {


  

  return (
    <ErrorBoundary  FallbackComponent={Fallback}>

<Provider store={store}>
<LocalizationProvider dateAdapter={AdapterDayjs}>
      {children}
      </LocalizationProvider>
</Provider>
 
      </ErrorBoundary>
  )
}