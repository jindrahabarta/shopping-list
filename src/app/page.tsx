'use client'

import React, { useEffect, useState } from 'react'
import FoodItem from './_components/FoodItem'
import dbConfig from './_components/dbConfig'
import { Tooltip } from 'react-tooltip'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getFirestore,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
} from 'firebase/firestore'
import PlusIcon from './_components/PlusIcon'
import CrossIcon from './_components/CrossIcon'
import FavFoodCard from './_components/FavFoodCard'
import Image from 'next/image'
import Mrkev from '@/../public/mrkev.png'

const ShoppingList = () => {
    const [food, setFood] = useState<string>('')
    const [count, setCount] = useState<number>(1)
    const [type, setType] = useState<string>('normal')
    const [list, setList] = useState<any[]>([])
    const [favourites, setFavourites] = useState([])
    const [loading, setLoading] = useState(false)
    const db = dbConfig()

    useEffect(() => {
        // vytvorim query do kolekce todos
        const q = query(collection(db, 'list'), orderBy('createdAt'))

        // vrati mi aktualni data z databaze, pokud se tam neco zmeni
        onSnapshot(q, (querySnapshot) => {
            const list: any = []

            // potrebuju pretransformovat data do pouzitelne podoby a dostat do noveho pole
            querySnapshot.forEach((doc) => {
                const item = { ...doc.data(), id: doc.id }

                list.push(item)
            })

            // nasetuju pretransfrormovana data
            setList(list)
        })
    }, [])

    useEffect(() => {
        const q = query(collection(db, 'favourites'), orderBy('createdAt'))

        onSnapshot(q, (querySnapshot) => {
            const favs: any = []

            // potrebuju pretransformovat data do pouzitelne podoby a dostat do noveho pole
            querySnapshot.forEach((doc) => {
                const item = { ...doc.data(), id: doc.id }

                favs.push(item)
            })

            setFavourites(favs)
            setLoading(true)
        })
    }, [])

    const Send = (e: any) => {
        e.preventDefault()

        addDoc(collection(db, 'list'), {
            createdAt: serverTimestamp(),
            food: food,
            amount: count,
            type: type,
        })

        setFood('')
        setCount(1)
        setType('normal')
    }

    const DeleteAll = () => {
        list.forEach((item: any) => {
            deleteDoc(doc(db, 'list', item.id))
        })
    }

    const handleDelete = (id: any) => {
        deleteDoc(doc(db, 'list', id))
    }
    const [newFav, setNewFaw] = useState<string>('')

    const addFav = (e: any) => {
        e.preventDefault()

        addDoc(collection(db, 'favourites'), {
            createdAt: serverTimestamp(),
            fav: newFav,
        })

        setNewFaw('')
    }

    const favInsert = (props: any) => {
        setFood(props)
    }
    const favDelete = (id: any) => {
        deleteDoc(doc(db, 'favourites', id))
    }
    return (
        <main className="p-2 relative">
            <div className="w-full h-screen flex justify-center items-center absolute top-0 left-0 z-0 opacity-20 pointer-events-none">
                <Image
                    src={Mrkev}
                    alt="mrkev"
                    className=" object-contain h-full z-0"
                ></Image>
            </div>

            <h1 className=" mt-4 text-center text-3xl">Nákupní seznam</h1>
            <div className="w-full flex items-center flex-col sm:flex-row sm:justify-center sm:gap-4 sm:items-start z-20">
                <div className="p-4 bg-lime-200  sm:w-96 w-full">
                    <div className=" flex justify-between mb-2  ">
                        <div className="w-full flex items-center gap-2 overflow-x-auto scrollbar-thin">
                            {loading ? (
                                favourites && favourites.length > 0 ? (
                                    favourites.map((item: any) => (
                                        <FavFoodCard
                                            favDelete={favDelete}
                                            favInsert={favInsert}
                                            id={item.id}
                                            key={item.id}
                                        >
                                            {item.fav}
                                        </FavFoodCard>
                                    ))
                                ) : (
                                    <p className="text-xs">
                                        Přidej si oblíbené ingredience...
                                    </p>
                                )
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                        <Tooltip
                            id="add-tooltip"
                            clickable
                            className="flex flex-col"
                        >
                            <h1>Přidat oblíbené položky:</h1>
                            <form className="flex gap-2" onSubmit={addFav}>
                                <input
                                    className="outline-none text-black"
                                    type="text"
                                    required
                                    maxLength={25}
                                    onChange={(e) => setNewFaw(e.target.value)}
                                    value={newFav}
                                />
                                <input
                                    className="hover:cursor-pointer"
                                    type="submit"
                                    value="Add"
                                />
                            </form>
                        </Tooltip>

                        <span
                            data-tooltip-id="add-tooltip"
                            className="group hover:cursor-pointer hover:fill-lime-700"
                        >
                            <PlusIcon></PlusIcon>
                            <div></div>
                        </span>
                    </div>
                    <form
                        className="flex flex-col gap-2  outline-none  w-full"
                        onSubmit={Send}
                    >
                        <label htmlFor="potravina" className="pr-2">
                            Potravina
                            <input
                                onChange={(e) => setFood(e.target.value)}
                                value={food}
                                maxLength={20}
                                required
                                className=" bg-lime-200 outline-none border-b border-black border-dotted ml-2"
                                id="potravina"
                                type="text"
                            />
                        </label>

                        <label htmlFor="count" className="pr-2">
                            Množství
                            <input
                                value={count}
                                onChange={(e) => setCount(+e.target.value)}
                                className=" w-fit  bg-lime-200 outline-none ml-2"
                                min={1}
                                max={100}
                                type="number"
                                name="count"
                            />
                        </label>
                        <label className="pr-2">
                            Typ
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="bg-lime-200 outline-none ml-2 "
                            >
                                <option value="normal">Normal</option>
                                <option value="bio">Bio</option>
                                <option value="vegan">Vegan</option>
                            </select>
                        </label>

                        <button
                            type="submit"
                            className="group items-center flex self-end hover:text-lime-700 duration-200"
                        >
                            <span className="group cursor-pointer">
                                <PlusIcon></PlusIcon>
                            </span>
                            <p>Add</p>
                        </button>
                    </form>
                </div>

                <div className="p-4 border-black border-dotted sm:w-96 sm:mt-0 mt-5 w-full bg-yellow-200">
                    <h1 className="border-b border-black border-dotted text-center">
                        Seznam
                    </h1>

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
                            {list.map((item: any) => (
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
                    {list.length > 0 ? (
                        <div className="flex justify-end">
                            <button
                                onClick={DeleteAll}
                                className="group cursor-pointer items-center flex hover:text-red-500 duration-200"
                            >
                                <CrossIcon></CrossIcon>Odstranit položky
                            </button>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </main>
    )
}

export default ShoppingList
