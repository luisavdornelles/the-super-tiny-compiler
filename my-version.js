// my version

function tokenizer(input) {
    if (!input) {
        throw new Error("No input was provided");
    }

    const token = [];
    let name = "";
    let lastType = "";

    for (let char of input) {
        if (isAlpha(char)) {
            name += char;
            lastType = "name";
        } else if (isNumber(char)) {
            name += char;
            lastType = "number";
        } else {
            if (name) {
                token.push({
                    type: lastType,
                    value: name
                });
                name = "";
                lastType = "";
            }

            if (char === "(" || char === ")") {
                token.push({
                    type: 'paren',
                    value: char
                });
            }
        }
    }

    console.log(token);
}

function isAlpha(char) {
    return char.match(/^[a-zA-Z]+$/);
}

function isNumber(char) {
    return char.match(/^[0-9]+$/);
}

tokenizer('(luisa 2 2(myName 4 0 (oi "00")))');