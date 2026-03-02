import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { FormComponent } from "../FormComponent";

type isOpenProps = true | false

const WrapperPopUpComponent = () => {
    const [isOpen, setIsOpen] = useState<isOpenProps>() || false;
    return (
        <>
            <InteractiveHoverButton onClick={() => setIsOpen(true)} >
                Entrar em contato
            </InteractiveHoverButton>
            <SpringModalComponent isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    );
};

const SpringModalComponent = ({ isOpen, setIsOpen }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-900/20 backdrop-blur fixed inset-0 z-50"
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="cursor-default relative w-full"
                    >
                        <FormComponent />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default WrapperPopUpComponent;