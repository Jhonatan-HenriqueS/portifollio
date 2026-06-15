import Image from 'next/image';

const socialLinks = [
  {
    ariaLabel: 'Conversar com Jhonatan Henrique pelo WhatsApp',
    href: 'https://wa.me/5569993897171?text=Gostaria%20de%20me%20informar%20sobre%20seu%20trabalho',
    icon: '/icons/whatsapp.svg',
    label: 'WhatsApp',
  },
  {
    ariaLabel: 'Abrir Instagram de Jhonatan Henrique',
    href: 'https://www.instagram.com/jh.rique/',
    icon: '/icons/instagram.svg',
    label: 'Instagram',
  },
  {
    ariaLabel: 'Enviar email para Jhonatan Henrique',
    href: 'mailto:jhonatanhrcomercial@gmail.com',
    icon: '/icons/gmail.svg',
    label: 'Gmail',
  },
];

export function SocialDock() {
  return (
    <aside
      aria-label="Links sociais"
      className="fixed bottom-4 right-4 z-40 w-[168px] overflow-hidden rounded-[9px] border border-white/10 bg-white/[0.075] p-2.5 shadow-2xl shadow-black/45 backdrop-blur-[22px] sm:bottom-6 sm:right-6 sm:w-[188px]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-7 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.03)_45%,transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,255,255,0.2),transparent_36%),linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]"
      />

      <div className="relative flex items-center justify-between gap-2">
        {socialLinks.map((link) => (
          <a
            aria-label={link.ariaLabel}
            className="group flex size-11 items-center justify-center rounded-[7px] border border-white/10 bg-black/28 outline-none transition-all duration-300 ease-expo-out hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/12 focus-visible:border-white/45 sm:size-12"
            href={link.href}
            key={link.label}
            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            target={link.href.startsWith('http') ? '_blank' : undefined}
            title={link.label}
          >
            <Image
              alt=""
              aria-hidden="true"
              className="size-5 opacity-85 invert transition-opacity duration-300 ease-expo-out group-hover:opacity-100 sm:size-5"
              height={20}
              src={link.icon}
              width={20}
            />
          </a>
        ))}
      </div>
    </aside>
  );
}
