export const SSL_KEYS = {
  key: process.env.HTTP_KEY!,
  cert: process.env.HTTP_CERT!,
};

export const terminationSignals = [
  "SIGHUP",
  "SIGINT",
  "SIGQUIT",
  "SIGILL",
  "SIGTRAP",
  "SIGABRT",
  "SIGBUS",
  "SIGFPE",
  "SIGUSR1",
  "SIGSEGV",
  "SIGUSR2",
  "SIGTERM",
  "uncaughtException",
  // "exit",
];
