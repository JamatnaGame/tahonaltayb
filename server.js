import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(express.static(path.join(__dirname, 'public')));

const storeConfig = {
  storeName: process.env.STORE_NAME || 'طاحون الطيب',
  whatsappNumber: process.env.WHATSAPP_NUMBER || '966500611770',
  paymentProvider: process.env.PAYMENT_PROVIDER || 'moyasar',
  nitroEnabled: process.env.NITRO_ENABLED === 'true',
  moyasarEnabled: process.env.MOYASAR_ENABLED === 'true',
  paytabsEnabled: process.env.PAYTABS_ENABLED === 'true',
  moyasarPublishableKey: process.env.MOYASAR_PUBLISHABLE_KEY || '',
  paymentCallbackUrl: process.env.MOYASAR_CALLBACK_URL || process.env.PAYTABS_CALLBACK_URL || ''
};

const productsDB = [
  { id: 1, name: 'بر بللسمر عضوي (فياض)', price: 80, category: 'البر البلدي', unitType: 3, best: true, hasOptions: true },
  { id: 2, name: 'خلطة السكر والدايت', price: 15, category: 'الخلطات', unitType: 1, best: true, hasOptions: true, customLabel: '1kg' },
  { id: 3, name: 'حب الطيف احمر ابيض', price: 20, category: 'الحبوب الأخرى', unitType: 1, best: true, hasOptions: true, customLabel: '1kg' },
  { id: 4, name: 'سويق شعير اخضر نخب', price: 50, category: 'الحبوب الأخرى', unitType: 1, best: true, hasOptions: true, customLabel: '1kg' },
  { id: 5, name: 'خلطة بر بلدي', price: 12, category: 'الخلطات', unitType: 1, best: true, hasOptions: true, customLabel: '1kg' },
  { id: 6, name: 'استرالي', price: 20, category: 'البر الخارجي', unitType: 3, hasOptions: true },
  { id: 7, name: 'عماني ابو صقر', price: 20, category: 'البر الخارجي', unitType: 3, hasOptions: true },
  { id: 8, name: 'دبي', price: 20, category: 'البر الخارجي', unitType: 3, hasOptions: true },
  { id: 9, name: 'قصيم', price: 20, category: 'البر الخارجي', unitType: 3, hasOptions: true },
  { id: 10, name: 'نجران', price: 20, category: 'البر الخارجي', unitType: 3, hasOptions: true },
  { id: 11, name: 'بر بللسمر هلباء', price: 80, category: 'البر البلدي', unitType: 3, hasOptions: true },
  { id: 12, name: 'بر بلجرشي', price: 60, category: 'البر البلدي', unitType: 3, hasOptions: true },
  { id: 13, name: 'نخليه بلدي عضوي', price: 60, category: 'البر البلدي', unitType: 3, hasOptions: true },
  { id: 14, name: 'نقرة بني مالك', price: 70, category: 'البر البلدي', unitType: 3, hasOptions: true },
  { id: 15, name: 'نقرة بني سعد عضوي', price: 60, category: 'البر البلدي', unitType: 3, hasOptions: true },
  { id: 16, name: 'بر يمني', price: 35, category: 'البر البلدي', unitType: 3, hasOptions: true },
  { id: 17, name: 'مشعورة بللسمر', price: 50, category: 'البر البلدي', unitType: 3, hasOptions: true },
  { id: 18, name: 'بر الباحة عضوي', price: 60, category: 'البر البلدي', unitType: 3, hasOptions: true },
  { id: 19, name: 'بر بني سعد عضوي', price: 50, category: 'البر البلدي', unitType: 3, hasOptions: true },
  { id: 20, name: 'نقرة بلدي', price: 40, category: 'البر البلدي', unitType: 3, hasOptions: true },
  { id: 21, name: 'بر السودة عضوي', price: 70, category: 'البر البلدي', unitType: 3, hasOptions: true },
  { id: 22, name: 'بر وادي الدواسر', price: 30, category: 'البر البلدي', unitType: 3, hasOptions: true },
  { id: 23, name: 'بر معية الفوارة', price: 40, category: 'البر البلدي', unitType: 3, hasOptions: true },
  { id: 24, name: 'شعير بلدي عضوي', price: 40, category: 'البر البلدي', unitType: 3, hasOptions: true },
  { id: 25, name: 'شوفان حب كامل', price: 15, category: 'البر البلدي', unitType: 1, hasOptions: true, customLabel: '1kg' },
  { id: 26, name: 'شوفان بلدي حب كامل', price: 45, category: 'البر البلدي', unitType: 1, hasOptions: true, customLabel: '1kg' },
  { id: 27, name: 'شوفان مجروش', price: 15, category: 'البر البلدي', unitType: 1, hasOptions: true, customLabel: '1kg' },
  { id: 28, name: 'الحنطة السوداء', price: 70, category: 'البر البلدي', unitType: 1, hasOptions: true, customLabel: '1kg' },
  { id: 29, name: 'دخن تهامه', price: 30, category: 'البر البلدي', unitType: 1, hasOptions: true, customLabel: '1kg' },
  { id: 30, name: 'ذرة حمراء تهامه', price: 40, category: 'الحبوب الأخرى', unitType: 3, hasOptions: true },
  { id: 31, name: 'حبش ابيض', price: 30, category: 'الحبوب الأخرى', unitType: 3, hasOptions: true },
  { id: 32, name: 'حبش اصفر', price: 30, category: 'الحبوب الأخرى', unitType: 3, hasOptions: true },
  { id: 33, name: 'مجدولة بني مالك', price: 100, category: 'الحبوب الأخرى', unitType: 1, hasOptions: true, customLabel: '1kg' },
  { id: 34, name: 'حبش ابيض سويق بني مالك', price: 20, category: 'الحبوب الأخرى', unitType: 1, hasOptions: true, customLabel: '1kg' },
  { id: 35, name: 'حبش اصفر سويق بني مالك', price: 30, category: 'الحبوب الأخرى', unitType: 1, hasOptions: true, customLabel: '1kg' },
  { id: 36, name: 'شعير يمني', price: 35, category: 'الحبوب الأخرى', unitType: 5, hasOptions: true },
  { id: 37, name: 'ذرة بيضاء تهامه', price: 40, category: 'الحبوب الأخرى', unitType: 3, hasOptions: true },
  { id: 38, name: 'دقسه (تيف)', price: 75, category: 'الحبوب الأخرى', unitType: 3, hasOptions: true },
  { id: 39, name: 'سويق شعير اخضر بني مالك', price: 30, category: 'الحبوب الأخرى', unitType: 1, hasOptions: true, customLabel: '1kg' },
  { id: 40, name: 'ذرة تهامة عسير', price: 65, category: 'الحبوب الأخرى', unitType: 3, hasOptions: true },
  { id: 41, name: 'شعير بني مالك', price: 10, category: 'الحبوب الأخرى', unitType: 1, hasOptions: true, customLabel: '1kg' },
  { id: 42, name: 'دخن بيضان المدينة', price: 75, category: 'الحبوب الأخرى', unitType: 3, hasOptions: true },
  { id: 43, name: 'دخن ساية عضوي', price: 70, category: 'الحبوب الأخرى', unitType: 3, hasOptions: true },
  { id: 44, name: 'خضير (جيزاني)', price: 30, category: 'الحبوب الأخرى', unitType: 1, hasOptions: true, customLabel: '1kg' },
  { id: 45, name: 'خلطة السكر (شوفان+شعير+دخن)', price: 15, category: 'الخلطات', unitType: 1, hasOptions: true, customLabel: '1kg' },
  { id: 46, name: 'خلطة ملكي', price: 7, category: 'الخلطات', unitType: 1, hasOptions: true, customLabel: '1kg' },
  { id: 47, name: 'خلطة 7 حبوب', price: 10, category: 'الخلطات', unitType: 1, hasOptions: true, customLabel: '1kg' },
  { id: 48, name: 'عدس احمر', price: 7, category: 'البقوليات', unitType: 4, hasOptions: false },
  { id: 49, name: 'عدس اسود', price: 8, category: 'البقوليات', unitType: 4, hasOptions: false },
  { id: 50, name: 'عدس اصفر', price: 8, category: 'البقوليات', unitType: 4, hasOptions: false },
  { id: 51, name: 'فاصوليا حمراء', price: 10, category: 'البقوليات', unitType: 4, hasOptions: false },
  { id: 52, name: 'فاصوليا بيضاء', price: 10, category: 'البقوليات', unitType: 4, hasOptions: false },
  { id: 53, name: 'خواضه', price: 20, category: 'البزار', unitType: 1, hasOptions: false, customLabel: '1kg' },
  { id: 54, name: 'قهوة شعير', price: 30, category: 'البزار', unitType: 1, hasOptions: false, customLabel: '1kg' },
  { id: 55, name: 'عسل سدر (1 كيلو)', price: 250, category: 'العسل والسمن', unitType: 4, hasOptions: false },
  { id: 56, name: 'عسل سمر (1 كيلو)', price: 280, category: 'العسل والسمن', unitType: 4, hasOptions: false },
  { id: 57, name: 'سمن غنم منجور (1 كيلو)', price: 150, category: 'العسل والسمن', unitType: 4, hasOptions: false }
];

