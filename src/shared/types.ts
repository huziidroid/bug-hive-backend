export type TJwtPayload = {
  sub: string;
  email: string;
  iat: number;
  exp: number;
};

export type TPaginatedResult<T> = {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number;
    next: number;
  };
};

export type TPaginationOptions = { page?: number; perPage?: number };
