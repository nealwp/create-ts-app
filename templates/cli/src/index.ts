#!/usr/bin/env node

export function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    switch (command) {
        case "hello":
            const helloArgs = args.slice(1);
            if (helloArgs[0]) {
                console.log(`Hello ${helloArgs[0]}`);
            } else {
                console.log(`Hello world!`);
            }
            break;
        case "help":
            showHelp();
            break;
        default:
            console.log(`Unknown command: ${command}`);
    }
}

function showHelp() {
    console.log(`
    Available commands:
    
    hello <name>    prints a hello message
    help            prints this message

    `);
}

main();
