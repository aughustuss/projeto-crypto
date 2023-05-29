import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <>
            <footer className='bg-primary font-oswald'>
                <div className='container mx-auto pt-12 pb-12 md:pb-2'>
                    <div className='flex flex-col justify-between h-24 gap-y-4'>
                        <div className='flex justify-between items-center flex-col md:flex-row gap-y-4' >
                            <p onClick={() => {
                                navigate('/')
                            }} className='text-xl md:text-2xl hover:cursor-pointer text-offwhite font-oswald text-center font-semibold flex flex-col md:gap-y-[2px]'>
                                ADCripto
                                <span className='md:text-xs text-[10px] text-center text-offwhite uppercase'>Análise de Criptomoedas</span>
                            </p>
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