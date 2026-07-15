function formatarNota(nota: number | string): string {
    if (typeof nota === "number") {
        return nota.toFixed(1);
    }
    return nota.trim();
}

// === AQUI QUE O CONSOLE.LOG ENTRA EM AÇÃO ===

// Testando com um NÚMERO (ele vai aplicar o .toFixed(1))
console.log(formatarNota(9.78)); // Vai printar no terminal: "9.8"

// Testando com uma STRING cheia de espaços (ele vai aplicar o .trim())
console.log(formatarNota("   10.0   ")); // Vai printar no terminal: "10.0"
