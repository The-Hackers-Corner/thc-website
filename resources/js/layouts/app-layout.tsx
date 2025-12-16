import AppLayoutTemplate from '@/layouts/app/app-sidebar-layout';
import { type BreadcrumbItem } from '@/types';
import { type ReactNode } from 'react';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

import { usePage } from '@inertiajs/react';
import { AnimatePresence, motion } from 'framer-motion';

export default ({ children, breadcrumbs, ...props }: AppLayoutProps) => {
    const { url } = usePage();
    return (
        <AppLayoutTemplate breadcrumbs={breadcrumbs} {...props}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={url}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {children}
                </motion.div>
            </AnimatePresence>
        </AppLayoutTemplate>
    );
};