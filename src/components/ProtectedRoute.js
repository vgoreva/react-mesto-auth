import { Navigate } from 'react-router-dom';

function ProtectedRoute ({ element: Componеnt, loggedIn, ...props}) {
    // loggedIn ?
    // <Component {...props} />
// :<Navigate to={"/sign-in"}  replace />

return (
    loggedIn ? 
    <Componеnt {...props} /> 
    : <Navigate to={'/sign-in'} replace/>
)
}

export default ProtectedRoute