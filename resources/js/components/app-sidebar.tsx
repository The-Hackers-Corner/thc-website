import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard, login, register } from '@/routes';
import ctf from '@/routes/ctf';
import leaderboard from '@/routes/leaderboard';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { LayoutGrid, Trophy, Users, Info, Wrench, MessageCircle, LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth, adminEmail } = usePage<SharedData>().props;
    const isAuthenticated = !!auth.user;
    const isAdmin =
        isAuthenticated &&
        (auth.user.is_admin ||
            (adminEmail && auth.user.email === adminEmail));

    const mainNavItems: NavItem[] = [
        ...(isAuthenticated
            ? [
                {
                    title: 'Dashboard',
                    href: dashboard(),
                    icon: LayoutGrid,
                },
                ...(isAdmin
                    ? [
                          {
                              title: 'Admin',
                              href: '/admin',
                              icon: ShieldCheck,
                          } satisfies NavItem,
                      ]
                    : []),
            ]
            : []),
        {
            title: 'About',
            href: '/about',
            icon: Info,
        },
        {
            title: 'Community',
            href: '/community',
            icon: MessageCircle,
        },
        {
            title: 'Resources',
            href: '/resources',
            icon: Wrench,
        },
        {
            title: 'CTF Arena',
            href: ctf.index(),
            icon: Trophy,
        },
        {
            title: 'Leaderboard',
            href: leaderboard.index(),
            icon: Users,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                {isAuthenticated ? (
                    <NavUser />
                ) : (
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild tooltip="Sign In">
                                <Link href={login()} className="w-full group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                                    <LogIn className="group-data-[collapsible=icon]:m-0" />
                                    <span className="group-data-[collapsible=icon]:hidden">Sign In</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild tooltip="Register">
                                <Link href={register()} className="w-full group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:justify-center">
                                    <UserPlus className="group-data-[collapsible=icon]:m-0" />
                                    <span className="group-data-[collapsible=icon]:hidden">Register</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
