import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export function FadeText({ children, className }) {
  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={children} // O AnimatePresence deteta a mudança do texto
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className={className}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
}