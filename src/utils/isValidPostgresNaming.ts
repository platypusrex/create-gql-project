export const isValidPostgresNaming = (val: string): RegExpMatchArray | null =>
  val.match(/^[A-Za-z_][A-Za-z_0-9$]*$/);
