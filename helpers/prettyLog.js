export function prettyLog(message) {
  console.log("\x1b[43m\x1b[30m", message, '\x1b[0m');
}

export function errorLog(message) {
  console.log("\x1b[31m", message, '\x1b[0m');
}
