import React from 'react';

const PlusIcon = (props: any) => {
    return (
        <svg
            className="m-1 -rotate-45 group-hover:rotate-45 group-hover:fill-red-500 duration-200  "
            xmlns="http://www.w3.org/2000/svg"
            width={14}
            height={14}
            viewBox="0 0 50 50"
            {...props}
        >
            <path d="M25 2C12.31 2 2 12.31 2 25s10.31 23 23 23 23-10.31 23-23S37.69 2 25 2zm0 2c11.61 0 21 9.39 21 21s-9.39 21-21 21S4 36.61 4 25 13.39 4 25 4zm-1 9v11H13v2h11v11h2V26h11v-2H26V13h-2z" />
        </svg>
    );
};

export default PlusIcon;
