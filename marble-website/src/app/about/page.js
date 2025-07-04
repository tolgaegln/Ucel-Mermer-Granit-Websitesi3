import { Award, Users, Target, Eye, CheckCircle, Building, Truck, Shield } from 'lucide-react'

export default function About() {
  const milestones = [
    {
      year: '2008',
      title: 'Şirket Kuruluşu',
      description: 'Samsun\'da küçük bir atölye olarak faaliyetimize başladık.'
    },
    {
      year: '2012',
      title: 'İlk Büyük Proje',
      description: 'Samsun\'da büyük çaplı otel projemizi başarıyla tamamladık.'
    },
    {
      year: '2015',
      title: 'Üretim Tesisi',
      description: 'Modern üretim tesisimizi kurarak kapasitemizi 3 kat artırdık.'
    },
    {
      year: '2018',
      title: 'Uluslararası Genişleme',
      description: 'Avrupa pazarına açılarak ihracat faaliyetlerimize başladık.'
    },
    {
      year: '2020',
      title: 'Dijital Dönüşüm',
      description: 'Dijital showroom umuzu açtık.'
    },
    {
      year: '2024',
      title: 'Sürdürülebilirlik',
      description: '100% çevre dostu üretim süreçlerine geçişimizi tamamladık.'
    }
  ]

  const values = [
    {
      icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
      title: 'Kalite',
      description: 'Her ürünümüzde en yüksek kalite standartlarını uygularız.'
    },
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: 'Güvenilirlik',
      description: 'Müşterilerimizle uzun vadeli güven ilişkileri kurarız.'
    },
    {
      icon: <Users className="w-8 h-8 text-purple-600" />,
      title: 'Müşteri Odaklılık',
      description: 'Müşteri memnuniyeti bizim en büyük önceliğimizdir.'
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-600" />,
      title: 'Mükemmellik',
      description: 'Her projede mükemmellik için sürekli kendimizi geliştiririz.'
    }
  ]

  const facilities = [
    {
      icon: <Building className="w-12 h-12 text-blue-600" />,
      title: 'Modern Üretim Tesisi',
      description: '15.000 m² kapalı alanda son teknoloji makinelerle üretim'
    },
    {
      icon: <Truck className="w-12 h-12 text-green-600" />,
      title: 'Lojistik Merkezi',
      description: 'Hızlı ve güvenli teslimat için stratejik konumda depo'
    },
    {
      icon: <Shield className="w-12 h-12 text-purple-600" />,
      title: 'Kalite Laboratuvarı',
      description: 'Her ürünün test edildiği gelişmiş kalite kontrol laboratuvarı'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hakkımızda</h1>
          <p className="text-xl text-gray-800">
            15 yılı aşkın deneyimimizle mermer ve doğal taş sektöründe öncü bir firmayız
          </p>
        </div>
      </div>

      {/* Company Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Hikayemiz</h2>
              <p className="text-gray-900 mb-6 leading-relaxed">
                2008 yılında Samsun'da küçük bir aile işletmesi olarak başladığımız yolculuğumuzda, 
                mermer ve doğal taş sektöründe kalite ve güvenilirlik anlayışımızı hiç değiştirmeden 
                büyümeye devam ettik.
              </p>
              <p className="text-gray-900 mb-6 leading-relaxed">
                Bugün Türkiye'nin önde gelen mermer tedarikçilerinden biri olan şirketimiz, 
                500'den fazla projeyi başarıyla tamamlamış ve binlerce müşteriye hizmet vermiştir.
              </p>
              <p className="text-gray-900 leading-relaxed">
                Kaliteli ürünler, profesyonel hizmet ve müşteri memnuniyeti odaklı yaklaşımımızla 
                sektörde güvenilir bir marka haline geldik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Target className="w-10 h-10 text-blue-600 mr-4" />
                <h2 className="text-2xl font-bold text-gray-900">Misyonumuz</h2>
              </div>
              <p className="text-gray-900 leading-relaxed">
                Kaliteli mermer ve doğal taş ürünleri ile müşterilerimizin hayallerini 
                gerçeğe dönüştürmek, sürdürülebilir üretim anlayışıyla çevreye saygılı 
                çözümler sunmak ve sektörde yenilikçi yaklaşımlarla öncü olmaktır.
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center mb-6">
                <Eye className="w-10 h-10 text-purple-600 mr-4" />
                <h2 className="text-2xl font-bold text-gray-900">Vizyonumuz</h2>
              </div>
              <p className="text-gray-900 leading-relaxed">
                Türkiye'nin en güvenilir mermer ve doğal taş markası olmak, 
                uluslararası pazarlarda Türk mermerini en iyi şekilde temsil etmek 
                ve gelecek nesillere daha yaşanabilir bir dünya bırakmaktır.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Tarihçemiz</h2>
            <p className="text-xl text-gray-800">Başarı dolu yolculuğumuzun önemli durakları</p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-200"></div>
            
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center mb-8 ${
                index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
              }`}>
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="text-2xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-900">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Değerlerimiz</h2>
            <p className="text-xl text-gray-800">Başarımızın temeli olan değerlerimiz</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition-shadow">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-800">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tesislerimiz</h2>
            <p className="text-xl text-gray-300">Modern altyapımız ve teknolojimiz</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {facilities.map((facility, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-6">
                  {facility.icon}
                </div>
                <h3 className="text-xl font-semibold mb-4">{facility.title}</h3>
                <p className="text-gray-300">{facility.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificates & Quality */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Sertifikalarımız</h2>
            <p className="text-xl text-gray-800">Kalite standartlarımızı belgeleyen sertifikalarımız</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['ISO 9001', 'ISO 14001', 'CE Belgesi', 'TSE Kalite'].map((cert, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-6 text-center hover:shadow-lg transition-shadow">
                <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-semibold text-gray-900">{cert}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
} 