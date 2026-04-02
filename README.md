# متجر طاحون الطيب - نسخة مطورة

هذه نسخة مطورة من الموقع الحالي، وتم تجهيزها لتكون أوضح وأرتب وتدعم:
- سلة مشتريات احترافية
- حساب شحن
- إنشاء الطلب من داخل الموقع
- الدفع عند الاستلام
- نقطة بداية للربط مع الدفع الإلكتروني
- نقطة بداية للربط مع Nitro

## أين أضع مفتاح الـ API؟

### 1) مفاتيح الدفع والشحن السرّية
ضعها في ملف:

```bash
.env
```

ابدأ بنسخ الملف:

```bash
cp .env.example .env
```

ثم عدل القيم.

### 2) مفاتيح عامة للواجهة
مثل المفتاح العام لبعض بوابات الدفع، يتم قراءته من الخادم عبر `/api/config`.

**لا تضع المفتاح السري داخل HTML أو JavaScript في الواجهة.**

---

## أماكن المفاتيح داخل `.env`

### Nitro
```env
NITRO_ENABLED=true
NITRO_BASE_URL=https://svc.nitrocommerce.ai
NITRO_PLATFORM_NAME=your_platform_name
NITRO_PLATFORM_EMAIL=your-platform-email@example.com
NITRO_PLATFORM_PASSWORD=your-platform-password
NITRO_BEARER_TOKEN=ضع_التوكن_هنا_إذا_كان_متوفر
NITRO_ORG_ID=ضع_معرف_المنظمة_هنا
NITRO_SHIPPING_QUOTE_ENDPOINT=ضع_endpoint_حساب_الشحن_هنا
NITRO_CREATE_SHIPMENT_ENDPOINT=ضع_endpoint_إنشاء_الشحنة_هنا
NITRO_WEBHOOK_SECRET=ضع_سر_الويب_هوك_هنا
```

### Moyasar
```env
MOYASAR_ENABLED=true
MOYASAR_PUBLISHABLE_KEY=pk_test_xxxxx
MOYASAR_SECRET_KEY=sk_test_xxxxx
MOYASAR_CALLBACK_URL=https://yourdomain.com/payment-return
```

### PayTabs
```env
PAYTABS_ENABLED=true
PAYTABS_PROFILE_ID=xxxxx
PAYTABS_SERVER_KEY=xxxxx
PAYTABS_CLIENT_KEY=xxxxx
PAYTABS_CALLBACK_URL=https://yourdomain.com/payment-return
```

---

## تشغيل المشروع

### 1) تثبيت الحزم
```bash
npm install
```

### 2) إنشاء ملف البيئة
```bash
cp .env.example .env
```

### 3) تشغيل الموقع
```bash
npm start
```

ثم افتح:

```bash
http://localhost:3000
```

---

## ماذا تم تطويره مقارنة بالموقع القديم؟

- تصميم احترافي أوضح
- تنظيم أفضل للمنتجات
- ملخص طلب دائم
- نموذج عميل مرتب
- دعم حساب شحن
- فصل الواجهة عن منطق الطلبات
- تجهيز للدفع والتوصيل بدل الاعتماد فقط على واتساب وGoogle Sheet

---

## ملاحظة مهمة عن Nitro

الوثائق العامة التي تم العثور عليها تشرح بشكل واضح:
- Login API
- Register User API
- Webhook setup

لكنها لا تعرض بشكل واضح endpoint عام نهائي لإنشاء شحنة لمتجر مخصص مباشرة كما هو مطلوب لسيناريو الشحن الكامل؛ لذلك أضفت لك **أماكن واضحة في `.env`** لتضع الـ endpoints الحقيقية بعد أخذها من حسابك أو من دعم Nitro.

---

## بوابات دفع مناسبة لموقعك

### الأفضل كبداية في السعودية
1. **Moyasar**
   - ممتاز للمواقع الصغيرة والمتوسطة
   - يدعم مدى وVisa وMastercard وApple Pay وSTC Pay
   - وثائق المطورين واضحة

2. **PayTabs**
   - قوي في المنطقة
   - مناسب إذا أردت حلولًا أوسع للشركات والتوسع لاحقًا

3. **HyperPay**
   - جيد للشركات والمتاجر التي تريد مرونة وحلولًا أوسع

### اختياري أيضًا
- Geidea
- Tap Payments

---

## ترشيحي لك

- **للإطلاق السريع:** Moyasar
- **للشحن:** Nitro إذا زودك الحساب بواجهات الشحن الفعلية
- **كخطة قوية:**
  - الدفع عبر Moyasar
  - الشحن عبر Nitro
  - إدارة الطلبات عبر هذا الخادم

