const unidades = new Map([
  [0, ""],
  [1, "um"],
  [2, "dois"],
  [3, "três"],
  [4, "quatro"],
  [5, "cinco"],
  [6, "seis"],
  [7, "sete"],
  [8, "oito"],
  [9, "nove"],
]);
const especiais = new Map([
  [10, "dez"],
  [11, "onze"],
  [12, "doze"],
  [13, "treze"],
  [14, "quatorze"],
  [15, "quinze"],
  [16, "dezesseis"],
  [17, "dezessete"],
  [18, "dezoito"],
  [19, "dezenove"],
]);
const dezenas = new Map([
  [2, "vinte"],
  [3, "trinta"],
  [4, "quarenta"],
  [5, "cinquenta"],
  [6, "sessenta"],
  [7, "setenta"],
  [8, "oitenta"],
  [9, "noventa"],
]);
const centenas = new Map([
  [1, "cento"],
  [2, "duzentos"],
  [3, "trezentos"],
  [4, "quatrocentos"],
  [5, "quinhentos"],
  [6, "seiscentos"],
  [7, "setecentos"],
  [8, "oitocentos"],
  [9, "novecentos"],
]);
const milharesP = new Map([
  [0, "mil"],
  [1, "milhões"],
  [2, "bilhões"],
  [3, "trilhões"],
  [4, "quatrilhões"],
  [5, "quintilhões"],
]);

const milhares = new Map([
  [0, "mil"],
  [1, "milhão"],
  [2, "bilhão"],
  [3, "trilhão"],
  [4, "quatrilhão"],
  [5, "quintilhão"],
]);

const calcUtillCentena = (number: number) => {
  const numeroStr = number.toString();
  const numeroSplit = numeroStr.split("");

  if (numeroSplit.length === 1) {
    const unidade = unidades.get(number);
    if (unidade) {
      return unidade;
    }
  }

  if (numeroSplit.length === 2) {
    const especial = especiais.get(number);
    if (especial) {
      return especial;
    }

    const dezena = dezenas.get(Number(numeroSplit[0]));
    const unidade = unidades.get(Number(numeroSplit[1]));

    if (dezena) {
      if (unidade) {
        return dezena + " e " + unidade;
      }
      return dezena;
    }
  }

  if (numeroSplit.length === 3) {
    const centena = centenas.get(Number(numeroSplit[0]));
    const esp = especiais.get(Number(numeroSplit[1] + numeroSplit[2]));
    const dezena = dezenas.get(Number(numeroSplit[1]));
    const unidade = unidades.get(Number(numeroSplit[2]));

    if (centena && esp) {
      return centena + " e " + esp;
    }
    if (centena && dezena) {
      if (unidade) {
        return centena + " e " + dezena + " e " + unidade;
      }
      return centena + " e " + dezena;
    }
  }

  return "";
};

export const extenso = (numero: number | null | undefined) => {
  if (typeof numero !== "number") return "";
  const numeroStr = numero.toString();
  if (numeroStr === "0") {
    return "zero";
  }
  const numberSplitEvery3 = numeroStr.split(/(?=(?:...)*$)/);

  const numeroExtensoArray = [""];

  let length = numberSplitEvery3.length - 2;

  for (let i = 0; i < numberSplitEvery3.length; i++) {
    let ext = "";

    ext = calcUtillCentena(Number(numberSplitEvery3[i]));

    ext = ext;

    if (i < numberSplitEvery3.length - 1) {
      if (Number(numberSplitEvery3[i]) === 1) {
        ext = ext + " " + milhares.get(length - i);
      } else {
        ext = ext + " " + milharesP.get(length - i);
      }
    }

    numeroExtensoArray.push(ext);
  }

  return numeroExtensoArray.join(" ");
};
