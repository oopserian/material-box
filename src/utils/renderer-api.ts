import { preloadModules } from "@preload/preload";

export function windowAPI<Key extends keyof typeof preloadModules>(
    key: Key
): typeof preloadModules[Key] {
    return (window as any)[key]
}