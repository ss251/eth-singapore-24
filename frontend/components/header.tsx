'use client'

import { motion } from 'framer-motion'

export function Header() {
  return (
    <header className="flex items-center justify-between p-4 bg-primary text-secondary shadow-md">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-xl font-bold font-sans"
      >
        eth-singapore-24
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <w3m-button />
      </motion.div>
    </header>
  )
}