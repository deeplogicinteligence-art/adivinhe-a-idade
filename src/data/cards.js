/**
 * Gera os 6 cartões binários automaticamente usando operações bitwise.
 * Cada cartão contém os números de 1 a 63 que possuem o bit correspondente ativado.
 *
 * Cartão 0 (valor 1): bit 0 → 1, 3, 5, 7, 9...
 * Cartão 1 (valor 2): bit 1 → 2, 3, 6, 7, 10...
 * Cartão 2 (valor 4): bit 2 → 4, 5, 6, 7, 12...
 * Cartão 3 (valor 8): bit 3 → 8-15, 24-31...
 * Cartão 4 (valor 16): bit 4 → 16-31, 48-63...
 * Cartão 5 (valor 32): bit 5 → 32-63
 */

const CARD_VALUES = [1, 2, 4, 8, 16, 32];

export function generateCards() {
  return CARD_VALUES.map((value, index) => {
    const numbers = [];

    for (let n = 1; n <= 63; n++) {
      if (n & value) {
        numbers.push(n);
      }
    }

    return {
      id: index + 1,
      value,
      numbers,
    };
  });
}

export const CARDS = generateCards();
