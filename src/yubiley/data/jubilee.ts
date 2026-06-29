export const siteMeta = {
  title: 'Ведущий на юбилей в Москве — Тимур Громов',
  description:
    'Тёплый ведущий на юбилей в Москве — Тимур Громов. Семейный формат без неловких конкурсов. Ведущий + DJ + звук, сценарий под семью.',
  shortDescription: 'Семейный формат без неловких конкурсов. Ведущий + DJ + звук. Сценарий под семью.',
  url: 'https://timurgromov.ru/yubiley/',
  ogImage: 'https://timurgromov.ru/yubiley-assets/assets/og_og.jpg?v=1',
  themeColor: '#0c0f14'
};

export const contact = {
  name: 'Тимур Громов',
  phoneHuman: '+7 (925) 390-07-72',
  phoneHref: 'tel:+79253900772',
  phoneSchema: '+7-925-390-07-72',
  email: 'timurgromov.showman@gmail.com',
  whatsappUrl:
    'https://wa.me/79253900772?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5%2C%20%D1%85%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D1%8E%D0%B1%D0%B8%D0%BB%D0%B5%D0%B9%21',
  telegramUrl: 'https://t.me/timurgromovv',
  maxUrl: 'https://max.ru/u/f9LHodD0cOIvnExDiltaWpLlPOHIr5y0qyb51SeYWFVvQJP5FUivyzS2fRM?clckid=c487e7dc',
  instagramUrl: 'https://instagram.com/timurgromov',
  vkUrl: 'https://vk.com/timurgromovvv',
  youtubeUrl: 'https://www.youtube.com/@timurgromovv'
};

export const hero = {
  title: 'Тёплый ведущий на юбилей в Москве',
  subtitle: 'Семейный, душевный формат без неловких конкурсов и лишнего шума.',
  image: '/yubiley-assets/assets/hero/portrait.webp',
  imageAlt: 'Тимур Громов — ведущий на юбилей',
  tags: [
    { label: 'Юбилеи 50/60/70 лет' },
    { label: 'Семейная атмосфера' },
    { label: 'Ведущий + DJ + звук', className: 'tag-radio' },
    { label: 'Сценарий под семью' },
    { label: 'Добрый юмор', className: 'tag-humor' },
    { label: 'Без неловких конкурсов' },
    { label: 'Договор ИП' }
  ]
};

export const videos = [
  { video: 'https://cdnv.boomstream.com/balancer/o3LLb1w5-SxJPiQup.mp4', cover: '/yubiley-assets/assets/photos/cover1.webp' },
  { video: 'https://cdnv.boomstream.com/balancer/mutbwKHj-SxJPiQup.mp4', cover: '/yubiley-assets/assets/photos/cover2.webp' },
  { video: 'https://cdnv.boomstream.com/balancer/x1xsDQws-SxJPiQup.mp4', cover: '/yubiley-assets/assets/photos/cover3.webp' },
  { video: 'https://cdnv.boomstream.com/balancer/QCDV8bgf-EuQeQgfF.mp4', cover: '/yubiley-assets/assets/photos/cover4.webp' }
];

export const benefits = [
  ['Ведущий + DJ + звук', 'Одна команда для вечера, музыки и спокойного тайминга.'],
  ['Сценарий под семью', 'Учитываю возраст, характер гостей, важные истории и формат поздравлений.'],
  ['Без неловких конкурсов', 'Добрый юмор и интерактивы, в которых гостям комфортно участвовать.'],
  ['Тёплая атмосфера', 'Помогаю соединить поколения и сделать вечер живым, а не формальным.'],
  ['Организация процесса', 'Согласую тайминг с рестораном, подрядчиками, артистами и родственниками.'],
  ['20 лет в профессии', '800+ событий, 3 года Love Radio, 10 лет КВН, опыт семейных и премиальных вечеров.']
];

export const workflowSteps = [
  ['Знакомство', 'Созвон или сообщение — обсуждаем дату, площадку, состав гостей и ожидания семьи.'],
  ['Идея вечера', 'Подбираю тон: душевно, современно, с юмором, но без лишнего давления на гостей.'],
  ['Сценарий и тайминг', 'Готовим порядок поздравлений, музыкальные акценты, интерактивы и финал.'],
  ['Подготовка', 'Согласую DJ, звук, площадку, подрядчиков и важные семейные детали.'],
  ['Юбилей', 'Веду вечер спокойно и внимательно: гости вовлечены, имениннику комфортно.']
];

export const photos = Array.from({ length: 14 }, (_, index) => {
  const number = index + 1;
  return {
    src: `/yubiley-assets/assets/photos/gal/P${number}.webp`,
    alt: `Момент юбилейного вечера ${number}`,
    loading: number === 1 ? 'eager' : 'lazy',
    fetchpriority: number === 1 ? 'high' : undefined
  };
});

export const letters = Array.from({ length: 13 }, (_, index) => {
  const number = index + 1;
  return {
    src: `/yubiley-assets/assets/letters/L${number}.webp`,
    alt: `Благодарственное письмо ${number}`
  };
});

export const contactPage = {
  title: 'Свяжитесь со мной — Тимур Громов',
  description: 'Выберите удобный мессенджер для связи. Отвечу лично и пришлю материалы по юбилею.',
  url: 'https://timurgromov.ru/yubiley/contact/',
  heading: 'ВЫБЕРИТЕ УДОБНЫЙ МЕССЕНДЖЕР',
  subtitle: 'Я ПРИШЛЮ МАТЕРИАЛЫ ПО ПОДГОТОВКЕ К ЮБИЛЕЮ',
  footer: 'ОТВЕЧУ ЛИЧНО И ПОМОГУ С ФОРМАТОМ'
};

export const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: contact.name,
  description: 'Ведущий на юбилей в Москве. Тёплый семейный формат, DJ и звук под ключ.',
  url: siteMeta.url,
  image: siteMeta.ogImage,
  telephone: contact.phoneSchema,
  email: contact.email,
  areaServed: {
    '@type': 'City',
    name: 'Москва'
  }
};
