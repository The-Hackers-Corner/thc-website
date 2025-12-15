import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

interface Category {
    id: number;
    name: string;
    description: string | null;
}

interface Challenge {
    id: number;
    title: string;
    description: string | null;
    points: number;
    is_active: boolean;
    category_id: number;
    category?: Category;
}

interface RoutesProps {
    challengesBase: string;
    categoriesBase: string;
}

interface PageProps {
    challenges: Challenge[];
    categories: Category[];
    routes: RoutesProps;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin',
        href: '/admin',
    },
];

export default function AdminChallenges({ challenges, categories, routes }: PageProps) {
    const [form, setForm] = useState({
        category_id: categories[0]?.id?.toString() ?? '',
        title: '',
        description: '',
        flag: '',
        points: '0',
        is_active: true,
    });

    const onChange = (field: string, value: string | boolean) => {
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        router.post(routes.challengesBase, {
            category_id: Number(form.category_id),
            title: form.title,
            description: form.description,
            flag: form.flag,
            points: Number(form.points),
            is_active: form.is_active,
        });
    };

    const toggleActive = (challenge: Challenge) => {
        router.put(`${routes.challengesBase}/${challenge.id}`, {
            category_id: challenge.category_id,
            title: challenge.title,
            description: challenge.description,
            points: challenge.points,
            is_active: !challenge.is_active,
        });
    };

    const remove = (challenge: Challenge) => {
        if (!confirm('Delete this challenge?')) return;
        router.delete(`${routes.challengesBase}/${challenge.id}`);
    };

    const [newCategory, setNewCategory] = useState({
        name: '',
        description: '',
    });

    const createCategory = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategory.name.trim()) return;
        router.post(routes.categoriesBase, {
            name: newCategory.name,
            description: newCategory.description,
        });
    };

    const renameCategory = (category: Category) => {
        const name = window.prompt('New category name', category.name);
        if (!name || !name.trim()) return;
        router.put(`${routes.categoriesBase}/${category.id}`, {
            name: name.trim(),
            description: category.description,
        });
    };

    const deleteCategory = (category: Category) => {
        if (!confirm('Delete this category? It must have no challenges.')) return;
        router.delete(`${routes.categoriesBase}/${category.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin" />
            <div className="flex h-full flex-1 flex-col gap-6 overflow-x-auto p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Categories</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={createCategory} className="grid gap-3 md:grid-cols-3 items-end">
                            <div className="space-y-2 md:col-span-1">
                                <label className="text-sm font-medium">Name</label>
                                <Input
                                    value={newCategory.name}
                                    onChange={(e) => setNewCategory((prev) => ({ ...prev, name: e.target.value }))}
                                />
                            </div>
                            <div className="space-y-2 md:col-span-1">
                                <label className="text-sm font-medium">Description</label>
                                <Input
                                    value={newCategory.description}
                                    onChange={(e) =>
                                        setNewCategory((prev) => ({ ...prev, description: e.target.value }))
                                    }
                                />
                            </div>
                            <div className="md:col-span-1 flex justify-end">
                                <Button type="submit">Add Category</Button>
                            </div>
                        </form>

                        {categories.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No categories yet.</p>
                        ) : (
                            <div className="space-y-2">
                                {categories.map((cat) => (
                                    <div
                                        key={cat.id}
                                        className="flex items-center justify-between border rounded-md px-3 py-2"
                                    >
                                        <div className="space-y-1">
                                            <div className="font-medium">{cat.name}</div>
                                            {cat.description && (
                                                <div className="text-xs text-muted-foreground">
                                                    {cat.description}
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                type="button"
                                                onClick={() => renameCategory(cat)}
                                            >
                                                Rename
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                type="button"
                                                onClick={() => deleteCategory(cat)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Create Challenge</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Category</label>
                                <Select
                                    value={form.category_id}
                                    onValueChange={(v) => onChange('category_id', v)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {categories.map((cat) => (
                                            <SelectItem key={cat.id} value={cat.id.toString()}>
                                                {cat.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Title</label>
                                <Input
                                    value={form.title}
                                    onChange={(e) => onChange('title', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-sm font-medium">Description</label>
                                <Input
                                    value={form.description}
                                    onChange={(e) => onChange('description', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Flag (plaintext)</label>
                                <Input
                                    value={form.flag}
                                    onChange={(e) => onChange('flag', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Points</label>
                                <Input
                                    type="number"
                                    value={form.points}
                                    onChange={(e) => onChange('points', e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Switch
                                    checked={form.is_active}
                                    onCheckedChange={(v) => onChange('is_active', v)}
                                />
                                <span className="text-sm">Active</span>
                            </div>
                            <div className="md:col-span-2 flex justify-end">
                                <Button type="submit">Create</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Existing Challenges</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {challenges.length === 0 ? (
                            <p className="text-sm text-muted-foreground">No challenges yet.</p>
                        ) : (
                            <div className="space-y-2">
                                {challenges.map((ch) => (
                                    <div
                                        key={ch.id}
                                        className="flex items-center justify-between border rounded-md px-3 py-2"
                                    >
                                        <div className="space-y-1">
                                            <div className="font-medium">
                                                {ch.title} ({ch.points} pts)
                                            </div>
                                            <div className="text-xs text-muted-foreground">
                                                {ch.category?.name ?? 'No category'}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                type="button"
                                                onClick={() => toggleActive(ch)}
                                            >
                                                {ch.is_active ? 'Deactivate' : 'Activate'}
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                type="button"
                                                onClick={() => remove(ch)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
