export type FormState = { error?: string; success?: string };

export function FormMessage({ state }: { state: FormState }) {
  if (state.error) {
    return (
      <p role="alert" className="rounded-lg bg-danger-soft px-3 py-2 text-sm font-medium text-danger">
        {state.error}
      </p>
    );
  }
  if (state.success) {
    return (
      <p role="status" className="rounded-lg bg-success-soft px-3 py-2 text-sm font-medium text-success">
        {state.success}
      </p>
    );
  }
  return null;
}
