function solution(s) {
    const array = Array.from(s);
    let vocales = ['a','e','i','o','u'];
    let consonantes = ['b','c','d','f','g','h','j','k','l','m','n','p','q','r','s','t','v','w','x','y','z'];
    let cantidadDeVocal = contarVocales(array,vocales);
    let cantidadDeConsonantes = contarVocales(array,consonantes) * 2;
    return cantidadDeVocal + cantidadDeConsonantes
}

const contarVocales = (cadena,array)=>{
    let contador = 0;
    for (let i = 0; i < cadena.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if(cadena[i].includes(array[j])){
                contador++;
            }
        }
    }
    return contador;
}

console.log(solution('dsnhpbpfkmqbclwy'));