import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum BookRecordOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(BookRecordOrderField, {
  name: 'BookRecordOrderField',
  description: 'Properties by which records can be sorted or ordered.',
});

@InputType()
export class BookRecordOrder extends Order {
  field: BookRecordOrderField;
}
