type Params = {
  query: string;
  target: string;
};

export function isContains({ query, target }: Params): boolean {
  TARGET_LOOP: for (
    let offset = 0;
    offset <= target.length - query.length;
    offset++
  ) {
    for (let idx = 0; idx < query.length; idx++) {
      const collator = new Intl.Collator('ja', { sensitivity: 'accent' });
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      if (collator.compare(target[offset + idx]!, query[idx]!) !== 0) {
        continue TARGET_LOOP;
      }
    }
    return true;
  }
  return false;
}
