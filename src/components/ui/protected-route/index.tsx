import { useAuth } from "@/providers/auth-context-provider"
import type React from "react"
import { useEffect, useState } from "react"
import { Navigate, useLocation } from "react-router"

/**
 * Props for the ProtectedRoute component
 */
interface ProtectedRouteProps {
  children: React.ReactNode
  redirectPath?: string
  preloadData?: () => Promise<void>
  requiredPermissions?: string[]
  fallbackComponent?: React.ReactNode
}

/**
 * ProtectedRoute component
 *
 * This component:
 * - Checks if the user is authenticated
 * - Redirects to login if not authenticated
 * - Optionally preloads data after authentication is confirmed
 * - Optionally checks for required permissions
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectPath = "/login",
  preloadData,
  requiredPermissions,
  fallbackComponent,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth()
  const [isPreloading, setIsPreloading] = useState(!!preloadData)
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)
  const location = useLocation()

  // Handle data preloading after authentication is confirmed
  useEffect(() => {
    if (isAuthenticated && preloadData && isPreloading) {
      const loadData = async () => {
        try {
          await preloadData()
        } catch (error) {
          console.error("Error preloading data:", error)
        } finally {
          setIsPreloading(false)
        }
      }

      loadData()
    } else if (!preloadData) {
      setIsPreloading(false)
    }
  }, [isAuthenticated, preloadData, isPreloading])

  // Check permissions if required
  useEffect(() => {
    if (!requiredPermissions || requiredPermissions.length === 0) {
      setHasPermission(true)
      return
    }

    if (!isAuthenticated || !user) {
      setHasPermission(false)
      return
    }

    // This is a placeholder for permission checking
    // In a real application, you would check the user's permissions against the required permissions
    // For now, we'll just assume the user has all required permissions
    setHasPermission(true)

    // Example of how to check permissions:
    // const checkPermissions = async () => {
    //   try {
    //     const userPermissions = await getUserPermissions(user.localAccountId);
    //     const hasAllPermissions = requiredPermissions.every(perm => userPermissions.includes(perm));
    //     setHasPermission(hasAllPermissions);
    //   } catch (error) {
    //     console.error('Error checking permissions:', error);
    //     setHasPermission(false);
    //   }
    // };
    //
    // checkPermissions();
  }, [isAuthenticated, user, requiredPermissions])

  // Show loading indicator while checking authentication or preloading data
  if (isLoading || isPreloading || hasPermission === null) {
    return (
      <div className="auth-loading">
        <div className="spinner"></div>
        <p>{isPreloading ? "Loading data..." : "Verifying authentication..."}</p>
      </div>
    )
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} state={{ from: location }} replace />
  }

  // Show fallback component if user doesn't have required permissions
  if (requiredPermissions && !hasPermission) {
    if (fallbackComponent) {
      return <>{fallbackComponent}</>
    }

    return (
      <div className="permission-denied">
        <h2>Access Denied</h2>
        <p>You don't have permission to access this page.</p>
      </div>
    )
  }

  // Render children if authenticated and has required permissions
  return <>{children}</>
}

export default ProtectedRoute
