import linkedinIcon from '../assets/icons/linkedin.png'
import githubIcon from '../assets/icons/github.png'
import emailIcon from '../assets/icons/email.png'

const EMAIL = 'alex.salsan97@gmail.com'

export const CONTACT_LINKS = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/alejandro-salado/',
    icon: linkedinIcon,
    external: true,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/alex-salsan',
    icon: githubIcon,
    external: true,
  },
  {
    label: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: emailIcon,
  },
]
