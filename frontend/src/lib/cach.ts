import { cache as reactCache } from "react";
import { unstable_cache as nextCache } from "next/cache";

type Callback = (...args: any[]) => Promise<any>;

export function cach<T extends Callback>(
  cb: T,
  keyBase: string[],
  options: { revalidate?: number | false; tags?: string[] } = {}
) {
  const cachedFn = reactCache(cb);

  return (...args: Parameters<T>) =>
    nextCache(
      () => cachedFn(...args),
      [...keyBase, ...args.map(String)],
      options
    )();
}
