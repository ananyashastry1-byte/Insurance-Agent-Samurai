import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const savedAgent = localStorage.getItem("agent");

    if (!savedAgent) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default ProtectedRoute;