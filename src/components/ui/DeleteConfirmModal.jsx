// 

import { motion, AnimatePresence } from "framer-motion";
import { RiDeleteBinLine, RiCloseLine } from "react-icons/ri";

const DeleteConfirmModal = ({ carName, busy, onConfirm, onClose }) => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-dark-950/70 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-sm bg-white dark:bg-dark-800 rounded-2xl shadow-2xl p-6"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-dark-400 hover:bg-dark-100 dark:hover:bg-dark-700 transition-all"
          >
            <RiCloseLine className="text-xl" />
          </button>

          <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
            <RiDeleteBinLine className="text-red-500 text-xl" />
          </div>

          <h2 className="font-display font-bold text-lg text-dark-900 dark:text-white mb-2">
            Delete this car?
          </h2>
          <p className="font-body text-sm text-dark-500 dark:text-dark-400 mb-6">
            <span className="font-medium text-dark-700 dark:text-dark-200">
              {carName}
            </span>{" "}
            will be permanently removed. This action cannot be undone.
          </p>

          <div className="flex gap-3">
            <button onClick={onClose} className="flex-1 btn-outline">
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={busy}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-body font-medium px-4 py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {busy ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <RiDeleteBinLine /> Delete
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DeleteConfirmModal;
