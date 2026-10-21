import { Component, useEffect, type ReactNode } from "react";
import { useToast } from "../../hooks/use_toast";

type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

const ErrorFallback = ({ error }: { error: Error }) => {
  const { showToast } = useToast();

  useEffect(() => {
    showToast(error.message, "error");
  }, [error, showToast]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 text-center">
      <div className="max-w-md rounded-2xl border border-error/20 bg-white p-8 shadow-xl shadow-secondary-900/5">
        <h1 className="text-xl font-semibold text-secondary-900">
          Something went wrong
        </h1>
        <p className="mt-2 text-sm text-secondary-500">
          Please refresh the page and try again.
        </p>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-6 cursor-pointer rounded-full bg-primary-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-700"
        >
          Refresh page
        </button>
      </div>
    </main>
  );
};

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error!} />;
    }

    return this.props.children;
  }
}