import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

/**
 * A custom React hook that prevents multiple accesses to a page by checking a sessionStorage flag.
 * If the checkout wasn't completed (flag not set), it redirects the user and shows a notification.
 * If the checkout was completed (flag set), it clears the flag for future use.
 *
 * @param {string} [redirectTo="/"] - The path to redirect to if the page is accessed without completing checkout.
 * @returns {void}
 *
 * @example
 * // Usage in a checkout success page component
 * useOneTimeAccess("/home");
 * // or with default redirect
 * useOneTimeAccess();
 *
 * @description
 * This hook checks for a 'checkoutCompleted' flag in sessionStorage:
 * - If not present: redirects to specified path and shows toast notification
 * - If present: removes the flag to prevent future access
 * The check is performed after a 50ms delay to ensure proper initialization.
 */
export const useOneTimeAccess = (redirectTo = "/") => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      const completed = sessionStorage.getItem("checkoutCompleted");

      if (!completed) {
        toast.info("You’ve already completed this order.");
        navigate(redirectTo, { replace: true });
      } else {
        sessionStorage.removeItem("checkoutCompleted");
      }
    }, 50);

    return () => clearTimeout(timeout);
  }, [navigate, redirectTo]);
};
