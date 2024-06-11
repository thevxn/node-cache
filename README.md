# node-cache

Simple in-memory caching for Node.js apps.

## Getting Started

Create a new instance of the cache, passing in the TTL for its items in seconds:

```ts
const cache = new Cache(900)
```

The following methods are exposed:

```ts
set(key: string, value: T): void
get(key: string): T | null
delete(key: string): void
// Clears all items from the cache
clear(): void
```

## Example usage

```ts
import { Cache } from '@savla-dev/node-cache'

const cache = new Cache<unknown>(900) // 15 minutes TTL

async function fetchWithCache(url: string): Promise<any> {
  const cachedData = cache.get(url)
  if (cachedData) {
    console.log('Returning cached data')
    return cachedData
  }

  console.log('Fetching new data')

  let response: Response
  try {
    response = await fetch(url)
  } catch (e) {
    throw new Error(`Error during fetch: ${e}`)
  }

  try {
    const data = await response.json()
    cache.set(url, data)
    return data
  } catch (e) {
    console.log(`Error during response parsing: ${e}`)
  }
}
```
