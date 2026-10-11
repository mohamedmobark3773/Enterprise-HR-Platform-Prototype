/**
 * Side-effect module shim for the global stylesheet.
 *
 * Why this file exists:
 * - `app/layout.tsx` (root layout) must import `./globals.css` for its
 *   side effects. That import is correct and required by Next.js App Router.
 * - TypeScript cannot resolve bare `.css` side-effect imports: the toolchain
 *   ships ambient declarations only for `*.module.css` (see
 *   `node_modules/next/types/global.d.ts`), and `tsc --traceResolution`
 *   confirms `./globals.css` is otherwise unresolvable.
 * - The project's compiler (TypeScript 5.9.3) tolerates this and `tsc
 *   --noEmit` passes, but stricter editor TypeScript hosts report it as
 *   TS2882 ("Cannot find module or type declarations for side-effect
 *   import"). This empty module gives the resolver exactly what it probes
 *   for (`globals.css.d.ts`) so the error cannot occur in any host.
 *
 * Scope notes:
 * - Intentionally narrow: it types only this one stylesheet, not `*.css`
 *   globally. Do not generalize it into `declare module "*.css"`.
 * - It has no runtime effect: bundlers ignore `.d.ts` files, and nothing
 *   imports this shim. Do not add exports to it.
 */
export {};
