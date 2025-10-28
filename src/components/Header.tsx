import React from 'react';
import {
  BarChart,
  Briefcase,
  FileText,
  Info,
  MenuIcon,
  Sparkles,
  XIcon,
} from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuLink,
  type NavItemType,
  NavGridCard,
  NavItemMobile,
} from '@/components/ui/navigation-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { RainbowButton } from '@/components/ui/rainbow-button';
import { cn } from '@/lib/utils';
import logoWhite from '@/assets/logo-engaja-pro-white.png';

export const servicosLinks: NavItemType[] = [
  {
    title: 'Marketing Digital',
    href: '#',
    description: 'Estratégias completas para alavancar sua presença online',
    icon: Sparkles,
  },
  {
    title: 'Gestão de Redes Sociais',
    href: '#',
    description: 'Conteúdo que engaja e converte seu público',
    icon: BarChart,
  },
  {
    title: 'Consultoria',
    href: '#',
    description: 'Análise personalizada para seu negócio crescer',
    icon: Briefcase,
  },
];

export const portfolioLinks: NavItemType[] = [
  {
    title: 'Nossos Projetos',
    href: '#',
    description: 'Conheça os trabalhos que desenvolvemos',
    icon: FileText,
  },
  {
    title: 'Cases de Sucesso',
    href: '#',
    description: 'Resultados reais dos nossos clientes',
    icon: BarChart,
  },
];

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <div
        className={cn(
          'bg-background/95 supports-[backdrop-filter]:bg-background/80',
          'mx-auto h-16 w-full max-w-7xl border px-6 rounded-2xl backdrop-blur-xl',
          'shadow-lg'
        )}
      >
        <div className="flex h-full items-center justify-between">
          <a href="/" className="flex items-center gap-3">
            <img 
              src={logoWhite} 
              alt="Engaja Pro" 
              className="h-10 w-10 object-contain brightness-0 dark:brightness-100"
            />
            <span className="font-bold text-xl">Engaja Pro</span>
          </a>

          <DesktopMenu />

          <div className="flex items-center gap-3">
            <RainbowButton className="hidden lg:inline-flex">
              Contato
            </RainbowButton>
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

function DesktopMenu() {
  return (
    <NavigationMenu className="hidden lg:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className="cursor-pointer">
            Início
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Serviços</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[600px] gap-3 p-4 md:grid-cols-2">
              {servicosLinks.map((link) => (
                <li key={link.href}>
                  <NavGridCard link={link} />
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Portfólio</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              {portfolioLinks.map((link) => (
                <li key={link.href}>
                  <NavGridCard link={link} className="min-h-28" />
                </li>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#cases" className="cursor-pointer">
            Cases
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="#sobre" className="cursor-pointer">
            Sobre
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileNav() {
  const sections = [
    {
      id: 'servicos',
      name: 'Serviços',
      list: servicosLinks,
    },
    {
      id: 'portfolio',
      name: 'Portfólio',
      list: portfolioLinks,
    },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="rounded-full lg:hidden">
          <MenuIcon className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="bg-background/95 supports-[backdrop-filter]:bg-background/80 w-full gap-0 backdrop-blur-lg"
      >
        <div className="flex h-14 items-center justify-end border-b px-4">
          <SheetClose asChild>
            <Button size="icon" variant="ghost" className="rounded-full">
              <XIcon className="size-5" />
              <span className="sr-only">Fechar</span>
            </Button>
          </SheetClose>
        </div>
        <div className="container grid gap-y-2 overflow-y-auto px-4 pt-5 pb-12">
          <div className="border-b pb-2">
            <SheetClose asChild>
              <a href="/" className="block px-4 py-2 hover:bg-accent rounded-md">
                Início
              </a>
            </SheetClose>
          </div>
          <Accordion type="single" collapsible>
            {sections.map((section) => (
              <AccordionItem key={section.id} value={section.id}>
                <AccordionTrigger className="capitalize hover:no-underline">
                  {section.name}
                </AccordionTrigger>
                <AccordionContent className="space-y-1">
                  <ul className="grid gap-1">
                    {section.list.map((link) => (
                      <li key={link.href}>
                        <SheetClose asChild>
                          <NavItemMobile item={link} href={link.href} />
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="border-t pt-2 space-y-2">
            <SheetClose asChild>
              <a href="#cases" className="block px-4 py-2 hover:bg-accent rounded-md">
                Cases
              </a>
            </SheetClose>
            <SheetClose asChild>
              <a href="#sobre" className="block px-4 py-2 hover:bg-accent rounded-md">
                Sobre
              </a>
            </SheetClose>
          </div>
          <div className="pt-4">
            <RainbowButton className="w-full">Contato</RainbowButton>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
