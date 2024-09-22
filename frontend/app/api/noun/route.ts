export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

import { NextResponse } from 'next/server'
import { ImageData, getNounData } from '@nouns/assets'
import { buildSVG } from '@nouns/sdk'
import { keccak256, toUtf8Bytes } from 'ethers'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const address = searchParams.get('address') ?? undefined

    // Generate the seed based on the address
    const seed = generateSeedFromAddress(address)
    const { parts, background } = getNounData(seed)

    // Generate the SVG image using buildSVG from @nouns/sdk
    const svg = buildSVG(parts, ImageData.palette, background)

    // Return the SVG image
    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('Error generating Noun image:', error)
    return NextResponse.json(
      { error: 'Failed to generate Noun image' },
      { status: 500 }
    )
  }
}

// Helper function to generate seed from address
function generateSeedFromAddress(address?: string) {
  const { bodies, accessories, heads, glasses } = ImageData.images
  const backgrounds = ImageData.bgcolors

  const totalOptions = {
    background: backgrounds.length,
    body: bodies.length,
    accessory: accessories.length,
    head: heads.length,
    glasses: glasses.length,
  }

  if (!address) {
    // Generate random seed
    return {
      background: Math.floor(Math.random() * totalOptions.background),
      body: Math.floor(Math.random() * totalOptions.body),
      accessory: Math.floor(Math.random() * totalOptions.accessory),
      head: Math.floor(Math.random() * totalOptions.head),
      glasses: Math.floor(Math.random() * totalOptions.glasses),
    }
  }

  // Use keccak256 hash of the address to get consistent traits
  const hash = keccak256(toUtf8Bytes(address))

  return {
    background: parseInt(hash.slice(2, 10), 16) % totalOptions.background,
    body: parseInt(hash.slice(10, 18), 16) % totalOptions.body,
    accessory: parseInt(hash.slice(18, 26), 16) % totalOptions.accessory,
    head: parseInt(hash.slice(26, 34), 16) % totalOptions.head,
    glasses: parseInt(hash.slice(34, 42), 16) % totalOptions.glasses,
  }
}