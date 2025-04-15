// mlphone.js

// These mappings can be extracted into separate JSON files if needed
const vowels = {
  അ: "A",
  ആ: "A",
  ഇ: "I",
  ഈ: "I",
  ഉ: "U",
  ഊ: "U",
  ഋ: "R",
  എ: "E",
  ഏ: "E",
  ഐ: "AI",
  ഒ: "O",
  ഓ: "O",
  ഔ: "O",
};

const consonants = {
  ക: "K",
  ഖ: "K",
  ഗ: "K",
  ഘ: "K",
  ങ: "NG",
  ച: "C",
  ഛ: "C",
  ജ: "J",
  ഝ: "J",
  ഞ: "NJ",
  ട: "T",
  ഠ: "T",
  ഡ: "T",
  ഢ: "T",
  ണ: "N1",
  ത: "0",
  ഥ: "0",
  ദ: "0",
  ധ: "0",
  ന: "N",
  പ: "P",
  ഫ: "F",
  ബ: "B",
  ഭ: "B",
  മ: "M",
  യ: "Y",
  ര: "R",
  ല: "L",
  വ: "V",
  ശ: "S1",
  ഷ: "S1",
  സ: "S",
  ഹ: "H",
  ള: "L1",
  ഴ: "Z",
  റ: "R1",
};

const chillus = {
  ൽ: "L",
  ൾ: "L1",
  ൺ: "N1",
  ൻ: "N",
  ർ: "R1",
  ൿ: "K",
};

const compounds = {
  ക്ക: "K2",
  ഗ്ഗ: "K",
  ങ്ങ: "NG",
  ച്ച: "C2",
  ജ്ജ: "J",
  ഞ്ഞ: "NJ",
  ട്ട: "T2",
  ണ്ണ: "N2",
  ത്ത: "0",
  ദ്ദ: "D",
  ദ്ധ: "D",
  ന്ന: "NN",
  ന്ത: "N0",
  ങ്ക: "NK",
  ണ്ട: "N1T",
  ബ്ബ: "B",
  പ്പ: "P2",
  മ്മ: "M2",
  യ്യ: "Y",
  ല്ല: "L2",
  വ്വ: "V",
  ശ്ശ: "S1",
  സ്സ: "S",
  ള്ള: "L12",
  ഞ്ച: "NC",
  ക്ഷ: "KS1",
  മ്പ: "MP",
  റ്റ: "T",
  ന്റ: "NT",
  ന്ത: "N0",
  "്രി": "R",
  "്രു": "R",
};

const modifiers = {
  "ാ": "",
  "ഃ": "",
  "്": "",
  "ൃ": "R",
  "ം": "3",
  "ി": "4",
  "ീ": "4",
  "ു": "5",
  "ൂ": "5",
  "െ": "6",
  "േ": "6",
  "ൈ": "7",
  "ൊ": "8",
  "ോ": "8",
  "ൌ": "9",
  "ൗ": "9",
};

export function computePhoneticHash(input) {
  let key2 = processInput(input);
  let key1 = key2.replace(/[2,4-9]/g, "");
  let key0 = key2.replace(/[1,2,4-9]/g, "");
  return [key0, key1, key2];
}

function processInput(input) {
  input = input.replace(/[^\u0D00-\u0D7F]/g, "").trim();

  input = replaceModifiedGlyphs(compounds, input);
  for (const [k, v] of Object.entries(compounds)) {
    input = input.replace(new RegExp(k, "g"), `{${v}}`);
  }

  const baseGlyphs = { ...consonants, ...vowels };
  input = replaceModifiedGlyphs(baseGlyphs, input);

  for (const [k, v] of Object.entries(consonants)) {
    input = input.replace(new RegExp(k, "g"), `{${v}}`);
  }
  for (const [k, v] of Object.entries(vowels)) {
    input = input.replace(new RegExp(k, "g"), `{${v}}`);
  }

  for (const [k, v] of Object.entries(chillus)) {
    input = input.replace(new RegExp(k, "g"), `{${v}}`);
  }

  for (const [k, v] of Object.entries(modifiers)) {
    input = input.replace(new RegExp(k, "g"), v);
  }

  input = input.replace(/[^0-9A-Z]/g, "");
  input = input.replace(/^(A|V|T|S|U|M|O)L(K|S)/, "$10$2");

  return input;
}

function replaceModifiedGlyphs(glyphs, input) {
  const modifierKeys = Object.keys(modifiers).join("|");
  const glyphKeys = Object.keys(glyphs).join("|");
  const regex = new RegExp(`(${glyphKeys})(${modifierKeys})`, "g");
  return input.replace(regex, (match, base, mod) => {
    return `{${glyphs[base]}${modifiers[mod]}}`;
  });
}

export default computePhoneticHash;
