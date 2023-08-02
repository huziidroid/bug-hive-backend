import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

export interface Response<T> {
  message: string;
  success: number;
  data: T;
}

@Injectable()
export class ResponseFilter<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    return next
      .handle()
      .pipe(map((data) => ({ success: 1, message: 'Success', data })));
  }
}
