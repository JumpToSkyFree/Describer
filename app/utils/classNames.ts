export type ClassNameInput =
  | { [key: string]: boolean | undefined }
  | string[]
  | string
  | undefined;

export default function classNames(...args: Array<ClassNameInput>) {
  let classes = "";

  for (const arg in args) {
    if (typeof args[arg] === "string") {
      classes += args[arg] + " ";
      classes.trimEnd();
    } else if (Array.isArray(args[arg])) {
      args[arg].forEach((value) => {
        classes += value + " ";
      });
      classes.trimEnd();
    } else if (typeof args[arg] === "object") {
      Object.keys(args[arg]).forEach((key) => {
        if ((args[arg] as { [key: string]: boolean })[key]) {
          classes += key + " ";
        }
      });
      classes.trimEnd();
    }
  }

  if (classes.length) classes.trimEnd();
  return classes;
}
