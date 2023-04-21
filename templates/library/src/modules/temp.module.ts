/**
 * Prints a message for name, if given
 * @param name 
 */
const printMessage = (name?: string): void => {
    if(name){
        console.log(`Hello ${name}!`)
        return
    }

    console.log(`Hello world!`)
}

const tempModule = { printMessage }

export { tempModule }