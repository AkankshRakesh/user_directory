import useSWR from "swr"

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

interface UseUsersReturn {
  data: User[] | undefined
  error: Error | undefined
  isLoading: boolean
  mutate: () => void
}

// Generic fetcher function
async function fetcher<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  return response.json()
}

// Custom hook with TypeScript generics
export function useUsers(): UseUsersReturn {
  const { data, error, isLoading, mutate } = useSWR<User[], Error>(
    "https://jsonplaceholder.typicode.com/users",
    fetcher<User[]>,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // Cache for 1 minute
    },
  )

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}

// Generic hook that can be used for other data types
export function useApiData<T>(url: string | null) {
  const { data, error, isLoading, mutate } = useSWR<T, Error>(url, url ? fetcher<T> : null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 60000,
  })

  return {
    data,
    error,
    isLoading,
    mutate,
  }
}