const cities = [
  'الطائف', 'جدة', 'الرياض', 'مكة المكرمة', 'الدمام', 'المدينة المنورة', 'أبها', 'تبوك', 'خميس مشيط', 'جازان'
];

function calculateItemTotal(product, quantity) {
  return Number(product.price || 0) * Number(quantity || 0);
}

function calculateShipping(city, subtotal) {
  if (city === 'الطائف') return { amount: 0, method: 'local_free', note: 'توصيل مجاني داخل الطائف' };
  if (subtotal >= 300) return { amount: 18, method: 'regional_discount', note: 'شحن مخفض للطلبات الكبيرة' };
  return { amount: 25, method: 'regional_standard', note: 'شحن قياسي لباقي المدن' };
}

app.get('/api/config', (_req, res) => {
  res.json(storeConfig);
});

app.get('/api/products', (_req, res) => {
  res.json({ products: productsDB, categories: [...new Set(productsDB.map((p) => p.category))], cities });
});

app.post('/api/shipping/quote', async (req, res) => {
  const { city, subtotal } = req.body || {};

  if (!city) {
    return res.status(400).json({ message: 'المدينة مطلوبة.' });
  }

  if (storeConfig.nitroEnabled && process.env.NITRO_SHIPPING_QUOTE_ENDPOINT) {
    return res.json({
      provider: 'nitro',
      mode: 'placeholder',
      message: 'تم تفعيل وضع Nitro، لكن يجب ربط endpoint الفعلي لجلب سعر الشحن من حسابك.',
      quote: calculateShipping(city, subtotal || 0)
    });
  }

  return res.json({
    provider: 'internal-fallback',
    mode: 'estimated',
    quote: calculateShipping(city, subtotal || 0)
  });
});

