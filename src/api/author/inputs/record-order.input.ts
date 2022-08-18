import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/common/order/order';

export enum AuthorRecordOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
}

registerEnumType(AuthorRecordOrderField, {
  name: 'AuthorRecordOrderField',
  description: 'Properties by which records can be sorted or ordered.',
});

@InputType()
export class AuthorRecordOrder extends Order {
  field: AuthorRecordOrderField;
}
