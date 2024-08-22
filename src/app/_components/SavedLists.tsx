'use client'
import React from 'react'
import useDb from '../hooks/useDb'
import CrossIcon from './ui/CrossIcon'
import { deleteDoc, doc } from 'firebase/firestore'
import dbConfig from '../_utils/dbConfig'

const SavedLists = () => {
    const { data, loading } = useDb('savedLists')
    console.table(data)
    const db = dbConfig()

    const deleteList = (id: any) => {
        deleteDoc(doc(db, 'savedLists', id))
    }

    return (
        <div className=" flex flex-col gap-4 items-center mt-4">
            {loading ? (
                <p>Loading...</p>
            ) : (
                data.length === 0 && <p>Ulož si své oblíbené listy</p>
            )}

            {data.map((item: any) => (
                <div key={item.id} className="bg-orange-300 w-full sm:w-96 p-4">
                    <table className=" text-center w-full">
                        <th>Potravina</th>
                        <th>Typ</th>
                        <th>Množství</th>
                        {item.list.map((list: any) => (
                            <tr key={list.id}>
                                <td>{list.food}</td>
                                <td>{list.type}</td>
                                <td>{list.amount}</td>
                            </tr>
                        ))}
                    </table>
                    <div className="w-full flex justify-end">
                        <button
                            onClick={() => deleteList(item.id)}
                            className="group cursor-pointer items-center flex hover:text-red-500 duration-200"
                        >
                            <CrossIcon></CrossIcon>Odstranit list
                        </button>
                    </div>
                </div>
            ))}
        </div>

        // <div className="w-full">
        //     {loading ? (
        //         <p>Loading</p>
        //     ) : data.length > 0 ? {data.map((list:any)=>{
        //         <div>
        //            xd
        //         </div>
        //     })} : (
        //         <p>Zatím zde nejsou data</p>
        //     )}
        // </div>
    )
}

export default SavedLists
