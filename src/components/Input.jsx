import React from 'react';

const Input = () => {
	return (
		<div className='relative'>
			<input
				placeholder=' '
				className='
                w-full
                pt-6
                px-6
                pb-1
                bg-gray-300
                rounded
            '
			/>
			<label className='text-gray-700 font-medium text-md absolute left-6 top-4 duration-150 -translate-y-0 scale-75'>Email</label>
		</div>
	);
};

export default Input;
