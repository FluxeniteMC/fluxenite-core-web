declare module "*.css";
declare namespace React {
  type ReactNode = unknown;
}
declare namespace JSX {
  interface Element {}
  interface ElementClass {}
  interface ElementChildrenAttribute { children: {}; }
  interface IntrinsicElements { [elemName: string]: any; }
}
declare module "react" {
  export type ReactNode = unknown;
  export function useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
  export function useMemo<T>(factory: () => T, deps?: unknown[]): T;
  export function useRef<T>(initialValue: T | null): { current: T | null };
  export function useState<T>(initialState: T): [T, (value: T) => void];
  export const Suspense: any;
}
declare module "next" { export type Metadata = any; export type Viewport = any; }
declare module "next/font/google" { export const Inter: any; export const Manrope: any; }
declare module "next/link" { const Link: any; export default Link; }
declare module "next/navigation" { export function usePathname(): string; }
declare module "next/dynamic" { const dynamic: any; export default dynamic; }
declare module "framer-motion" { export const motion: any; export const AnimatePresence: any; }
declare module "gsap" { const gsap: any; export default gsap; }
declare module "three" { const THREE: any; export = THREE; }
declare module "@react-three/fiber" { export const Canvas: any; export function useFrame(callback: (state: any) => void): void; }
declare module "@react-three/drei" { export const Environment: any; export const Float: any; export const MeshReflectorMaterial: any; export const OrbitControls: any; export const Sparkles: any; export const Torus: any; export const useTexture: any; }
declare module "@react-three/postprocessing" { export const Bloom: any; export const DepthOfField: any; export const EffectComposer: any; }
declare namespace React { interface Attributes { key?: any; } }
declare namespace JSX { interface IntrinsicAttributes { key?: any; } }
declare namespace THREE { type InstancedMesh = any; type Object3D = any; type Group = any; }
