import './style.scss'
import {AuthProvider} from './features/auth/auth.context'
import AppRoutes from './AppRoutes'
const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
