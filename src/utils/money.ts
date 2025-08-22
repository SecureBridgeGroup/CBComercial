// src/utils/money.ts
const BRL = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });

/** Quando o backend envia em centavos (recomendado) */
export const formatBRL = (cents: number) => BRL.format((cents || 0) / 100);

/** Se estiver recebendo float (não ideal p/ dinheiro) */
export const formatBRLFloat = (value: number) => BRL.format(value || 0);
