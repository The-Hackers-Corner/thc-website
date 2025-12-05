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
import { LayoutGrid, Trophy, Users, Info, Wrench, MessageCircle, LogIn, UserPlus } from 'lucide-react';
import AppLogo from './app-logo';

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const isAuthenticated = !!auth.user;

    const mainNavItems: NavItem[] = [
        ...(isAuthenticated
            ? [
                {
                    title: 'Dashboard',
                    href: dashboard(),
                    icon: LayoutGrid,
                },
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
                            <SidebarMenuButton size="lg" asChild>
                                <Link href={login()} className="w-full">
                                    <LogIn />
                                    <span>Sign In</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild>
                                <Link href={register()} className="w-full">
                                    <UserPlus />
                                    <span>Register</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                )}
            </SidebarFooter>
        </Sidebar>
    );
}
