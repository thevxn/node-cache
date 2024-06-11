type CacheItem<T> = {
  value: T
  timestamp: number
}

export class Cache<T> {
  private ttl: number
  private cache: Map<string, CacheItem<T>>

  constructor(ttlSeconds: number) {
    this.ttl = ttlSeconds * 1000
    this.cache = new Map<string, CacheItem<T>>()
  }

  private isExpired(item: CacheItem<T>): boolean {
    const now = Date.now()
    return now - item.timestamp > this.ttl
  }

  public set(key: string, value: T): void {
    const now = Date.now()
    this.cache.set(key, { value, timestamp: now })
  }

  public get(key: string): T | null {
    const cachedItem = this.cache.get(key)
    if (!cachedItem) {
      return null
    }

    if (this.isExpired(cachedItem)) {
      this.cache.delete(key)
      return null
    }

    return cachedItem.value
  }

  public delete(key: string): void {
    this.cache.delete(key)
  }

  public clear(): void {
    this.cache.clear()
  }
}
