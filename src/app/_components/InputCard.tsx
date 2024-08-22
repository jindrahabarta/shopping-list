'use client'
import React, { useState } from 'react'
import dbConfig from '../_utils/dbConfig'
import { Tooltip } from 'react-tooltip'
import PlusIcon from './ui/PlusIcon'
import FavFoodCard from './FavFoodCard'
import useDb from '../hooks/useDb'
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    serverTimestamp,
} from 'firebase/firestore'

const Input = () => {
    const db = dbConfig()
    const { data: favouritesData, loading: favLoading } = useDb('favourites')

    const [food, setFood] = useState<string>('')
    const [count, setCount] = useState<number>(1)
    const [type, setType] = useState<string>('normal')

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
        <div className="p-4 bg-lime-200  sm:w-96 w-full">
            <div className=" flex justify-between mb-2  ">
                <div className="w-full flex items-center gap-2 overflow-x-auto scrollbar-thin">
                    {favLoading ? (
                        <p>Loading...</p>
                    ) : favouritesData && favouritesData.length > 0 ? (
                        favouritesData.map((item: any) => (
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
                    )}
                </div>
                <Tooltip id="add-tooltip" clickable className="flex flex-col">
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
    )
}

export default Input
