export interface Agent {
    id: string;
    name: string;
    phone: string;
    address: string;
    joinDate: string;
    propertiesCount: number;
    branchesCount: number;
    employeesCount: number;
    subscriptionTotal: number;
    status: 'active' | 'pending' | 'refused';
}

export interface AgentFilters {
    status?: 'active' | 'pending' | 'refused' | 'all';
    search?: string;
    dateFrom?: string;
    dateTo?: string;
}

export interface PaginationState {
    page: number;
    pageSize: number;
    total: number;
}

export interface SortState {
    column: keyof Agent | null;
    direction: 'asc' | 'desc';
} 