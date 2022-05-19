import { CheckoutRead, Book } from "types/library";

function shuffle(array: any[]) {
    // knuth shuffle
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
}

export function shuffleCheckoutRead(array: CheckoutRead[]) {
    return shuffle(array) as CheckoutRead[]
}

export function shuffleBooks(array: Book[]) {
    return shuffle(array) as Book[]
}