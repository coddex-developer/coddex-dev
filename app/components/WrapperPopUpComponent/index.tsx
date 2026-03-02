import { AnimatePresence, motion } from "framer-motion";
import { useState, Dispatch, SetStateAction } from "react";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { FormComponent } from "../FormComponent";

interface SpringModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const WrapperPopUpComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <InteractiveHoverButton onClick={() => setIsOpen(true)}>
        Entrar em contato
      </InteractiveHoverButton>
      
      <SpringModalComponent isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

const SpringModalComponent = ({ isOpen, setIsOpen }: SpringModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/30 backdrop-blur fixed inset-0 z-50"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="cursor-default relative w-full flex items-center justify-center min-h-screen"
          >
            <FormComponent />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WrapperPopUpComponent;