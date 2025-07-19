const FormatQuestions = (obj: any) => {
  let output = "";
  let counter = 1;

  // Question#1 is a string
  if (typeof obj["Question#1"] === "string") {
    output += `Question#${counter++}: ${obj["Question#1"]}\n`;
  }

  // Question#2 is an array of strings
  if (Array.isArray(obj["Question#2"])) {
    for (const q of obj["Question#2"]) {
      output += `Question#${counter++}: ${q}\n`;
    }
  }

  return output;
};

export default FormatQuestions;