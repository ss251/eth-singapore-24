import { useState, useEffect } from 'react'

interface NounImageProps {
  width?: number
  height?: number
  address?: string
}

export function NounImage({ width = 64, height = 64, address }: NounImageProps) {
  const [nounSrc, setNounSrc] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNounImage = async () => {
      try {
        // Build the query parameters
        const params = new URLSearchParams()
        if (address) {
          params.append('address', address)
        } else {
          // Add a timestamp to prevent caching for random images
          params.append('_', Date.now().toString())
        }

        const response = await fetch(`/api/noun?${params.toString()}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const svgText = await response.text()

        const svgBase64 =
          typeof window === 'undefined'
            ? Buffer.from(svgText).toString('base64')
            : window.btoa(svgText)
        const svgDataUri = `data:image/svg+xml;base64,${svgBase64}`
        setNounSrc(svgDataUri)
      } catch (err) {
        console.error('Error fetching Noun image:', err)
        setError('Failed to load Noun image')
      }
    }

    fetchNounImage()
  }, [address])

  if (error) return <div>Error: {error}</div>

  return nounSrc ? (
    <img
      src={nounSrc}
      alt="Noun"
      width={width}
      height={height}
      className="rounded-lg"
    />
  ) : (
    <div>Loading Noun...</div>
  )
}