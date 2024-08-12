export const sliceCity =(cityName:string) => {
    // Определяем регулярное выражение для удаления гласных
    const vowelsRegex = /[AEIOUYaeiouyАЕЁИОУЫЭЮЯаеёиоуыэюя]/g;
    
    // Удаляем гласные и пробелы, затем оставляем первые три буквы
    const withoutVowels = cityName.replace(vowelsRegex, '').replace(/\s+/g, '');
    
    // Берем первые три символа и приводим к верхнему регистру
    return withoutVowels.slice(0, 3).toUpperCase();
}