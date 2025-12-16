import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ExternalLink, Code, Database, Lock, Network, Search, Terminal } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Resources',
        href: '/resources',
    },
];

interface Resource {
    name: string;
    description: string;
    url: string;
    category: string;
}

const resources: Resource[] = [
    // Web Exploitation
    {
        name: 'OWASP Web Security Testing Guide',
        description: 'Comprehensive guide for web application security testing',
        url: 'https://owasp.org/www-project-web-security-testing-guide/',
        category: 'Web Exploitation',
    },
    {
        name: 'PortSwigger Web Security Academy',
        description: 'Free online training for web application security',
        url: 'https://portswigger.net/web-security',
        category: 'Web Exploitation',
    },
    {
        name: 'Burp Suite',
        description: 'Web application security testing platform',
        url: 'https://portswigger.net/burp',
        category: 'Web Exploitation',
    },
    // Cryptography
    {
        name: 'CryptoHack',
        description: 'Learn cryptography through fun challenges',
        url: 'https://cryptohack.org/',
        category: 'Cryptography',
    },
    {
        name: 'CyberChef',
        description: 'The Cyber Swiss Army Knife for data manipulation',
        url: 'https://gchq.github.io/CyberChef/',
        category: 'Cryptography',
    },
    // Forensics
    {
        name: 'Wireshark',
        description: 'Network protocol analyzer for forensics',
        url: 'https://www.wireshark.org/',
        category: 'Forensics',
    },
    {
        name: 'Autopsy',
        description: 'Digital forensics platform',
        url: 'https://www.autopsy.com/',
        category: 'Forensics',
    },
    {
        name: 'Volatility',
        description: 'Memory forensics framework',
        url: 'https://www.volatilityfoundation.org/',
        category: 'Forensics',
    },
    // Reverse Engineering
    {
        name: 'Ghidra',
        description: 'NSA reverse engineering framework',
        url: 'https://ghidra-sre.org/',
        category: 'Reverse Engineering',
    },
    {
        name: 'IDA Pro',
        description: 'Interactive disassembler and debugger',
        url: 'https://hex-rays.com/ida-pro/',
        category: 'Reverse Engineering',
    },
    {
        name: 'Radare2',
        description: 'Open-source reverse engineering framework',
        url: 'https://rada.re/',
        category: 'Reverse Engineering',
    },
    // General Tools
    {
        name: 'Metasploit',
        description: 'Penetration testing framework',
        url: 'https://www.metasploit.com/',
        category: 'General Tools',
    },
    {
        name: 'Nmap',
        description: 'Network discovery and security auditing tool',
        url: 'https://nmap.org/',
        category: 'General Tools',
    },
    {
        name: 'John the Ripper',
        description: 'Password cracking tool',
        url: 'https://www.openwall.com/john/',
        category: 'General Tools',
    },
    {
        name: 'Hashcat',
        description: 'Advanced password recovery tool',
        url: 'https://hashcat.net/',
        category: 'General Tools',
    },
    // Learning Platforms
    {
        name: 'Hack The Box',
        description: 'Online penetration testing platform',
        url: 'https://www.hackthebox.com/',
        category: 'Learning Platforms',
    },
    {
        name: 'TryHackMe',
        description: 'Learn cybersecurity through hands-on labs',
        url: 'https://tryhackme.com/',
        category: 'Learning Platforms',
    },
    {
        name: 'PentesterLab',
        description: 'Web application security exercises',
        url: 'https://pentesterlab.com/',
        category: 'Learning Platforms',
    },
];

const categories = [
    'Web Exploitation',
    'Cryptography',
    'Forensics',
    'Reverse Engineering',
    'General Tools',
    'Learning Platforms',
];

const categoryIcons: Record<string, React.ReactNode> = {
    'Web Exploitation': <Code className="h-5 w-5" />,
    Cryptography: <Lock className="h-5 w-5" />,
    Forensics: <Search className="h-5 w-5" />,
    'Reverse Engineering': <Terminal className="h-5 w-5" />,
    'General Tools': <Database className="h-5 w-5" />,
    'Learning Platforms': <Network className="h-5 w-5" />,
};

export default function Resources() {
    const resourcesByCategory = categories.map((category) => ({
        category,
        items: resources.filter((r) => r.category === category),
    }));

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Resources - THC" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto rounded-xl p-4">
                <div className="mx-auto max-w-6xl space-y-8">
                    {/* Header */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight">
                            Cybersecurity Resources
                        </h1>
                        <p className="mt-4 text-lg text-muted-foreground">
                            Curated tools, platforms, and learning resources for ethical hackers
                        </p>
                    </div>

                    {/* Resources by Category */}
                    <div className="space-y-8">
                        {resourcesByCategory.map(({ category, items }) => (
                            <Card key={category}>
                                <CardHeader>
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                            {categoryIcons[category]}
                                        </div>
                                        <div>
                                            <CardTitle className="text-xl">{category}</CardTitle>
                                            <CardDescription>
                                                {items.length} resource{items.length !== 1 ? 's' : ''}
                                            </CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                        {items.map((resource, index) => (
                                            <Card
                                                key={index}
                                                className="border transition-colors hover:border-primary"
                                            >
                                                <CardHeader className="pb-3">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <CardTitle className="text-base">
                                                            {resource.name}
                                                        </CardTitle>
                                                        <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="space-y-3">
                                                    <p className="text-sm text-muted-foreground">
                                                        {resource.description}
                                                    </p>
                                                    <a
                                                        href={resource.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <Badge
                                                            variant="outline"
                                                            className="w-full justify-center hover:bg-accent"
                                                        >
                                                            Visit Resource
                                                            <ExternalLink className="ml-2 h-3 w-3" />
                                                        </Badge>
                                                    </a>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Contributing Resources</CardTitle>
                            <CardDescription>
                                Know a great tool or resource? Share it with the community!
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">
                                If you have suggestions for additional resources, tools, or learning
                                platforms that should be included here, please reach out to us
                                through our community channels. We're always looking to expand our
                                resource library.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}