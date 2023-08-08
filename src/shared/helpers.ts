import { ClassConstructor } from 'class-transformer';
import { TPaginatedResult, TPaginationOptions } from './types';

/**
 *
 * @param model Prisma Model
 * @param dto Data Transfer Model -- To Include or excluse Properties in response
 * @param options Pagination Options
 * @param args Prisma Database filter arguments
 * @returns
 */
export const paginator = async <T, K>(
  model: any,
  dto: ClassConstructor<T>,
  options?: TPaginationOptions,
  args?: Omit<K, 'skip' | 'take'>,
): Promise<TPaginatedResult<T>> => {
  const page = options.page || 1;
  const perPage = options.perPage || 1;

  const skip = page > 0 ? perPage * (page - 1) : 0;

  const [total, data] = await Promise.all<[number, T[]]>([
    model.count(),
    model.findMany({
      ...args,
      take: perPage,
      skip,
    }),
  ]);
  const lastPage = Math.ceil(total / perPage);

  return {
    data: data.map((item) => new dto(item)),
    meta: {
      total,
      lastPage,
      currentPage: page,
      perPage,
      prev: page > 1 ? page - 1 : null,
      next: page < lastPage ? page + 1 : null,
    },
  };
};

export const toInt = (value: string) => parseInt(value);
