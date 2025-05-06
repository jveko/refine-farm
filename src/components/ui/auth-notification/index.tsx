import { AUTH_NOTIFICATION_DURATION } from "@/constants"
import { notification } from "antd"
import type React from "react"
import { useEffect, useState } from "react"

/**
 * Auth notification event detail
 */
interface AuthNotificationDetail {
  message: string
  description?: string
  type?: "success" | "info" | "warning" | "error"
  duration?: number
}

/**
 * Props for the AuthNotificationProvider component
 */
interface AuthNotificationProviderProps {
  children: React.ReactNode
}

/**
 * AuthNotificationProvider component
 *
 * This component listens for authentication-related events and shows notifications
 */
export const AuthNotificationProvider: React.FC<AuthNotificationProviderProps> = ({ children }) => {
  // Set up notification API
  const [api, contextHolder] = notification.useNotification()

  // Listen for auth events
  useEffect(() => {
    // Handle auth success
    const handleAuthSuccess = (event: CustomEvent) => {
      const detail = event.detail
      api.success({
        message: "Authentication Successful",
        description: detail.message || "You have been successfully authenticated.",
        duration: AUTH_NOTIFICATION_DURATION / 1000,
      })
    }

    // Handle auth error
    const handleAuthError = (event: CustomEvent) => {
      const detail = event.detail
      api.error({
        message: "Authentication Error",
        description: detail.message || "An error occurred during authentication.",
        duration: AUTH_NOTIFICATION_DURATION / 1000,
      })
    }

    // Handle auth refresh
    const handleAuthRefresh = (event: CustomEvent) => {
      const detail = event.detail
      api.info({
        message: "Session Refresh",
        description: detail.message || "Refreshing your session...",
        duration: AUTH_NOTIFICATION_DURATION / 1000,
      })
    }

    // Handle auth refresh complete
    const handleAuthRefreshComplete = (event: CustomEvent) => {
      const detail = event.detail
      api.success({
        message: "Session Refreshed",
        description: detail.message || "Your session has been refreshed.",
        duration: AUTH_NOTIFICATION_DURATION / 1000,
      })
    }

    // Handle auth logout
    const handleAuthLogout = (event: CustomEvent) => {
      const detail = event.detail
      api.info({
        message: "Logged Out",
        description: detail.message || "You have been logged out.",
        duration: AUTH_NOTIFICATION_DURATION / 1000,
      })
    }

    // Handle generic auth notification
    const handleAuthNotification = (event: CustomEvent) => {
      const detail: AuthNotificationDetail = event.detail

      if (!detail || !detail.message) return

      const type = detail.type || "info"
      const duration = detail.duration !== undefined ? detail.duration / 1000 : AUTH_NOTIFICATION_DURATION / 1000

      switch (type) {
        case "success":
          api.success({
            message: detail.message,
            description: detail.description,
            duration,
          })
          break
        case "warning":
          api.warning({
            message: detail.message,
            description: detail.description,
            duration,
          })
          break
        case "error":
          api.error({
            message: detail.message,
            description: detail.description,
            duration,
          })
          break
        default:
          api.info({
            message: detail.message,
            description: detail.description,
            duration,
          })
          break
      }
    }

    // Add event listeners
    window.addEventListener("auth-success", handleAuthSuccess as EventListener)
    window.addEventListener("auth-error", handleAuthError as EventListener)
    window.addEventListener("auth-refresh", handleAuthRefresh as EventListener)
    window.addEventListener("auth-refresh-complete", handleAuthRefreshComplete as EventListener)
    window.addEventListener("auth-logout", handleAuthLogout as EventListener)
    window.addEventListener("auth-notification", handleAuthNotification as EventListener)

    // Cleanup function
    return () => {
      window.removeEventListener("auth-success", handleAuthSuccess as EventListener)
      window.removeEventListener("auth-error", handleAuthError as EventListener)
      window.removeEventListener("auth-refresh", handleAuthRefresh as EventListener)
      window.removeEventListener("auth-refresh-complete", handleAuthRefreshComplete as EventListener)
      window.removeEventListener("auth-logout", handleAuthLogout as EventListener)
      window.removeEventListener("auth-notification", handleAuthNotification as EventListener)
    }
  }, [api])

  return (
    <>
      {contextHolder}
      {children}
    </>
  )
}

export default AuthNotificationProvider
