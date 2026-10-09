export const siteMeta = {
  title: 'Ведущий на юбилей в Москве — Тимур Громов',
  description:
    'Ведущий на юбилей в Москве — Тимур Громов. Семейный формат без неловких конкурсов. Ведущий + DJ + звук, сценарий под семью.',
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
  maxUrl: 'https://calcul.timurgromov.ru/api/v1/site/messenger-start?provider=max&mode=start&payload=site_meeting_timurgromov__jubilee__contact_page',
  instagramUrl: 'https://instagram.com/timurgromov',
  vkUrl: 'https://vk.com/timurgromovvv',
  youtubeUrl: 'https://www.youtube.com/@timurgromovv'
};

export const hero = {
  title: 'Ведущий на юбилей в Москве',
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
  ['Концепция юбилея', 'Подбираю тон: душевно, современно, с юмором, но без лишнего давления на гостей.'],
  ['Сценарий и тайминг', 'Готовим порядок поздравлений, музыкальные акценты, интерактивы и финал.'],
  ['Договор и подготовка', 'Фиксируем договорённости и согласую DJ, звук, площадку, подрядчиков и важные семейные детали.'],
  ['Юбилей', 'Веду вечер спокойно и внимательно: гости вовлечены, имениннику комфортно.']
];

export const jubileeEveningStages = [
  ['Сбор гостей', 'Гости знакомятся, общаются и постепенно собираются в общий ритм вечера.'],
  ['Открытие и поздравления', 'Внимание имениннику, первые слова семьи и аккуратное начало без формальности.'],
  ['Семейные истории и программа', 'Поздравления, добрый юмор и участие гостей — с учётом характера семьи и поколения.'],
  ['Музыка и танцы', 'DJ поддерживает настроение весь вечер; кавер-группа добавляется в третьем пакете после согласования состава и площадки.'],
  ['Финал вечера', 'Общий красивый момент и завершение в темпе, который подходит имениннику и семье.']
];

const currentGalleryPhoto = (file: string, alt: string, priority = false) => ({
  src: `/yubiley-assets/assets/photos/gal/current/${file}-1024.webp`,
  srcset: `/yubiley-assets/assets/photos/gal/current/${file}-640.webp 640w, /yubiley-assets/assets/photos/gal/current/${file}-1024.webp 1024w`,
  avifSrcset: `/yubiley-assets/assets/photos/gal/current/${file}-640.avif 640w, /yubiley-assets/assets/photos/gal/current/${file}-1024.avif 1024w`,
  sizes: '(max-width: 768px) calc(100vw - 36px), 420px',
  alt,
  loading: priority ? ('eager' as const) : ('lazy' as const),
  fetchpriority: priority ? ('high' as const) : undefined
});

const legacyGalleryPhoto = (number: number, alt: string) => ({
  src: `/yubiley-assets/assets/photos/gal/P${number}.webp`,
  alt,
  loading: 'lazy' as const,
  fetchpriority: undefined
});

export const photos = [
  currentGalleryPhoto('current-07-stage-floor', 'Тимур Громов ведёт программу на сцене', true),
  legacyGalleryPhoto(2, 'Тимур Громов общается с группой гостей'),
  currentGalleryPhoto('current-09-with-guests', 'Тимур Громов с гостями юбилея'),
  legacyGalleryPhoto(7, 'Гости танцуют на празднике'),
  legacyGalleryPhoto(5, 'Интерактив с гостями во время программы'),
  currentGalleryPhoto('current-01-guest', 'Тимур Громов беседует с юбиляром во время программы'),
  legacyGalleryPhoto(10, 'Тимур Громов общается с гостьей'),
  currentGalleryPhoto('current-08-gray-mic', 'Тимур Громов ведёт программу с микрофоном'),
  legacyGalleryPhoto(14, 'Живое общение с гостями юбилея'),
  legacyGalleryPhoto(11, 'Программа юбилея за общим столом'),
  legacyGalleryPhoto(6, 'Активная часть программы с гостями'),
  legacyGalleryPhoto(8, 'Тимур Громов обращается к гостям'),
  legacyGalleryPhoto(12, 'Тимур Громов работает вместе с гостем'),
  legacyGalleryPhoto(9, 'Общение с гостями на мероприятии')
];

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
