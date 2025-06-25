export interface Expense {
    id: string;
    title: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

export type ExpenseCategory =
    | 'Food'
    | 'Business'
    | 'Travel'
    | 'Shopping'
    | 'Health'
    | 'Education'
    | 'Other';

export interface CategoryStats {
    category: ExpenseCategory;
    total: number;
    count: number;
    percentage: number;
}

export interface MonthlyStats {
    totalExpense: number;
    totalCount: number;
    categoriesStats: CategoryStats[];
    topCategories: CategoryStats[];
}

export interface User {
    id: string;
    fullName: string;
    email: string;
    createdAt: string;
}

export interface ExpenseFilters {
    category?: ExpenseCategory;
    dateFrom?: string;
    dateTo?: string;
    searchQuery?: string;
    sortBy?: 'date' | 'amount' | 'title';
    sortOrder?: 'asc' | 'desc';
}
