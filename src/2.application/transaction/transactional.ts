// export function Transactional() {
//   return function (
//     target: any,
//     propertyKey: string,
//     descriptor: PropertyDescriptor,
//   ) {
//     const originalMethod = descriptor.value;

import { SetMetadata } from '@nestjs/common';

//     async function transactionWrapped(...args: unknown[]) {
//       const ret = await originalMethod.apply(this, args);
//     }

//     descriptor.value = transactionWrapped;
//   };
// }
export const TRANSACTION = 'TRANSACTION';

export const Transactional = () => SetMetadata(TRANSACTION, {});
