import React from 'react';
import {Dialog, Transition} from "@headlessui/react";
import {noModal, stopPropagation} from "../../common/commonData";
import {IoClose} from "react-icons/io5";

const ItemsModalTransition = ({
                                  show,
                                  appear,
                                  width = 'w-50vw',
                                  toggleModal,
                                  zIndex = 'z-2',
                                  children,
                              }) => {
    const handleCloseModal = () => toggleModal(noModal)


    return (
        <Transition appear={appear} show={show}
                    onClick={handleCloseModal}
                    className={`absolute 
                    ${zIndex}`}>
            <Dialog as='div' className={`
            bg-black
            bg-opacity-50
                absolute
                w-screen
                h-screen
                rounded
                flex
                justify-center
                items-center
                ${zIndex}
                `}
                    onClose={() => toggleModal(false)}>

                <Transition.Child
                    as={'div'}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <Dialog.Panel className={`
                       p-2
                    ${zIndex}
                    ${width} 
                    `}
                                  onClick={stopPropagation}>
                        {children}
                    </Dialog.Panel>
                </Transition.Child>
            </Dialog>
        </Transition>
    )

};

export default ItemsModalTransition;