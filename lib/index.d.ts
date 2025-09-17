declare const configman: {
  ensureAllSet(): void;
  /**
   * Throws if the key is not defined, unless a default value is provided
   * @param key
   */
  get(environmentVariable: string): string;
  getOrDefault(environmentVariable: string, defaultValue: string): string;
  getOrDefault(
    environmentVariable: string,
    defaultValue: undefined,
  ): string | undefined;
};

export default configman;
