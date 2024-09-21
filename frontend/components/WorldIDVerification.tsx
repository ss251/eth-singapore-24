"use client"

import { useState, useCallback } from 'react'
import WorldIDWidget from './WorldIDWidget'

const WorldIDVerification = () => {
  const [isVerified, setIsVerified] = useState(false)

  const handleSuccess = useCallback(() => {
    setIsVerified(true)
  }, [])

  return (
    <div>
      {!isVerified ? (
        <WorldIDWidget onSuccess={handleSuccess} />
      ) : (
        <div>You have been verified!</div>
      )}
    </div>
  )
}

export default WorldIDVerification