app.post('/api/orders', async (req, res) => {
  const { customer, items, paymentMethod, shipping } = req.body || {};

  if (!customer?.name || !customer?.phone || !customer?.city) {
    return res.status(400).json({ message: 'بيانات العميل غير مكتملة.' });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ message: 'السلة فارغة.' });
  }

  const normalizedItems = items.map((item) => {
    const product = productsDB.find((p) => p.id === item.id);
    if (!product) {
      throw new Error(`Product not found: ${item.id}`);
    }
    return {
      id: product.id,
      name: product.name,
      quantity: Number(item.quantity),
      price: product.price,
      total: calculateItemTotal(product, item.quantity),
      options: item.options || {}
    };
  });

  const subtotal = normalizedItems.reduce((sum, item) => sum + item.total, 0);
  const shippingQuote = shipping?.amount ?? calculateShipping(customer.city, subtotal).amount;
  const grandTotal = subtotal + shippingQuote;
  const orderId = `TT-${Date.now()}`;

  let payment = { status: 'pending', provider: paymentMethod, redirectUrl: null, note: '' };

  if (paymentMethod === 'online_moyasar') {
    payment = {
      status: storeConfig.moyasarEnabled ? 'requires_redirect' : 'not_configured',
      provider: 'moyasar',
      redirectUrl: storeConfig.moyasarEnabled ? '/payment-return?status=mock-success' : null,
      note: storeConfig.moyasarEnabled
        ? 'في هذه النسخة تم تجهيز نقطة البداية. اربط إنشاء الدفع الحقيقي عبر Moyasar secret key داخل الخادم.'
        : 'Moyasar غير مفعّل بعد. أضف المفاتيح في ملف .env.'
    };
  }

  if (paymentMethod === 'cod') {
    payment = {
      status: 'cod',
      provider: 'cash_on_delivery',
      redirectUrl: null,
      note: 'تم اختيار الدفع عند الاستلام.'
    };
  }

  res.status(201).json({
    orderId,
    customer,
    items: normalizedItems,
    subtotal,
    shipping: { amount: shippingQuote },
    total: grandTotal,
    payment,
    shipment: {
      provider: storeConfig.nitroEnabled ? 'nitro' : 'manual',
      status: storeConfig.nitroEnabled ? 'awaiting_nitro_endpoint' : 'pending_manual_review',
      note: storeConfig.nitroEnabled
        ? 'أضف endpoint إنشاء الشحنة الحقيقي في .env ثم استبدل منطق placeholder.'
        : 'التوصيل يعمل الآن كتقدير داخلي حتى يتم تفعيل Nitro.'
    }
  });
});

app.get('/payment-return', (req, res) => {
  const status = req.query.status || 'unknown';
  res.send(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>نتيجة الدفع</title><style>body{font-family:Arial;padding:40px;background:#faf7f2;color:#2f2a25}a{color:#6b4f3b}</style></head><body><h1>نتيجة الدفع</h1><p>الحالة الحالية: <strong>${status}</strong></p><p><a href="/">العودة إلى المتجر</a></p></body></html>`);
});

app.listen(port, () => {
  console.log(`Store server running on http://localhost:${port}`);
});
