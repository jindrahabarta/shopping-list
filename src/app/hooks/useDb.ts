import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import dbConfig from '../_utils/dbConfig'

const useDb = (collectionName: string) => {
    const db = dbConfig()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // vytvorim query do kolekce todos
        const q = query(collection(db, collectionName), orderBy('createdAt'))

        // vrati mi aktualni data z databaze, pokud se tam neco zmeni
        onSnapshot(q, (querySnapshot) => {
            const data: any = []

            // potrebuju pretransformovat data do pouzitelne podoby a dostat do noveho pole
            querySnapshot.forEach((doc) => {
                const item = { ...doc.data(), id: doc.id }

                data.push(item)
            })

            // nasetuju pretransfrormovana data
            setData(data)
            setLoading(false)
        })
    }, [])

    return { data, loading }
}

export default useDb
