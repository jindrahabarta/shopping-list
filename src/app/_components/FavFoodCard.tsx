import React from 'react';
import CrossIcon from './CrossIcon';

const FavFoodCard = ({ children, id, favDelete, favInsert }: any) => {
    return (
        <div
            onClick={() => favInsert(children)}
            className="flex items-center text-xs border-black border-dotted border p-0.5 hover:cursor-pointer"
        >
            <p className=" text-nowrap">{children}</p>
            <span className="group">
                <CrossIcon onClick={() => favDelete(id, 'list')}></CrossIcon>
            </span>
        </div>
    );
};

export default FavFoodCard;
