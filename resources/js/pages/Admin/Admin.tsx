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

export default function Admin({ challenges, categories, routes }: PageProps) {
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
        const newName = prompt('Enter new category name:', category.name);
        if (newName && newName !== category.name) {
            router.put(`${routes.categoriesBase}/${category.id}`, {
                name: newName,
                description: category.description,
            });
        }
    };

    const deleteCategory = (category: Category) => {
        if (!confirm(`Delete category "${category.name}" and all its challenges?`)) return;
        router.delete(`${routes.categoriesBase}/${category.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Panel" />
            <div className="container mx-auto p-4 space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Admin Panel</h1>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Add Challenge */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Challenge</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Category</label>
                                    <Select
                                        value={form.category_id}
                                        onValueChange={(value) => onChange('category_id', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={String(category.id)}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Title</label>
                                    <Input
                                        value={form.title}
                                        onChange={(e) => onChange('title', e.target.value)}
                                        placeholder="Challenge title"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Description</label>
                                    <Input
                                        value={form.description}
                                        onChange={(e) => onChange('description', e.target.value)}
                                        placeholder="Challenge description"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Flag</label>
                                    <Input
                                        value={form.flag}
                                        onChange={(e) => onChange('flag', e.target.value)}
                                        placeholder="flag{...}"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">Points</label>
                                    <Input
                                        type="number"
                                        min="0"
                                        value={form.points}
                                        onChange={(e) => onChange('points', e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Switch
                                        id="is_active"
                                        checked={form.is_active}
                                        onCheckedChange={(checked) => onChange('is_active', checked)}
                                    />
                                    <label htmlFor="is_active" className="text-sm font-medium">
                                        Active
                                    </label>
                                </div>

                                <Button type="submit" className="w-full">
                                    Add Challenge
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Add Category */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Add New Category</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={createCategory} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Category Name</label>
                                    <Input
                                        value={newCategory.name}
                                        onChange={(e) =>
                                            setNewCategory({ ...newCategory, name: e.target.value })
                                        }
                                        placeholder="Category name"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Description (Optional)
                                    </label>
                                    <Input
                                        value={newCategory.description}
                                        onChange={(e) =>
                                            setNewCategory({ ...newCategory, description: e.target.value })
                                        }
                                        placeholder="Category description"
                                    />
                                </div>

                                <Button type="submit" className="w-full">
                                    Add Category
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Categories List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className="flex items-center justify-between p-3 border rounded-lg"
                                >
                                    <div>
                                        <h3 className="font-medium">{category.name}</h3>
                                        {category.description && (
                                            <p className="text-sm text-muted-foreground">
                                                {category.description}
                                            </p>
                                        )}
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => renameCategory(category)}
                                        >
                                            Rename
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => deleteCategory(category)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {categories.length === 0 && (
                                <p className="text-muted-foreground text-center py-4">
                                    No categories yet. Add one above.
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Challenges List */}
                <Card>
                    <CardHeader>
                        <CardTitle>Challenges</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            {challenges.map((challenge) => (
                                <div
                                    key={challenge.id}
                                    className="flex items-center justify-between p-3 border rounded-lg"
                                >
                                    <div>
                                        <h3 className="font-medium">
                                            {challenge.title}{' '}
                                            <span className="text-sm text-muted-foreground">
                                                ({challenge.category?.name})
                                            </span>
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {challenge.points} points •{' '}
                                            {challenge.is_active ? (
                                                <span className="text-green-500">Active</span>
                                            ) : (
                                                <span className="text-red-500">Inactive</span>
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Switch
                                            checked={challenge.is_active}
                                            onCheckedChange={() => toggleActive(challenge)}
                                        />
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => remove(challenge)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            ))}
                            {challenges.length === 0 && (
                                <p className="text-muted-foreground text-center py-4">
                                    No challenges yet. Add one above.
                                </p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}