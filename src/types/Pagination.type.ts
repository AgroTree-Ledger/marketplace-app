export type PaginationType<T> = {
  total: number;
  limit: number;
  page?: number;
  items: T[];
};

export type PaginationShyftType<T> = {
  size?: number;
  total_data?: number;
  page?: number;
  total_page: number;
  items: T[];
};
