'use client'
import React from 'react'
import useDb from '../hooks/useDb'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    serverTimestamp,
} from 'firebase/firestore'
import dbConfig from '../_utils/dbConfig'
import FoodItem from './ui/FoodItem'
import CrossIcon from './ui/CrossIcon'
import PlusIcon from './ui/PlusIcon'

const ListCard = () => {
    const db = dbConfig()
    const { data: listData, loading: listLoading } = useDb('list')

    const DeleteAll = () => {
        listData.forEach((item: any) => {
            deleteDoc(doc(db, 'list', item.id))
        })
    }

    const handleDelete = (id: any) => {
        deleteDoc(doc(db, 'list', id))
    }

    const saveList = () => {
        addDoc(collection(db, 'savedLists'), {
            createdAt: serverTimestamp(),
            list: listData,
        })
    }

    return (
        <div className="p-4 border-black border-dotted sm:w-96 sm:mt-0 mt-5 w-full bg-yellow-200">
            {listLoading ? (
                <h1 className="border-b border-black border-dotted text-center">
                    Loading...
                </h1>
            ) : (
                <h1 className="border-b border-black border-dotted text-center">
                    Seznam
                </h1>
            )}

            <table className="w-full">
                <thead>
                    <tr>
                        <th className=" text-start">Potravina</th>
                        <th className=" text-start">Typ</th>
                        <th className=" text-center">Množství</th>
                        <th className=" text-center">Mám?</th>
                    </tr>
                </thead>

                <tbody>
                    {listData.map((item: any) => (
                        <FoodItem
                            key={item.id}
                            id={item.id}
                            food={item.food}
                            type={item.type}
                            count={item.amount}
                            handleDelete={handleDelete}
                        />
                    ))}
                </tbody>
            </table>
            {listData.length > 0 && (
                <div className="flex gap-2 justify-end">
                    <button
                        onClick={saveList}
                        className="group cursor-pointer items-center flex hover:text-green-600 duration-200"
                    >
                        <PlusIcon></PlusIcon>Uložit
                    </button>
                    <button
                        onClick={DeleteAll}
                        className="group cursor-pointer items-center flex hover:text-red-500 duration-200"
                    >
                        <CrossIcon></CrossIcon>Odstranit položky
                    </button>
                </div>
            )}
        </div>
    )
}

export default ListCard
