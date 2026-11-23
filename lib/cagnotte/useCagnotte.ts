"use client";

import { useCallback, useReducer } from "react";
import { CAGNOTTE_CONFIG } from "./config";

export type Increment = { id: number; value: number };

export type CagnotteState = {
  amount: number;
  target: number;
  /** Dernier incrément reçu (sert à l'animation « + 500 000 FCFA »). */
  lastIncrement: Increment | null;
};

type Action =
  | { type: "contribute"; value: number }
  | { type: "sync"; total: number; target?: number }
  | { type: "reset" };

let seq = 0;

function initialState(): CagnotteState {
  return {
    amount: CAGNOTTE_CONFIG.initialAmount,
    target: CAGNOTTE_CONFIG.targetAmount,
    lastIncrement: null,
  };
}

function reducer(state: CagnotteState, action: Action): CagnotteState {
  switch (action.type) {
    case "contribute": {
      if (action.value <= 0) return state;
      return {
        ...state,
        amount: state.amount + action.value,
        lastIncrement: { id: ++seq, value: action.value },
      };
    }
    case "sync": {
      // Total absolu envoyé par un backend (WebSocket / SSE / admin).
      const delta = action.total - state.amount;
      return {
        amount: action.total,
        target: action.target ?? state.target,
        lastIncrement:
          delta > 0 ? { id: ++seq, value: delta } : state.lastIncrement,
      };
    }
    case "reset":
      return initialState();
  }
}

/**
 * État de la cagnotte.
 *
 * Pour brancher un vrai backend plus tard, il suffit d'appeler :
 *  - `contribute(montant)` à chaque nouvelle contribution reçue, ou
 *  - `sync(total)` quand le serveur envoie le total à jour
 * (ex. depuis un EventSource / WebSocket dans un useEffect).
 */
export function useCagnotte() {
  const [state, dispatch] = useReducer(reducer, undefined, initialState);

  const contribute = useCallback(
    (value: number) => dispatch({ type: "contribute", value }),
    [],
  );
  const sync = useCallback(
    (total: number, target?: number) => dispatch({ type: "sync", total, target }),
    [],
  );
  const reset = useCallback(() => dispatch({ type: "reset" }), []);

  return { ...state, contribute, sync, reset };
}
