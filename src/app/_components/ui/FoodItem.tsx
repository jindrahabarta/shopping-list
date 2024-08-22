'use client';
import React, { useState } from 'react';
import PlusIcon from './PlusIcon';
import CrossIcon from './CrossIcon';

function FoodItem({ food, type, count, id, handleDelete }: any) {
    const [checked, setChecked] = useState(false);

    // const Checked = () => {
    //     setChecked(true);
    // };

    return (
        <tr
            className={`${
                checked ? 'line-through align-middle' : ' align-baseline'
            }`}
        >
            <td>{food}</td>
            <td>{type}</td>

            <td className="text-center">{count}</td>
            <td className="flex justify-center items-center">
                {checked ? (
                    <span
                        onClick={() => handleDelete(id)}
                        className="group cursor-pointer"
                    >
                        <CrossIcon></CrossIcon>
                    </span>
                ) : (
                    <input
                        type="checkbox"
                        checked={checked}
                        onChange={(e) => {
                            setChecked(e.target.checked);
                        }}
                    />
                )}
            </td>
        </tr>
    );
}

export default FoodItem;
