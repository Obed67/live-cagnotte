/**
 * Paramètres de la cagnotte du Gala des 10 ans.
 * Les montants sont en FCFA.
 */
export const CAGNOTTE_CONFIG = {
  /** Montant affiché à l'ouverture de l'écran. */
  initialAmount: 47_500_000,
  /** Objectif de la levée de fonds. */
  targetAmount: 100_000_000,
  /** Incrément de test (touche Espace ou +). */
  testIncrement: 500_000,
  /** Mode démo (touche D) : une contribution toutes les N ms. */
  demoIntervalMs: 4_000,
  /** Montants tirés au hasard en mode démo. */
  demoIncrements: [100_000, 250_000, 500_000, 1_000_000, 2_000_000],
} as const;
