import Image from 'next/image'
import Mrkev from '@/../public/mrkev.png'
import InputCard from './_components/InputCard'
import ListCard from './_components/ListCard'
import SavedLists from './_components/SavedLists'

const ShoppingList = () => {
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
                <InputCard></InputCard>

                <ListCard></ListCard>
            </div>
            <SavedLists></SavedLists>
        </main>
    )
}

export default ShoppingList
