import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer className='bg-neutral-900 font-oswald'>
                <div className='container mx-auto pt-12 pb-2'>
                    <div className='flex flex-col justify-between h-24'>
                        <div className='flex justify-between items-center' >
                            <Link to='/' className='text-3xl font-oswald font-bold flex flex-row items-center  text-purple-700 px-2 rounded-md' >
                                AD Cripto
                            </Link>
                            <p className='text-xs text-white'>Copyright - 2023 &copy; Todos os direitos reservados.</p>
                        </div>
                        <div className='text-center text-neutral-500 text-xs'>
                            Feito com &hearts; por Augusto de Paula
                        </div>
                    </div>
                </div>

            </footer>
        </>
    )
}

export default Footer