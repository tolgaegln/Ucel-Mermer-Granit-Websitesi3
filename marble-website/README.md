Üçel Mermer Granit   Web Sitesi

Bu proje, mermer ve doğal taş sektöründe faaliyet gösteren üçel mermer granit için geliştirilmiş modern bir web sitesi uygulamasıdır. Ürün kataloğu, proje portföyü, iletişim yönetimi ve kapsamlı bir yönetim paneli içermektedir.

Kullanılan Teknolojiler

Frontend**
  - Next.js 15.3
  - React 19
  - TailwindCSS
  - Lucide React (İkonlar)

Backend**
  - Next.js API Routes
  - Prisma ORM
  - SQLite Veritabanı
  - NextAuth.js (Kimlik Doğrulama)
  - Bcrypt (Şifreleme)

Kurulum Talimatları

1. Projeyi klonlayın:
```bash
git clone [repo-url]
cd marble-website
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyasını oluşturun:
```env
DATABASE_URL="file:./prisma/dev.db"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
```

4. Veritabanını oluşturun ve başlangıç verilerini yükleyin:
```bash
npx prisma migrate dev
npx prisma db seed
```

5. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

Uygulama http://localhost:3000 adresinde çalışmaya başlayacaktır.

Admin Paneli Giriş Bilgileri

Admin paneline erişmek için aşağıdaki bilgileri kullanabilirsiniz:

- **URL**: http://localhost:3000/admin
- **E-posta**: admin@marble.com
- **Şifre**: admin123

Özellikler

-  Responsive tasarım
-  Kapsamlı yönetim paneli
-  Ürün ve proje görselleri yönetimi
-  İletişim formu ve mesaj yönetimi
-  Kullanıcı yönetimi
-  Kategori ve ürün yönetimi
-  Proje portföyü
-  Site ayarları yönetimi

Proje Yapısı

- `/src/app` - Sayfa bileşenleri ve API rotaları
- `/src/components` - Yeniden kullanılabilir UI bileşenleri
- `/prisma` - Veritabanı şeması ve migration dosyaları
- `/public` - Statik dosyalar


