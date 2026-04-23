import { NextRequest, NextResponse } from 'next/server'

// LINE Messaging API: 通知送信
export async function POST(req: NextRequest) {
  try {
    const { userId, message, channelToken } = await req.json()

    if (!userId || !message || !channelToken) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const response = await fetch('https://api.line.me/v2/bot/message/push', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${channelToken}`,
      },
      body: JSON.stringify({
        to: userId,
        messages: [{ type: 'text', text: message }],
      }),
    })

    if (!response.ok) {
      const error = await response.json()
      return NextResponse.json({ error }, { status: response.status })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// LINE Webhook: 友だち追加時にuser IDを取得
export async function GET(req: NextRequest) {
  return NextResponse.json({ status: 'LINE webhook endpoint' })
}
