// my version 2

function tokenizer(input) {
    if (!input) {
        throw new Error("No input was provided");
    } else if (!input.length) {
        throw new Error("Input has no length");
    }

    const tokens = [];
    let current = 0;

    while (current < input.length) {
        let char = input[current];

        if (char === "(" || char === ")") {
            tokens.push({ type: 'paren', value: char });
            current++;
            continue;
        }

        const WHITESPACE = /\s/;
        if (WHITESPACE.test(char)) {
            current++;
            continue;
        }

        const NUMBERS = /[0-9]/;
        if (NUMBERS.test(char)) {
            let value = "";

            while (NUMBERS.test(char)) {
                value += char;
                char = input[++current];
            }

            tokens.push({ type: 'number', value });
            continue;
        }

        // STRING
        if (char === '"') {
            let value = "";

            // skip first "
            char = input[++current];

            while (char !== '"') {
                value += char;
                char = input[++current];
            }

            // Skip the closing double quote.
            char = input[++current];

            tokens.push({ type: 'string', value });
            continue;
        }

        const LETTERS = /[a-z]/i;
        if (LETTERS.test(char)) {
            let value = "";

            while (LETTERS.test(char)) {
                value += char;
                char = input[++current];
            }

            tokens.push({ type: 'name', value });
            continue;
        }

        throw new TypeError('I dont know what this character is: ' + char);
    }

    console.log(tokens);
    return tokens;
}

function parser(tokens){
    if (!tokens) {
        throw new Error("No tokens were provided");
    } else if (!tokens.length) {
        throw new Error("Tokens has no length");
    }

    let current = 0;

    function walk() {
        let token = tokens[current];

        if (token.type === 'number') {
            current++;
            return { type: 'NumberLiteral', value: token.value };
        }

        if (token.type === 'string') {
            current++;
            return { type: 'StringLiteral', value: token.value };
        }

        if (token.type === 'paren' && token.value === "(") {
            token = tokens[++current];

            let node = {
                type: 'CallExpression',
                name: token.value,
                params: [],
            };

            token = tokens[++current];
            while (token.type !== 'paren' || (token.type === 'paren' && token.value !== ')')) {
                node.params.push(walk());
                token = tokens[current];
            }

            current++;

            return node;

        }

        throw new TypeError(token.type);

    }

    let ast = {
        type: 'Program',
        body: [],
    };

    while (current < tokens.length) {
        ast.body.push(walk());
    }

    console.log(JSON.stringify(ast));
    return ast;
}

parser(tokenizer('(functionOne 2 (functionTwo 6 "hello"))'));