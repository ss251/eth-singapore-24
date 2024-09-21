import { useState, useEffect } from 'react'

interface NounImageProps {
  nounSeed?: string
  width?: number
  height?: number
  address?: string
}

export function NounImage({ nounSeed, width = 64, height = 64 }: NounImageProps) {
  const [nounSrc, setNounSrc] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNounImage = async () => {
      try {
        // Build the query parameters
        const params = new URLSearchParams()
        params.append('nounSeed', nounSeed || '')

        const response = await fetch(`/api/noun?${params.toString()}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const svgText = await response.text()
        const svgBase64 = window.btoa(svgText)
        const svgDataUri = `data:image/svg+xml;base64,${svgBase64}`
        setNounSrc(svgDataUri)
      } catch (err) {
        console.error('Error fetching Noun image:', err)
        setError('Failed to load Noun image')
      }
    }

    fetchNounImage()
  }, [nounSeed])

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