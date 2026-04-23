import type { VercelRequest, VercelResponse } from '@vercel/node';
import { MercadoPagoConfig, Preference } from 'mercadopago';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { title, price, quantity = 1 } = req.body ?? {};

  if (!title || !price) {
    return res.status(400).json({ error: 'Faltan campos requeridos: title, price' });
  }

  if (!process.env.MP_ACCESS_TOKEN) {
    return res.status(500).json({ error: 'MP_ACCESS_TOKEN no configurado' });
  }

  const client = new MercadoPagoConfig({
    accessToken: process.env.MP_ACCESS_TOKEN,
  });

  const appUrl = process.env.APP_URL ?? 'http://localhost:5173';
  const currencyId = process.env.MP_CURRENCY_ID ?? 'ARS';

  try {
    const preference = new Preference(client);
    const result = await preference.create({
      body: {
        items: [
          {
            id: String(Date.now()),
            title,
            quantity: Number(quantity),
            unit_price: Number(price),
            currency_id: currencyId,
          },
        ],
        back_urls: {
          success: appUrl,
          failure: appUrl,
          pending: appUrl,
        },
        auto_return: 'approved',
      },
    });

    return res.status(200).json({ init_point: result.init_point });
  } catch (err) {
    console.error('[MP Error]', err);
    return res.status(500).json({ error: 'Error al crear preferencia de pago' });
  }
}
