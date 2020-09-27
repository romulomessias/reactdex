import { useState, useEffect } from 'react'

interface Request<T> {
    (): Promise<T>
}

export default function useRequest<T>(request: Request<T>, initialData: T) {
    const [isLoading, setIsloading] = useState(false)
    const [data, setData] = useState<T>(initialData)

    useEffect(() => {
        setIsloading(true)
        request()
            .then(pokemon => {
                setData(pokemon)
            })
            .catch(error => {
                console.error(error)
            })
            .finally(() => {
                setIsloading(false)
            })
    }, [])

    return {
        isLoading,
        data
    }
}
