"use client";

import { useActionState, useTransition } from "react";

/**
 * Like useActionState for a <form>, but submits inside a transition instead of
 * the form's native action, so React does not reset the inputs when the server
 * action returns an error. The coach keeps what he typed.
 */
export function useActionForm<S>(
  action: (prev: Awaited<S>, formData: FormData) => Promise<Awaited<S>>,
  initial: Awaited<S>,
) {
  const [state, dispatch, pendingAction] = useActionState(action, initial);
  const [pendingTransition, startTransition] = useTransition();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => dispatch(formData));
  };

  return { state, onSubmit, pending: pendingAction || pendingTransition };
}
